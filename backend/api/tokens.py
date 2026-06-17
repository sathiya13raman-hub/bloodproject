from datetime import datetime, timedelta

import jwt
from django.conf import settings

ACCESS_TOKEN_HOURS = 12
REFRESH_TOKEN_DAYS = 7


def _encode(payload):
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')


def create_tokens(signin):
    now = datetime.utcnow()
    access_payload = {
        'userid': signin.userid,
        'mailid': signin.mailid,
        'type': 'access',
        'exp': now + timedelta(hours=ACCESS_TOKEN_HOURS),
    }
    refresh_payload = {
        'userid': signin.userid,
        'mailid': signin.mailid,
        'type': 'refresh',
        'exp': now + timedelta(days=REFRESH_TOKEN_DAYS),
    }
    return {
        'access': _encode(access_payload),
        'refresh': _encode(refresh_payload),
    }


def decode_token(token, expected_type=None):
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    if expected_type and payload.get('type') != expected_type:
        raise jwt.InvalidTokenError('Invalid token type.')
    return payload
