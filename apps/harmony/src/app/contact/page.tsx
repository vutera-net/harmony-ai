import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-slate-300 px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Liên Hệ</h1>
        <p className="text-lg mb-12">
          Bạn có thắc mắc về hành trình thấu hiểu bản thân hoặc muốn hợp tác cùng Harmony AI? Chúng tôi luôn sẵn sàng lắng nghe.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">Hỗ trợ người dùng</h3>
            <p className="text-slate-400 mb-2">Email: support@vutera.net</p>
            <p className="text-slate-400">Thời gian phản hồi: 24-48h</p>
          </div>
          <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">Hợp tác chiến lược</h3>
            <p className="text-slate-400 mb-2">Email: partnership@vutera.net</p>
            <p className="text-slate-400">Chúng tôi chào đón các chuyên gia văn hóa & công nghệ.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
