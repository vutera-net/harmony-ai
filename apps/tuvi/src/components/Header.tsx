'use client';

import Link from "next/link";
import { useAuthContext } from "@harmony/auth/context";
import { BrandHeader } from "@harmony/ui";

export function Header() {
  const { user, logout } = useAuthContext();

  const authContent = user ? (
    <>
      <span className="hidden sm:block text-sm text-slate-600 truncate max-w-[120px]">{user.name || user.email}</span>
      <button
        onClick={logout}
        className="text-sm text-slate-600 hover:text-harmony-teal transition-colors whitespace-nowrap"
      >
        Đăng xuất
      </button>
    </>
  ) : (
    <>
      <Link
        href="/auth/login"
        className="text-sm text-slate-600 hover:text-harmony-teal transition-colors font-medium whitespace-nowrap"
      >
        Đăng nhập
      </Link>
      <Link
        href="/auth/register"
        className="text-sm bg-harmony-teal text-white px-3 py-1.5 rounded-lg hover:bg-harmony-teal/90 transition-colors whitespace-nowrap"
      >
        Đăng ký
      </Link>
    </>
  );

  return (
    <BrandHeader
      appName="TuVi"
      appUrl="/"
      navLinks={[
        { label: "Lịch", href: "/tools/calendar" },
        { label: "Ngày Tốt", href: "/tools/lucky-days" },
        { label: "Về TuVi", href: "/about" },
      ]}
      rightContent={authContent}
    />
  );
}
