"use client";

import { useState } from "react";
import {
  findLuckyDaysInMonth,
  getZodiacIndex,
  formatZodiac,
} from "@/lib/calendar";

const zodiacAnimals = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];

export function LuckyDaysCalculator() {
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [luckyDays, setLuckyDays] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const zodiacIndex = getZodiacIndex(birthYear);
  const userZodiac = formatZodiac(zodiacIndex);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const days = findLuckyDaysInMonth(selectedYear, selectedMonth, zodiacIndex);
      setLuckyDays(days);
    } catch (error) {
      console.error("Error calculating lucky days:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        🌟 Tìm Ngày Tốt Cho Bạn
      </h2>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Năm Sinh
          </label>
          <input
            type="number"
            min={1900}
            max={currentYear}
            value={birthYear}
            onChange={(e) => setBirthYear(Number(e.target.value))}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập năm sinh"
          />
          <p className="text-sm text-slate-500 mt-1">
            Con giáp của bạn: <span className="font-semibold">{userZodiac}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tháng
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Năm
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 5 }, (_, i) => currentYear - 2 + i).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition"
        >
          {loading ? "Đang tính toán..." : "Tìm Ngày Tốt"}
        </button>
      </div>

      {/* Results Section */}
      {luckyDays.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">
            ✨ Các Ngày Tốt Trong Tháng {selectedMonth}/{selectedYear}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {luckyDays.map((day, idx) => (
              <div
                key={idx}
                className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition"
              >
                <div className="text-sm font-bold text-emerald-700">
                  Ngày {day.date.split("/")[2]}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Âm: {day.lunar}
                </div>
                <div className="text-xs text-emerald-600 font-semibold mt-2">
                  ⭐ Score: {day.luckScore}/100
                </div>
              </div>
            ))}
          </div>

          {luckyDays.length === 0 && (
            <p className="text-center text-slate-500 py-6">
              Không tìm thấy ngày tốt trong tháng này. Hãy thử tháng khác.
            </p>
          )}
        </div>
      )}

      {/* Info Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Giải Thích</h4>
        <p className="text-sm text-blue-800">
          Ngày tốt được tính dựa trên lịch âm dương và con giáp của bạn. Những ngày này
          thích hợp để khởi động các dự án, ký hợp đồng, hay đưa ra quyết định quan trọng.
        </p>
      </div>
    </div>
  );
}
