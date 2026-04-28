'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface BrandHeaderProps {
  appName: string;
  appUrl: string;
  navLinks?: { label: string; href: string }[];
  showAuth?: boolean;
  rightContent?: React.ReactNode;
  mobileHeaderRight?: React.ReactNode;
  mobileRightContent?: React.ReactNode;
  variant?: 'light' | 'dark';
}

export function BrandHeader({
  appName,
  appUrl,
  navLinks = [],
  showAuth = false,
  rightContent,
  mobileHeaderRight,
  mobileRightContent,
  variant = 'light',
}: BrandHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const dark = variant === 'dark';

  const headerClass = dark
    ? 'sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-harmony-gold/10 shadow-sm'
    : 'sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-harmony-teal/10 shadow-sm';

  const logoIconClass = dark
    ? 'w-9 h-9 bg-harmony-gold rounded-xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-sm'
    : 'w-9 h-9 bg-harmony-teal rounded-xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-sm';

  const logoIconTextClass = dark ? 'text-slate-950 font-bold text-xl' : 'text-white font-bold text-xl';

  const appNameClass = dark
    ? 'font-bold text-harmony-gold group-hover:text-harmony-gold/80 transition-colors text-lg tracking-tight'
    : 'font-bold text-slate-900 group-hover:text-harmony-teal transition-colors text-lg tracking-tight';

  const navLinkClass = dark
    ? 'text-slate-400 hover:text-harmony-gold text-sm font-medium transition-all hover:translate-y-[-1px]'
    : 'text-slate-600 hover:text-harmony-teal text-sm font-medium transition-all hover:translate-y-[-1px]';

  const hamburgerLineClass = dark ? 'bg-slate-400' : 'bg-slate-700';

  const dropdownClass = dark
    ? 'border-t border-harmony-gold/10 bg-slate-950/95 backdrop-blur-md'
    : 'border-t border-harmony-teal/10 bg-white/95 backdrop-blur-md';

  const mobileLinkClass = dark
    ? 'text-slate-300 hover:text-harmony-gold hover:bg-harmony-gold/5 text-sm font-medium px-3 py-2.5 rounded-lg transition-colors'
    : 'text-slate-700 hover:text-harmony-teal hover:bg-harmony-teal/5 text-sm font-medium px-3 py-2.5 rounded-lg transition-colors';

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={appUrl} className="flex items-center gap-2 group">
            <div className={logoIconClass}>
              <span className={logoIconTextClass}>✦</span>
            </div>
            <span className={appNameClass}>{appName}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              {rightContent}
            </div>
            
            {/* Mobile Header Right (e.g. Avatar) */}
            <div className="md:hidden flex items-center gap-2">
              {mobileHeaderRight}
            </div>

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
                <span className={`block w-5 h-0.5 ${hamburgerLineClass} transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 ${hamburgerLineClass} transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 ${hamburgerLineClass} transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileOpen && navLinks.length > 0 && (
        <div className={dropdownClass}>
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={mobileLinkClass}
              >
                {link.label}
              </Link>
            ))}
            {mobileRightContent && (
              <div 
                className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800"
                onClick={() => setMobileOpen(false)}
              >
                {mobileRightContent}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
