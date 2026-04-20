# Test Plan — Phase 03: MenhAn Sanctuary - MVP

## Goals
- Kiểm tra chất lượng luận giải của Master AI (Vibe, Độ sâu).
- Xác minh luồng thanh toán Pay-per-view hoạt động chính xác.
- Kiểm tra trải nghiệm Zen UI (Bridge UI).

## Test Strategy
| Test Type | Mục tiêu | Tools | Coverage Target |
|-----------|---------|-------|----------------|
| Integration | LLM API $\rightarrow$ Master AI Prompt $\rightarrow$ Response | jest + Mock LLM | Critical paths |
| E2E | Thanh toán $\rightarrow$ Unlock luận giải | supertest + Mock Payment | 100% Happy path |
| Manual | "Vibe Check": Độ ấm áp, thông thái của Master AI | Human Review | Checklist |

## User Scenarios
### SC-03-01: Luận giải chuyên sâu từ Master AI
**Given**: User đã login và trả phí/có quyền.
**When**: Yêu cầu luận giải chi tiết về "Sự nghiệp năm 2026".
**Then**: Master AI trả về nội dung có cấu trúc, văn phong bậc thầy, phân tích dựa trên dữ liệu lá số thật.

### SC-03-02: Luồng thanh toán Pay-per-view
**Given**: User muốn xem báo cáo chi tiết nhưng chưa trả phí.
**When**: Chọn "Mua báo cáo" $\rightarrow$ Thanh toán thành công qua Gateway.
**Then**: Hệ thống unlock nội dung luận giải chi tiết ngay lập tức.

### SC-03-03: Trải nghiệm Bridge UI (Chiêm nghiệm)
**Given**: User gửi yêu cầu luận giải sâu.
**When**: Hệ thống đang gọi LLM API.
**Then**: Hiển thị loading state "Master AI đang chiêm nghiệm..." với animation mượt mà.

## Edge Cases
### EC-05: AI Hallucination (Nói sảng)
- **Input**: Yêu cầu AI dự báo một sự kiện không thể xảy ra hoặc phi lý.
- **Expected**: AI từ chối khéo léo hoặc đưa ra lời khuyên mang tính định hướng, không khẳng định sai sự thật.
- **Risk**: AI đưa ra thông tin gây hoang mang cho người dùng.

### EC-06: Payment Timeout / Fail
- **Input**: Thanh toán bị ngắt quãng hoặc bị từ chối bởi ngân hàng.
- **Expected**: Thông báo lỗi rõ ràng, không unlock nội dung, cho phép thử lại.
- **Risk**: User bị trừ tiền nhưng không nhận được kết quả.

## Test Data
- [ ] ชุด prompts "stress test" để thử thách Master AI.
- [ ] Test credentials cho Payment Gateway (Sandbox mode).
