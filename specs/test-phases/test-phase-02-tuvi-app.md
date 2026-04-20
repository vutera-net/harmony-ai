# Test Plan — Phase 02: TuVi App (Traffic Engine)

## Goals
- Xác minh tính chính xác của thuật toán tính ngày tốt/xấu.
- Kiểm tra khả năng load trang siêu nhanh cho SEO.
- Xác minh luồng dẫn traffic sang MenhAn.

## Test Strategy
| Test Type | Mục tiêu | Tools | Coverage Target |
|-----------|---------|-------|----------------|
| Unit | Thuật toán lịch âm, tính ngày tốt xấu | jest | 90% (Crucial) |
| E2E | Input ngày sinh $\rightarrow$ Lập lá số cơ bản | supertest | Happy path |
| Manual | UI Responsiveness, Core Web Vitals | PageSpeed | Score > 90 |

## User Scenarios
### SC-02-01: Tra cứu ngày tốt xấu chính xác
**Given**: User nhập tuổi Giáp Thìn 2026.
**When**: Yêu cầu xem ngày tốt hôm nay.
**Then**: Kết quả trả về đúng theo lịch vạn niên chuẩn (Tốt/Trung bình/Xấu).

### SC-02-02: Lập lá số Tử Vi cơ bản
**Given**: User nhập đầy đủ ngày giờ sinh.
**When**: Nhấn "Xem lá số".
**Then**: Hiển thị đúng grid 6-8 cung chính, tóm tắt vận mệnh chung.

### SC-02-03: Chuyển đổi sang MenhAn qua AI Hook
**Given**: User vừa xem lá số cơ bản.
**When**: AI hiển thị hook "Điểm đặc biệt về tài lộc..." $\rightarrow$ User nhấn "Giải mã ngay".
**Then**: Redirect sang `menhan.vutera.net` kèm context lá số, yêu cầu login SSO.

## Edge Cases
### EC-03: Ngày sinh không hợp lệ
- **Input**: Ngày 31/02 hoặc năm sinh tương lai.
- **Expected**: Validation error, yêu cầu nhập lại ngày sinh chính xác.
- **Risk**: App crash khi tính toán với date object invalid.

### EC-04: SEO Dynamic Routes
- **Input**: Truy cập URL `/tu-vi/giap-thin-2026`.
- **Expected**: Page load content đúng cho tuổi Giáp Thìn, meta tags chính xác.
- **Risk**: 404 cho các tuổi không được định nghĩa trong template.

## Test Data
- [ ] Danh sách 10 bộ ngày giờ sinh mẫu $\rightarrow$ Kết quả lá số kỳ vọng (Golden Dataset).
- [ ] Các keyword SEO phổ biến để test dynamic routing.
