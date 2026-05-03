import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-slate-300 px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Chính Sách Bảo Mật</h1>
        <div className="space-y-6 text-base leading-relaxed">
          <p>
            Tại Harmony AI, quyền riêng tư của bạn là ưu tiên hàng đầu của chúng tôi. Chúng tôi hiểu rằng dữ liệu ngày giờ sinh là thông tin cá nhân nhạy cảm.
          </p>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Thu thập và Sử dụng Dữ liệu</h2>
            <p>
              Chúng tôi thu thập thông tin ngày, giờ, tháng, năm sinh và địa điểm sinh để thực hiện các tính toán chiêm tinh. Dữ liệu này được sử dụng duy nhất cho mục đích lập lá số và phân tích bởi Master AI.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Cam kết Bảo mật</h2>
            <p>
              Chúng tôi cam kết:
            </p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Không bao giờ hiển thị công khai giờ sinh của người dùng.</li>
              <li>Sử dụng mã hóa AES-256 cho các trường dữ liệu nhạy cảm trong cơ sở dữ liệu.</li>
              <li>Không bán hoặc chia sẻ dữ liệu cá nhân cho bên thứ ba vì mục đích thương mại.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Quyền của Người dùng</h2>
            <p>
              Bạn có quyền yêu cầu truy xuất, chỉnh sửa hoặc xóa bỏ hoàn toàn dữ liệu cá nhân của mình khỏi hệ thống Harmony AI bất cứ lúc nào.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
