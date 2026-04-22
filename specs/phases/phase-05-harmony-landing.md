# Phase 05: Harmony Landing & Polish

## Goals
- Hoàn thiện Brand Hub để điều phối traffic toàn hệ sinh thái.
- Tối ưu hóa hiệu năng toàn hệ thống.
- E2E Testing & Ready for Launch.

## Prerequisites
- Tất cả các app con đã hoàn thành tính năng cốt lõi.

## Task List

### TASK-05-00: Harmony Landing Page Development
**Mục tiêu**: Xây dựng "mặt tiền" sang trọng cho toàn hệ sinh thái.
**Depends on**: Phase 04
**Estimated scope**: M
**Việc cần làm**:
- [x] Implement Single Page Landing with các section: Hero, Intro, Ecosystem, Social Proof.
- [x] Xây dựng Visual Flow: TuVi $\rightarrow$ MenhAn.
- [x] Tối ưu hóa chuyển đổi (Conversion Rate Optimization) cho các CTA.
- [x] Đảm bảo responsive tuyệt đối trên mọi thiết bị.
**Definition of Done**:
- [ ] Landing page hoạt động mượt mà, đúng vibe xanh ngọc/trắng kem.

---

### TASK-05-01: Ecosystem Router & Final Integration
**Mục tiêu**: Đảm bảo trải nghiệm chuyển đổi giữa các app không vết gờ.
**Depends on**: TASK-05-00
**Estimated scope**: S
**Việc cần làm**:
- [x] Kiểm tra và tối ưu luồng redirect từ Landing $\rightarrow$ TuVi $\rightarrow$ MenhAn.
- [x] Đồng bộ hóa header/footer brand identity trên toàn bộ subdomain.
- [x] Final check hệ thống SSO trên mọi edge case.
**Definition of Done**:
- [x] Luồng di chuyển giữa các app mượt mà, không bị logout bất ngờ.

---

### TASK-05-02: Final Polish & Performance Tuning
**Mục tiêu**: Đưa sản phẩm đạt chuẩn chất lượng cao nhất trước khi release.
**Depends on**: TASK-05-01
**Estimated scope**: M
**Việc cần làm**:
- [x] Chạy load test cho API Master AI.
- [x] Tối ưu hóa database query (Indexing, Caching).
- [x] Kiểm tra bảo mật (OWASP check, Input validation).
- [x] Final E2E testing flow: Landing $\rightarrow$ TuVi $\rightarrow$ MenhAn $\rightarrow$ Pay $\rightarrow$ Journal.
**Definition of Done**:
- [x] Toàn bộ hệ thống đạt performance target trong PRD.
- [x] Không còn bug nghiêm trọng (P0/P1).
