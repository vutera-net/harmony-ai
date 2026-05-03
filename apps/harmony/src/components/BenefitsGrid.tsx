import React from 'react';
import { Compass, Calendar, Moon, Layers, Users } from 'lucide-react';

export function BenefitsGrid() {
  const benefits = [
    { icon: <Compass className="text-teal-500" />, title: "Hiểu rõ vận mệnh", desc: "Giải mã chính xác xu hướng cuộc sống" },
    { icon: <Calendar className="text-amber-500" />, title: "Ngày tốt - Giờ đẹp", desc: "Chọn thời điểm hoàn hảo cho đại sự" },
    { icon: <Moon className="text-purple-500" />, title: "Phong thủy cá nhân", desc: "Ứng dụng ngũ hành vào không gian sống" },
    { icon: <Layers className="text-indigo-500" />, title: "Cân bằng Ngũ Hành", desc: "Điều tiết năng lượng nội tại" },
    { icon: <Users className="text-emerald-500" />, title: "Cộng đồng tinh thức", desc: "Kết nối những tâm hồn đồng điệu" }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Lợi Ích Của Harmony</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {benefits.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-teal-100/50 transition-all group">
               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                 {item.icon}
               </div>
               <h4 className="font-bold text-slate-900 mb-3">{item.title}</h4>
               <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
