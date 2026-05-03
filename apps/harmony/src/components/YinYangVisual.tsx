import React from 'react';
import { Compass } from 'lucide-react';

export function YinYangVisual() {
  return (
    <div className="aspect-square bg-gradient-to-br from-teal-50 to-white rounded-[4rem] border-2 border-teal-100/50 flex items-center justify-center p-12 relative overflow-hidden group shadow-inner">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-30"></div>
      <Compass className="w-48 h-48 text-teal-500/20 group-hover:rotate-45 transition-transform duration-1000" />
      <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-teal-50/50 via-transparent to-transparent"></div>
      
      {/* Yin-Yang symbol absolute center with glow */}
      <div className="absolute w-32 h-32 rounded-full overflow-hidden flex flex-col border border-teal-200/50 shadow-2xl animate-spin-slow">
         <div className="h-1/2 bg-slate-900 w-full flex items-end justify-center">
           <div className="w-8 h-8 rounded-full bg-white mb-[-1rem] z-10 border border-slate-900"></div>
         </div>
         <div className="h-1/2 bg-white w-full flex items-start justify-center">
           <div className="w-8 h-8 rounded-full bg-slate-900 mt-[-1rem] z-10 border border-white"></div>
         </div>
      </div>
    </div>
  );
}
