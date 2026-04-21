# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Harmony AI** is a premium digital sanctuary ecosystem combining traditional Vietnamese metaphysics (Tử Vi, Bát Tự, Phong Thủy) with modern AI. The system functions as an **AI Mentor** ("The Master AI") guiding users toward self-understanding and well-being.

### Target Users
- **Modern Seekers** (22-35, urban, tech-savvy): Seeking spiritual balance and life guidance
- **Decision Makers** (entrepreneurs, freelancers): Finding optimal timing for strategic decisions

### Core Value Proposition
- **Free tier** (TuVi App): Quick astrological tools for lead capture and SEO
- **Premium tier** (MenhAn Sanctuary): Master AI deep analysis, Destiny Journal tracking, PDF reports with subscription

---

## System Architecture

### Ecosystem Structure (4 main services)

```
Harmony AI Ecosystem
├── id.vutera.net (Identity System)
│   ├── OAuth2/OIDC-based SSO
│   └── Shared user profile management
│
├── harmony.vutera.net (Brand Hub)
│   ├── Marketing landing page
│   └── Traffic router to other services
│
├── tuvi.vutera.net (TuVi App - Public)
│   ├── Quick tools: Lunar calendar, lucky/unlucky days
│   ├── Basic birth chart generator (year-only)
│   ├── SEO content engine for organic traffic
│   └── Lead capture system
│
└── menhan.vutera.net (MenhAn Sanctuary - Premium)
    ├── Master AI engine (RAG + LLM-based analysis)
    ├── Advanced chart analysis (Bát Tự, Tử Vi Đẩu Số)
    ├── Destiny Journal (event tracking & AI verification)
    ├── PDF art report generator
    └── Subscription & payment gateway
```

### Key Data Flows

1. **Master AI Analysis (Core Engine)**
   - Input: Birth data (date, time, gender, location) + user query
   - Determinism Layer: Calculate chart (Vietnamese astrology algorithms)
   - RAG Layer: Retrieve expert knowledge about star/palace combinations
   - Prompting Layer: Feed data to LLM with "Master AI" system prompt
   - Output: Markdown analysis + energy scores + suggested actions + journal hooks

2. **Destiny Journal Verification**
   - User logs real-world events
   - System matches against AI predictions
   - AI analyzes alignment → increases trust score

### Data Model

**Core Entities**:
- `User`: Identity from SSO
- `Profile`: Birth data, gender, location, energy type (5-elements)
- `Chart`: Generated birth chart (TzVi/BatTu), raw calculation data
- `Prediction`: AI-generated prediction tied to specific date/category
- `JournalEntry`: User event + verification status against predictions
- `Subscription`: Plan type (Free/AnNhien/BinhAn), billing status

All databases separated by service to avoid single point of failure.

---

## Technology Stack

- **Frontend**: Next.js (App Router), TypeScript, React
- **Backend**: Next.js API routes / Node.js
- **Database**: PostgreSQL (Prisma ORM)
- **LLM Integration**: Claude 3.5 or GPT-4o (configurable)
- **Auth**: NextAuth or custom OAuth2/OIDC provider (id.vutera.net)
- **Caching**: Redis for common lookups (lucky days calendar)
- **PDF Generation**: HTML-to-PDF rendering library
- **Astrology Calculations**: External library or API (not building from scratch)

**Performance Targets**:
- Landing/TuVi App: LCP < 1.2s (SEO-focused)
- Master AI Response: Streaming response, TTFB < 2s

---

## Implementation Phases (5 phases, 8-12 weeks)

### Phase 01: Foundation & Identity (2 weeks)
- Set up monorepo structure (if needed) or separate repos per service
- Implement `id.vutera.net` SSO (OAuth2/OIDC + JWT)
- Database schema + Prisma migrations
- Shared auth middleware

### Phase 02: TuVi App - Traffic Engine (2 weeks)
- Landing page & routing logic
- Quick tools (calendar, lucky/unlucky day calculator)
- Basic birth chart generator (year only)
- Lead capture & analytics
- SEO content system (structured data for search)

### Phase 03: MenhAn Sanctuary - MVP (2 weeks)
- Master AI analysis endpoint (determinism + RAG + LLM prompting)
- User profile completion flow (add precise birth time)
- Basic Destiny Journal (log events)
- Subscription gating (paywall logic)

