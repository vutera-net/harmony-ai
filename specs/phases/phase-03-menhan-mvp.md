# Phase 03: MenhAn Sanctuary - MVP

## Goals
- Xây dựng trải nghiệm "Sanctuary" với Dark Mode Zen.
- Triển khai Master AI phiên bản đầu tiên.
- Kích hoạt mô hình doanh thu Pay-per-view.

## Prerequisites
- TuVi App đã có luồng dẫn traffic.
- SSO hoạt động ổn định.

## Task List

### TASK-03-00: MenhAn Scaffolding & Zen UI
**Mục tiêu**: Tạo không gian "Cõi Riêng" sang trọng, huyền bí.
**Depends on**: Phase 02
**Estimated scope**: L
**Việc cần làm**:
- [ ] Implement Dark Mode Zen High-end (Đen - Vàng hổ phách).
- [ ] Xây dựng hiệu ứng Bridge UI (Loading trạng thái "chiêm nghiệm").
- [ ] Thiết lập layout cho Dashboard cá nhân.
**Definition of Done**:
- [ ] UI đạt đúng vibe "Zen High-end" theo specs/IDEA.md.

---

### TASK-03-01: Master AI Engine (Core)
**Mục tiêu**: Xây dựng "linh hồn" của sản phẩm thông qua Prompt Engineering.
**Depends on**: TASK-03-00
**Estimated scope**: L
**Việc cần làm**:
- [ ] Thiết kế System Prompt cho "The Master AI" (Nhân cách, phong cách nói chuyện).
- [ ] Implement luồng: Deterministic Layer (Raw Data) $\rightarrow$ AI Layer (Luận giải).
- [ ] Tích hợp streaming response để tăng trải nghiệm người dùng.
- [ ] Xây dựng cơ chế lọc nội dung nhạy cảm/hù dọa.
**Definition of Done**:
- [ ] AI trả lời đúng vai Master AI, nội dung có chiều sâu và ấm áp.

---

### TASK-03-02: Advanced Chart Analysis
**Mục tiêu**: Cung cấp luận giải chi tiết Bát Tự và Tử Vi Đẩu Số.
**Depends on**: TASK-03-01
**Estimated scope**: L
**Việc cần làm**:
- [ ] Triển khai thuật toán tính toán chi tiết 14 chính tinh, 12 cung.
- [ ] Xây dựng prompt chuyên sâu cho từng mảng (Sự nghiệp, Tài lộc, Tình duyên).
- [ ] Implement logic so sánh tương hợp (Compatibility).
**Definition of Done**:
- [ ] Luận giải chi tiết và chính xác hơn nhiều so với phiên bản TuVi.

---

### TASK-03-03: Pay-per-view Implementation
**Mục tiêu**: Tạo dòng tiền nhanh từ các báo cáo đơn lẻ.
**Depends on**: TASK-03-02
**Estimated scope**: M
**Việc cần làm**:
- [ ] Tích hợp cổng thanh toán (Stripe/VNPay/Momo).
- [ ] Xây dựng luồng: Thanh toán $\rightarrow$ Unlock luận giải chuyên sâu.
- [ ] Implement logic giới hạn quyền truy cập cho user free.
**Definition of Done**:
- [ ] User có thể thanh toán và nhận kết quả luận giải ngay lập tức.
