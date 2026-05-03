'use client';

import React, { useState } from 'react';
import { BrandHeader } from '@harmony/ui';
import { useAuthContext, AuthProvider } from '@harmony/auth/context';
import Link from 'next/link';
import { getSSOLoginURL, getSSOLogoutURL, logout } from '@harmony/auth';

function HeaderContent() {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
        <Link 
          href={getSSOLoginURL('https://menhan.vutera.net/dashboard')}
          className="bg-harmony-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-harmony-teal/90 transition-all active:scale-95"
        >
          Vào Sanctuary
        </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
        <div className="w-6 h-6 bg-harmony-teal rounded-full flex items-center justify-center text-white text-[10px] font-bold">
          {user.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <span className="text-xs font-semibold text-slate-900">{user.name || 'Người dùng'}</span>
      </div>
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full hover:bg-slate-100 transition-colors"
          aria-expanded={isOpen}
        >
          <svg className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
            <Link 
              href="https://menhan.vutera.net/dashboard" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 hover:text-harmony-teal font-medium"
            >
              Vào Sanctuary
            </Link>
            <Link 
              href="https://id.vutera.net/account" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 hover:text-harmony-teal font-medium"
            >
              Quản lý tài khoản
            </Link>
            <hr className="my-1 border-slate-100" />
            <button 
              onClick={async () => {
                await logout();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileHeaderRight() {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-harmony-teal rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
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
        href={getSSOLoginURL('https://menhan.vutera.net/dashboard')}
        className="block w-full text-center bg-harmony-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-harmony-teal/90 transition-all"
      >
        Vào Sanctuary
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg border border-slate-200 mb-2">
        <div className="w-6 h-6 bg-harmony-teal rounded-full flex items-center justify-center text-white text-[10px] font-bold">
          {user.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <span className="text-xs font-semibold text-slate-900 truncate">{user.name || 'Người dùng'}</span>
      </div>
        <Link href="https://menhan.vutera.net/dashboard" className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-50 rounded-lg font-medium">
          Vào Sanctuary
        </Link>
        <Link href="https://id.vutera.net/account" className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-50 rounded-lg font-medium">
          Quản lý tài khoản
        </Link>

      <button 
        onClick={async () => {
          await logout();
        }}
        className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
      mobileHeaderRight={<MobileHeaderRight />}
      mobileRightContent={<MobileHeaderContent />}
    />
  );
}
