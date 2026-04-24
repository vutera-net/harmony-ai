import React from 'react';

export function BrandFooter() {
  return (
    <footer className="py-12 bg-gray-900 text-gray-400 border-t border-harmony-teal/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-6 h-6 bg-harmony-teal rounded flex items-center justify-center">
                <span className="text-white text-xs">✦</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Harmony AI</h3>
            </div>
            <p className="text-sm opacity-80">© 2026 Vutera. Bảo lưu mọi quyền.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="hover:text-harmony-teal transition-colors text-sm">Chính sách Bảo mật</a>
            <a href="#" className="hover:text-harmony-teal transition-colors text-sm">Điều khoản Dịch vụ</a>
            <a href="#" className="hover:text-harmony-teal transition-colors text-sm">Liên hệ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
