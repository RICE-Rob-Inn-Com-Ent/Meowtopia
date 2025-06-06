from django.urls import path, include

urlpatterns = [
    path('accounts/', include('core.accounts.urls', namespace='accounts')),
    path('cafe/', include('core.cafe.urls', namespace='cafe')),
    path('finance/', include('core.finance.urls', namespace='finance')),
]