# Kế Hoạch Consolidation: Port code sang apps/tuvi & apps/menhan

## Tổng quan

Có 4 codebase hiện tại:
- `tuvi/` — Prototype trưởng thành nhất: 6 modules, full engine layer, auth, Stripe, SEO
- `anmenh/` — Prototype đầy đủ: Bát Tự, Bát Trạch, Cân Xương, Tương Hợp (no-auth, localStorage)
- `apps/tuvi/` — Scaffold monorepo: ~2 modules, thiếu engine/data layer
- `apps/menhan/` — Scaffold monorepo: Master AI core, billing, stub astrology

**Mục tiêu:** `apps/tuvi/` và `apps/menhan/` là đích đến cuối cùng trong monorepo.

---

## Ranh giới tính năng

| Tính năng | apps/tuvi (Free/SEO) | apps/menhan (Premium) |
|---|:---:|:---:|
| Lịch Vạn Niên + chuyển đổi âm dương | ✅ | |
| Ngày tốt/xấu cơ bản | ✅ | |
| Xem mệnh Ngũ Hành (năm sinh) | ✅ | |
| Tử Vi hàng ngày (12 con giáp) | ✅ | |
| Lá số cơ bản (year-only, dừng ở hook → MenhAn) | ✅ | |
| Blog SEO | ✅ | |
| Bát Tự Tứ Trụ đầy đủ (giờ sinh) | | ✅ |
| Tử Vi Đẩu Số đầy đủ (14 chính tinh) | | ✅ |
| Bát Trạch Phong Thủy + La bàn tương tác | | ✅ |
| Cửu Cung Phi Tinh | | ✅ |
| Cân Xương Đoán Số | | ✅ |
| Tương Hợp đôi lứa | | ✅ |
| Master AI chat (streaming) | | ✅ |
| Destiny Journal | | ✅ |
| PDF report | | ✅ |
| Subscription & billing | | ✅ |

---

## PHASE 0 — Xây dựng `packages/astrology` (shared engine)

> Package đã được scaffold tại `packages/astrology/src/` nhưng hiện rỗng.
> Mục tiêu: tập trung tất cả logic tính toán thiên văn/lịch dùng chung cho cả 2 apps.
> Cả `apps/tuvi` và `apps/menhan` sẽ `import from '@harmony/astrology'` thay vì duplicate code.

### 0.1 Setup package

- [x] **0.1.1** Kiểm tra và điền `packages/astrology/package.json` (name: `@harmony/astrology`, exports map)
- [x] **0.1.2** Tạo `packages/astrology/tsconfig.json` kế thừa `packages/config-typescript`
- [x] **0.1.3** Thêm dependencies: `iztro`, `amlich`, `date-fns` vào package.json
- [x] **0.1.4** Tạo `packages/astrology/src/index.ts` — barrel export

### 0.2 Port engines dùng chung (nguồn: `tuvi/src/lib/engines/`)

> Các engine này cả hai apps đều cần — đặt ở đây để không duplicate.

- [x] **0.2.1** Port `lunar-engine.ts` → `packages/astrology/src/lunar-engine.ts`
  - So sánh với `anmenh/src/lib/lunar-logic.ts` trước, lấy bản tốt hơn
- [x] **0.2.2** Port `ngu-hanh-engine.ts` → `packages/astrology/src/ngu-hanh-engine.ts`
- [x] **0.2.3** Port `iztro-adapter.ts` → `packages/astrology/src/iztro-adapter.ts`
- [x] **0.2.4** Port `tuvi-engine.ts` → `packages/astrology/src/tuvi-engine.ts`
- [x] **0.2.5** Port `tuvi-interpreter.ts` → `packages/astrology/src/tuvi-interpreter.ts`
- [x] **0.2.6** Port `bat-trach-engine.ts` → `packages/astrology/src/bat-trach-engine.ts`
- [x] **0.2.7** Port `cuu-cung-engine.ts` → `packages/astrology/src/cuu-cung-engine.ts`

### 0.3 Port data layer dùng chung (nguồn: `tuvi/src/data/`)

- [x] **0.3.1** Port `can-chi.ts`, `hoang-dao.ts`, `nap-am.ts`, `ngay-ky.ts`, `ngu-hanh.ts` → `packages/astrology/src/data/`
- [x] **0.3.2** Port `sao28.ts`, `tiet-khi.ts`, `truc.ts` → `packages/astrology/src/data/`
- [x] **0.3.3** Port `phongthuy/bat-trach.ts`, `cuu-cung.ts`, `noi-that.ts` → `packages/astrology/src/data/phongthuy/`
- [x] **0.3.4** Port `tuvi/chinh-tinh.ts`, `cuc.ts`, `cung.ts`, `phu-tinh.ts`, `star-meanings.ts` → `packages/astrology/src/data/tuvi/`

