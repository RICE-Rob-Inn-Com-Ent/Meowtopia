from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login, get_user_model
import json


@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def check_auth_view(request):
    if request.user.is_authenticated:
        return Response({'authenticated': True})
    return Response({'authenticated': False}, status=401)


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        remember_me = data.get("remember_me", False)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            if remember_me:
                # Sesja ważna przez 30 dni
                request.session.set_expiry(60 * 60 * 24 * 30)
            else:
                # Sesja wygaśnie po zamknięciu przeglądarki
                request.session.set_expiry(0)
            return JsonResponse({"ok": True})
        return JsonResponse({"ok": False, "error": "Invalid credentials"}, status=401)
    return JsonResponse({"ok": False, "error": "POST required"}, status=405)
