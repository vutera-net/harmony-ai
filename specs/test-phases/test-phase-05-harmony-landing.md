# Test Plan — Phase 05: Harmony Landing & Polish

## Goals
- Đảm bảo phễu dẫn traffic từ Landing $\rightarrow$ TuVi $\rightarrow$ MenhAn mượt mà.
- Xác minh hiệu năng toàn hệ thống (Production ready).

## Test Strategy
| Test Type | Mục tiêu | Tools | Coverage Target |
|-----------|---------|-------|----------------|
| E2E | Full Ecosystem flow | Playwright/Cypress | Happy path |
| Manual | Brand Consistency, UX Feel | Human Review | High |
| Performance | Page load, API latency | Lighthouse/K6 | PRD Targets |

## User Scenarios
### SC-05-01: Full Journey (The Golden Path)
**Given**: New user truy cập `harmony.vutera.net`.
**When**: Landing $\rightarrow$ TuVi (Xem lá số) $\rightarrow$ AI Hook $\rightarrow$ Login SSO $\rightarrow$ MenhAn (Mua report).
**Then**: Toàn bộ hành trình diễn ra mượt mà, không lỗi, đúng vibe.

### SC-05-02: SSO Session Persistence
**Given**: User đã login tại `id.vutera.net`.
**When**: Di chuyển giữa `tuvi.vutera.net` và `menhan.vutera.net`.
**Then**: Luôn ở trạng thái logged-in, không bị yêu cầu login lại.

## Edge Cases
### EC-09: High Traffic Peak
- **Input**: Giả lập 1000 user cùng truy cập Master AI lúc 0h mùng 1 Tết.
- **Expected**: Hệ thống không crash, response time tăng nhẹ nhưng vẫn ổn định (có loading state).
- **Risk**: API LLM bị rate limit hoặc server quá tải.

## Test Data
- [ ] Môi trường Staging giống hệt Production.
- [ ] Danh sách các thiết bị (iPhone, Android, Chrome, Safari) để test responsive.
