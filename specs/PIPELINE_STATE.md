# PIPELINE STATE
# File này được tạo/cập nhật tự động bởi vibe-pipeline agent sau mỗi bước.
# Mục đích: Resume context khi conversation bị gián đoạt.

## Meta

```yaml
pipeline_id: "harmony-ecosystem-2026-04-20"
flow_type: "CREATE"
stack: "Next.js 16 + TypeScript + PostgreSQL + Prisma + Claude/GPT-4"
started_at: "2026-04-20T00:00:00"
last_updated: "2026-04-21T13:15:00"
current_step: "4-execute (Phase 2: TASK-02-01 completed, TASK-02-02 ready)"
plan_mode: "phased"
phase_progress: "Phase 1: ✅ 100% | Phase 2: 2/5 done (TASK-02-00 ✅, TASK-02-01 ✅)"
```

---

## Goal

> Xây dựng Hệ sinh thái Harmony AI bao gồm: Harmony Landing Page, TuVi App (Traffic Engine) và MenhAn App (The Sanctuary) theo Master Plan 2026.

---

## Step History

### Step 0: Validate *(nếu đã làm)*

- **Status**: `done`
- **Decision**: `GO`
- **Score**: `4.4/5`
- **Key Findings**:
  - Market: Nhu cầu tâm linh tại VN cực lớn, tiềm năng phân khúc High-end.
  - Technical feasibility: Rất cao nhờ LLMs hiện đại.
  - Top risk: Độ chính xác của AI luận giải và niềm tin người dùng.
- **User Adjustments**: None.

---

### Step 1: Idea Refinement *(nếu đã làm)*

- **Status**: `done`
- **Output file**: `specs/IDEA.md`
- **Core Concept**: Sanctuary kỹ thuật số kết hợp tri thức cổ truyền và AI để đồng hành khai sáng vận mệnh.
- **Target Users**: Modern Seekers (22-35 tuổi), yêu công nghệ, tìm kiếm sự bình an và thấu hiểu bản thân.
- **Key Differentiator**: The Master AI (nhân cách Mentor) và Destiny Journal (đối soát thực tế).
- **User Adjustments**: None.

---

### Step 2: Technical Specifications *(nếu đã làm)*

- **Status**: `done`
- **Output file**: `specs/PRD.md`
- **Tech Stack Confirmed**: Next.js, TypeScript, PostgreSQL (Prisma), LLMs (GPT-4o/Claude 3.5), NextAuth/Custom SSO.
- **Key Architectural Decisions**:
  - Phân tách 3 subdomain với 1 hệ thống SSO chung (`id.vutera.net`).
  - Kết hợp Deterministic Layer (tính lá số) $\rightarrow$ Probabilistic Layer (AI luận giải).
  - Cơ chế "Destiny Journal" để tạo vòng lặp tin cậy (Trust Loop).
- **Breaking Changes** *(UPDATE flow)*: `no`
- **User Adjustments**: None.

---

### Step 3: Task Breakdown *(nếu đã làm)*

- **Status**: `done`
- **Output file**: `specs/IMPLEMENTATION_PLAN.md`
- **Total Tasks**: 4 (TASK-01-00 to TASK-01-03)
- **Completed Tasks**: 1/4
- **Current Task**: TASK-01-01: Core Database Schema Implementation
- **Blockers**: None

---

### Step 3.5: Test Plan *(optional — nếu đã làm)*

- **Status**: `pending`
- **Skipped reason**: *(nếu skip)* `not enough complexity | user declined`
- **Output file**: `specs/TEST_PLAN.md`
- **Total Scenarios**: [Số user scenarios]
- **Key Edge Cases**: [Top 2-3 edge cases quan trọng nhất]
- **User Adjustments**: [Thay đổi yêu cầu nếu có]

---

### Step 4: Execution *(nếu đang làm)*

- **Status**: `in_progress`
- **Snapshot Commit**: N/A
- **Completed Modules**:
  - [x] TASK-01-00: Project Scaffolding & Base Config (Monorepo, Turbo, Next.js apps, Shared Tailwind)
  - [x] TASK-01-01: Core Database Schema Implementation ✅ DONE (2026-04-21)
  - [x] TASK-01-02: SSO Service (id.vutera.net) ✅ DONE (2026-04-21)
  - [x] TASK-01-03: Shared Auth Middleware & Context ✅ DONE (2026-04-21)
- **Decisions Made During Execution**:
  - Used pnpm workspaces with TurboRepo.
  - Shared Tailwind theme via a dedicated package `@harmony/tailwind-config` using CSS variables in `@theme` block for Next.js 15 compatibility.
  - Database layer: Prisma ORM in `packages/database` package, shared across apps for unified data management.
  - Prisma schema: Comprehensive data model with proper relationships (cascade deletes), indexes, and enum types (Gender, Element, SubscriptionPlan, SubscriptionStatus).
  - Authentication: JWT-based (HS256) with 7-day expiration, HTTP-only cookies for .vutera.net domain, bcryptjs for password hashing (10 salt rounds).
  - SSO approach: Centralized id.vutera.net service handling auth logic, other apps consume JWT via /api/auth/me endpoint.
- **Issues Encountered**:
  - Fixed pnpm workspace dependency resolution for local packages.
- **TASK-01-01 Completion Summary** ✅:
  - [x] Enhanced Prisma schema with all entities (User, Profile, Chart, Prediction, JournalEntry, Subscription)
  - [x] Added missing fields (fullName, birthTimezone, energyScore, PDF quota tracking)
  - [x] Setup proper indexes and foreign key constraints (onDelete: Cascade)
  - [x] Created comprehensive seed.ts script for sample data
  - [x] Written 15+ CRUD integration tests covering all models and relationships
  - [x] Created README.md with setup, migration, and usage guide
  - [x] Created .env.example template
  - **Commit**: 3126d772 (TASK-01-01: Implement Core Database Schema)

