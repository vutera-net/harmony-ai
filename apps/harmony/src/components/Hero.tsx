'use client';
import React from 'react';
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from '@harmony/auth/context';

export default function Hero() {
  const { user } = useAuthContext();

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-[radial-gradient(circle_at_top_right,_#E6FFFA,_transparent),radial-gradient(circle_at_bottom_left,_#FFF9E6,_transparent)]">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-teal-100 shadow-sm mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-teal-500" />
          <span className="text-xs font-bold tracking-widest uppercase text-teal-700">Hệ sinh thái Tâm linh Công nghệ</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
          <span className="block italic font-serif text-teal-600">Harmony</span>
          {user ? (
            <>Chào trở lại, <span className="text-harmony-teal">{user.name || 'Bạn'}</span></>
          ) : (
            <>Cõi Riêng Của Sự Bình An</>
          )}
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          {user 
            ? "Hành trình chiêm nghiệm vận mệnh của bạn vẫn đang tiếp diễn. Hãy quay lại Sanctuary để tìm thấy sự an lạc."
            : "Khai sáng vận mệnh, kiến tạo cuộc sống cân bằng qua hệ sinh thái Tử Vi & Phong Thủy AI tiên phong, kết hợp tri thức cổ truyền với công nghệ hiện đại."
          }
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href={user ? "https://menhan.vutera.net/dashboard" : "https://tuvi.vutera.net"} className="w-full sm:w-auto px-10 py-5 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 group">
              {user ? "Tiếp tục vào Sanctuary" : "Khám phá miễn phí ngay"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="https://menhan.vutera.net" className="w-full sm:w-auto px-10 py-5 bg-white text-teal-700 border-2 border-teal-100 font-bold rounded-2xl hover:bg-teal-50 transition-all shadow-sm">
              MenhAn Sanctuary
          </Link>
        </div>
      </div>
      
      {/* Abstract shapes */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-200/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-[120px] -z-10"></div>
    </section>
  );
}
