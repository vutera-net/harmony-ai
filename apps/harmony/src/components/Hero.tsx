'use client';
import React from 'react';
import Link from 'next/link';
import { useAuthContext } from '@harmony/auth/context';

export default function Hero() {
  const { user } = useAuthContext();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-harmony-cream text-gray-800">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-harmony-teal/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-harmony-purple/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
          {user ? (
            <>Chào trở lại, <span className="text-harmony-teal">{user.name || 'Bạn'}</span></>
          ) : (
            <>Harmony <span className="text-harmony-teal">AI</span></>
          )}
        </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {user 
              ? "Hành trình chiêm nghiệm vận mệnh của bạn vẫn đang tiếp diễn. Hãy quay lại Sanctuary để tìm thấy sự an lạc."
              : "Thánh đường số cho sự cân bằng tâm linh. Kết hợp siêu hình học cổ truyền Việt Nam với AI hiện đại để dẫn lối vận mệnh của bạn."
            }
          </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link 
               href={user ? "https://menhan.vutera.net/dashboard" : "https://tuvi.vutera.net"} 
               className="px-8 py-4 bg-harmony-teal text-white rounded-full font-semibold text-lg hover:bg-harmony-teal/90 transition-all shadow-lg hover:shadow-harmony-teal/30"
             >
               {user ? "Tiếp tục vào Sanctuary" : "Khám phá Bản đồ Vận mệnh"}
             </Link>
             <Link 
               href="#ecosystem" 
               className="px-8 py-4 bg-white text-harmony-teal border-2 border-harmony-teal rounded-full font-semibold text-lg hover:bg-harmony-teal/5 transition-all"
             >
               Khám phá Thánh Đường
             </Link>
           </div>
       </div>
    </section>
  );
}
