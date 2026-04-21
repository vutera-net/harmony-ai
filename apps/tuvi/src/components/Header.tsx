import Link from "next/link";
import { useAuthContext } from "@harmony/auth/context";

export function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">✦</span>
            </div>
            <span className="font-bold text-slate-900">TuVi</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tools/calendar" className="text-slate-600 hover:text-slate-900 text-sm font-medium">
              Lịch
            </Link>
            <Link href="/tools/lucky-days" className="text-slate-600 hover:text-slate-900 text-sm font-medium">
              Ngày Tốt
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 text-sm font-medium">
              Về TuVi
            </Link>
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-slate-600">{user.name || user.email}</span>
                <button
                  onClick={logout}
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm text-slate-600 hover:text-slate-900 font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
