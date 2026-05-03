import React from 'react';
import { Compass } from 'lucide-react';
import { YinYangVisual } from './YinYangVisual';

export default function Intro() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative">
             <YinYangVisual />
             <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-teal-100 max-w-[200px] animate-bounce-slow">
                <p className="text-teal-700 font-serif italic text-lg leading-tight">&quot;Công nghệ khai sáng, phụng sự con người&quot;</p>
             </div>
          </div>
          
          <div className="w-full lg:w-1/2">
             <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-4">Harmony là gì?</h2>
             <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">Sống Hài Hòa Với <br/> Dòng Chảy Vũ Trụ</h3>
             <div className="space-y-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                <p>
                  Harmony không phải công cụ bói toán, mà là <strong>“người bạn đồng hành”</strong> giúp bạn tự chủ vận mệnh thông qua sự thấu hiểu sâu sắc năng lượng bản thân.
                </p>
                <p>
                  Triết lý của chúng tôi đặt con người làm trọng tâm, ứng dụng công nghệ để làm sáng tỏ những tri thức cổ truyền, giúp bạn cân bằng ngũ hành, đón lành tránh dữ và tìm thấy sự bình an trong tâm hồn.
                </p>
             </div>
             
             <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-bold text-teal-600 mb-1">Cân bằng</p>
                  <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Năng lượng cá nhân</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-teal-600 mb-1">AI-Driven</p>
                  <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Insight thông thái</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
