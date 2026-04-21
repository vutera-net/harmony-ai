import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-harmony-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-harmony-teal/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-serif text-harmony-gold tracking-tight">
            MenhAn Sanctuary
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light italic">
            "Hành trình thấu hiểu bản thân, kiến tạo bình an."
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/onboarding" 
            className="px-8 py-4 bg-harmony-gold text-slate-950 font-medium rounded-full hover:bg-harmony-gold/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-harmony-gold/20"
          >
            Bắt đầu hành trình
          </Link>
          <Link 
            href="/chat" 
            className="px-8 py-4 bg-transparent border border-slate-700 text-slate-300 font-medium rounded-full hover:bg-slate-800 transition-all"
          >
            Trò chuyện cùng Master AI
          </Link>
        </div>

        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { 
              title: "Luận Giải Chuyên Sâu", 
              desc: "Phân tích chi tiết Bát Tự và Tử Vi Đẩu Số cùng Master AI.",
              icon: "✨" 
            },
            { 
              title: "Nhật Ký Vận Mệnh", 
              desc: "Ghi chép và đối soát thực tế để tăng độ tin cậy.",
              icon: "📖" 
            },
            { 
              title: "Báo Cáo Độc Bản", 
              desc: "Nhận bản PDF phân tích chi tiết thiết kế cho riêng bạn.",
              icon: "📜" 
            },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-harmony-gold/30 transition-colors group">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-medium text-slate-200 mb-2 group-hover:text-harmony-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
