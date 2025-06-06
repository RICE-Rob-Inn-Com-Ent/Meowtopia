#!/bin/bash
set -e

# Міграції
poetry run python manage.py migrate

# Створення суперкористувача, якщо його немає
export $(grep -v "^#" .env.development | xargs)
poetry run python manage.py shell -c "
import os
from django.contrib.auth import get_user_model
User = get_user_model()
username = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD')
email = os.getenv('DB_EMAIL')
if not User.objects.filter(username=username).exists():
    print(f'Creating superuser: {username}')
    User.objects.create_superuser(username=username, email=email, password=password)
else:
    print(f'Superuser \"{username}\" already exists — skipping.')
"

# Запуск сервера
poetry run python manage.py runserver 0.0.0.0:8000