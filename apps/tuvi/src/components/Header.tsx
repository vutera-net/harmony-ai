import Link from "next/link";
import { useAuthContext } from "@harmony/auth/context";
import { BrandHeader } from "@harmony/ui";

export function Header() {
  const { user, logout } = useAuthContext();

  return (
    <div className="relative">
      <BrandHeader 
        appName="TuVi" 
        appUrl="/" 
        navLinks={[
          { label: "Lịch", href: "/tools/calendar" },
          { label: "Ngày Tốt", href: "/tools/lucky-days" },
          { label: "Về TuVi", href: "/about" },
        ]}
      />
      {/* Overlay Auth Logic to maintain functionality while using BrandHeader */}
      <div className="absolute top-0 right-0 h-16 px-4 flex items-center gap-4 z-10">
        {user ? (
          <>
            <span className="text-sm text-slate-600">{user.name || user.email}</span>
            <button
              onClick={logout}
              className="text-sm text-slate-600 hover:text-harmony-teal transition-colors"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="text-sm text-slate-600 hover:text-harmony-teal transition-colors font-medium"
            >
              Đăng nhập
            </Link>
            <Link
              href="/auth/register"
              className="text-sm bg-harmony-teal text-white px-4 py-2 rounded-lg hover:bg-harmony-teal/90 transition-colors"
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
