# API-dokumentation – Marknadsplats

Base URL: `https://api.marknadsplats.se/v1`

## Autentisering

Alla skyddade endpoints kräver en `Authorization`-header med ett giltigt JWT:

```
Authorization: Bearer <access_token>
```

### Roller
| Roll | Beskrivning |
|------|-------------|
| `YOUTH` | Ungdom som utför tjänster |
| `CUSTOMER` | Privatperson som köper tjänster |
| `BUSINESS` | Företag |
| `ADMIN` | Systemadministratör |

---

## Auth Endpoints

### POST `/auth/register`
Registrera ny användare.

**Body:**
```json
{
  "email": "anna@example.com",
  "password": "SecurePass123!",
  "name": "Anna Svensson",
  "role": "CUSTOMER",
  "phone": "+46701234567"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "email": "anna@example.com",
  "name": "Anna Svensson",
  "role": "CUSTOMER",
  "accessToken": "jwt...",
  "refreshToken": "jwt..."
}
```

### POST `/auth/login`
Logga in.

**Body:**
```json
{
  "email": "anna@example.com",
  "password": "SecurePass123!"
}
```

### POST `/auth/google`
Logga in med Google OAuth.

**Body:**
```json
{
  "idToken": "google-id-token"
}
```

### POST `/auth/verify-phone`
Verifiera telefonnummer med SMS-kod.

**Body:**
```json
{
  "phone": "+46701234567",
  "code": "123456"
}
```

### POST `/auth/forgot-password`
Begär lösenordsåterställning.

### POST `/auth/reset-password`
Återställ lösenord med token.

### POST `/auth/refresh`
Förnya access token med refresh token.

---

## User Endpoints

### GET `/users/me`
Hämta inloggad användares profil. **Auth krävs.**

### PATCH `/users/me`
Uppdatera profil. **Auth krävs.**

**Body:**
```json
{
  "name": "Anna Svensson",
  "description": "Erfaren trädgårdsmästare",
  "municipality": "Stockholm",
  "skills": ["Gräsklippning", "Trädgårdsarbete"]
}
```

### GET `/users/:id`
Hämta offentlig profil.

**Response:**
```json
{
  "id": "uuid",
  "name": "Erik Johansson",
  "avatar": "https://...",
  "description": "...",
  "rating": 4.8,
  "completedTasks": 42,
  "skills": ["Gräsklippning", "Snöskottning"],
  "verified": true,
  "responseTime": "15 min",
  "completionRate": 98
}
```

### POST `/users/me/avatar`
Ladda upp profilbild. **Auth krävs.** `multipart/form-data`

---

## Task Endpoints

### GET `/tasks`
Lista och sök uppdrag.

**Query-parametrar:**
| Param | Typ | Beskrivning |
|-------|-----|-------------|
| `category` | string | Filtrera på kategori |
| `lat` | number | Latitud för geografisk sökning |
| `lng` | number | Longitud för geografisk sökning |
| `radius` | number | Sökradie i km (5, 10, 25, 50) |
| `municipality` | string | Kommun |
| `status` | string | Status (OPEN, ASSIGNED, etc.) |
| `minPrice` | number | Minimipris |
| `maxPrice` | number | Maximipris |
| `sort` | string | Sortering (newest, price_asc, price_desc, distance) |
| `page` | number | Sida |
| `limit` | number | Antal per sida |

### POST `/tasks`
Skapa nytt uppdrag. **Auth krävs (CUSTOMER).**

**Body:**
```json
{
  "title": "Gräsklippning i Sundbyberg",
  "description": "Behöver hjälp med att klippa gräsmattan, ca 200 kvm.",
  "category": "GARDEN",
  "price": 500,
  "address": "Sturegatan 10, Sundbyberg",
  "lat": 59.3612,
  "lng": 18.0048,
  "deadline": "2026-06-15T10:00:00Z"
}
```

### GET `/tasks/:id`
Hämta specifikt uppdrag.

### PATCH `/tasks/:id`
Uppdatera uppdrag. **Auth krävs (ägare).**

### DELETE `/tasks/:id`
Ta bort uppdrag. **Auth krävs (ägare).**

