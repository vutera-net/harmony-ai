import React from 'react';
import Link from 'next/link';

export function FinalCTA() {
  return (
    <section className="py-32 bg-[radial-gradient(circle_at_center,_#E6FFFA,_#FDFCF9)]">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl border border-teal-50 animate-spin-slow">
          <span className="text-4xl">☯</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8">Bắt đầu hành trình <br/> bình an ngay hôm nay</h2>
        <p className="text-lg md:text-xl text-slate-600 mb-12">Tham gia cùng hàng trăm nghìn người đang kiến tạo cuộc sống cân bằng và ý nghĩa hơn cùng Harmony.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="https://tuvi.vutera.net" className="w-full sm:w-auto px-10 py-5 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-500/30">Lập lá số miễn phí</Link>
          <Link href="https://accounts.vutera.net/register" className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all">Đăng ký tài khoản</Link>
        </div>
      </div>
    </section>
  );
}