- **TASK-01-02 Completion Summary** ✅:
  - [x] Implemented JWT-based SSO with 7-day token expiration
  - [x] API routes: /register, /login, /me, /profile, /logout
  - [x] Pages: login, register, profile management, landing page
  - [x] Password validation: 8+ chars with uppercase, lowercase, numbers
  - [x] Secure password hashing with bcryptjs (10 salt rounds)
  - [x] HTTP-only cookies scoped to .vutera.net domain
  - [x] Profile management: birth data (date, time, timezone, location)
  - [x] Input validation with Zod schemas (RegisterSchema, LoginSchema, ProfileSchema)
  - [x] User + subscription data returned from /api/auth/me
  - **Commit**: a1e0d454 (TASK-01-02: Implement SSO Service)

- **TASK-02-00 Completion Summary** ✅:
  - [x] Created Header, Hero, QuickToolsGrid, Footer components
  - [x] Implemented mobile-first responsive design (1 → 2 → 4 grid columns)
  - [x] Modern UI with gradient colors (Blue, Cyan, Emerald, Purple, Amber)
  - [x] Vietnamese SEO metadata (title, description, keywords, OpenGraph)
  - [x] Auto-generated sitemap.xml endpoint
  - [x] Created robots.txt for search crawlers
  - [x] Home page wrapped with AuthProvider
  - [x] Smooth hover effects + transitions
  - [x] Performance optimized (emoji icons, minimal CSS)
  - **Commit**: 6ccd9046 (TASK-02-00: TuVi App Scaffolding & Light UI)

- **TASK-02-01 Completion Summary** ✅:
  - [x] Integrated chinese-lunar-calendar library (v1.0.1) with getLunar API
  - [x] Implemented toLunarDate() - Solar to lunar date conversion
  - [x] Implemented calculateDayLuck() - Luck level calculation (Tốt/Trung bình/Xấu) per zodiac
  - [x] Implemented findLuckyDaysInMonth() - Filter lucky days in a month
  - [x] Implemented getZodiacIndex() - Birth year to zodiac mapping (12-year cycle)
  - [x] Implemented formatZodiac() - Zodiac animal name formatting
  - [x] Implemented getMonthCalendarView() - Monthly calendar grid with lunar dates and luck status
  - [x] Implemented getBasicChart() - Basic Tử Vi chart generation with 12 houses
  - [x] Implemented getYearlyHoroscope() - Yearly horoscope summary per zodiac animal
  - [x] Created LuckyDaysCalculator component - Interactive lucky day finder UI
  - [x] Created HourlyAuspicious component - Auspicious/inauspicious hours display
  - [x] Built /tools/lucky-days page - Find lucky days in a month
  - [x] Built /tools/calendar page - Monthly lunar calendar viewer with color-coded luck
  - [x] Built /tools/basic-chart page - Basic Tử Vi chart viewer
  - [x] Built /tools/horoscope page - Yearly horoscope with lucky colors and numbers
  - [x] Created TypeScript type declarations for chinese-lunar-calendar module
  - [x] Wrote 12 unit tests for calendar utilities (toLunarDate, calculateDayLuck, findLuckyDaysInMonth, etc.)
  - [x] Responsive design (mobile-first, 1→2→4 column grids)
  - [x] Vietnamese localization (UI, labels, descriptions)
  - [x] SEO optimization (metadata, structured data, sitemap integration)
  - [x] All 4 apps build successfully with no errors
  - **Commit**: defac681 (TASK-02-01: Implement Quick Tools - Full Suite)

- **TASK-01-03 Completion Summary** ✅:
  - [x] Created @harmony/auth shared package
  - [x] Middleware factory (createAuthMiddleware) for per-app route protection
  - [x] React Context + AuthProvider for global state management
  - [x] Client hooks: useAuth(), useProtectedRoute(), logout(), login(), register()
  - [x] ProtectedRoute component wrapper for protected content
  - [x] API proxy endpoints (/api/auth/me) in all apps
  - [x] Middleware configured for TuVi (public), Harmony (mixed), MenhAn (protected)
  - [x] Comprehensive documentation + middleware template
  - [x] Automatic redirect to id.vutera.net/auth/login for unauthorized users
  - [x] Token verification via .vutera.net domain-scoped cookies
  - **Commit**: e337ff1e (TASK-01-03: Implement Shared Auth Middleware & Context)


---

## Key Decisions Log

> Ghi lại các quyết định quan trọng (architecture, scope, trade-offs) để không phải giải thích lại.

| Quyết định | Lý do | Bước thực hiện |
|-----------|-------|----------------|
| | | |

---

## Resume Instructions

> Nếu conversation mới, đọc phần này để tiếp tục đúng chỗ.

**Trạng thái hiện tại**: `current_step` = `0-validate`

**Để tiếp tục**:
1. Đọc output file của bước cuối cùng đã hoàn thành (xem Step History ở trên)
2. Tóm tắt lại cho người dùng: "Chúng ta đang ở Bước X, đã hoàn thành [Y]. Tiếp tục từ [Z]?"
3. Chờ xác nhận trước khi proceed

**Context cần nhớ**:
- Xây dựng 3 sản phẩm: Harmony Landing, TuVi App, MenhAn App.
- Theo sát Master Plan trong specs/draft.md.
