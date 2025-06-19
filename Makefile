BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
COMMIT := $(shell git log -1 --format='%H')
APPNAME := chctoken

# do not override user values
ifeq (,$(VERSION))
  VERSION := $(shell git describe --exact-match 2>/dev/null)
  # if VERSION is empty, then populate it with branch name and raw commit hash
  ifeq (,$(VERSION))
    VERSION := $(BRANCH)-$(COMMIT)
  endif
endif

# Update the ldflags with the app, client & server names
ldflags = -X github.com/cosmos/cosmos-sdk/version.Name=$(APPNAME) \
	-X github.com/cosmos/cosmos-sdk/version.AppName=$(APPNAME)d \
	-X github.com/cosmos/cosmos-sdk/version.Version=$(VERSION) \
	-X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT)

BUILD_FLAGS := -ldflags '$(ldflags)'

##############
###  Test  ###
##############

test-unit:
	@echo Running unit tests...
	@go test -mod=readonly -v -timeout 30m ./...

test-race:
	@echo Running unit tests with race condition reporting...
	@go test -mod=readonly -v -race -timeout 30m ./...

test-cover:
	@echo Running unit tests and creating coverage report...
	@go test -mod=readonly -v -timeout 30m -coverprofile=$(COVER_FILE) -covermode=atomic ./...
	@go tool cover -html=$(COVER_FILE) -o $(COVER_HTML_FILE)
	@rm $(COVER_FILE)

bench:
	@echo Running unit tests with benchmarking...
	@go test -mod=readonly -v -timeout 30m -bench=. ./...

test: govet govulncheck test-unit

.PHONY: test test-unit test-race test-cover bench

#################
###  Install  ###
#################

all: install

install:
	@echo "--> ensure dependencies have not been modified"
	@go mod verify
	@echo "--> installing $(APPNAME)d"
	@go install $(BUILD_FLAGS) -mod=readonly ./cmd/$(APPNAME)d

.PHONY: all install

##################
###  Protobuf  ###
##################

# Use this target if you do not want to use Ignite for generating proto files

proto-deps:
	@echo "Installing proto deps"
	@echo "Proto deps present, run 'go tool' to see them"

proto-gen:
	@echo "Generating protobuf files..."
	@ignite generate proto-go --yes

.PHONY: proto-gen

#################
###  Linting  ###
#################

lint:
	@echo "--> Running linter"
	@go tool github.com/golangci/golangci-lint/cmd/golangci-lint run ./... --timeout 15m

lint-fix:
	@echo "--> Running linter and fixing issues"
	@go tool github.com/golangci/golangci-lint/cmd/golangci-lint run ./... --fix --timeout 15m

.PHONY: lint lint-fix

#########################
### Development Runs  ###
#########################

# Frontend (Web)
frontend-web:
	@echo "Запуск frontend web (порт 3001)..."
	cd frontend/web && yarn install && yarn dev --port 3001

# Frontend (Android)
frontend-android:
	@echo "Запуск frontend android (порт 3002)..."
	cd frontend/android && yarn install && yarn dev --port 3002

# Frontend (iOS)
frontend-ios:
	@echo "Запуск frontend ios (порт 3003)..."
	cd frontend/ios && yarn install && yarn dev --port 3003

# Backend
backend:
	@echo "Запуск бекенду FastAPI (порт 2000)..."
	cd backend/app && poetry install && poetry run uvicorn main:app --reload --host 0.0.0.0 --port 2000

# Blockchain (Ignite)
blockchain:
	@echo "Запуск блокчейну Ignite (порт 1000)..."
	ignite chain serve --api.address tcp://0.0.0.0:1000

# Postgres
postgres:
	@echo "Запуск лише Postgres (порт 2001)..."
	docker-compose up db

# Груповий запуск усіх dev-сервісів
# Запускає всі частини паралельно
# (запускати через: make dev)
dev:
	@echo "Запуск усіх dev-сервісів (frontend, backend, blockchain, postgres)..."
	$(MAKE) -j4 frontend-web frontend-android frontend-ios backend blockchain postgres

.PHONY: frontend-web frontend-android frontend-ios backend blockchain postgres dev

###################
### Stop All ###
###################

stop:
	@echo "Зупинка всіх сервісів..."
	docker-compose down

.PHONY: backend db migrate dev stop

# Docker targets

docker-web:
	@echo "Запуск web frontend через Docker..."
	docker-compose up web

docker-backend:
	@echo "Запуск backend через Docker..."
	docker-compose up backend

docker-web-backend:
	@echo "Запуск web frontend та backend через Docker..."
	docker-compose up web backend

.PHONY: docker-web docker-backend docker-web-backend

PDF_OUT=site/pdf/Meowtopia-dokumentacja.pdf