"use client";

import { useState, useEffect } from "react";
import { AuthProvider, useAuthContext } from "@harmony/auth/context";
import { TuViHeader } from "@/components/TuViHeader";
import { getZodiacIndex, formatZodiac, getYearlyHoroscope } from "@/lib/calendar";

function HoroscopeContent() {
  const { user } = useAuthContext();
  const currentYear = new Date().getFullYear();
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [autoFilled, setAutoFilled] = useState(false);

  useEffect(() => {
    if (user?.profile?.birthDate) {
      const year = new Date(user.profile.birthDate).getFullYear();
      if (!isNaN(year)) {
        setBirthYear(year);
        setAutoFilled(true);
      }
    }
  }, [user]);

  const zodiacIndex = getZodiacIndex(birthYear);
  const horoscope = getYearlyHoroscope(zodiacIndex);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <TuViHeader />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-slate-600">
            <a href="/" className="hover:text-blue-600">
              Trang Chủ
            </a>
            {" / "}
            <span className="text-slate-900 font-medium">Dự Báo Năm</span>
          </div>

          {/* Hero */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Dự Báo Vận Mệnh {horoscope.year}
            </h1>
            <p className="text-lg text-slate-600">
              Khám phá những cơ hội và thách thức mà năm {horoscope.year} mang lại cho
              bạn.
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-slate-700">
                Năm Sinh Của Bạn
              </label>
              {autoFilled && (
                <span className="text-xs text-harmony-teal font-medium bg-harmony-teal/10 px-2 py-0.5 rounded-full">
                  ✓ Lấy từ hồ sơ
                </span>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="number"
                  min={1900}
                  max={currentYear}
                  value={birthYear}
                  onChange={(e) => { setBirthYear(Number(e.target.value)); setAutoFilled(false); }}
                  className="w-full px-4 py-2.5 border border-slate-400 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-harmony-teal focus:border-harmony-teal transition"
                />
              </div>
              <div className="text-sm text-slate-600 font-semibold whitespace-nowrap">
                Con giáp: <span className="text-harmony-teal">{formatZodiac(zodiacIndex)}</span>
              </div>
            </div>
          </div>

          {/* Horoscope Summary */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-md p-8 mb-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              🔮 Tóm Tắt Năm {horoscope.year}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              {horoscope.summary}
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Luck Areas */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-700 mb-4">
                ✨ Lĩnh Vực Tốt Lành
              </h3>
              <ul className="space-y-3">
                {horoscope.luckAreas.map((area, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenge Areas */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
              <h3 className="text-xl font-bold text-amber-700 mb-4">
                ⚠️ Lĩnh Vực Cần Chú Ý
              </h3>
              <ul className="space-y-3">
                {horoscope.challengeAreas.map((area, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lucky Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Lucky Colors */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                🎨 Màu May Mắn
              </h3>
              <div className="flex flex-wrap gap-3">
                {horoscope.luckyColors.map((color, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-blue-50 border-2 border-blue-300 rounded-lg text-slate-700 font-semibold"
                  >
                    {color}
                  </div>
                ))}
              </div>
            </div>

            {/* Lucky Numbers */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                🔢 Con Số May Mắn
              </h3>
              <div className="flex flex-wrap gap-3">
                {horoscope.luckyNumbers.map((num, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 flex items-center justify-center bg-purple-100 border-2 border-purple-300 rounded-lg text-purple-700 font-bold text-lg"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              💡 Gợi Ý Cho Năm {horoscope.year}
            </h3>
            <ul className="space-y-3 text-blue-800">
              <li>
                ✓ Tập trung vào các lĩnh vực tốt lành để tối đa hóa may mắn
              </li>
              <li>
                ✓ Chuẩn bị tâm lý để đối mặt với những thách thức sắp tới
              </li>
              <li>
                ✓ Sử dụng màu sắc và con số may mắn trong đời sống hàng ngày
              </li>
              <li>
                ✓ Chọn ngày tốt từ lịch âm dương để khởi động các dự án quan
                trọng
              </li>
            </ul>
          </div>

          {/* Premium CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">
              Muốn Dự Báo Sâu Hơn?
            </h3>
            <p className="text-blue-50 mb-6">
              Hãy tham gia MenhAn Sanctuary để nhận được phân tích chi tiết từ Master AI
              dựa trên lá số Tử Vi đầy đủ của bạn.
            </p>
            <a
              href="https://menhan.vutera.net"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold"
            >
              Khám Phá MenhAn Sanctuary →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function HoroscopePage() {
  return (
    <AuthProvider>
      <HoroscopeContent />
    </AuthProvider>
  );
}
