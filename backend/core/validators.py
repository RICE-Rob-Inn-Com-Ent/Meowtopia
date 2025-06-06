import re
import hashlib
import requests
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _


class StrongPasswordValidator:
    def validate(self, password, user=None):
        if not re.search(r'[A-Z]', password):
            raise ValidationError(
                _("Hasło musi zawierać przynajmniej jedną WIELKĄ literę."))
        if not re.search(r'\d', password):
            raise ValidationError(
                _("Hasło musi zawierać przynajmniej jedną cyfrę."))
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise ValidationError(
                _("Hasło musi zawierać przynajmniej jeden znak specjalny."))

    def get_help_text(self):
        return _("Hasło musi zawierać: 1 wielką literę, 1 cyfrę, 1 znak specjalny (!@#$% itp.).")


class ProjectKeywordValidator:
    def __init__(self, keywords=None):
        self.default_keywords = [
            'company', 'firm', 'office', 'business', 'brand', 'project', 'startup',
            'ceo', 'cto', 'adminpanel', 'dashboard', 'support', 'helpdesk',
            'service', 'product', 'client', 'order', 'invoice', 'backend',
            'frontend', 'developer', 'engineer', 'passwordreset', 'internal',
            'securearea', 'access', 'private', 'corporate', 'intranet', 'meeting',
            'calendar', 'notion', 'figma', 'slack', 'jira', 'github', 'gitlab',
            'mail', 'email', 'domain', 'server', 'api', 'endpoint', 'token'
        ]
        self.keywords = keywords or self.default_keywords

    def validate(self, password, user=None):
        for word in self.keywords:
            if word in password.lower():
                raise ValidationError(
                    _("Hasło zawiera zabronione słowo: '%(word)s'."), params={'word': word})

    def get_help_text(self):
        return _("Hasło nie może zawierać słów związanych z firmą, narzędziami lub infrastrukturą (np. 'project', 'server', 'email').")


class PwnedPasswordValidator:
    def validate(self, password, user=None):
        sha1_password = hashlib.sha1(
            password.encode('utf-8')).hexdigest().upper()
        prefix, suffix = sha1_password[:5], sha1_password[5:]

        try:
            response = requests.get(
                f'https://api.pwnedpasswords.com/range/{prefix}', timeout=3)
            if response.status_code != 200:
                raise ValidationError(
                    _("Nie można sprawdzić bezpieczeństwa hasła. Spróbuj ponownie później."))

            hashes = (line.split(':') for line in response.text.splitlines())
            if any(h == suffix for h, _ in hashes):
                raise ValidationError(
                    _("To hasło pojawiło się w wyciekach. Wybierz inne."))
        except requests.RequestException:
            raise ValidationError(
                _("Błąd podczas sprawdzania wycieków. Sprawdź połączenie internetowe."))

    def get_help_text(self):
        return _("Sprawdzenie, czy hasło pojawiło się w publicznych bazach danych (HaveIBeenPwned).")
