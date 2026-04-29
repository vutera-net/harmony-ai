"use client";

import { useState, useEffect } from "react";
import { AuthProvider, useAuthContext } from "@harmony/auth/context";
import { TuViHeader } from "@/components/TuViHeader";
import { Footer } from "@/components/Footer";
import { getBasicChart } from "@/lib/calendar";
import { DatePicker } from "@harmony/ui";

function BasicChartContent() {
  const { user } = useAuthContext();
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [autoFilled, setAutoFilled] = useState(false);
  const [chart, setChart] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.profile?.birthDate) {
      const d = new Date(user.profile.birthDate).toISOString().split("T")[0];
      setDate(d);
      setAutoFilled(true);
    }
  }, [user]);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const [year, month, day] = date.split("-").map(Number);
      const chartData = getBasicChart(year, month, day);
      setChart(chartData);
    } catch (error) {
      console.error("Error calculating chart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <TuViHeader />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-slate-600">
            <a href="/" className="hover:text-blue-600">
              Trang Chủ
            </a>
            {" / "}
            <span className="text-slate-900 font-medium">Lá Số Cơ Bản</span>
          </div>

          {/* Hero */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Lá Số Tử Vi Cơ Bản
            </h1>
            <p className="text-lg text-slate-600">
              Nhập ngày tháng năm sinh để xem lá số Tử Vi rút gọn của bạn với
              12 cung chính và ý nghĩa cơ bản.
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="max-w-md">
               <div className="flex items-center justify-between mb-3">
                 <label className="text-sm font-medium text-slate-700">
                   Ngày Sinh (Dương Lịch)
                 </label>
                 {autoFilled && (
                   <span className="text-xs text-harmony-teal font-medium bg-harmony-teal/10 px-2 py-0.5 rounded-full">
                     ✓ Lấy từ hồ sơ
                   </span>
                 )}
               </div>
               <div className="flex gap-3 items-end">
                 <DatePicker
                   value={date}
                   onChange={(val) => { setDate(val); setAutoFilled(false); }}
                   className="flex-1"
                 />
                 <button
                   onClick={handleCalculate}
                   disabled={loading}
                   className="px-6 py-2 bg-harmony-teal text-white rounded-lg hover:bg-harmony-teal/90 disabled:opacity-50 font-medium transition h-[42px]"
                 >
                   {loading ? "Đang tính..." : "Xem Lá Số"}
                 </button>
               </div>

              <p className="text-xs text-slate-500 mt-2">
                💡 Chỉ cần ngày tháng năm, giờ sinh không bắt buộc
              </p>
            </div>
          </div>

          {/* Chart Results */}
          {chart && (
            <div className="space-y-8">
              {/* Header Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-md p-6 border border-purple-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Ngày Sinh (Dương)</p>
                    <p className="text-lg font-bold text-slate-900">
                      {chart.solarDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Ngày Sinh (Âm)</p>
                    <p className="text-lg font-bold text-slate-900">
                      {chart.lunarDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Năm Con Giáp</p>
                    <p className="text-lg font-bold text-slate-900">
                      {chart.zodiacYear}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Summary */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  📝 Tính Cách Chung
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {chart.summary}
                </p>
              </div>

              {/* 12 Palaces Grid */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  🏯 12 Cung Tử Vi
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chart.palaces.map((palace: any) => (
                    <div
                      key={palace.position}
                      className="bg-white rounded-lg shadow border border-slate-200 p-4 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-slate-900 text-lg">
                          {palace.position}. {palace.name}
                        </h4>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                          {palace.element}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        {palace.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Palace Legend */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-blue-900 mb-3">💡 Ý Nghĩa 12 Cung</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Mệnh</p>
                    <p>Tính cách và số mệnh cơ bản</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Anh Em</p>
                    <p>Mối quan hệ với anh em, bạn bè</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Phu Thê</p>
                    <p>Tình cảm và hôn nhân</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Tài Lộc</p>
                    <p>Tài chính và công việc</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Con Cái</p>
                    <p>Mối quan hệ với con em</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Nô Tỳ</p>
                    <p>Mối quan hệ với cấp dưới, nhân viên</p>
                  </div>
                </div>
              </div>

              {/* Premium CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-3">Muốn Phân Tích Sâu?</h3>
                <p className="text-blue-50 mb-6">
                  MenhAn Sanctuary cung cấp phân tích chi tiết từ Master AI với tính
                  toán đầy đủ năm cung, bái tổng lục và dự báo cụ thể.
                </p>
                <a
                  href="https://menhan.vutera.net"
                  className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold"
                >
                  Trải Nghiệm MenhAn Sanctuary →
                </a>
              </div>
            </div>
          )}

          {/* Initial State Message */}
          {!chart && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
              <p className="text-slate-600 text-lg mb-4">
                👆 Nhập ngày sinh của bạn ở trên để xem lá số cơ bản
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-8">
                <div>
                  <div className="text-3xl mb-2">📅</div>
                  <p className="font-semibold text-slate-900 mb-1">
                    Nhập Ngày Sinh
                  </p>
                  <p className="text-sm text-slate-600">Dương lịch là được</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">⚡</div>
                  <p className="font-semibold text-slate-900 mb-1">
                    Tính Toán Ngay
                  </p>
                  <p className="text-sm text-slate-600">Kết quả tức thì</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📊</div>
                  <p className="font-semibold text-slate-900 mb-1">
                    Xem Lá Số
                  </p>
                  <p className="text-sm text-slate-600">12 cung chi tiết</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BasicChartPage() {
  return (
    <AuthProvider>
      <BasicChartContent />
    </AuthProvider>
  );
}
