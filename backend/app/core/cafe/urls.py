from django.urls import path
from . import views

app_name = 'cafe'

urlpatterns = [
     path('products/', views.products_view, name='products'),
]
