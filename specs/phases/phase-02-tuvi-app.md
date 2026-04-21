# Phase 02: TuVi App (Traffic Engine)

## Goals
- Xây dựng công cụ tra cứu miễn phí để thu hút traffic.
- Triển khai SEO Content Engine.
- Tạo phễu dẫn người dùng sang MenhAn.

## Prerequisites
- Hệ thống SSO (`id.vutera.net`) hoạt động.

## Task List

### TASK-02-00: TuVi App Scaffolding & Light UI ✅ DONE
**Mục tiêu**: Tạo giao diện Light Mode hiện đại, load nhanh.
**Depends on**: Phase 01
**Estimated scope**: M
**Status**: ✅ DONE (2026-04-21) | Commit: 6ccd9046
**Việc cần làm**:
- [x] Setup layout cho `tuvi.vutera.net` (Mobile-first).
- [x] Implement UI cho Hero Section và Quick Tools grid.
- [x] Tối ưu Core Web Vitals (LCP < 1.2s).
**Definition of Done**:
- [x] Page load speed đạt điểm > 90 trên PageSpeed Insights.

---

### TASK-02-01: Quick Tools Implementation ✅ DONE
**Mục tiêu**: Cung cấp giá trị nhanh cho user (Lịch vạn niên, Ngày tốt xấu).
**Depends on**: TASK-02-00
**Estimated scope**: L
**Status**: ✅ DONE (2026-04-21) | Commit: defac681
**Việc cần làm**:
- [x] Tích hợp thư viện tính lịch âm dương.
- [x] Implement logic đánh giá ngày Tốt/Trung bình/Xấu theo tuổi.
- [x] Xây dựng UI tra cứu Giờ Hoàng Đạo.
- [x] Viết unit test cho logic tính ngày.
**Definition of Done**:
- [x] Kết quả tra cứu khớp với lịch vạn niên chuẩn.

---

### TASK-02-02: Basic Chart Generator (Tử Vi Cơ Bản) ✅ DONE
**Mục tiêu**: Cho phép user xem lá số rút gọn để kích thích tò mò.
**Depends on**: TASK-02-01
**Estimated scope**: L
**Status**: ✅ DONE (2026-04-21)
**Việc cần làm**:
- [x] Implement thuật toán lập lá số Tử Vi cơ bản (6-8 cung chính).
- [x] Xây dựng UI hiển thị lá số dạng grid tối giản.
- [x] Viết logic tóm tắt vận mệnh chung (Template-based).
**Definition of Done**:
- [x] User nhập ngày giờ sinh $\rightarrow$ Hiển thị đúng lá số cơ bản.

---

### TASK-02-03: SEO Content Engine Setup ✅ DONE
**Mục tiêu**: Tự động hóa tạo nội dung tối ưu SEO.
**Depends on**: TASK-02-00
**Estimated scope**: M
**Status**: ✅ DONE (2026-04-21) | Commit: e39c0096
**Việc cần làm**:
- [x] Thiết lập dynamic routing cho các bài viết tử vi theo tuổi/năm.
- [x] Xây dựng template bài viết chuẩn SEO (H1, H2, Meta tags).
- [x] Setup sitemap.xml và robots.txt.
**Definition of Done**:
- [x] Các trang chi tiết tuổi được index đúng bởi Google (hoặc tool check SEO).

---

### TASK-02-04: Lead Capture & MenhAn Bridge ✅ DONE
**Mục tiêu**: Chuyển đổi traffic thành lead và user của MenhAn.
**Depends on**: TASK-02-02
**Estimated scope**: M
**Status**: ✅ DONE (2026-04-21) | Commit: 7317e801
**Việc cần làm**:
- [x] Implement form thu thập email/ngày sinh (Lead Magnet).
- [x] Xây dựng "AI Hook" (Câu nhận xét lửng lơ kích thích tò mò).
- [x] Tạo CTA mượt mà dẫn sang `menhan.vutera.net`.
**Definition of Done**:
- [x] User nhấn CTA $\rightarrow$ Redirect sang MenhAn và giữ được context lá số.
