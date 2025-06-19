# Meowtopia

Platforma zbudowana z myślą o obsłudze kawiarni oraz integracji z web3.

---

## Opis projektu

Meowtopia to platforma łącząca świat kawiarni z technologią blockchain oraz aplikacjami webowymi i mobilnymi. Projekt jest otwarty, transparentny i rozwijany zgodnie z najlepszymi praktykami UE.

---

## Architektura i komponenty

Projekt składa się z kilku głównych komponentów:

- **Blockchain**: logika blockchain (GoLang + Rust) – **działająca wersja testowa** `v0.0.1`
- **Backend**: API, logika biznesowa, baza danych (Python, PostgreSQL) – **działająca wersja testowa** `v0.0.1`
- **Frontend Web**: panel administracyjny i interfejs użytkownika (React, TypeScript) – **działająca wersja testowa** `v0.0.1`
- **Frontend Mobile**: gra mobilna (Kotlin/Swift) – **aktualnie nie działa**
- **DevOps**: konteneryzacja i zarządzanie środowiskiem (Docker)

Struktura katalogów:

```
Meowtopia/
├── backend/           # Backend (FastAPI, Python)
├── frontend/
│   ├── web/           # Frontend webowy (React)
│   ├── android/       # Frontend mobilny Android (Kotlin)
│   └── ios/           # Frontend mobilny iOS (Swift)
├── docs/              # Dokumentacja projektu
├── Makefile           # Automatyzacja uruchamiania
├── docker-compose.yml # Konfiguracja Docker
├── logika blockchain
└── ...
```

---

## Stack technologiczny

- **DevOps**: [Docker](https://www.docker.com/)
- **Blockchain**: [Ignite CLI](https://ignite.com/cli) (GoLang, Rust) – **działająca wersja testowa**
- **Backend**: [Poetry](https://python-poetry.org/) (Python, PostgreSQL) – **działająca wersja testowa**
- **Frontend Web**: [Yarn](https://yarnpkg.com/), React, TypeScript – **prototyp wersji web**
- **Frontend Mobile**: [Gradle](https://gradle.org/) (Kotlin), [Swift PM](https://swift.org/) (Swift) – **aktualnie nie działa**
- **Makefile**: uruchamianie i zarządzanie komponentami projektu

---

## Wymagania wstępne

Przed rozpoczęciem pracy upewnij się, że masz zainstalowane:

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [Poetry](https://python-poetry.org/docs/#installation)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- [Node.js](https://nodejs.org/) (zalecana wersja LTS)
- [Ignite CLI](https://docs.ignite.com/guide/install) (dla
- [Gradle](https://gradle.org/install/) (dla Android)
- [Swift PM](https://swift.org/getting-started/) (dla iOS)

---

## Szybki start

1. **Sklonuj repozytorium:**

   ```
   git clone https://github.com/RICE-Rob-Inn-Com-Ent/Meowtopia.git
   cd Meowtopia
   ```

2. **Skonfiguruj środowisko:**

   - Docker: `docker --version`
   - Poetry: `poetry --version`
   - Yarn: `yarn --version`
   - Ignite CLI: `ignite version`
   - Node.js: `node --version`
   - (opcjonalnie) Gradle/Swift PM dla mobile

3. **Zainstaluj zależności:**
   - Backend:
     ```
     cd backend/app
     poetry install
     ```
   - Frontend Web:
     ```
     cd ../../frontend/web
     yarn install
     ```
   - (opcjonalnie) Frontend Android/iOS:
     ```
     cd ../android && yarn install
     cd ../ios && yarn install
     ```

---

## Konfiguracja środowiska

- **Zmienne środowiskowe**:  
  Skonfiguruj pliki `.env` w katalogach `backend/app` oraz `frontend/web` (przykłady znajdziesz jako `.env.example`).
- **Docker**:  
  Jeśli chcesz korzystać z kontenerów, uruchom:
  ```
  docker-compose up
  ```

---

## Uruchamianie komponentów

Możesz uruchamiać poszczególne części projektu osobno lub równolegle za pomocą Makefile.

### Przykłady:

- **Backend (FastAPI, port domyślny 2000) – działająca wersja testowa:**
  ```
  make backend
  ```
- **Frontend Web (React, port domyślny 3001) – prototyp wersji web:**
  ```
  make frontend-web
  ```
- **Blockchain (Ignite, port domyślny 1000) – działająca wersja testowa:**
  ```
  make blockchain
  ```
- **Frontend Android/iOS (dev) – aktualnie nie działa:**
  ```
  make frontend-android
  make frontend-ios
  ```
- **Postgres (Docker, port domyślny 2001):**
  ```
  make postgres
  ```
- **Wszystkie dev-serwisy równolegle:**
  ```
  make dev
  ```

---

## Przydatne polecenia Makefile

- `make backend` — uruchamia backend (Python, Poetry) – **działająca wersja testowa**
- `make frontend-web` — uruchamia frontend webowy (React, Yarn) – **prototyp wersji web**
- `make blockchain` — uruchamia blockchain (Ignite CLI) – **działająca wersja testowa**
- `make mobile` — buduje aplikacje mobilne (Kotlin/Swift) – **aktualnie nie działa**
- `make dev` — uruchamia wszystkie główne komponenty równolegle
- `make stop` — zatrzymuje wszystkie serwisy Docker
- `make pdf` — generuje dokumentację w PDF

---

## FAQ

**Q:** Jak dodać nowe zależności do backendu?  
**A:** Przejdź do `backend/app` i użyj `poetry add <nazwa_pakietu>`.

**Q:** Jak zbudować obraz Docker dla backendu?  
**A:** Użyj `docker-compose build backend`.

**Q:** Jak zresetować bazę danych?  
**A:** Zatrzymaj kontenery: `make stop`, usuń wolumeny: `docker volume prune`.

Więcej pytań i odpowiedzi znajdziesz w [FAQ](docs/faq.md).

---

## Wsparcie i kontakt

- [Discord](https://discord.gg/ignite)
- [GitHub Issues](https://github.com/RICE-Rob-Inn-Com-Ent/Meowtopia/issues)
- [E-mail](mailto:kontakt@meowtopia.app)

---

## Dokumentacja

Szczegółowa dokumentacja znajduje się w katalogu `docs/` oraz na stronie [meowtopia.app](https://meowtopia.app).

---
