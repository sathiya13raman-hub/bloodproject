from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .views import (
    DonorDetailView,
    DonorListCreateView,
    LoginView,
    ProfileView,
    RecipientDetailView,
    RecipientListCreateView,
    RegisterView,
    TokenRefreshView,
)

urlpatterns = [
    path('auth/register/', csrf_exempt(RegisterView.as_view()), name='register'),
    path('auth/login/', csrf_exempt(LoginView.as_view()), name='login'),
    path('auth/token/refresh/', csrf_exempt(TokenRefreshView.as_view()), name='token_refresh'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    path('donors/', DonorListCreateView.as_view(), name='donor-list-create'),
    path('donors/<int:pk>/', DonorDetailView.as_view(), name='donor-detail'),
    path('recipients/', RecipientListCreateView.as_view(), name='recipient-list-create'),
    path('recipients/<int:pk>/', RecipientDetailView.as_view(), name='recipient-detail'),
]
