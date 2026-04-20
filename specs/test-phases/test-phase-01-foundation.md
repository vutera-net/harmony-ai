# Test Plan — Phase 01: Foundation & Identity

## Goals
- Đảm bảo hệ thống định danh (SSO) hoạt động chính xác, an toàn.
- Xác minh dữ liệu Profile và User được lưu trữ/truy xuất đúng.

## Test Strategy
| Test Type | Mục tiêu | Tools | Coverage Target |
|-----------|---------|-------|----------------|
| Unit | Auth logic, Token generation | jest | 80% |
| Integration | User $\rightarrow$ Profile DB flow | jest + Prisma | 100% Critical |
| E2E | Login $\rightarrow$ Token $\rightarrow$ Profile access | supertest | Happy path |

## User Scenarios
### SC-01-01: User đăng ký tài khoản thành công
**Given**: Email `test@example.com` chưa tồn tại.
**When**: POST `/api/auth/register` với email + password hợp lệ.
**Then**: Trả về 201 Created, User được lưu vào DB, trả về token.

### SC-01-02: User đăng nhập thành công
**Given**: User đã tồn tại.
**When**: POST `/api/auth/login` với đúng credentials.
**Then**: Trả về 200 OK, accessToken hợp lệ, cookie được set cho `.vutera.net`.

### SC-01-03: Truy cập route bảo vệ khi chưa login
**Given**: User chưa có session.
**When**: GET `/api/auth/me` hoặc truy cập page `/private`.
**Then**: 401 Unauthorized hoặc Redirect về `id.vutera.net/login`.

## Edge Cases
### EC-01: Duplicate Email
- **Input**: Đăng ký với email đã tồn tại.
- **Expected**: 409 Conflict, message "Email already in use".
- **Risk**: Leak thông tin User tồn tại qua response.

### EC-02: Expired Token
- **Input**: Gửi request với token đã hết hạn.
- **Expected**: 401 Unauthorized, trigger luồng refresh token hoặc redirect login.
- **Risk**: User bị logout đột ngột mà không có thông báo.

## Test Data
**Approach**: Test DB riêng biệt cho mỗi test run.
- [ ] User `admin_test` với quyền quản trị.
- [ ] User `regular_test` cho happy path.
- [ ] Mock Token hết hạn để test expired case.

## Coverage Targets
- Services: 70%
- Utils (JWT, Hashing): 90%
