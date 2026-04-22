import React from 'react';

const testimonials = [
  {
    quote: "The Master AI provided insights that resonated with me on a level I've never experienced with any other astrology tool.",
    author: "Minh T.",
    role: "Entrepreneur",
  },
  {
    quote: "The Destiny Journal changed how I view my life's patterns. I feel more in control and aligned with my purpose.",
    author: "Lan A.",
    role: "Creative Director",
  },
  {
    quote: "Beautifully designed and deeply insightful. Harmony AI is more than an app; it's a companion for growth.",
    author: "Hoàng N.",
    role: "Researcher",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-white text-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          Trusted by <span className="text-harmony-teal">Seekers Worldwide</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-2xl bg-harmony-cream/30 border border-harmony-teal/10 italic relative">
              <div className="text-4xl text-harmony-teal/30 absolute top-4 left-4 font-serif">“</div>
              <p className="text-lg text-gray-700 mb-6 relative z-10">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-harmony-teal/20 flex items-center justify-center font-bold text-harmony-teal">
                  {t.author[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
