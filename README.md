# Meowtopia
Web3, Django, PostgreSQL, UI/UX

# chctoken
**chctoken** — це блокчейн на Cosmos SDK і Tendermint, створений через [Ignite CLI](https://ignite.com/cli).

## Get started

```
ignite chain serve
```

Команда `serve` встановлює залежності, збирає, ініціалізує та запускає блокчейн у режимі розробки.

### Configure

Блокчейн у режимі розробки можна налаштувати через `config.yml`. Детальніше — у [документації Ignite CLI](https://docs.ignite.com).

### Web Frontend (React + TypeScript + Yarn)

Фронтенд знаходиться у папці `frontend/`.

#### Запуск фронтенду:

```
cd frontend
# встановити залежності (тільки перший раз або після змін)
yarn install
# запуск у режимі розробки
yarn start
```

### Backend API (Django + Poetry)

Backend API знаходиться у папці `backend/`.

#### Запуск бекенду:

```
cd backend
poetry install
poetry run python manage.py runserver 0.0.0.0:8000
```

### Release
Щоб випустити нову версію блокчейну, створіть і запуште новий тег із префіксом `v`:

```
git tag v0.1
git push origin v0.1
```

Після створення чернетки релізу завершіть оформлення на сторінці релізу та опублікуйте його.

### Install
Щоб встановити останню версію ноди, виконайте:

```
curl https://get.ignite.com/username/chctoken@latest! | sudo bash
```
`username/chctoken` має відповідати вашому GitHub-репозиторію. Детальніше — [процес встановлення](https://github.com/allinbits/starport-installer).

## Learn more

- [Ignite CLI](https://ignite.com/cli)
- [Tutorials](https://docs.ignite.com/guide)
- [Ignite CLI docs](https://docs.ignite.com)
- [Cosmos SDK docs](https://docs.cosmos.network)
- [Developer Chat](https://discord.gg/ignite)
