#!/bin/bash
set -e

# Перевірка чи встановлені залежності для кожного сервісу

# Backend (Django + Poetry)
if [ ! -d "backend/.venv" ]; then
  echo "[backend] Встановлення poetry-залежностей..."
  cd backend && poetry install
  cd ..
else
  echo "[backend] Залежності вже встановлені."
fi

# Frontend (React + Yarn)
if [ ! -d "frontend/node_modules" ]; then
  echo "[frontend] Встановлення yarn-залежностей..."
  cd frontend && yarn install
  cd ..
else
  echo "[frontend] Залежності вже встановлені."
fi

# Chain (Ignite)
if ! command -v ignite &> /dev/null; then
  echo "[chain] Встановлення Ignite CLI..."
  curl https://get.ignite.com/ignite/cli! | bash
else
  echo "[chain] Ignite CLI вже встановлено."
fi

# Запуск всіх сервісів через docker-compose
exec docker-compose up --build
