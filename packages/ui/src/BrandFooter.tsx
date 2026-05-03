import React from 'react';

export function BrandFooter() {
  return (
    <footer className="bg-gray-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-harmony-teal/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-harmony-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">✦</span>
              </div>
              <span className="font-bold text-white text-lg">Harmony AI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Một Digital Sanctuary cao cấp, nơi trí tuệ cổ truyền gặp gỡ AI hiện đại, thuộc hệ sinh thái Vutera.
            </p>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="font-semibold text-white mb-4">Hệ Sinh Thái</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://tuvi.vutera.net" className="hover:text-harmony-teal transition-colors">
                  Harmony TuVi (Free)
                </a>
              </li>
              <li>
                <a href="https://menhan.vutera.net" className="hover:text-harmony-teal transition-colors">
                  MenhAn Sanctuary (Premium)
                </a>
              </li>
              <li>
                <a href="https://id.vutera.net" className="hover:text-harmony-teal transition-colors">
                  Identity System
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Thông Tin</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://harmony.vutera.net/about" className="hover:text-harmony-teal transition-colors">
                  Về Harmony
                </a>
              </li>
              <li>
                <a href="https://harmony.vutera.net/privacy" className="hover:text-harmony-teal transition-colors">
                  Chính Sách Bảo Mật
                </a>
              </li>
              <li>
                <a href="https://harmony.vutera.net/terms" className="hover:text-harmony-teal transition-colors">
                  Điều Khoản Dịch Vụ
                </a>
              </li>
              <li>
                <a href="https://harmony.vutera.net/contact" className="hover:text-harmony-teal transition-colors">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kết Nối</h4>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-harmony-teal transition-colors text-white">
                Fb
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-harmony-teal transition-colors text-white">
                Tw
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-harmony-teal transition-colors text-white">
                Ig
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2026 Harmony AI. A product of Vutera. All rights reserved.</p>
          <div className="flex gap-4 italic text-xs">
            <span>Designed for Inner Peace & Balance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

