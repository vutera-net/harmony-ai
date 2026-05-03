import React from 'react';
import Link from 'next/link';
import { LayoutGrid, Shield, ChevronRight } from 'lucide-react';

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 text-center">
         <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Hệ Sinh Thái Harmony</h2>
         <p className="text-slate-500 mb-16 max-w-2xl mx-auto text-lg">Từ vệ tinh thu hút hàng triệu người đến lõi sanctuary siêu cá nhân hóa.</p>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* TuVi Card */}
            <div className="group bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-all duration-500 text-left overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-[10rem] -z-0 group-hover:scale-110 transition-transform"></div>
               <div className="relative z-10">
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-8">
                     <LayoutGrid className="w-8 h-8 text-teal-600" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Mở cửa miễn phí</div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-4">TuVi App</h4>
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    Cổng thông tin vệ tinh, cho phép khám phá tử vi nhẹ nhàng, lập lá số tức thời cho hàng triệu người dùng mới.
                  </p>
                  <Link href="https://tuvi.vutera.net" className="flex items-center text-teal-600 font-bold group/link">
                     Bắt đầu trải nghiệm ngay <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>

            {/* AnMenh Card */}
            <div className="group bg-slate-900 rounded-[3rem] p-10 shadow-2xl shadow-indigo-900/10 border border-slate-800 hover:-translate-y-2 transition-all duration-500 text-left overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-bl-[10rem] -z-0"></div>
               <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20">
                     <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-teal-900/50 text-teal-300 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Premium Sanctuary</div>
                  <h4 className="text-3xl font-bold text-white mb-4">MenhAn App</h4>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Lõi của cả hệ sinh thái. Không gian lưu trữ cá nhân hóa sâu sắc, theo dõi vận hạn hằng ngày và quản lý lá số nâng cao.
                  </p>
                  <Link href="https://menhan.vutera.net" className="flex items-center text-teal-400 font-bold group/link">
                     Khám phá Sanctuary chuyên sâu <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}
