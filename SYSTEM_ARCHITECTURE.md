# Systemarkitektur – Marknadsplats

## Översikt

Marknadsplatsen är en distribuerad tjänsteplattform med en mikrotjänst-inspirerad monolitisk arkitektur (modular monolith). Systemet är uppdelat i separata, löst kopplade moduler som kan extraheras till mikrotjänster vid behov.

```mermaid
graph TB
    subgraph Klienter
        WEB["🌐 Webbapp (Next.js)"]
        IOS["📱 iOS-app (Flutter)"]
        AND["📱 Android-app (Flutter)"]
    end

    subgraph API Gateway
        GW["🔀 API Gateway / Load Balancer"]
    end

    subgraph Backend ["Backend (NestJS)"]
        AUTH["🔐 Auth Module"]
        USER["👤 User Module"]
        TASK["📋 Task Module"]
        PAY["💳 Payment Module"]
        CHAT["💬 Chat Module"]
        REV["⭐ Review Module"]
        GEO["🗺 Geo Module"]
        ADS["📢 Ads Module"]
        CRM["🏢 CRM Module"]
        AI["🤖 AI Module"]
        NOTIF["🔔 Notification Module"]
        ADMIN["⚙️ Admin Module"]
    end

    subgraph Data
        DB[("🐘 PostgreSQL")]
        CACHE[("⚡ Redis")]
        S3["📦 S3 Storage"]
    end

    subgraph External
        STRIPE["Stripe API"]
        SWISH["Swish API"]
        GOOGLE["Google OAuth"]
        SMS["SMS Gateway"]
        EMAIL["E-post (SES)"]
        MAPS["Google Maps API"]
    end

    WEB --> GW
    IOS --> GW
    AND --> GW
    GW --> AUTH
    GW --> USER
    GW --> TASK
    GW --> PAY
    GW --> CHAT
    GW --> REV
    GW --> GEO
    GW --> ADS
    GW --> CRM
    GW --> AI
    GW --> NOTIF
    GW --> ADMIN

    AUTH --> DB
    AUTH --> CACHE
    AUTH --> GOOGLE
    AUTH --> SMS
    USER --> DB
    USER --> S3
    TASK --> DB
    TASK --> GEO
    PAY --> DB
    PAY --> STRIPE
    PAY --> SWISH
    CHAT --> DB
    CHAT --> CACHE
    REV --> DB
    REV --> AI
    GEO --> DB
    GEO --> MAPS
    ADS --> DB
    CRM --> DB
    CRM --> EMAIL
    AI --> DB
    NOTIF --> CACHE
    NOTIF --> EMAIL
    NOTIF --> SMS
    ADMIN --> DB
```

## Moduler

### 🔐 Auth Module
Hanterar all autentisering och auktorisering.
- JWT-baserad sessionshantering
- Google OAuth2 integration
- SMS-verifiering via OTP
- Tvåfaktorsautentisering (2FA)
- Glömt lösenord-flöde
- Rollbaserad åtkomst (RBAC)

### 👤 User Module
Hanterar användarprofiler och kontohantering.
- Användartyper: Ungdom, Kund, Företag, Admin
- Profilhantering (bild, beskrivning, kompetenser)
- Verifieringsstatus
- Område/plats-inställningar

### 📋 Task Module
Kärnan i marknadsplatsen – uppdragshantering.
- Skapa, redigera, ta bort uppdrag
- Statusflöde: Publicerad → Accepterad → Pågående → Slutförd → Betald
- Kategori- och underkategorihantering
- AI-baserad matchning av utförare

### 💳 Payment Module
Betalningsprocessering och provisionshantering.
- Stripe-integration (kort, Apple Pay, Google Pay)
- Swish-integration
- Provisionsberäkning (konfigurerbar %)
- Fakturering med förfallodatum och påminnelser
- Utbetalningar till utförare
- Escrow-liknande flöde

