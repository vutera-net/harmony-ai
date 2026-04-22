import React from 'react';
import Link from 'next/link';

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 bg-harmony-cream text-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
          The Journey to <span className="text-harmony-teal">Enlightenment</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 items-center relative">
          {/* TuVi App */}
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-harmony-teal/10 hover:shadow-md transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">✨</div>
            <h3 className="text-2xl font-bold mb-3">TuVi App</h3>
            <p className="text-gray-600 mb-6">
              Quick tools, lucky days, and basic birth charts. The first step to understanding your cosmic imprint.
            </p>
            <Link 
              href="https://tuvi.vutera.net" 
              className="inline-block px-6 py-2 bg-harmony-teal text-white rounded-full font-medium hover:bg-harmony-teal/90 transition-colors"
            >
              Try for Free
            </Link>
          </div>

          {/* Transition Arrow */}
          <div className="hidden md:flex justify-center">
            <div className="text-harmony-teal text-5xl animate-pulse">→</div>
          </div>

          {/* MenhAn Sanctuary */}
          <div className="p-8 bg-white rounded-3xl shadow-xl border-2 border-harmony-teal hover:shadow-2xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-harmony-teal text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Premium
            </div>
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏯</div>
            <h3 className="text-2xl font-bold mb-3">MenhAn Sanctuary</h3>
            <p className="text-gray-600 mb-6">
              Deep analysis with Master AI, Destiny Journaling, and personalized PDF reports for strategic life planning.
            </p>
            <Link 
              href="https://menhan.vutera.net" 
              className="inline-block px-6 py-2 bg-harmony-purple text-white rounded-full font-medium hover:bg-harmony-purple/90 transition-colors"
            >
              Enter Sanctuary
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
