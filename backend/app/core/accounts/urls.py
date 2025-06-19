from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('check-auth/', views.check_auth_view, name='check_auth'),
    path('login/', views.login_view, name='login'),
]