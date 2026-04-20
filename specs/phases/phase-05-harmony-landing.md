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
- [ ] Implement Single Page Landing với các section: Hero, Intro, Ecosystem, Social Proof.
- [ ] Xây dựng Visual Flow: TuVi $\rightarrow$ MenhAn.
- [ ] Tối ưu hóa chuyển đổi (Conversion Rate Optimization) cho các CTA.
- [ ] Đảm bảo responsive tuyệt đối trên mọi thiết bị.
**Definition of Done**:
- [ ] Landing page hoạt động mượt mà, đúng vibe xanh ngọc/trắng kem.

---

### TASK-05-01: Ecosystem Router & Final Integration
**Mục tiêu**: Đảm bảo trải nghiệm chuyển đổi giữa các app không vết gờ.
**Depends on**: TASK-05-00
**Estimated scope**: S
**Việc cần làm**:
- [ ] Kiểm tra và tối ưu luồng redirect từ Landing $\rightarrow$ TuVi $\rightarrow$ MenhAn.
- [ ] Đồng bộ hóa header/footer brand identity trên toàn bộ subdomain.
- [ ] Final check hệ thống SSO trên mọi edge case.
**Definition of Done**:
- [ ] Luồng di chuyển giữa các app mượt mà, không bị logout bất ngờ.

---

### TASK-05-02: Final Polish & Performance Tuning
**Mục tiêu**: Đưa sản phẩm đạt chuẩn chất lượng cao nhất trước khi release.
**Depends on**: TASK-05-01
**Estimated scope**: M
**Việc cần làm**:
- [ ] Chạy load test cho API Master AI.
- [ ] Tối ưu hóa database query (Indexing, Caching).
- [ ] Kiểm tra bảo mật (OWASP check, Input validation).
- [ ] Final E2E testing flow: Landing $\rightarrow$ TuVi $\rightarrow$ MenhAn $\rightarrow$ Pay $\rightarrow$ Journal.
**Definition of Done**:
- [ ] Toàn bộ hệ thống đạt performance target trong PRD.
- [ ] Không còn bug nghiêm trọng (P0/P1).
