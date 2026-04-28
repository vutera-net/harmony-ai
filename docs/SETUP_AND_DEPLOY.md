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
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**`apps/tuvi/.env.local`** (TuVi App):
```
NEXT_PUBLIC_SSO_URL=http://localhost:4000
NODE_ENV=development
```

**`apps/harmony/.env.local`** (Harmony Hub):
```
NEXT_PUBLIC_SSO_URL=http://localhost:4000
NODE_ENV=development
```

**`apps/menhan/.env.local`** (MenhAn Sanctuary):
```
NEXT_PUBLIC_SSO_URL=http://localhost:4000
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
Initialize the database using the database package scripts:
```bash
# Generate Prisma Client and apply migrations
pnpm --filter @harmony/database db:generate db:migrate
```
To view the database in a GUI:
```bash
pnpm --filter @harmony/database db:studio
```

## 2. Running Locally

Start all applications in development mode:
```bash
pnpm dev
```

### Configuring Fixed Ports
To avoid random ports during development and ensure SSO configuration works, update the `dev` scripts in each app's `package.json` (e.g., `"dev": "next dev -p 3000"`).

**Recommended Ports:**
- Identity: `http://localhost:4000`
- MenhAn: `http://localhost:4001`
- Harmony: `http://localhost:4002`
- TuVi: `http://localhost:4003`

Then start all applications:
```bash
pnpm dev
```

## 3. Local Production Build

To verify the production build locally before deploying:

```bash
# Build all apps
pnpm build

# To build a specific app
pnpm build --filter [app-name]
```
Note: After building, you can test the production version of an app by navigating to its directory and running `pnpm start`.

## 4. Deployment to Vercel

Since this is a monorepo, you must create 4 separate projects on Vercel (one for each app).

### Vercel Project Configuration
For each project (`id`, `harmony`, `tuvi`, `menhan`):

1. **Root Directory**: `apps/[app-name]`
2. **Build Command**: `cd ../.. && pnpm build --filter=[app-name]`
3. **Install Command**: `pnpm install`
4. **Framework Preset**: `Next.js`

**Crucial Database Step for `menhan` project:**
The `menhan` app depends on the database package. Ensure the Prisma Client is generated during the build:
- Add `pnpm --filter @harmony/database db:generate` to your build pipeline or 
- Update the build command to: `cd ../.. && pnpm --filter @harmony/database db:generate && pnpm --filter @harmony/database build --filter=[app-name]`

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

**Note on Domains:** Domains are managed via environment variables (`NEXT_PUBLIC_SSO_URL`). To use different domains for staging (STG) or other environments, simply update these variables in the Vercel Dashboard.

## 5. Troubleshooting

### Turbopack / Build Panics
If you encounter an "Unexpected Turbopack error" or "panic" during development or build:
1. Stop the development server.
2. Clear the Next.js cache for the affected app(s):
   ```bash
   rm -rf apps/[app-name]/.next
   ```
   Or clear all caches:
   ```bash
   rm -rf apps/**/.next
   ```
3. Restart the server: `pnpm dev`.
