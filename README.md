# 🌌 Harmony AI Ecosystem

Harmony AI is a premium digital sanctuary combining traditional Vietnamese metaphysics (Tử Vi, Bát Tự, Phong Thủy) with modern AI to provide spiritual balance and life guidance.

## 🏗 Ecosystem Structure

The system consists of 4 main services running on subdomains of `vutera.net`:

- **`harmony.vutera.net` (Brand Hub)**: The main landing page and entry point for all users.
- **`id.vutera.net` (Identity System)**: Centralized OAuth2/OIDC SSO for seamless movement between services.
- **`tuvi.vutera.net` (TuVi App)**: Public-facing traffic engine providing free astrology tools and lead capture.
- **`menhan.vutera.net` (MenhAn Sanctuary)**: Premium AI-driven sanctuary with Master AI, Destiny Journal, and advanced reports.

## 🚀 Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS 4.0
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: Claude 3.5 / GPT-4o via `@harmony/ai-provider`
- **Auth**: Custom SSO (JWT-based)
- **Monorepo Management**: Turbo Repo

## 🛠 Development Guide

### Prerequisites
- Node.js 20+
- pnpm (recommended)
- PostgreSQL instance

### Getting Started
1. **Clone & Install**:
   ```bash
   pnpm install
   ```
2. **Environment Setup**:
   Create a `.env` file in each app directory (or a shared root env) with:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `ANTHROPIC_API_KEY` / `OPENAI_API_KEY`
   - `NEXT_PUBLIC_SSO_URL`

3. **Run Development Mode**:
   ```bash
   pnpm run dev
   ```
4. **Build for Production**:
   ```bash
   pnpm run build
   ```

## 📖 Project Roadmap
The project was developed in 5 phases:
- **Phase 1**: Foundation & Identity (SSO, DB Schema) ✅
- **Phase 2**: TuVi App (Traffic Engine) ✅
- **Phase 3**: MenhAn MVP (Master AI, Basic Journal) ✅
- **Phase 4**: MenhAn Advanced (PDF Reports, Subscriptions) ✅
- **Phase 5**: Harmony Landing & Polish (Brand Hub, E2E Optimization) ✅

## 📁 Repository Structure
- `apps/`: The four main Next.js applications.
- `packages/`: Shared libraries (Auth, Database, AI Provider, UI).
- `specs/`: Product requirements and implementation plans.
- `docs/`: Technical documentation and API references.
