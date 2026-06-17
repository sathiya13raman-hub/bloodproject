import jwt
from rest_framework import authentication, exceptions

from .models import SignIn
from .tokens import decode_token


class SignInAuthentication(authentication.BaseAuthentication):
    keyword = 'Bearer'

    def authenticate(self, request):
        auth_header = authentication.get_authorization_header(request).decode('utf-8')
        if not auth_header:
            return None

        parts = auth_header.split()
        if len(parts) != 2 or parts[0] != self.keyword:
            return None

        try:
            payload = decode_token(parts[1], expected_type='access')
            signin = SignIn.objects.get(userid=payload['userid'])
        except SignIn.DoesNotExist as exc:
            raise exceptions.AuthenticationFailed('User not found.') from exc
        except jwt.PyJWTError as exc:
            raise exceptions.AuthenticationFailed('Invalid or expired token.') from exc

        return (signin, parts[1])
