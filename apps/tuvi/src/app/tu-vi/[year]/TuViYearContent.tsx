"use client";

import { getYearArticle } from "@/lib/seo";

export function TuViYearContent({ year }: { year: string }) {
  const yearNum = parseInt(year, 10);
  const article = getYearArticle(yearNum);

  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-slate-600">
          <a href="/" className="hover:text-blue-600">
            Trang Chủ
          </a>
          {" / "}
          <a href="/tu-vi" className="hover:text-blue-600">
            Tử Vi
          </a>
          {" / "}
          <span className="text-slate-900 font-medium">Năm Sinh {yearNum}</span>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-slate-900">{article.h1}</h1>
            <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-300">
              <span className="text-lg font-semibold text-purple-700">
                {article.zodiac}
              </span>
            </div>
          </div>
          <p className="text-lg text-slate-600">
            Khám phá tính cách, sự nghiệp, tình cảm và dự báo vận mệnh cho những
            người sinh năm {yearNum}.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Article Sections */}
          <div className="lg:col-span-2 space-y-8">
            {article.sections.map((section, idx) => (
              <section key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {section.heading}
                </h2>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lucky Colors */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-4">
                🎨 Màu May Mắn
              </h3>
              <div className="space-y-2">
                {article.luckyData.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 bg-white rounded border border-blue-200 text-slate-700 font-semibold"
                  >
                    {color}
                  </div>
                ))}
              </div>
            </div>

            {/* Lucky Numbers */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-purple-900 mb-4">
                🔢 Con Số May Mắn
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {article.luckyData.numbers.map((num, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center w-12 h-12 bg-white rounded border-2 border-purple-300 text-purple-700 font-bold text-lg"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            {/* Luck Areas */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-bold text-green-900 mb-3">
                ✨ Lĩnh Vực Tốt Lành
              </h3>
              <ul className="space-y-2">
                {article.luckAreas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenge Areas */}
            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
              <h3 className="text-lg font-bold text-amber-900 mb-3">
                ⚠️ Lĩnh Vực Cần Chú Ý
              </h3>
              <ul className="space-y-2">
                {article.challengeAreas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-amber-800">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            Muốn Phân Tích Chi Tiết Hơn?
          </h3>
          <p className="text-blue-50 mb-6 max-w-2xl mx-auto">
            MenhAn Sanctuary cung cấp phân tích sâu sắc từ Master AI với lá số Tử
            Vi đầy đủ, dự báo chi tiết và hướng dẫn cá nhân hóa cho bạn.
          </p>
          <a
            href="https://menhan.vutera.net"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold"
          >
            Khám Phá MenhAn Sanctuary →
          </a>
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 bg-slate-100 rounded-lg border border-slate-300">
          <h3 className="font-bold text-slate-900 mb-3">💡 Ghi Chú</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• Thông tin trên dựa trên lịch âm dương và tử vi học truyền thống</li>
            <li>• Mỗi cá nhân có những biến thể riêng tùy vào giờ sinh và những yếu tố khác</li>
            <li>
              • Để phân tích chính xác hơn, bạn cần cung cấp đầy đủ ngày, tháng,
              năm và giờ sinh
            </li>
            <li>• Mục đích là giúp bạn hiểu rõ bản thân hơn, không phải dự đoán tương lai</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
