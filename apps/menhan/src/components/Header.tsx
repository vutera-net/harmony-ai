'use client';

import Link from 'next/link';
import { useAuthContext } from '@harmony/auth/context';
import { BrandHeader } from '@harmony/ui';

export function Header() {
  const { user, logout } = useAuthContext();

  const authContent = user ? (
    <>
      <span className="hidden sm:block text-sm text-slate-400 truncate max-w-[120px]">
        {user.name || user.email}
      </span>
      <button
        onClick={logout}
        className="text-sm text-slate-400 hover:text-harmony-gold transition-colors whitespace-nowrap"
      >
        Đăng xuất
      </button>
    </>
  ) : (
    <>
      <Link
        href="/auth/login"
        className="text-sm text-slate-400 hover:text-harmony-gold transition-colors font-medium whitespace-nowrap"
      >
        Đăng nhập
      </Link>
      <Link
        href="/auth/register"
        className="text-sm bg-harmony-gold text-slate-950 px-3 py-1.5 rounded-lg hover:bg-harmony-gold/90 transition-colors whitespace-nowrap font-medium"
      >
        Đăng ký
      </Link>
    </>
  );

  return (
    <BrandHeader
      appName="MenhAn Sanctuary"
      appUrl="/"
      variant="dark"
      navLinks={[
        { label: 'Nhật Ký Vận Mệnh', href: '/journal' },
        { label: 'Master AI', href: '/chat' },
        { label: 'Báo Cáo', href: '/reports' },
      ]}
      rightContent={authContent}
    />
  );
}
