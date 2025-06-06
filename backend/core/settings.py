# === PODSTAWOWE USTAWIENIA ===
import os
from pathlib import Path
from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent
DEV_MODE = True

if DEV_MODE:
    load_dotenv(BASE_DIR / '.env.development')
else:
    load_dotenv(BASE_DIR / '.env.production')

# === PODSTAWOWE USTAWIENIA ===
DEBUG = os.getenv('DEBUG')
SECRET_KEY = os.getenv('SECRET_KEY')
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

# === APLIKACJE ===
INSTALLED_APPS = [
    'corsheaders',
    'rest_framework',
    'drf_spectacular',
    'core.accounts',
    'core.finance',
    'core.cafe',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django_extensions',
]

# === MIDDLEWARE ===
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# === ROUTING ===
ROOT_URLCONF = 'core.urls'
ASGI_APPLICATION = 'core.asgi.application'

# === BAZA DANYCH ===
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
        'OPTIONS': {
            'sslmode': os.getenv('SSL_MODE'),
        }
    }
}

# === WALIDACJA HASŁA / AUTENTYKACJA ===
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        'OPTIONS': {
            'max_similarity': 0.5,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 12,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
    {
        'NAME': 'core.validators.StrongPasswordValidator',
    },
    {
        'NAME': 'core.validators.ProjectKeywordValidator',
        'OPTIONS': {
            'keywords': ['cat', 'house', 'cafe', 'koty'],
        }
    },
    {
        'NAME': 'core.validators.PwnedPasswordValidator',
    },
]

# === MIĘDZYNARODOWOŚĆ / LOKALIZACJA ===
LANGUAGE_CODE = 'pl'
TIME_ZONE = 'Europe/Warsaw'
USE_I18N = True
USE_TZ = True

LANGUAGES = [
    ('pl', 'Polski'),
    ('uk', 'Українська'),
    ('en', 'English'),
    ('de', 'Deutsch'),
    ('cs', 'Čeština'),
]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# === SESJE I CORS ===
SESSION_COOKIE_SAMESITE = os.getenv('SESSION_COOKIE_SAMESITE')
SESSION_COOKIE_SECURE = os.getenv('SESSION_COOKIE_SECURE')
SESSION_COOKIE_AGE = 60 * 60 * 6  # 6 godzin
SESSION_SAVE_EVERY_REQUEST = True  # opcjonalnie, odświeża sesję przy każdym żądaniu
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    origin.strip() for origin in os.getenv("CORS_ORIGIN_WHITELIST", "").split(",") if origin.strip()
]

# === CSRF ===
CSRF_COOKIE_NAME = 'csrfToken'
CSRF_HEADER_NAME = 'X-CSRFToken'

# === BEZPIECZEŃSTWO ===
SECURE_SSL_REDIRECT = os.getenv('SECURE_SSL_REDIRECT', 'False').lower() == 'true'
SECURE_HSTS_SECONDS = int(os.getenv('SECURE_HSTS_SECONDS', '0'))
SECURE_HSTS_INCLUDE_SUBDOMAINS = os.getenv('SECURE_HSTS_INCLUDE_SUBDOMAINS', 'False').lower() == 'true'
SECURE_HSTS_PRELOAD = os.getenv('SECURE_HSTS_PRELOAD', 'False').lower() == 'true'
SECURE_CONTENT_TYPE_NOSNIFF = os.getenv('SECURE_CONTENT_TYPE_NOSNIFF', 'False').lower() == 'true'
SECURE_BROWSER_XSS_FILTER = os.getenv('SECURE_BROWSER_XSS_FILTER', 'False').lower() == 'true'
SECURE_REFERRER_POLICY = os.getenv('SECURE_REFERRER_POLICY', 'no-referrer')

# === REST FRAMEWORK ===
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day',
    },
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

# === LOGOWANIE ===
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': os.getenv('LOGGING_CONSOLE_LEVEL'),
            'class': 'logging.StreamHandler',
        },
        'admin_file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs' / 'admin.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': [h.strip() for h in os.getenv('LOGGING_DJANGO_HANDLERS', '').split(',') if h.strip()],
            'level': os.getenv('LOGGING_DJANGO_LEVEL'),
            'propagate': True,
        },
    },
}

SESSION_ENGINE = "django.contrib.sessions.backends.db"