import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">✦</span>
              </div>
              <span className="font-bold text-white text-lg">TuVi</span>
            </div>
            <p className="text-sm text-slate-400">
              Công cụ tra cứu vận mệnh miễn phí
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-white mb-4">Công Cụ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/calendar" className="hover:text-blue-400">
                  Lịch Vạn Niên
                </Link>
              </li>
              <li>
                <Link href="/tools/lucky-days" className="hover:text-blue-400">
                  Ngày Tốt Xấu
                </Link>
              </li>
              <li>
                <Link href="/tools/basic-chart" className="hover:text-blue-400">
                  Lá Số Cơ Bản
                </Link>
              </li>
              <li>
                <Link href="/tools/horoscope" className="hover:text-blue-400">
                  Dự Báo Năm
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Công Ty</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-400">
                  Về Harmony
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400">
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400">
                  Điều Khoản Dịch Vụ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Premium */}
          <div>
            <h4 className="font-semibold text-white mb-4">Premium</h4>
            <p className="text-sm text-slate-400 mb-4">
              Cần phân tích sâu hơn?
            </p>
            <a
              href="https://menhan.vutera.net"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Khám Phá MenhAn
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2026 Harmony AI. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-400">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-400">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
