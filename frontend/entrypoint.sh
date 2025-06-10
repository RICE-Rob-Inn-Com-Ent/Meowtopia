#!/bin/bash
set -e

log() {
  local COLOR=$1
  local PREFIX=$2
  local MSG=$3
  echo -e "\033[${COLOR}m[FRONTEND] [${PREFIX}]\033[0m $MSG"
}

case "$1" in
  web)
    log "36" "WEB" "Запуск фронтенду через Vite (yarn dev)..."
    cd /home/mrdinkelman/Projects/chctoken/frontend/web && yarn install && yarn dev
    ;;
  android)
    log "32" "ANDROID" "Запуск Android-версії (заглушка)"
    # Додайте тут команду для Android, якщо потрібно
    ;;
  ios)
    log "90" "IOS" "Запуск iOS-версії (заглушка)"
    # Додайте тут команду для iOS, якщо потрібно
    ;;
  *)
    echo "Використання: $0 {web|android|ios}"
    exit 1
    ;;
esac
