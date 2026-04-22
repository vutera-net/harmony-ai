import React from 'react';

export function BrandFooter() {
  return (
    <footer className="py-12 bg-gray-900 text-gray-400 border-t border-harmony-teal/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Harmony AI</h3>
            <p className="text-sm">© 2026 Vutera. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-harmony-teal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-harmony-teal transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-harmony-teal transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