### Phase 04: MenhAn - Advanced & Monetization (3 weeks)
- Advanced chart analysis (Bát Tự, multi-palace analysis)
- PDF art report generation
- Subscription management (recurring billing)
- Extended Master AI features (multi-turn chat, monthly tracking)

### Phase 05: Harmony Landing & Polish (1 week)
- Cohesive brand landing page
- Cross-service SSO integration testing
- Performance optimization (LCP, Core Web Vitals)
- Security review & hardening

---

## Critical Implementation Notes

### 1. The Master AI Engine (Differentiator)
The quality of AI responses depends on:
- **Accurate chart calculations** (deterministic layer) → use vetted library
- **Rich knowledge base** (RAG) → curate expert knowledge about star combinations, palace meanings
- **System prompt crafting** → "The Master AI" personality: wise, warm, never threatening

Hallucination mitigation: Always preface responses with calculation details before interpretation.

### 2. Paywall Logic
- Free tier: Basic chart, up to 3 palace details
- Premium tier: Unlimited chat with Master AI (max 5 questions/day free, then requires subscription)
- PDF generation: 1/quarter for subscribers, or pay-per-view ($X per report)

### 3. SSO Across Subdomains
- Use `.vutera.net` parent domain for auth cookies
- Standardize JWT claims across all services
- Profile data fetched from `id.vutera.net` via `/api/auth/me`

### 4. Birth Time Precision & Timezone Handling
- TuVi App allows year-only input (fuzzy) → suggests 2-3 scenarios in MenhAn
- When user provides exact time: validate timezone, convert to standard UTC for calculations
- Store both original timezone + UTC in Profile for consistency

### 5. Destiny Journal Edge Case
When predictions conflict (Tử Vi vs Bát Tự):
- Master AI plays arbitrator
- Explains nuance in both methods
- Provides integrated conclusion
- User chooses which school resonates → affects future analysis weight

---

## Key Files & Documentation

- **`specs/PRD.md`**: Full product requirements, use cases, scope
- **`specs/IMPLEMENTATION_PLAN.md`**: Phase timeline & risk register
- **`specs/phases/`**: Detailed task breakdown per phase
- **`specs/test-phases/`**: Test strategies for each phase
- **`specs/VALIDATION.md`**: Quality assurance criteria
- **`specs/PIPELINE_STATE.md`**: Current execution state & blockers (if any)

---

## Development Workflow

### Before Implementing
1. Read the phase spec (`specs/phases/phase-XX.md`)
2. Check test plan (`specs/test-phases/test-phase-XX.md`)
3. Ensure phase dependencies are met (e.g., Phase 02 needs Phase 01 complete)

### Code Organization Suggestions
- Separate repositories per service (id, harmony, tuvi, menhan) OR monorepo with apps/ folder
- Shared libraries: auth middleware, types, UI components (if applicable)
- API versioning: `/api/v1/` to allow future breaking changes
- Clear separation: deterministic layer (calculations) vs LLM layer (analysis)

### Testing Strategy
- Unit tests for chart calculation & business logic
- Integration tests for Master AI flow (use mock LLM if needed)
- E2E tests for user journeys (TuVi → MenhAn → Journal)
- Performance tests for LCP, API response times

---

## Constraints & Business Rules

- **Data Privacy**: Birth time never exposed publicly; input only for AI analysis
- **Rate Limiting**: Master AI endpoint rate-limited to prevent LLM token abuse
- **Encryption**: AES-256 for sensitive profile fields
- **No Crypto**: Only traditional fiat payment gateways
- **No Custom Astrology Engine**: Use existing library or API for chart calculations

---

## Questions for Future Implementation

- [ ] Which astrology calculation library will be integrated? (External dependency?)
- [ ] Will this be monorepo or multi-repo? (Affects CI/CD setup)
- [ ] PDF generation tool choice? (headless-chrome, puppeteer, etc.)
- [ ] LLM provider preference: Claude or GPT-4? (Cost/latency tradeoff)
- [ ] Exact subscription pricing tiers?

---

**Last Updated**: 2026-04-21  
**Status**: Specs complete, ready for Phase 01 implementation
