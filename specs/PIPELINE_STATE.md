# PIPELINE STATE
# File này được tạo/cập nhật tự động bởi vibe-pipeline agent sau mỗi bước.
# Mục đích: Resume context khi conversation bị gián đoạt.

## Meta

```yaml
pipeline_id: "harmony-ecosystem-2026-04-20"
flow_type: "CREATE"
stack: "TBD"
started_at: "2026-04-20T00:00:00"
last_updated: "2026-04-20T00:40:00"
current_step: "4-execute"
plan_mode: "phased"
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

- **Status**: `pending`
- **Output file**: `specs/IMPLEMENTATION_PLAN.md` hoặc `specs/REFACTOR.md`
- **Total Tasks**: [Số lượng tasks]
- **Completed Tasks**: [Số tasks đã xong / tổng]
- **Current Task**: [TASK-XX: Tên task đang làm dở, nếu có]
- **Blockers**: [Có vấn đề gì chưa giải quyết không?]

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
  - [ ] TASK-01-01: Core Database Schema Implementation
  - [ ] TASK-01-02: SSO Service (id.vutera.net)
  - [ ] TASK-01-03: Shared Auth Middleware & Context
- **Decisions Made During Execution**:
  - Used pnpm workspaces with TurboRepo.
  - Shared Tailwind theme via a dedicated package `@harmony/tailwind-config` using CSS variables in `@theme` block for Next.js 15 compatibility.
- **Issues Encountered**:
  - Fixed pnpm workspace dependency resolution for local packages.


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
