# Setup, Run and Deployment Guide - Harmony AI

## 1. Local Setup

### Prerequisites
- Node.js (Latest LTS)
- pnpm (v10+)
- PostgreSQL

### Installation
```bash
pnpm install
```

### Environment Configuration
Each app directory already has a `.env.local` file with placeholder values. Update them with your actual configuration:

**`apps/id/.env.local`** (Identity/SSO Service):
```
JWT_SECRET=your-secure-jwt-secret-min-32-chars
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**`apps/tuvi/.env.local`** (TuVi App):
```
NEXT_PUBLIC_SSO_URL=http://localhost:3000
NODE_ENV=development
```

**`apps/harmony/.env.local`** (Harmony Hub):
```
NEXT_PUBLIC_SSO_URL=http://localhost:3000
NODE_ENV=development
```

**`apps/menhan/.env.local`** (MenhAn Sanctuary):
```
NEXT_PUBLIC_SSO_URL=http://localhost:3000
NODE_ENV=development
ANTHROPIC_API_KEY=sk-ant-your-actual-anthropic-key
DATABASE_URL=postgresql://user:password@localhost:5432/harmony
```

**Key Configuration**:
- `NEXT_PUBLIC_SSO_URL`: URL of the Identity service (id.vutera.net in production)
- `JWT_SECRET`: Secure random string, min 32 characters (id service only)
- `ANTHROPIC_API_KEY`: Get from [console.anthropic.com](https://console.anthropic.com) (menhan only)
- `DATABASE_URL`: PostgreSQL connection string (menhan only)

### Database Setup
Initialize the database using Prisma:
```bash
pnpm --filter @harmony/database prisma migrate dev
```

## 2. Running Locally

Start all applications in development mode:
```bash
pnpm dev
```

**Default Ports:**
- Identity: `http://localhost:3000`
- MenhAn: `http://localhost:3001`
- Harmony: `http://localhost:3002`
- TuVi: `http://localhost:3003`

## 3. Deployment to Vercel

Since this is a monorepo, you must create 4 separate projects on Vercel (one for each app).

### Vercel Project Configuration
For each project (`id`, `harmony`, `tuvi`, `menhan`):

1. **Root Directory**: `apps/[app-name]`
2. **Build Command**: `cd ../.. && pnpm build --filter=[app-name]`
3. **Install Command**: `pnpm install`
4. **Framework Preset**: `Next.js`

### Environment Variables
Configure the following in Vercel Dashboard for each project:

**All apps**:
- `NODE_ENV=production`

**id project** (Identity Service):
- `JWT_SECRET`: Secure random 32+ character string (same as local development)
- `NEXT_PUBLIC_API_URL=https://id.vutera.net`

**tuvi & harmony projects**:
- `NEXT_PUBLIC_SSO_URL=https://id.vutera.net`

**menhan project** (MenhAn Sanctuary):
- `NEXT_PUBLIC_SSO_URL=https://id.vutera.net`
- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `DATABASE_URL`: PostgreSQL connection string (shared across services)

**Cross-service requirement**:
- Ensure `JWT_SECRET` in id project matches what you use locally (same secret across all services)

### Domain Mapping
Map your production domains to the corresponding Vercel projects:
- `id.vutera.net` $\rightarrow$ `id` project
- `harmony.vutera.net` $\rightarrow$ `harmony` project
- `tuvi.vutera.net` $\rightarrow$ `tuvi` project
- `menhan.vutera.net` $\rightarrow$ `menhan` project
