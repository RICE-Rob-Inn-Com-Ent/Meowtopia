# Dockerfile для Django API (backend)
FROM python:3.12-slim

WORKDIR /app

# Встановлюємо Poetry
RUN pip install --no-cache-dir poetry

# Копіюємо pyproject.toml та poetry.lock
COPY pyproject.toml poetry.lock ./

# Встановлюємо залежності
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi --only main

# Копіюємо код
COPY . .

EXPOSE 8000
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
