<<<<<<< HEAD
# 🏪 Marknadsplats – Tjänsteplattform

En komplett marknadsplats där ungdomar, privatpersoner och företag kan köpa och sälja tjänster lokalt. Plattformen matchar rätt person till rätt uppdrag med hjälp av AI, geolokalisering och ett intuitivt gränssnitt.

## 🎯 Syfte

- **Ungdomar** kan erbjuda tjänster och tjäna pengar
- **Privatpersoner & pensionärer** kan hitta lokal hjälp enkelt
- **Företag** kan annonsera och nå lokala målgrupper
- **Administratörer** hanterar plattformen via en kraftfull adminpanel

## 🛠 Tjänsteexempel

| Kategori | Tjänster |
|----------|----------|
| Trädgård | Gräsklippning, trädgårdsarbete, snöskottning |
| Hem | Montering av möbler, installation av vitvaror, flytthjälp |
| Omsorg | Hundpassning, barnpassning |
| Digital | IT-hjälp, läxhjälp |
| Hantverk | Enklare hantverkstjänster |

## 🏗 Teknisk Stack

| Lager | Teknologi |
|-------|-----------|
| **Frontend (Webb)** | Next.js 14, React 18, TypeScript |
| **Frontend (Mobil)** | Flutter |
| **Backend** | Node.js, NestJS, TypeScript |
| **Databas** | PostgreSQL (Prisma ORM) |
| **Cache** | Redis |
| **Autentisering** | JWT, OAuth2 (Google), SMS-OTP |
| **Betalning** | Stripe, Swish API |
| **Lagring** | AWS S3 |
| **Moln** | AWS (ECS, RDS, ElastiCache) |
| **CI/CD** | GitHub Actions |
| **Containerisering** | Docker, Kubernetes |

## 📁 Projektstruktur

```
marknadsplats/
├── backend/              # NestJS API-server
│   ├── src/
│   │   ├── modules/      # Funktionsmoduler
│   │   ├── common/       # Delade resurser
│   │   └── config/       # Konfigurationsfiler
│   ├── prisma/           # Databasschema & migrationer
│   └── test/             # Tester
├── frontend/             # Next.js webbapplikation
│   ├── src/
│   │   ├── app/          # App Router-sidor
│   │   ├── components/   # UI-komponenter
│   │   ├── lib/          # Hjälpfunktioner
│   │   └── styles/       # CSS & designsystem
│   └── public/           # Statiska resurser
├── mobile/               # Flutter mobilapp
├── docker/               # Docker-konfiguration
├── docs/                 # Dokumentation
├── SYSTEM_ARCHITECTURE.md
├── API_DOCUMENTATION.md
├── CHANGELOG.md
└── TODO.md
```

## 🚀 Kom igång

### Förutsättningar
- Node.js 20+
- npm eller yarn
- PostgreSQL 15+
- Redis 7+
- Docker (valfritt)

### Installation

```bash
# Klona repot
git clone <repo-url>
cd marknadsplats

# Backend
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run start:dev

# Frontend (ny terminal)
cd frontend
npm install
npm run dev
```

### Docker

```bash
docker-compose up -d
```

## 📖 Dokumentation

- [Systemarkitektur](./SYSTEM_ARCHITECTURE.md)
- [API-dokumentation](./API_DOCUMENTATION.md)
- [Ändringslogg](./CHANGELOG.md)
- [Uppgiftslista](./TODO.md)

## 📄 Licens

Proprietär – Alla rättigheter förbehållna.
=======
# hjalpappen
hjälp
>>>>>>> 760598aefb47a210532eb1b6da2b029ee5091fda
