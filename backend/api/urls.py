from django.urls import path

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
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    path('donors/', DonorListCreateView.as_view(), name='donor-list-create'),
    path('donors/<int:pk>/', DonorDetailView.as_view(), name='donor-detail'),
    path('recipients/', RecipientListCreateView.as_view(), name='recipient-list-create'),
    path('recipients/<int:pk>/', RecipientDetailView.as_view(), name='recipient-detail'),
]
