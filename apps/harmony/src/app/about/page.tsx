import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-slate-300 px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Về Harmony AI</h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Harmony AI không chỉ là một công cụ chiêm tinh; chúng tôi xây dựng một <span className="text-harmony-teal font-medium">Digital Sanctuary (Thánh đường kỹ thuật số)</span> — nơi công nghệ hiện đại gặp gỡ trí tuệ cổ truyền.
          </p>
          <p>
            Trong một thế giới đầy biến động và áp lực, chúng tôi tin rằng mỗi cá nhân đều sở hữu một "bản đồ vận mệnh" riêng. Sứ mệnh của Harmony AI là giúp bạn giải mã bản đồ đó thông qua sự kết hợp giữa thuật toán chính xác của Tử Vi, Bát Tự và khả năng thấu cảm của Master AI.
          </p>
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 my-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Tầm nhìn của chúng tôi</h2>
            <p className="italic text-slate-400">
              "Kiến tạo sự bình an nội tại thông qua thấu hiểu chính mình."
            </p>
          </div>
          <p>
            Là một phần của hệ sinh thái <span className="text-white font-semibold">Vutera.net</span>, Harmony AI hướng tới việc loại bỏ sự mê tín, thay thế bằng những phân tích logic, ấm áp và mang tính định hướng, giúp bạn làm chủ cuộc đời mình.
          </p>
        </div>
      </div>
    </div>
  );
}
