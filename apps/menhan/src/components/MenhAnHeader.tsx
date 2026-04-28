'use client';

import React from 'react';
import { BrandHeader } from '@harmony/ui';
import { useAuthContext } from '@harmony/auth/context';
import Link from 'next/link';
import { getSSOLoginURL, getSSOLogoutURL } from '@harmony/auth';

function HeaderContent() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <Link 
        href={getSSOLoginURL('/chat')}
        className="bg-harmony-gold text-slate-950 px-4 py-2 rounded-lg text-sm font-medium hover:bg-harmony-gold/90 transition-all active:scale-95"
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
        <div className="w-6 h-6 bg-harmony-gold rounded-full flex items-center justify-center text-slate-950 text-[10px] font-bold">
          {user.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <span className="text-xs font-medium text-slate-700">{user.name || 'Người dùng'}</span>
      </div>
      <div className="group relative">
        <button className="p-1 rounded-full hover:bg-slate-100 transition-colors">
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 hidden group-hover:block z-50">
          <Link href="https://harmony.vutera.net/dashboard" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-harmony-gold">
            Harmony Hub
          </Link>
          <Link href="/journal" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-harmony-gold">
            Nhật Ký Vận Mệnh
          </Link>
          <Link href="/reports" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-harmony-gold">
            Báo Cáo PDF
          </Link>
          <hr className="my-1 border-slate-100" />
          <Link 
            href={getSSOLogoutURL('/chat')}
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            Đăng xuất
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileHeaderRight() {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-harmony-gold rounded-full flex items-center justify-center text-slate-950 text-xs font-bold shadow-sm">
        {user.name?.[0]?.toUpperCase() || 'U'}
      </div>
    </div>
  );
}

function MobileHeaderContent() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <Link 
        href={getSSOLoginURL('/chat')}
        className="block w-full text-center bg-harmony-gold text-slate-950 px-4 py-2 rounded-lg text-sm font-medium hover:bg-harmony-gold/90 transition-all"
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg border border-slate-200 mb-2">
        <div className="w-6 h-6 bg-harmony-gold rounded-full flex items-center justify-center text-slate-950 text-[10px] font-bold">
          {user.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <span className="text-xs font-medium text-slate-700 truncate">{user.name || 'Người dùng'}</span>
      </div>
      <Link href="https://harmony.vutera.net/dashboard" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
        Harmony Hub
      </Link>
      <Link href="/journal" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
        Nhật Ký Vận Mệnh
      </Link>
      <Link href="/reports" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
        Báo Cáo PDF
      </Link>
      <Link 
        href={getSSOLogoutURL('/chat')}
        className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
      >
        Đăng xuất
      </Link>
    </div>
  );
}

export function MenhAnHeader() {
  return (
    <BrandHeader 
      appName="MenhAn Sanctuary" 
      appUrl="/" 
      navLinks={[
        { label: "Trò chuyện AI", href: "/chat" },
        { label: "Nhật ký", href: "/journal" },
        { label: "Báo cáo", href: "/reports" },
      ]}
      rightContent={<HeaderContent />}
      mobileHeaderRight={<MobileHeaderRight />}
      mobileRightContent={<MobileHeaderContent />}
      variant="dark"
    />
  );
}