### 0.4 Port engines chỉ dùng cho MenhAn (nguồn: `anmenh/src/lib/`)

> Đặt trong packages/astrology nhưng export riêng — apps/tuvi không cần import.

- [x] **0.4.1** Port `anmenh/src/lib/battu-logic.ts` → `packages/astrology/src/battu-engine.ts`
- [x] **0.4.2** Port `anmenh/src/lib/tuong-hop-logic.ts` → `packages/astrology/src/tuong-hop-engine.ts`

### 0.5 Engines chỉ dùng cho TuVi (giữ trong app, không cần share)

> `date-selection-engine.ts`, `horoscope-generator.ts` — chỉ apps/tuvi cần, không share lên packages.

- [x] **0.5.1** Ghi chú trong `packages/astrology/src/index.ts` về các engine này
- [x] **0.5.2** Port `date-selection-engine.ts` → `apps/tuvi/src/lib/engines/` (local)
- [x] **0.5.3** Port `horoscope-generator.ts` → `apps/tuvi/src/lib/engines/` (local)

### 0.6 Tests

- [x] **0.6.1** Port `tuvi/src/lib/engines/__tests__/` → `packages/astrology/src/__tests__/`
- [x] **0.6.2** Verify tất cả tests pass trong package mới

---

## PHASE A — Port `tuvi/` → `apps/tuvi/`

> Nguồn: `tuvi/src/` | Đích: `apps/tuvi/src/`
> **Yêu cầu:** Phase 0 hoàn thành trước — engine/data layer giờ import từ `@harmony/astrology`

### A1. Kết nối `@harmony/astrology`

- [x] **A1.1** Thêm `@harmony/astrology` vào `apps/tuvi/package.json`
- [x] **A1.2** Xóa/thay thế `apps/tuvi/src/lib/calendar.ts` stub bằng import từ `@harmony/astrology`
- [x] **A1.3** Copy `apps/tuvi/src/lib/engines/date-selection-engine.ts` (local, từ Phase 0.5)
- [x] **A1.4** Copy `apps/tuvi/src/lib/engines/horoscope-generator.ts` (local, từ Phase 0.5)

### A2. API Routes

- [x] **A2.1** Port `tuvi/src/app/api/calendar/` (3 routes: `/`, `/month`, `/convert`)
- [x] **A2.2** Port `tuvi/src/app/api/ngaytot/` (search + check)
- [x] **A2.3** Port `tuvi/src/app/api/phongthuy/` (battrach + cuucung)
- [x] **A2.4** Port `tuvi/src/app/api/tuvi/daily` (tử vi hàng ngày)
- [x] **A2.5** Port `tuvi/src/app/api/tuvi/chart` (lá số cơ bản, year-only version)

### A3. UI Components

- [x] **A3.1** Port `tuvi/src/components/calendar/CalendarView.tsx`
- [x] **A3.2** Port `tuvi/src/components/ngaytot/` (NgayTotForm, QuickDateCheck, TuoiFilter)
- [x] **A3.3** Port `tuvi/src/components/common/XemMenhForm.tsx` + `HoroscopeView.tsx`
- [x] **A3.4** Port `tuvi/src/components/layout/` (SiteHeader, SiteFooter, AuthButton)
- [x] **A3.5** Port `tuvi/src/components/ui/` (Badge, Card, Skeleton)

### A4. Pages

- [x] **A4.1** Port `/lich/[year]/[month]/[day]` — Lịch Vạn Niên chi tiết (ISR)
- [x] **A4.2** Port `/xem-ngay` — Xem ngày tốt/xấu
- [x] **A4.3** Port `/xem-menh` — Xem mệnh Ngũ Hành
- [x] **A4.4** Port `/tu-vi-hang-ngay` — Tử Vi hàng ngày 12 con giáp
- [x] **A4.5** Port `/tu-vi/[congiap]/nam-[year]` — SEO routes
- [x] **A4.6** Port `/phong-thuy/menh-[nguhanh]` — SEO routes Phong Thủy
- [x] **A4.7** Port `/blog/[slug]` — Blog SEO
- [x] **A4.8** Port `/` — Trang chủ

### A5. Infrastructure

- [x] **A5.1** Review `packages/database/prisma/schema.prisma` — đối chiếu với `tuvi/prisma/schema.prisma`, bổ sung models còn thiếu (DailyHoroscope, DailyCalendar, SearchHistory...)
- [x] **A5.2** Port `tuvi/src/lib/seo/` (meta-helpers, structured-data)
- [x] **A5.3** Port `tuvi/src/lib/cache.ts` (Redis caching strategy)
- [x] **A5.4** Port `tuvi/src/app/sitemap.ts` + `robots.ts`
- [x] **A5.5** Port blog content từ `tuvi/content/blog/`
- [x] **A5.6** Kiểm tra và điều chỉnh dependencies trong `apps/tuvi/package.json`
  - Cần thêm: `iztro`, `amlich`, `date-fns`

