'use client';

import React from 'react';
import { BrandHeader } from '@harmony/ui';
import { useAuthContext, AuthProvider } from '@harmony/auth/context';
import Link from 'next/link';
import { getSSOLoginURL, logout } from '@harmony/auth';

function HeaderContent() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <Link 
        href={getSSOLoginURL('/')}
        className="bg-harmony-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-harmony-teal/90 transition-all active:scale-95"
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
        <div className="w-6 h-6 bg-harmony-teal rounded-full flex items-center justify-center text-white text-[10px] font-bold">
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
          <Link href="/dashboard" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-harmony-teal">
            Dashboard
          </Link>
          <Link href="/account" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-harmony-teal">
            Tài khoản
          </Link>
          <hr className="my-1 border-slate-100" />
          <button 
            onClick={async () => {
              await logout();
              window.location.href = '/';
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileHeaderContent() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <Link 
        href={getSSOLoginURL('/')}
        className="block w-full text-center bg-harmony-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-harmony-teal/90 transition-all"
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg border border-slate-200 mb-2">
        <div className="w-6 h-6 bg-harmony-teal rounded-full flex items-center justify-center text-white text-[10px] font-bold">
          {user.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <span className="text-xs font-medium text-slate-700 truncate">{user.name || 'Người dùng'}</span>
      </div>
      <Link href="/dashboard" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
        Dashboard
      </Link>
      <Link href="/account" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
        Tài khoản
      </Link>
      <button 
        onClick={async () => {
          await logout();
          window.location.href = '/';
        }}
        className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
      >
        Đăng xuất
      </button>
    </div>
  );
}

export function HarmonyHeader() {
  return (
    <BrandHeader 
      appName="Harmony AI" 
      appUrl="/" 
      navLinks={[
        { label: "TuVi App", href: "https://tuvi.vutera.net" },
        { label: "MenhAn Sanctuary", href: "https://menhan.vutera.net" },
        { label: "Câu chuyện", href: "#intro" },
      ]}
      rightContent={<HeaderContent />}
      mobileRightContent={<MobileHeaderContent />}
    />
  );
}
