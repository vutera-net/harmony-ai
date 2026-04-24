'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface BrandHeaderProps {
  appName: string;
  appUrl: string;
  navLinks?: { label: string; href: string }[];
  showAuth?: boolean;
  rightContent?: React.ReactNode;
}

export function BrandHeader({ appName, appUrl, navLinks = [], showAuth = false, rightContent }: BrandHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

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

          {/* Desktop Navigation */}
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

          {/* Right side */}
          <div className="flex items-center gap-3">
            {rightContent}
            {showAuth && (
              <div className="text-xs text-slate-400 italic bg-slate-100 px-2 py-1 rounded-md">Xác thực đã bật</div>
            )}

            {/* Hamburger button (mobile only) */}
            {navLinks.length > 0 && (
              <button
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileOpen && navLinks.length > 0 && (
        <div className="border-t border-harmony-teal/10 bg-white/95 backdrop-blur-md">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-slate-700 hover:text-harmony-teal hover:bg-harmony-teal/5 text-sm font-medium px-3 py-2.5 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
