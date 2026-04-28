'use client';

import React from 'react';
import { useAuthContext } from '@harmony/auth/context';
import Link from 'next/link';

const APPS = [
  {
    name: 'TuVi App',
    description: 'Tra cứu lịch âm, ngày tốt xấu và xem tử vi cơ bản.',
    url: 'https://tuvi.vutera.net',
    icon: '📅',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    name: 'MenhAn Sanctuary',
    description: 'Phân tích vận mệnh chuyên sâu cùng Master AI và Nhật ký Vận mệnh.',
    url: 'https://menhan.vutera.net',
    icon: '✨',
    color: 'bg-purple-50 text-purple-600',
  },
];

export default function DashboardPage() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-harmony-cream">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-harmony-teal"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-harmony-cream">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Chào mừng trở lại, <span className="text-harmony-teal">{user?.name || 'Bạn'}</span>! ✨
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Hành trình thấu hiểu bản thân và tìm kiếm sự cân bằng của bạn tiếp tục tại đây. Hãy chọn công cụ bạn muốn sử dụng hôm nay.
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {APPS.map((app) => (
            <div 
              key={app.name} 
              className="group relative p-8 bg-white border border-harmony-teal/10 rounded-3xl hover:border-harmony-teal transition-all hover:shadow-xl hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-harmony-cream rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 group-hover:bg-harmony-teal/5" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 ${app.color.replace('bg-blue-50', 'bg-harmony-teal/10').replace('text-blue-600', 'text-harmony-teal').replace('bg-purple-50', 'bg-harmony-purple/10').replace('text-purple-600', 'text-harmony-purple')} rounded-2xl flex items-center justify-center text-3xl shadow-sm`}>
                    {app.icon}
                  </div>
                  <Link 
                    href={app.url}
                    className="text-sm font-bold text-harmony-teal bg-harmony-teal/10 px-4 py-2 rounded-full hover:bg-harmony-teal hover:text-white transition-all active:scale-95"
                  >
                    Truy cập ngay →
                  </Link>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{app.name}</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  {app.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="relative overflow-hidden bg-white rounded-3xl p-8 md:p-12 border border-harmony-teal/20 shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-harmony-teal/10 blur-3xl rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-harmony-purple/10 blur-3xl rounded-full -ml-32 -mb-32" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trạng thái thành viên</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-harmony-gold text-gray-900 text-xs font-black rounded-full uppercase tracking-widest shadow-sm">
                  {user?.subscription?.plan || 'Miễn phí'}
                </div>
                <span className="text-gray-500 text-sm font-medium">
                  {user?.subscription?.status === 'active' ? '⚡ Tài khoản đang hoạt động' : 'Vui lòng nâng cấp để trải nghiệm đầy đủ đặc quyền'}
                </span>
              </div>
            </div>
            <Link 
              href="https://menhan.vutera.net/subscription"
              className="w-full md:w-auto text-center bg-harmony-teal text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-harmony-teal/90 transition-all hover:shadow-lg active:scale-95"
            >
              Nâng cấp gói thành viên
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
