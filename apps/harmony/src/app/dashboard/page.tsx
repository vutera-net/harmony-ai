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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-harmony-teal"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Chào mừng trở lại, {user?.name || 'Bạn'}!
        </h1>
        <p className="text-slate-600">
          Hành trình thấu hiểu bản thân và tìm kiếm sự cân bằng của bạn tiếp tục tại đây.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {APPS.map((app) => (
          <div 
            key={app.name} 
            className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-harmony-teal transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center text-2xl`}>
                {app.icon}
              </div>
              <Link 
                href={app.url}
                className="text-xs font-semibold text-harmony-teal bg-harmony-teal/10 px-3 py-1 rounded-full hover:bg-harmony-teal hover:text-white transition-colors"
              >
                Truy cập →
              </Link>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{app.name}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {app.description}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Trạng thái thành viên</h3>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-harmony-gold text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider">
              {user?.subscription?.plan || 'Miễn phí'}
            </span>
            <span className="text-slate-400 text-sm">
              {user?.subscription?.status === 'active' ? 'Đang hoạt động' : 'Vui lòng nâng cấp để trải nghiệm đầy đủ'}
            </span>
          </div>
        </div>
        <Link 
          href="https://menhan.vutera.net/subscription"
          className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors"
        >
          Nâng cấp gói
        </Link>
      </section>
    </div>
  );
}
