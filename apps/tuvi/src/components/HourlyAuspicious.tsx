"use client";

import { useState } from "react";
import { calculateDayLuck, getZodiacIndex, formatZodiac } from "@/lib/calendar";

export function HourlyAuspicious() {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [luck, setLuck] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const zodiacIndex = getZodiacIndex(birthYear);
  const userZodiac = formatZodiac(zodiacIndex);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const [year, month, day] = date.split("-").map(Number);
      const dateObj = new Date(year, month - 1, day);
      const dayLuck = calculateDayLuck(dateObj, zodiacIndex);
      setLuck(dayLuck);
    } catch (error) {
      console.error("Error calculating hourly luck:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        🕐 Giờ Hoàng Đạo Hôm Nay
      </h2>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
               Ngày (Ngày/Tháng/Năm)
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
               Ngày
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(() => {
                const [y, m, d] = date.split("-");
                return (
                  <>
                    <select
                      value={d}
                      onChange={(e) => setDate(`${y}-${m}-${e.target.value.padStart(2, "0")}`)}
                      className="px-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={(i + 1).toString().padStart(2, "0")}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      value={m}
                      onChange={(e) => setDate(`${y}-${e.target.value.padStart(2, "0")}-${d}`)}
                      className="px-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={(i + 1).toString().padStart(2, "0")}>
                          Tháng {i + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      value={y}
                      onChange={(e) => setDate(`${e.target.value}-${m}-${d}`)}
                      className="px-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return <option key={year} value={year}>{year}</option>;
                      })}
                    </select>
                  </>
                );
              })()}
            </div>

          </div>
        </div>

        <p className="text-sm text-slate-600">
          Con giáp của bạn: <span className="font-semibold">{userZodiac}</span>
        </p>

        <button
          onClick={handleCalculate}
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition"
        >
          {loading ? "Đang tính toán..." : "Xem Giờ Tốt"}
        </button>
      </div>

      {/* Results Section */}
      {luck && (
        <div className="space-y-6">
          {/* Overall Luck */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-slate-900">
                Tổng Quan Ngày
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  luck.luckLevel === "Tốt"
                    ? "bg-green-100 text-green-700"
                    : luck.luckLevel === "Trung bình"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {luck.luckLevel} ({luck.luckScore}/100)
              </span>
            </div>
            <p className="text-slate-700">{luck.zodiacLuck}</p>
            <p className="text-sm text-slate-600 mt-2">
              Lịch Âm: {luck.lunar}
            </p>
          </div>

          {/* Auspicious Hours */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              ✨ Giờ Hoàng Đạo (Tốt)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {luck.auspiciousHours.map((hour: string, idx: number) => (
                <div
                  key={idx}
                  className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg"
                >
                  <div className="font-semibold text-emerald-700">{hour}</div>
                  <div className="text-sm text-emerald-600 mt-1">
                    ✓ Thích hợp cho mọi việc
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inauspicious Hours */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              ⚠️ Giờ Không Tốt (Xấu)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {luck.inauspiciousHours.map((hour: string, idx: number) => (
                <div
                  key={idx}
                  className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-lg"
                >
                  <div className="font-semibold text-red-700">{hour}</div>
                  <div className="text-sm text-red-600 mt-1">
                    ✗ Tránh khởi động việc quan trọng
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Information */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Ghi Chú</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Giờ được tính theo múi giờ Việt Nam (GMT+7)
              </li>
              <li>
                • Dựa vào lịch âm dương và chi nhánh ngũ hành
              </li>
              <li>
                • Nên chọn giờ Hoàng Đạo để khởi động việc quan trọng
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
