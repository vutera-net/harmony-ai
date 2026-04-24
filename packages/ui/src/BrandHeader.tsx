import React from 'react';
import Link from 'next/link';

interface BrandHeaderProps {
  appName: string;
  appUrl: string;
  navLinks?: { label: string; href: string }[];
  showAuth?: boolean;
}

export function BrandHeader({ appName, appUrl, navLinks = [], showAuth = false }: BrandHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-harmony-teal/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={appUrl} className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-harmony-teal rounded-xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-sm">
              <span className="text-white font-bold text-xl">✦</span>
            </div>
            <span className="font-bold text-slate-900 group-hover:text-harmony-teal transition-colors text-lg tracking-tight">{appName}</span>
          </Link>
 
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-slate-600 hover:text-harmony-teal text-sm font-medium transition-all hover:translate-y-[-1px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
 
          {/* Auth placeholder */}
          <div className="flex items-center gap-4">
            {showAuth && (
              <div className="text-xs text-slate-400 italic bg-slate-100 px-2 py-1 rounded-md">Xác thực đã bật</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