### 💬 Chat Module
Realtidskommunikation mellan användare.
- WebSocket-baserad (Socket.io)
- Text, bilder, dokument
- Läskvitton
- Pushnotiser vid nya meddelanden

### ⭐ Review Module
Recensioner och betygssystem.
- 1–5 stjärnor + skriftlig recension
- Genomsnittsbetyg
- Pålitlighetsindex
- AI-baserad detektion av falska recensioner

### 🗺 Geo Module
Geografisk sökning och kartfunktionalitet.
- PostGIS-integration
- Radie-sökning (5, 10, 25, 50 km)
- Kommun- och regionsfiltrering
- Kartvy med uppdragsmarkörer

### 📢 Ads Module
Annonssystem för företag.
- Bannerannonser
- Sponsrade uppdrag
- Kampanjhantering
- Målgruppsstyrning (stad, kommun, region)
- Fakturering av annonser

### 🏢 CRM Module
Företagsprospektering och kundhantering.
- Företagsregister
- Kontaktpersoner
- Statushantering (pipeline)
- E-posthistorik
- Automatiserade e-postmallar

### 🤖 AI Module
Intelligenta funktioner.
- Matchning: utförare ↔ uppdrag
- Bedrägeridetektering i recensioner
- Prisförslag baserat på kategori, region, komplexitet
- Sökrelevansoptimering

### 🔔 Notification Module
Pushnotiser och meddelanden.
- Nya uppdrag nära dig
- Meddelanden i chatten
- Betalningsbekräftelser
- Recensioner
- Systempåminnelser

### ⚙️ Admin Module
Administrationspanel.
- Dashboard med KPI:er
- Användarhantering
- Uppdragsöversikt
- Intäkter och provisioner
- Annonshantering
- Tvistehantering

## Databasdesign (ER-diagram)

