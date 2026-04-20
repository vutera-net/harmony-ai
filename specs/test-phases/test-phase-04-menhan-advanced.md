# Test Plan — Phase 04: MenhAn Advanced & Monetization

## Goals
- Xác minh cơ chế đối soát của Destiny Journal (Trust Loop).
- Kiểm tra hệ thống Subscription và quyền lợi theo gói.
- Kiểm tra chất lượng file PDF Report xuất ra.

## Test Strategy
| Test Type | Mục tiêu | Tools | Coverage Target |
|-----------|---------|-------|----------------|
| Integration | Journal Entry $\rightarrow$ Prediction Matching | jest | 100% Logic |
| E2E | Subscription Upgrade $\rightarrow$ Unlock AI Coach | supertest | Happy path |
| Manual | PDF Layout & Typography Check | Human Review | Visual match |

## User Scenarios
### SC-04-01: Ghi nhật ký và đối soát thành công
**Given**: AI từng dự báo "Tháng 4 có lộc về tiền bạc".
**When**: User ghi: "Ngày 15/4 nhận thưởng 10 triệu".
**Then**: AI nhận diện khớp $\rightarrow$ Xác nhận "Đúng" $\rightarrow$ Tăng Trust Score.

### SC-04-02: Nâng cấp gói Subscription
**Given**: User đang dùng gói Free.
**When**: Thanh toán nâng cấp lên gói "An Nhiên".
**Then**: Quyền lợi thay đổi: Chat không giới hạn, truy cập AI Coach, xem vận trình tháng.

### SC-04-03: Xuất báo cáo PDF Độc Bản
**Given**: User có quyền generate PDF.
**When**: Nhấn "Xuất báo cáo PDF".
**Then**: Tải về file PDF với layout nghệ thuật, nội dung luận giải đầy đủ, đúng định dạng.

## Edge Cases
### EC-07: Subscription Expired
- **Input**: Gói cước hết hạn vào lúc 00:00.
- **Expected**: Quyền lợi premium bị revoke ngay lập tức, chuyển về gói Free.
- **Risk**: User tiếp tục dùng tính năng premium sau khi hết hạn.

### EC-08: PDF Rendering Crash
- **Input**: Luận giải quá dài hoặc có ký tự đặc biệt gây lỗi render PDF.
- **Expected**: Hệ thống handle lỗi, thông báo "Đang xử lý" hoặc render bản rút gọn.
- **Risk**: Server crash do quá tải memory khi render PDF lớn.

## Test Data
- [ ] User với subscription hết hạn.
- [ ] Dữ liệu dự báo mẫu để test Matching logic.
