# Implementation Plan — Phased: Harmony AI Ecosystem

## Overview
- **Total phases**: 5
- **Estimated duration**: 8-12 weeks
- **Stack**: Next.js (App Router), TypeScript, PostgreSQL (Prisma), LLMs (Claude 3.5/GPT-4o), NextAuth/Custom SSO.

## Phase Roadmap

| Phase | Name | Duration | Depends on | Tasks |
|-------|------|----------|-----------|-------|
| 01 | Foundation & Identity | 2w | — | TASK-01-00 to TASK-01-03 |
| 02 | TuVi App (Traffic Engine) | 2w | Phase 01 | TASK-02-00 to TASK-02-04 |
| 03 | MenhAn Sanctuary - MVP | 2w | Phase 02 | TASK-03-00 to TASK-03-03 |
| 04 | MenhAn - Advanced & Monetization | 3w | Phase 03 | TASK-04-00 to TASK-04-03 |
| 05 | Harmony Landing & Polish | 1w | Phase 04 | TASK-05-00 to TASK-05-02 |

## Phase Details
Chi tiết từng phase được định nghĩa trong thư mục `specs/phases/`.

## Risk Register (Cross-phase)

| Risk | Khả năng | Mitigation |
|------|----------|-----------|
| AI Hallucination trong luận giải vận mệnh | Cao | Kết hợp Deterministic Layer (tính lá số chính xác) $\rightarrow$ Probabilistic Layer (AI luận giải). Thêm Disclaimer. |
| Hiệu năng LLM response chậm gây trải nghiệm tệ | Trung bình | Sử dụng Streaming response và Bridge UI (Loading states) tinh tế. |
| Phức tạp trong quản lý SSO đa subdomain | Trung bình | Sử dụng domain cha `.vutera.net` cho cookie auth, chuẩn hóa OIDC. |
| Sai lệch dữ liệu giờ sinh/múi giờ | Thấp | Implement logic convert múi giờ chuẩn quốc tế trước khi tính lá số. |
