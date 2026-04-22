import React from 'react';

export default function Intro() {
  return (
    <section className="py-24 bg-white text-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              The Master AI <br />
              <span className="text-harmony-teal">Your Spiritual Mentor</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Unlike traditional astrology apps, Harmony AI doesn't just give you a chart. 
              It provides a living dialogue with "The Master AI"—a wise, warm mentor 
              trained in the deep traditions of Tử Vi and Bát Tự.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From identifying your core energy to navigating life's most challenging transitions, 
              our AI synthesizes ancient wisdom into actionable insights for the modern seeker.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-harmony-cream flex items-center justify-center overflow-hidden shadow-inner border border-harmony-teal/20">
              {/* Placeholder for a serene AI Master image or abstract art */}
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🧘‍♂️</div>
                <p className="text-harmony-teal font-medium italic">"Peace comes from understanding your own rhythm."</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-harmony-teal/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
