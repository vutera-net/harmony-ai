# Phase 02: TuVi App (Traffic Engine)

## Goals
- Xây dựng công cụ tra cứu miễn phí để thu hút traffic.
- Triển khai SEO Content Engine.
- Tạo phễu dẫn người dùng sang MenhAn.

## Prerequisites
- Hệ thống SSO (`id.vutera.net`) hoạt động.

## Task List

### TASK-02-00: TuVi App Scaffolding & Light UI
**Mục tiêu**: Tạo giao diện Light Mode hiện đại, load nhanh.
**Depends on**: Phase 01
**Estimated scope**: M
**Việc cần làm**:
- [ ] Setup layout cho `tuvi.vutera.net` (Mobile-first).
- [ ] Implement UI cho Hero Section và Quick Tools grid.
- [ ] Tối ưu Core Web Vitals (LCP < 1.2s).
**Definition of Done**:
- [ ] Page load speed đạt điểm > 90 trên PageSpeed Insights.

---

### TASK-02-01: Quick Tools Implementation
**Mục tiêu**: Cung cấp giá trị nhanh cho user (Lịch vạn niên, Ngày tốt xấu).
**Depends on**: TASK-02-00
**Estimated scope**: L
**Việc cần làm**:
- [ ] Tích hợp thư viện tính lịch âm dương.
- [ ] Implement logic đánh giá ngày Tốt/Trung bình/Xấu theo tuổi.
- [ ] Xây dựng UI tra cứu Giờ Hoàng Đạo.
- [ ] Viết unit test cho logic tính ngày.
**Definition of Done**:
- [ ] Kết quả tra cứu khớp với lịch vạn niên chuẩn.

---

### TASK-02-02: Basic Chart Generator (Tử Vi Cơ Bản)
**Mục tiêu**: Cho phép user xem lá số rút gọn để kích thích tò mò.
**Depends on**: TASK-02-01
**Estimated scope**: L
**Việc cần làm**:
- [ ] Implement thuật toán lập lá số Tử Vi cơ bản (6-8 cung chính).
- [ ] Xây dựng UI hiển thị lá số dạng grid tối giản.
- [ ] Viết logic tóm tắt vận mệnh chung (Template-based).
**Definition of Done**:
- [ ] User nhập ngày giờ sinh $\rightarrow$ Hiển thị đúng lá số cơ bản.

---

### TASK-02-03: SEO Content Engine Setup
**Mục tiêu**: Tự động hóa tạo nội dung tối ưu SEO.
**Depends on**: TASK-02-00
**Estimated scope**: M
**Việc cần làm**:
- [ ] Thiết lập dynamic routing cho các bài viết tử vi theo tuổi/năm.
- [ ] Xây dựng template bài viết chuẩn SEO (H1, H2, Meta tags).
- [ ] Setup sitemap.xml và robots.txt.
**Definition of Done**:
- [ ] Các trang chi tiết tuổi được index đúng bởi Google (hoặc tool check SEO).

---

### TASK-02-04: Lead Capture & MenhAn Bridge
**Mục tiêu**: Chuyển đổi traffic thành lead và user của MenhAn.
**Depends on**: TASK-02-02
**Estimated scope**: M
**Việc cần làm**:
- [ ] Implement form thu thập email/ngày sinh (Lead Magnet).
- [ ] Xây dựng "AI Hook" (Câu nhận xét lửng lơ kích thích tò mò).
- [ ] Tạo CTA mượt mà dẫn sang `menhan.vutera.net`.
**Definition of Done**:
- [ ] User nhấn CTA $\rightarrow$ Redirect sang MenhAn và giữ được context lá số.
