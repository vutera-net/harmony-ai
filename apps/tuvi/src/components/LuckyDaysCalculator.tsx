"use client";

import { useState, useEffect } from "react";
import {
  findLuckyDaysInMonth,
  getZodiacIndex,
  formatZodiac,
} from "@/lib/calendar";
import { useAuthContext } from "@harmony/auth/context";

export function LuckyDaysCalculator() {
  const { user, loading: authLoading } = useAuthContext();

  const currentYear = new Date().getFullYear();

  const [birthYear, setBirthYear] = useState<number>(2000);
  const [autoFilled, setAutoFilled] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [luckyDays, setLuckyDays] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  const inputClass =
    "w-full px-4 py-2.5 border border-slate-400 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-harmony-teal focus:border-harmony-teal transition";

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        🌟 Tìm Ngày Tốt Cho Bạn
      </h2>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">
              Năm Sinh
            </label>
            {autoFilled && (
              <span className="text-xs text-harmony-teal font-medium bg-harmony-teal/10 px-2 py-0.5 rounded-full">
                ✓ Lấy từ hồ sơ
              </span>
            )}
          </div>
          <input
            type="number"
            min={1900}
            max={currentYear}
            value={birthYear}
            onChange={(e) => {
              setBirthYear(Number(e.target.value));
              setAutoFilled(false);
            }}
            className={inputClass}
            placeholder="Nhập năm sinh"
          />
          <p className="text-sm text-slate-500 mt-1.5">
            Con giáp của bạn:{" "}
            <span className="font-semibold text-slate-700">{userZodiac}</span>
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
              className={inputClass}
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
              className={inputClass}
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
          disabled={loading || authLoading}
          className="w-full px-6 py-3 bg-harmony-teal text-white rounded-lg hover:bg-harmony-teal/90 disabled:opacity-50 font-medium transition"
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
        </div>
      )}

      {luckyDays.length === 0 && !loading && (
        <p className="text-center text-slate-400 text-sm py-4">
          Nhấn "Tìm Ngày Tốt" để xem kết quả.
        </p>
      )}

      {/* Info Section */}
      <div className="mt-6 p-4 bg-harmony-teal/5 border border-harmony-teal/20 rounded-lg">
        <h4 className="font-semibold text-slate-800 mb-2">💡 Giải Thích</h4>
        <p className="text-sm text-slate-600">
          Ngày tốt được tính dựa trên lịch âm dương và con giáp của bạn. Những ngày này
          thích hợp để khởi động các dự án, ký hợp đồng, hay đưa ra quyết định quan trọng.
        </p>
      </div>
    </div>
  );
}
