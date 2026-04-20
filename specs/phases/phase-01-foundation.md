# Phase 01: Foundation & Identity

## Goals
- Thiết lập cấu trúc dự án (Monorepo/Workspace).
- Xây dựng hệ thống định danh dùng chung (SSO) tại `id.vutera.net`.
- Định nghĩa Schema DB cốt lõi.

## Prerequisites
- Xác định tech stack chi tiết.

## Task List

### TASK-01-00: Project Scaffolding & Base Config
**Mục tiêu**: Thiết lập môi trường phát triển nhất quán.
**Depends on**: none
**Estimated scope**: M
**Việc cần làm**:
- [ ] Setup Next.js monorepo structure (hoặc workspace) cho 4 domains.
- [ ] Cấu hình TypeScript strict mode, ESLint, Prettier.
- [ ] Setup Tailwind CSS base theme với palette màu Harmony (Xanh ngọc, Trắng kem, Tím, Gold).
- [ ] Cấu hình CI/CD cơ bản.
**Definition of Done**:
- [ ] Chạy `npm run dev` khởi động được các app.
- [ ] Không có lỗi lint/typecheck.

---

### TASK-01-01: Core Database Schema Implementation
**Mục tiêu**: Triển khai layer dữ liệu cho User và Profile.
**Depends on**: TASK-01-00
**Estimated scope**: M
**Việc cần làm**:
- [ ] Thiết kế Prisma schema cho `User`, `Profile`, `Subscription`.
- [ ] Implement migration cho PostgreSQL.
- [ ] Viết seed data cho các gói subscription mẫu.
- [ ] Viết integration test cho CRUD User/Profile.
**Definition of Done**:
- [ ] `npx prisma migrate dev` thành công.
- [ ] Database schema khớp với ERD trong PRD.

---

### TASK-01-02: SSO Service (id.vutera.net)
**Mục tiêu**: Xây dựng trung tâm xác thực cho toàn hệ sinh thái.
**Depends on**: TASK-01-01
**Estimated scope**: L
**Việc cần làm**:
- [ ] Implement luồng Đăng ký/Đăng nhập (Email/Password, Social).
- [ ] Xây dựng cơ chế cấp phát JWT token dùng chung cho `.vutera.net`.
- [ ] Implement API `/api/auth/me` để lấy thông tin profile.
- [ ] Tạo trang quản lý Profile cơ bản.
**Definition of Done**:
- [ ] User có thể login tại `id.vutera.net` và nhận token hợp lệ.
- [ ] Token có thể được verify từ các subdomain khác.

---

### TASK-01-03: Shared Auth Middleware & Context
**Mục tiêu**: Đồng bộ trạng thái xác thực giữa các app.
**Depends on**: TASK-01-02
**Estimated scope**: S
**Việc cần làm**:
- [ ] Viết Next.js Middleware để check auth cho các route bảo vệ.
- [ ] Tạo AuthContext/Provider để share user state trong client side.
- [ ] Xử lý luồng redirect về `id.vutera.net` khi session hết hạn.
**Definition of Done**:
- [ ] Truy cập route `/private` của bất kỳ app nào đều yêu cầu login.
- [ ] Redirect mượt mà giữa các subdomain.
