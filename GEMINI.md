# Harmony AI Project Instructions

This file provides foundational guidance for the Gemini CLI when working in this repository. It synthesizes the project's vision, architecture, and engineering standards.

## Project Vision & Ecosystem
**Harmony AI** is a premium digital sanctuary combining traditional Vietnamese metaphysics (Tử Vi, Bát Tự, Phong Thủy) with modern AI. It functions as an **AI Mentor** ("The Master AI") guiding users toward self-understanding and well-being.

### Ecosystem Structure
- **id.vutera.net (Identity System)**: OAuth2/OIDC-based SSO and shared user profile management.
- **harmony.vutera.net (Brand Hub)**: Marketing landing page and traffic router.
- **tuvi.vutera.net (TuVi App)**: Public SEO-focused app with quick tools (Lunar calendar, basic birth charts).
- **menhan.vutera.net (MenhAn Sanctuary)**: Premium service featuring the Master AI engine, Destiny Journal, and PDF reports.

## System Architecture & Core Logic

### 1. The Master AI Engine (Core Differentiator)
- **Deterministic Layer**: Precise astrological calculations (Tử Vi/Bát Tự) using vetted libraries.
- **RAG Layer**: Retrieval of expert knowledge regarding star and palace combinations.
- **LLM Layer**: Interpretation via Claude 3.5 or GPT-4o with a "Master AI" persona: wise, warm, and never threatening.
- **Output**: Markdown analysis + energy scores + suggested actions + journal hooks.

### 2. Destiny Journal Verification
- Users log real-world events which the AI matches against previous predictions.
- AI analyzes alignment to increase the user's trust score in the system.

### 3. SSO & Profile Management
- Use `.vutera.net` parent domain for auth cookies.
- Standardized JWT claims across all services.
- Birth data: Store original timezone + UTC. Validate precision; offer scenarios if time is unknown.

## Tech Stack
- **Monorepo**: Turbo with pnpm workspaces.
- **Frontend**: Next.js (App Router), TypeScript, React.
- **Styling**: Vanilla CSS is preferred for maximum flexibility.
- **Backend**: Next.js API routes / Node.js.
- **Database**: PostgreSQL with Prisma ORM (centralized in `packages/database`).
- **Shared Packages**: `auth` (NextAuth/Custom), `ui` (Shared components), `ai-provider`, `astrology`.

## Engineering Standards & Constraints
- **Performance**: 
  - Landing/TuVi App: LCP < 1.2s.
  - Master AI: Streaming responses, TTFB < 2s.
- **Security**: AES-256 for sensitive profile fields; no exposure of birth time.
- **Business Rules**: 
  - Paywall: 5 free AI questions/day, limited palace details for free tier.
  - PDF Reports: 1 per quarter for subscribers or pay-per-view.
- **Workflow**: 
  - Before implementation, consult `specs/phases/` and `specs/test-phases/`.
  - Always verify astrological logic against the deterministic layer before AI interpretation.

## Key Documentation
- `specs/PRD.md`: Full product requirements.
- `specs/IMPLEMENTATION_PLAN.md`: Timeline and risk register.
- `specs/VALIDATION.md`: Quality assurance criteria.