```mermaid
erDiagram
    USER {
        uuid id PK
        string email UK
        string phone UK
        string password_hash
        string name
        string avatar_url
        string description
        enum role "YOUTH, CUSTOMER, BUSINESS, ADMIN"
        enum status "ACTIVE, SUSPENDED, PENDING"
        boolean email_verified
        boolean phone_verified
        boolean two_factor_enabled
        point location
        string municipality
        string region
        timestamp created_at
        timestamp updated_at
    }

    SKILL {
        uuid id PK
        string name
        string category
    }

    USER_SKILL {
        uuid user_id FK
        uuid skill_id FK
    }

    TASK {
        uuid id PK
        uuid customer_id FK
        uuid assignee_id FK
        string title
        text description
        enum category
        decimal price
        decimal platform_fee
        enum status "OPEN, ASSIGNED, IN_PROGRESS, COMPLETED, PAID, CANCELLED"
        point location
        string address
        integer radius_km
        timestamp deadline
        timestamp created_at
        timestamp updated_at
    }

    TASK_APPLICATION {
        uuid id PK
        uuid task_id FK
        uuid user_id FK
        text message
        decimal proposed_price
        enum status "PENDING, ACCEPTED, REJECTED"
        timestamp created_at
    }

    REVIEW {
        uuid id PK
        uuid task_id FK
        uuid reviewer_id FK
        uuid reviewee_id FK
        integer rating "1-5"
        text comment
        boolean flagged_as_fake
        timestamp created_at
    }

    PAYMENT {
        uuid id PK
        uuid task_id FK
        uuid payer_id FK
        uuid payee_id FK
        decimal amount
        decimal platform_fee
        decimal net_amount
        enum method "CARD, SWISH, APPLE_PAY, GOOGLE_PAY, INVOICE, BANK_TRANSFER"
        enum status "PENDING, COMPLETED, FAILED, REFUNDED"
        string transaction_id
        timestamp created_at
    }

    INVOICE {
        uuid id PK
        uuid payment_id FK
        string invoice_number
        decimal amount
        timestamp due_date
        enum status "SENT, PAID, OVERDUE, CANCELLED"
        integer reminders_sent
        timestamp created_at
    }

    CHAT_ROOM {
        uuid id PK
        uuid task_id FK
        timestamp created_at
    }

    CHAT_PARTICIPANT {
        uuid chat_room_id FK
        uuid user_id FK
    }

    CHAT_MESSAGE {
        uuid id PK
        uuid chat_room_id FK
        uuid sender_id FK
        text content
        enum type "TEXT, IMAGE, DOCUMENT"
        string file_url
        boolean is_read
        timestamp created_at
    }

    ADVERTISEMENT {
        uuid id PK
        uuid business_id FK
        string title
        text content
        string image_url
        enum type "BANNER, SPONSORED_TASK, CAMPAIGN"
        string target_municipality
        string target_region
        decimal price
        timestamp start_date
        timestamp end_date
        enum status "ACTIVE, PAUSED, EXPIRED"
        timestamp created_at
    }

    COMPANY_PROSPECT {
        uuid id PK
        string company_name
        string contact_person
        string email
        string phone
        enum status "NOT_CONTACTED, CONTACTED, INTERESTED, NEGOTIATING, ACTIVE"
        text notes
        timestamp last_contacted
        timestamp created_at
    }

    NOTIFICATION {
        uuid id PK
        uuid user_id FK
        string title
        text message
        enum type "NEW_TASK, MESSAGE, PAYMENT, REVIEW, REMINDER"
        boolean is_read
        string action_url
        timestamp created_at
    }

    USER ||--o{ USER_SKILL : has
    SKILL ||--o{ USER_SKILL : belongs_to
    USER ||--o{ TASK : creates
    USER ||--o{ TASK : assigned_to
    TASK ||--o{ TASK_APPLICATION : has
    USER ||--o{ TASK_APPLICATION : submits
    TASK ||--|| REVIEW : has
    USER ||--o{ REVIEW : writes
    USER ||--o{ REVIEW : receives
    TASK ||--|| PAYMENT : has
    USER ||--o{ PAYMENT : pays
    USER ||--o{ PAYMENT : receives
    PAYMENT ||--o| INVOICE : has
    TASK ||--o| CHAT_ROOM : has
    CHAT_ROOM ||--o{ CHAT_PARTICIPANT : has
    USER ||--o{ CHAT_PARTICIPANT : joins
    CHAT_ROOM ||--o{ CHAT_MESSAGE : contains
    USER ||--o{ CHAT_MESSAGE : sends
    USER ||--o{ ADVERTISEMENT : creates
    USER ||--o{ NOTIFICATION : receives
```

## Säkerhetsarkitektur

### GDPR-compliance
- Användare kan exportera och radera sin data
- Samtycke krävs för databehandling
- Krypterad lagring av personuppgifter
- Data Processing Agreement (DPA) med tredjeparter

### Autentisering & Auktorisering
- JWT med kort livstid (15 min) + refresh tokens
- RBAC (Role-Based Access Control)
- API-nycklar för tredjepartsintegrationer

### Nätverkssäkerhet
- HTTPS/TLS överallt
- Rate limiting (per IP och per användare)
- CORS-konfiguration
- Input-validering och sanitering
- SQL-injection-skydd (Prisma ORM)

### Audit Logging
- Alla administrativa åtgärder loggas
- Betalningshistorik med full spårbarhet
- Inloggningsförsök loggas

## Deployment-arkitektur

```mermaid
graph TB
    subgraph AWS
        ALB["Application Load Balancer"]
        subgraph ECS ["ECS Cluster"]
            API1["API Instance 1"]
            API2["API Instance 2"]
        end
        RDS["RDS PostgreSQL"]
        REDIS["ElastiCache Redis"]
        S3B["S3 Bucket"]
        SES["SES Email"]
        CF["CloudFront CDN"]
    end

    CLIENT["Klienter"] --> CF
    CF --> ALB
    ALB --> API1
    ALB --> API2
    API1 --> RDS
    API2 --> RDS
    API1 --> REDIS
    API2 --> REDIS
    API1 --> S3B
    API2 --> S3B
    API1 --> SES
```
