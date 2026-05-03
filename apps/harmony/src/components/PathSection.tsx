import React from 'react';
import Link from 'next/link';

export function PathSection() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-20">Hành Trình Cùng Harmony</h2>
        
        <div className="relative">
          <div className="hidden md:block absolute top-[2.75rem] left-[15%] right-[15%] h-1 bg-dashed bg-gradient-to-r from-teal-100 via-teal-400 to-indigo-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 relative z-10">
             <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl shadow-teal-100 mb-8">
                  <span className="text-3xl font-bold text-teal-600">01</span>
                </div>
                <h4 className="text-2xl font-bold mb-4">Bắt đầu nhẹ nhàng</h4>
                <p className="text-slate-500 mb-8">Trải nghiệm những phân tích cơ bản miễn phí tại TuVi App để nhen nhóm sự thấu hiểu.</p>
                <Link href="https://tuvi.vutera.net" className="px-6 py-2 bg-teal-50 text-teal-600 rounded-full font-bold hover:bg-teal-100 transition-colors">Vào TuVi App</Link>
             </div>
             
             <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl shadow-indigo-100 mb-8">
                  <span className="text-3xl font-bold text-indigo-600">02</span>
                </div>
                <h4 className="text-2xl font-bold mb-4">Nâng tầm Sanctuary</h4>
                <p className="text-slate-500 mb-8">Chuyển sang MenhAn Sanctuary để quản lý sâu sát, theo dõi vận trình hằng ngày cá nhân hóa.</p>
                <Link href="https://menhan.vutera.net" className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full font-bold hover:bg-indigo-100 transition-colors">Vào MenhAn Sanctuary</Link>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
