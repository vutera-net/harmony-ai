# Phase 03: MenhAn Sanctuary - MVP

## Goals
- Xây dựng trải nghiệm "Sanctuary" với Dark Mode Zen.
- Triển khai Master AI phiên bản đầu tiên.
- Kích hoạt mô hình doanh thu Pay-per-view.

## Prerequisites
- TuVi App đã có luồng dẫn traffic.
- SSO hoạt động ổn định.

## Task List

### TASK-03-00: MenhAn Scaffolding & Zen UI ✅ DONE
**Mục tiêu**: Tạo không gian "Cõi Riêng" sang trọng, huyền bí.
**Depends on**: Phase 02
**Estimated scope**: L
**Status**: ✅ DONE (2026-04-21)
**Việc cần làm**:
- [x] Implement Dark Mode Zen High-end (Đen - Vàng hổ phách).
- [x] Xây dựng hiệu ứng Bridge UI (Loading trạng thái "chiêm nghiệm").
- [x] Thiết lập layout cho Dashboard cá nhân.
**Definition of Done**:
- [x] UI đạt đúng vibe "Zen High-end" theo specs/IDEA.md.

---

### TASK-03-01: Master AI Engine (Core) ✅ DONE
**Mục tiêu**: Xây dựng "linh hồn" của sản phẩm thông qua Prompt Engineering.
**Depends on**: TASK-03-00
**Estimated scope**: L
**Status**: ✅ DONE (2026-04-21) | Commit: 240627bf
**Việc cần làm**:
- [x] Thiết kế System Prompt cho "The Master AI" (Nhân cách, phong cách nói chuyện).
- [x] Implement luồng: Deterministic Layer (Raw Data) $\rightarrow$ AI Layer (Luận giải).
- [x] Tích hợp streaming response để tăng trải nghiệm người dùng.
- [x] Xây dựng cơ chế lọc nội dung nhạy cảm/hù dọa.
**Definition of Done**:
- [x] AI trả lời đúng vai Master AI, nội dung có chiều sâu và ấm áp.

**Completion Summary**:
- [x] Installed @anthropic-ai/sdk, chinese-lunar-calendar dependencies
- [x] Created src/lib/chart-context.ts (Deterministic Layer)
  * buildChartContext(profile) - converts birth date/time → zodiac + 12 palaces + elements
  * Uses chinese-lunar-calendar for accurate lunar date calculations
  * Returns structured ChartContext with Vietnamese zodiac animal, heavenly stem, earthly branch
  * Generates palace descriptions for 12 Tử Vi houses (Mệnh, Quan Lộc, Tài Lộc, etc.)
  * Derives Wu Xing element from Heavenly Stem
- [x] Created src/lib/master-ai-prompt.ts (System Prompt)
  * buildSystemPrompt(chartCtx) - creates personality-driven system prompt
  * Safety rules: NO threatening language, avoid negative words (bại, chết, bệnh tật)
  * Personality: Warm Companion, expert but approachable, always constructive
  * Ends every response with specific action user can take
  * Vietnamese context: temple-like language, poetic metaphors
- [x] Rewrote src/app/api/chat/route.ts (Full Implementation)
  * Real Claude Haiku 4.5 streaming via @anthropic-ai/sdk
  * Fetches Profile from DB using userId from SSO token
  * Deterministic Layer: builds chart context from profile birth data
  * AI Layer: streams Claude response with system prompt + chart context
  * Auth: token-based from @harmony/auth/middleware
  * Fallback: guest mode if profile incomplete (still provides helpful responses)
  * Streaming: native ReadableStream compatible with existing chat UI
- [x] Fixed src/app/api/profile/route.ts
  * Replace broken getServerSession with token-based auth
  * Use getTokenFromRequest from @harmony/auth/middleware
  * Fetch userId from SSO service at NEXT_PUBLIC_SSO_URL
- [x] Added TypeScript definitions for chinese-lunar-calendar
- [x] Added .env.local placeholders for ANTHROPIC_API_KEY, DATABASE_URL
- [x] Build successful: Next.js compiles without errors, TypeScript clean
- [x] Deployment ready: uses environment variables for API key (safe for production)

---

### TASK-03-02: Advanced Chart Analysis ✅ DONE
**Mục tiêu**: Cung cấp luận giải chi tiết Bát Tự và Tử Vi Đẩu Số.
**Depends on**: TASK-03-01
**Estimated scope**: L
**Status**: ✅ DONE (2026-04-22)
**Việc cần làm**:
- [x] Triển khai thuật toán tính toán chi tiết 14 chính tinh, 12 cung.
- [x] Xây dựng prompt chuyên sâu cho từng mảng (Sự nghiệp, Tài lộc, Tình duyên).
- [x] Implement logic so sánh tương hợp (Compatibility).
**Definition of Done**:
- [x] Luận giải chi tiết và chính xác hơn nhiều so với phiên bản TuVi.


---

### TASK-03-03: Pay-per-view Implementation ✅ DONE
**Mục tiêu**: Tạo dòng tiền nhanh từ các báo cáo đơn lẻ.
**Depends on**: TASK-03-02
**Estimated scope**: M
**Status**: ✅ DONE (2026-04-22)
**Việc cần làm**:
- [x] Tích hợp cổng thanh toán (Mock implementation for MVP).
- [x] Xây dựng luồng: Thanh toán $\rightarrow$ Unlock luận giải chuyên sâu.
- [x] Implement logic giới hạn quyền truy cập cho user free (Paywall logic in /api/chat).
**Definition of Done**:
- [x] User có thể thanh toán và nhận kết quả luận giải ngay lập tức.
