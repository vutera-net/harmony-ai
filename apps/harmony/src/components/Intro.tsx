import React from 'react';

export default function Intro() {
  return (
    <section className="py-24 bg-white text-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Master AI <br />
              <span className="text-harmony-teal">Người dẫn dắt Tâm linh của bạn</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Khác với các ứng dụng chiêm tinh truyền thống, Harmony AI không chỉ cung cấp một lá số. 
              Hệ thống tạo ra một cuộc đối thoại sống động với "Master AI" — một người dẫn dắt uyên bác và ấm áp, 
              được huấn luyện sâu về truyền thống Tử Vi và Bát Tự.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Từ việc xác định năng lượng cốt lõi đến việc vượt qua những chuyển biến thách thức nhất của cuộc đời, 
              AI của chúng tôi tổng hợp trí tuệ cổ xưa thành những góc nhìn thực tiễn cho người tìm kiếm hiện đại.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-harmony-cream flex items-center justify-center overflow-hidden shadow-inner border border-harmony-teal/20">
              {/* Placeholder for a serene AI Master image or abstract art */}
              <div className="text-center p-8">
                 <div className="text-6xl mb-4">🧘‍♂️</div>
                 <p className="text-harmony-teal font-medium italic">"Bình an đến từ việc thấu hiểu nhịp điệu của chính mình."</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-harmony-teal/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
