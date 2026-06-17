from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .authentication import SignInAuthentication
from .models import DonorTable, RecipientTable, SignIn
from .serializers import (
    DonorCreateSerializer,
    DonorSerializer,
    LoginSerializer,
    RecipientCreateSerializer,
    RecipientSerializer,
    RegisterSerializer,
    SignInSerializer,
)
from .tokens import create_tokens, decode_token


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        signin = serializer.save()
        tokens = create_tokens(signin)
        return Response(
            {
                'message': 'Account created successfully.',
                'user': SignInSerializer(signin).data,
                'tokens': tokens,
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        signin = serializer.validated_data['signin']
        tokens = create_tokens(signin)
        return Response(
            {
                'message': 'Login successful.',
                'user': SignInSerializer(signin).data,
                'tokens': tokens,
            },
            status=status.HTTP_200_OK,
        )


class TokenRefreshView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'detail': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            payload = decode_token(refresh_token, expected_type='refresh')
            signin = SignIn.objects.get(userid=payload['userid'])
        except SignIn.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception:
            return Response({'detail': 'Invalid or expired refresh token.'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({'tokens': create_tokens(signin)})


class ProfileView(APIView):
    authentication_classes = [SignInAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        signin = request.user
        data = SignInSerializer(signin).data
        data['donor_profile'] = DonorSerializer(
            DonorTable.objects.filter(userid=signin.userid),
            many=True,
        ).data
        data['recipient_profile'] = RecipientSerializer(
            RecipientTable.objects.filter(userid=signin.userid),
            many=True,
        ).data
        return Response(data)


class DonorListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SignInAuthentication]
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return DonorCreateSerializer
        return DonorSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if isinstance(self.request.user, SignIn):
            context['signin'] = self.request.user
        return context

    def get_queryset(self):
        queryset = DonorTable.objects.all()
        params = self.request.query_params

        location = params.get('location') or params.get('city')
        if location:
            queryset = queryset.filter(city__icontains=location.strip())

        query = params.get('query') or params.get('search')
        if query:
            q = query.strip()
            queryset = queryset.filter(
                Q(name__icontains=q) | Q(phonenumber__icontains=q)
            )

        gender = params.get('gender')
        if gender:
            queryset = queryset.filter(gender__iexact=gender.strip())

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        donor = serializer.save()
        return Response(
            {
                'message': 'Donor registered successfully.',
                'donor': DonorSerializer(donor).data,
            },
            status=status.HTTP_201_CREATED,
        )


class DonorDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = DonorTable.objects.all()
    serializer_class = DonorSerializer


class RecipientListCreateView(generics.ListCreateAPIView):
    authentication_classes = [SignInAuthentication]
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RecipientCreateSerializer
        return RecipientSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if isinstance(self.request.user, SignIn):
            context['signin'] = self.request.user
        return context

    def get_queryset(self):
        queryset = RecipientTable.objects.all()
        params = self.request.query_params

        location = params.get('location')
        if location:
            queryset = queryset.filter(location__icontains=location.strip())

        query = params.get('query') or params.get('search')
        if query:
            q = query.strip()
            queryset = queryset.filter(
                Q(patientname__icontains=q) | Q(contactnumber__icontains=q)
            )

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        recipient = serializer.save()
        return Response(
            {
                'message': 'Recipient request registered successfully.',
                'recipient': RecipientSerializer(recipient).data,
            },
            status=status.HTTP_201_CREATED,
        )


class RecipientDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = RecipientTable.objects.all()
    serializer_class = RecipientSerializer