---

## PHASE B — Port `anmenh/` → `apps/menhan/`

> Nguồn: `anmenh/src/` | Đích: `apps/menhan/src/`
> **Lưu ý:** anmenh dùng localStorage — cần refactor sang API calls khi port

### B1. Kết nối `@harmony/astrology` (thay thế stubs hiện tại)

> Engine đã được đưa vào packages/astrology ở Phase 0 — B1 chỉ cần wiring.

- [ ] **B1.1** Thêm `@harmony/astrology` vào `apps/menhan/package.json`
- [ ] **B1.2** Xóa stub `apps/menhan/src/lib/astrology-engine.ts`, thay bằng import `tuvi-engine` từ `@harmony/astrology`
- [ ] **B1.3** Xóa stub `apps/menhan/src/lib/compatibility.ts`, thay bằng import `tuong-hop-engine` từ `@harmony/astrology`
- [ ] **B1.4** Cập nhật `apps/menhan/src/lib/chart-context.ts` để dùng types từ `@harmony/astrology`

### B2. UI Components (refactor localStorage → API)

- [ ] **B2.1** Port `anmenh/src/components/pages/BatTu.tsx`
  - Refactor: đọc profile từ API `/api/profile` thay vì localStorage
- [ ] **B2.2** Port `anmenh/src/components/pages/BatTrach.tsx`
  - Refactor: đọc/ghi từ API
- [ ] **B2.3** Port `anmenh/src/components/pages/CanXuong.tsx`
  - Refactor: đọc/ghi từ API
- [ ] **B2.4** Port `anmenh/src/components/pages/TuongHop.tsx`
  - Refactor: đọc/ghi từ API
- [ ] **B2.5** Port `anmenh/src/components/RadarChart.tsx` (Ngũ Hành radar)

### B3. API Routes (mới — không có trong anmenh)

- [ ] **B3.1** Tạo `POST /api/battu/analyze` — nhận birth data, trả Bát Tự đầy đủ
- [ ] **B3.2** Tạo `POST /api/tuong-hop` — nhận 2 profiles, trả kết quả tương hợp
- [ ] **B3.3** Tạo `POST /api/can-xuong` — nhận birth data, trả Cân Xương kết quả

### B4. Pages

- [ ] **B4.1** Tạo `/bat-tu` page — Bát Tự Tứ Trụ
- [ ] **B4.2** Tạo `/bat-trach` page — Bát Trạch Phong Thủy
- [ ] **B4.3** Tạo `/can-xuong` page — Cân Xương Đoán Số
- [ ] **B4.4** Tạo `/tuong-hop` page — Tương Hợp đôi lứa

### B5. Tích hợp với Master AI

- [ ] **B5.1** Kết nối kết quả Bát Tự → context cho Master AI chat (`chart-context.ts`)
- [ ] **B5.2** Cập nhật `master-ai-prompt.ts` để nhận thêm data từ Bát Tự engine mới

---

## PHASE C — Dọn dẹp

- [ ] **C1** Verify `apps/tuvi/` chạy được end-to-end (calendar, xem ngày, tử vi hàng ngày)
- [ ] **C2** Verify `apps/menhan/` chạy được end-to-end (onboarding → bát tự → master AI chat)
- [ ] **C3** Xóa hoặc archive `tuvi/` root (sau khi verify apps/tuvi hoạt động)
- [ ] **C4** Xóa hoặc archive `anmenh/` root (sau khi verify apps/menhan hoạt động)
- [ ] **C5** Cập nhật monorepo root `package.json` / turbo config nếu cần

---

## Ghi chú

- **Không** copy Stripe integration từ `tuvi/` — PRD Harmony AI không dùng Stripe
- **Không** copy localStorage pattern từ `anmenh/` — apps/ dùng DB
- `packages/astrology` đã được scaffold sẵn (`packages/astrology/src/` rỗng) — Phase 0 là điền nội dung vào đó
- Thứ tự bắt buộc: **Phase 0 → Phase A → Phase B → Phase C** (A và B đều phụ thuộc Phase 0)
- `packages/database` đã có Prisma schema riêng — **không** port schema từ `tuvi/prisma/` nữa, kiểm tra xem đã cover đủ models chưa (task A5.1 đổi thành review, không phải copy)
- Ưu tiên Phase A trước vì `apps/tuvi/` là SEO/traffic engine — ảnh hưởng trực tiếp đến lead generation

---

_Tạo: 2026-05-01_
