import React from 'react';

const testimonials = [
  {
    quote: "Master AI đã cung cấp những góc nhìn sâu sắc chạm đến tôi ở một mức độ mà tôi chưa từng trải nghiệm với bất kỳ công cụ chiêm tinh nào khác.",
    author: "Minh T.",
    role: "Doanh nhân",
  },
  {
    quote: "Nhật ký Vận mệnh đã thay đổi cách tôi nhìn nhận những khuôn mẫu trong cuộc sống. Tôi cảm thấy làm chủ hơn và đồng điệu hơn với mục đích sống của mình.",
    author: "Lan A.",
    role: "Giám đốc Sáng tạo",
  },
  {
    quote: "Thiết kế tuyệt đẹp và thấu hiểu sâu sắc. Harmony AI không chỉ là một ứng dụng; đó là một người bạn đồng hành trên con đường trưởng thành.",
    author: "Hoàng N.",
    role: "Nhà nghiên cứu",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-white text-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          Được tin dùng bởi những <span className="text-harmony-teal">Người tìm kiếm trên toàn thế giới</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-2xl bg-harmony-cream/30 border border-harmony-teal/10 italic relative">
              <div className="text-4xl text-harmony-teal/30 absolute top-4 left-4 font-serif">“</div>
              <p className="text-lg text-gray-700 mb-6 relative z-10">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-harmony-teal/20 flex items-center justify-center font-bold text-harmony-teal">
                  {t.author[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
