# Головний Dockerfile для всього проєкту
# Використовуємо docker-compose для оркестрації
# Цей файл лише для запуску через docker-compose
FROM alpine:3.19

# Встановлюємо необхідні утиліти
RUN apk add --no-cache bash curl git

# Копіюємо docker-compose.yml у контейнер (для інформації)
COPY docker-compose.yml /docker-compose.yml

# Стартовий скрипт
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