### POST `/tasks/:id/apply`
Ansök om uppdrag. **Auth krävs (YOUTH).**

**Body:**
```json
{
  "message": "Jag kan klippa gräset på lördag!",
  "proposedPrice": 450
}
```

### POST `/tasks/:id/assign`
Tilldela uppdrag till utförare. **Auth krävs (ägare).**

**Body:**
```json
{
  "userId": "uuid"
}
```

### POST `/tasks/:id/complete`
Markera uppdrag som slutfört. **Auth krävs (utförare).**

---

## Review Endpoints

### POST `/reviews`
Lämna recension. **Auth krävs.**

**Body:**
```json
{
  "taskId": "uuid",
  "rating": 5,
  "comment": "Fantastiskt jobb! Rekommenderas varmt."
}
```

### GET `/reviews/user/:id`
Hämta recensioner för en användare.

---

## Payment Endpoints

### POST `/payments`
Skapa betalning. **Auth krävs.**

**Body:**
```json
{
  "taskId": "uuid",
  "method": "CARD",
  "amount": 500
}
```

### GET `/payments/me`
Hämta mina betalningar. **Auth krävs.**

### GET `/payments/:id/invoice`
Hämta faktura. **Auth krävs.**

---

## Chat Endpoints

### GET `/chats`
Hämta mina chattrum. **Auth krävs.**

### GET `/chats/:roomId/messages`
Hämta meddelanden i ett rum.

### WebSocket `/ws/chat`
Realtidschatt. Skicka och ta emot meddelanden.

**Events:**
- `message:send` – Skicka meddelande
- `message:receive` – Ta emot meddelande
- `typing:start` – Börjar skriva
- `typing:stop` – Slutar skriva

---

## Notification Endpoints

### GET `/notifications`
Hämta notifieringar. **Auth krävs.**

### PATCH `/notifications/:id/read`
Markera som läst.

### PATCH `/notifications/read-all`
Markera alla som lästa.

---

## Ad Endpoints

### GET `/ads`
Hämta aktiva annonser (filtrerbara per plats).

### POST `/ads`
Skapa annons. **Auth krävs (BUSINESS/ADMIN).**

---

## Admin Endpoints

### GET `/admin/dashboard`
Dashboard-statistik. **Auth krävs (ADMIN).**

**Response:**
```json
{
  "totalUsers": 1250,
  "activeTasksCount": 87,
  "totalRevenue": 125000,
  "platformFees": 12500,
  "pendingPayments": 15,
  "newUsersThisWeek": 34,
  "revenueChart": [...],
  "topCategories": [...]
}
```

### GET `/admin/users`
Lista alla användare med filtrering. **Auth krävs (ADMIN).**

### PATCH `/admin/users/:id`
Uppdatera användare (suspend, etc). **Auth krävs (ADMIN).**

### GET `/admin/tasks`
Lista alla uppdrag. **Auth krävs (ADMIN).**

### GET `/admin/payments`
Lista alla betalningar. **Auth krävs (ADMIN).**

### GET `/admin/ads`
Hantera annonser. **Auth krävs (ADMIN).**

### GET `/admin/prospects`
CRM – Lista företagsprospekt. **Auth krävs (ADMIN).**

### POST `/admin/prospects`
Skapa nytt prospekt. **Auth krävs (ADMIN).**

### PATCH `/admin/prospects/:id`
Uppdatera prospektstatus. **Auth krävs (ADMIN).**

### POST `/admin/email/send`
Skicka e-post till prospekt. **Auth krävs (ADMIN).**

---

## Felhantering

Alla felmeddelanden följer formatet:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### HTTP-statuskoder
| Kod | Beskrivning |
|-----|-------------|
| 200 | OK |
| 201 | Skapad |
| 400 | Felaktig förfrågan |
| 401 | Ej autentiserad |
| 403 | Ej behörig |
| 404 | Ej hittad |
| 429 | För många förfrågningar |
| 500 | Serverfel |

## Rate Limiting

| Endpoint | Gräns |
|----------|-------|
| `/auth/*` | 10 req/min |
| `/tasks` (GET) | 100 req/min |
| `/tasks` (POST) | 20 req/min |
| Övriga | 60 req/min |
