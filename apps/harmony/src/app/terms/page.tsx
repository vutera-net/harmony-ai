import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-slate-300 px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Điều Khoản Dịch Vụ</h1>
        <div className="space-y-6 text-base leading-relaxed">
          <p>
            Chào mừng bạn đến với Harmony AI. Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản sau:
          </p>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Tính chất Dịch vụ</h2>
            <p>
              Harmony AI cung cấp các phân tích dựa trên tri thức cổ truyền và AI. Các kết quả luận giải mang tính chất tham khảo và định hướng, không phải là lời khẳng định tuyệt đối về tương lai hay lời khuyên y tế/pháp lý/tài chính chuyên nghiệp.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Sử dụng Dịch vụ</h2>
            <p>
              Người dùng cam kết cung cấp thông tin ngày giờ sinh chính xác nhất có thể để nhận được kết quả phân tích tối ưu.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Gói Cước và Thanh toán</h2>
            <p>
              Các gói Premium (An Nhiên, Bình An) được cung cấp theo dạng thuê bao hoặc thanh toán theo lượt. Việc thanh toán được thực hiện qua cổng thanh toán chính thức của Vutera.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Giới hạn Trách nhiệm</h2>
            <p>
              Harmony AI không chịu trách nhiệm cho bất kỳ quyết định cá nhân nào được đưa ra dựa trên kết quả luận giải của AI.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
