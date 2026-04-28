# @harmony/database

Shared database layer cho Harmony AI ecosystem. Sử dụng Prisma ORM và PostgreSQL.

## Architecture

```
┌─────────────────────────────────────────┐
│   All Apps (id, harmony, tuvi, menhan)   │
└────────────────┬────────────────────────┘
                 │ imports
                 ▼
┌─────────────────────────────────────────┐
│    @harmony/database (Prisma)            │
├─────────────────────────────────────────┤
│  - prisma/schema.prisma (Data models)   │
│  - prisma/migrations/* (DB migrations)   │
│  - node_modules/@prisma/client          │
└─────────────────────────────────────────┘
                 │
                 ▼
    PostgreSQL (single shared DB)
```

## Data Model Overview

### Core Entities

**User**: Identity management from SSO
- `id`, `email` (unique), `passwordHash`, `name`
- Relations: 1 Profile, N Subscriptions, N JournalEntries

**Profile**: User birth data for astrological analysis
- `userId` (unique FK), `fullName`, `gender`, `birthDate`, `birthTime`, `birthTimezone`, `birthLocation`
- `energyType`: Wu Xing element classification (WOOD, FIRE, EARTH, METAL, WATER)
- Relations: 1 User, N Charts

**Chart**: Generated astrological birth chart
- `profileId` (FK), `type` (TzVi/BatTu), `rawData` (JSON), `analysis` (JSON), `energyScore` (JSON)
- Relations: 1 Profile, N Predictions

**Prediction**: AI-generated prediction from chart
- `chartId` (FK), `category` (Career/Love/Health/etc), `content`, `targetDate`, `isVerified`
- Relations: 1 Chart, N JournalEntries

**JournalEntry**: User event log for Destiny Journal
- `userId` (FK), `eventDate`, `content`, `predictionId` (optional FK)
- `status` (unverified/verified/mismatch), `verification`, `trustScore`
- Relations: 1 User, optional 1 Prediction

**Subscription**: Billing & plan management
- `userId` (unique FK), `plan` (FREE/AN_NHIEN/BINH_AN), `status` (ACTIVE/EXPIRED/CANCELED)
- `startDate`, `endDate`, `pdfGenerationQuota`, `pdfUsed`
- Relations: 1 User

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ (local or remote)
- pnpm

### Environment Configuration

Create `.env` file in this directory:

```bash
# .env (DO NOT COMMIT to git)
DATABASE_URL="postgresql://user:password@localhost:5432/harmony?schema=public"
```

Or use Prisma Postgres dev server:

```bash
# Run Prisma dev server (creates local DB)
npx prisma dev
# Copy the DATABASE_URL from the output to .env
```

### Installation

From root directory:

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm --filter @harmony/database exec prisma generate
```

## Migrations

### Create a new migration

```bash
cd packages/database

# Make changes to prisma/schema.prisma, then:
npx prisma migrate dev --name "describe_your_change"
```

This will:
1. Create migration file in `prisma/migrations/`
2. Apply migration to local DB
3. Regenerate Prisma client

### Existing migrations

All migration files are in `prisma/migrations/`. To apply existing migrations:

```bash
cd packages/database
npx prisma migrate deploy
```

### Reset database (DEV ONLY)

```bash
cd packages/database
npx prisma migrate reset
# This will:
# 1. Drop schema
# 2. Re-run all migrations
# 3. Run seed script (if exists)
```

## Seeding

To populate database with sample data:

```bash
cd packages/database
npx prisma db seed
```

Or directly run seed script:

```bash
cd packages/database
npx ts-node prisma/seed.ts
```

## Testing

### Integration Tests

Test CRUD operations against real database:

```bash
cd packages/database
pnpm test
# or with Jest
npx jest __tests__/crud.integration.test.ts
```

Tests cover:
- User CRUD (create, read, update, delete)
- Profile management
- Chart & prediction creation
- Subscription tracking
- JournalEntry verification
- Cascading deletes

## Usage in Apps

### Import Prisma Client

```typescript
// In any app (id, harmony, tuvi, menhan)
import { PrismaClient } from "@harmony/database";

const prisma = new PrismaClient();

// Use it
const user = await prisma.user.findUnique({
  where: { email: "user@example.com" },
  include: { profile: true, subscriptions: true },
});
```

### Best Practices

1. **Use connection pooling** in production (add `?schema=prisma` to DATABASE_URL)
2. **Handle errors** with proper try-catch
3. **Disconnect** Prisma when done: `await prisma.$disconnect()`
4. **Use transactions** for multi-step operations:
   ```typescript
   await prisma.$transaction(async (tx) => {
     await tx.user.update(...);
     await tx.profile.update(...);
   });
   ```
5. **Validate** input data before DB operations

## Troubleshooting

### "Can't reach database server"

1. Ensure PostgreSQL is running
2. Check DATABASE_URL is correct
3. Try using Prisma dev server: `npx prisma dev`

### "Column does not exist"

1. Check schema.prisma matches actual DB
2. Run migrations: `npx prisma migrate deploy`
3. Reset if needed: `npx prisma migrate reset`

### Type errors with Prisma Client

1. Regenerate Prisma client: `npx prisma generate`
2. Clear node_modules and reinstall: `pnpm install`

## Documentation

- [Prisma Docs](https://www.prisma.io/docs/)
- [Prisma Schema](https://www.prisma.io/docs/orm/reference/prisma-schema-reference)
- [Prisma CLI](https://www.prisma.io/docs/orm/reference/prisma-cli-reference)

## Maintenance

- Review schema regularly for optimization opportunities
- Add indexes for frequently queried fields
- Monitor query performance with Prisma Studio: `npx prisma studio`
- Keep Prisma updated: `pnpm update @prisma/client prisma`
