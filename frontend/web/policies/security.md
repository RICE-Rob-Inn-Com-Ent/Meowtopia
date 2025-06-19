# Polityka Bezpieczeństwa (Security Policy)

**Data wejścia w życie:** 15 czerwca 2025  
**Ostatnia aktualizacja:** 15 czerwca 2025

---

## 1. Wprowadzenie

Bezpieczeństwo Twoich danych, środków oraz doświadczeń – zarówno w aplikacji, jak i w naszej kawiarni – to nasz najwyższy priorytet. Działamy na styku fizycznego świata, technologii i społeczności, dlatego nasza polityka bezpieczeństwa obejmuje wszystkie te obszary.

---

## 2. Zakres ochrony

### 2.1. Ochrona danych osobowych

- Stosujemy **szyfrowanie transmisji danych** (HTTPS, TLS 1.3).
- Dane wrażliwe (hasła, identyfikatory blockchain) są **haszowane i przechowywane w sposób nieodwracalny**.
- Dostęp do danych mają tylko uprawnieni członkowie zespołu na zasadzie **minimalnego dostępu (least privilege)**.

### 2.2. Bezpieczeństwo infrastruktury

- Serwery utrzymywane są w centrach danych zgodnych z **ISO 27001 / SOC 2**.
- Regularnie przeprowadzamy **audyt kodu i testy penetracyjne**.
- Automatyczne **kopie zapasowe** są wykonywane codziennie i szyfrowane.

### 2.3. Blockchain i kryptowaluty

- Używamy **audytowanego smart kontraktu** i własnego blockchaina zbudowanego na silniku Cosmos SDK.
- Klucze prywatne są pod Twoją kontrolą – **nie przechowujemy ich na naszych serwerach**.
- Gwarantujemy **brak scentralizowanego zarządzania środkami** użytkowników.

### 2.4. Aplikacja mobilna i web

- Kod frontendowy i backendowy podlega **ciągłemu testowaniu bezpieczeństwa (CI/CD)**.
- Zabezpieczamy aplikację przed najczęstszymi atakami:  
  `XSS`, `CSRF`, `SQLi`, `Reentrancy`, `Sybil attacks`, `MITM`.

### 2.5. Fizyczna kawiarnia i urządzenia

- Kawiarnia monitorowana jest systemem **CCTV**, z dostępem tylko dla administratorów.
- Terminale płatnicze i systemy robotyczne działają w odseparowanych sieciach.
- Zespół jest regularnie szkolony z **cyberhigieny** i zachowania bezpieczeństwa offline.

---

## 3. Reagowanie na incydenty

Jeśli zauważysz jakikolwiek incydent bezpieczeństwa:

1. Zgłoś go natychmiast na: **security@naszekafe.app**
2. W temacie wpisz: `[INCYDENT]`, a w treści podaj jak najwięcej szczegółów.
3. Reagujemy w czasie maksymalnym: **24 godziny** od zgłoszenia.

W przypadku poważnych naruszeń, użytkownicy otrzymają stosowne powiadomienie oraz procedurę rekompensaty.

---

## 4. Twoja odpowiedzialność

Bezpieczeństwo to współpraca. Prosimy:

- **Nie udostępniaj swoich kluczy prywatnych i haseł**.
- **Nie przesyłaj danych przez niezabezpieczone sieci Wi-Fi**.
- Zgłaszaj wszystkie **podejrzane działania** lub błędy.

---

## 5. Bug bounty i współpraca

Jeśli jesteś specjalistą ds. bezpieczeństwa:

- Mamy otwarty **program Bug Bounty** – nagradzamy zgłoszone luki.
- Chcesz współtworzyć z nami bezpieczny system? Napisz do nas.  
  Etyczni hakerzy są mile widziani.

---

## 6. Podsumowanie

Jesteśmy małym zespołem z wielką misją, ale nie oszczędzamy na bezpieczeństwie.  
To dzięki zaufaniu społeczności możemy dalej rozwijać ten projekt.

> _Zaufanie buduje się przez działanie. Zabezpieczamy ten świat tak, jakby był naszym wspólnym domem – bo właśnie tym jest._
