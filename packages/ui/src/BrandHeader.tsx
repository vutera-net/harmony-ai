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
    <header className="sticky top-0 z-50 bg-white border-b border-harmony-teal/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={appUrl} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-harmony-teal rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-white font-bold text-lg">✦</span>
            </div>
            <span className="font-bold text-slate-900 group-hover:text-harmony-teal transition-colors">{appName}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-slate-600 hover:text-harmony-teal text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth placeholder (to be handled by app-specific logic or a shared auth component) */}
          <div className="flex items-center gap-4">
            {showAuth && (
              <div className="text-sm text-slate-500 italic">Auth enabled</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
