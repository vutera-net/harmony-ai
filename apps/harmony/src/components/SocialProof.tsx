import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Tôi luôn tìm kiếm sự kết nối giữa công nghệ và đời sống tâm linh phương Đông. Harmony đã giúp tôi nhìn nhận các chu kỳ cá nhân một cách khách quan và chính xác đến ngạc nhiên.",
    author: "Minh Huy",
    role: "Doanh nhân / Người dùng AnMenh",
  },
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
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-teal-600 overflow-hidden relative">
       <div className="absolute top-0 right-0 p-32 bg-teal-700/50 rounded-full scale-150 blur-3xl"></div>
       <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
             <div className="w-full lg:w-1/2 text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Hành trình ngàn năm, công nghệ dẫn lối</h2>
                <div className="grid grid-cols-2 gap-12">
                   <div>
                      <p className="text-5xl font-bold mb-2">100K+</p>
                      <p className="text-teal-100 font-medium">Lá số đã được lập</p>
                   </div>
                   <div>
                      <p className="text-5xl font-bold mb-2">4.9/5</p>
                      <div className="flex text-amber-300 gap-1 mb-2">
                         {[...Array(5)].map((_, i) => (
                           <span key={i} className="fill-current">★</span>
                         ))}
                      </div>
                      <p className="text-teal-100 font-medium">Đánh giá hài lòng</p>
                   </div>
                </div>
             </div>
             
             <div className="w-full lg:w-1/2">
                <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 relative">
                   <Quote className="absolute top-10 left-10 w-12 h-12 text-teal-400 opacity-20" />
                   <p className="text-xl md:text-2xl text-teal-50 font-serif italic mb-8 relative z-10 leading-relaxed">
                     {testimonials[0].quote}
                   </p>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center font-bold text-teal-900">
                        {testimonials[0].author[0]}
                      </div>
                      <div>
                         <p className="text-white font-bold">{testimonials[0].author}</p>
                         <p className="text-teal-200 text-sm">{testimonials[0].role}</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
}
