"use client";

import { useState } from "react";
import { AuthProvider } from "@harmony/auth/context";
import { TuViHeader } from "@/components/TuViHeader";
import { getMonthCalendarView } from "@/lib/calendar";

function CalendarContent() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const today = new Date();
  const calendar = getMonthCalendarView(year, month);
  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const monthName = [
    "",
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const previousMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

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
            <span className="text-slate-900 font-medium">Lịch Vạn Niên</span>
          </div>

          {/* Hero */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Lịch Vạn Niên Âm Dương
            </h1>
            <p className="text-lg text-slate-600">
              Xem đầy đủ ngày tốt, xấu và các giờ hoàng đạo cho từng ngày trong
              tháng dựa trên lịch âm dương.
            </p>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={previousMonth}
                className="px-4 py-2 border border-harmony-teal text-harmony-teal hover:bg-harmony-teal hover:text-white rounded-lg transition font-medium"
              >
                ← Tháng Trước
              </button>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {monthName[month]} {year}
                </h2>
                <p className="text-sm text-slate-500">
                  Chọn năm: &nbsp;
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="px-3 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: 10 }, (_, i) => year - 5 + i).map(
                      (y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      )
                    )}
                  </select>
                </p>
              </div>

              <button
                onClick={nextMonth}
                className="px-4 py-2 border border-harmony-teal text-harmony-teal hover:bg-harmony-teal hover:text-white rounded-lg transition font-medium"
              >
                Tháng Sau →
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 bg-slate-100">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="p-3 text-center font-bold text-slate-700 text-sm"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {calendar.map((day, idx) => {
                  const isToday =
                    day.isCurrentMonth &&
                    year === today.getFullYear() &&
                    month === today.getMonth() + 1 &&
                    day.date === today.getDate();

                  return (
                  <div
                    key={idx}
                    className={`min-h-24 p-2 border ${isToday ? "border-harmony-teal border-2" : "border-slate-200"} ${
                      !day.isCurrentMonth ? "bg-slate-50" : "bg-white"
                    } ${
                      day.luckLevel === "Tốt"
                        ? "bg-green-50"
                        : day.luckLevel === "Xấu"
                        ? "bg-red-50"
                        : ""
                    }`}
                  >
                    <div
                      className={`text-sm font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                        isToday
                          ? "bg-harmony-teal text-white"
                          : !day.isCurrentMonth
                          ? "text-slate-400"
                          : "text-slate-900"
                      }`}
                    >
                      {day.date}
                    </div>
                    <div className="text-xs text-slate-500 mb-2">
                      {day.lunar}
                    </div>
                    <div
                      className={`text-xs font-semibold px-2 py-1 rounded w-fit ${
                        day.luckLevel === "Tốt"
                          ? "bg-green-100 text-green-700"
                          : day.luckLevel === "Xấu"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {day.luckLevel}
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">💡 Hướng Dẫn</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mt-1"></div>
                  <div>
                    <div className="font-semibold text-green-700">Ngày Tốt</div>
                    <div className="text-green-600">Thích hợp khởi động</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded mt-1"></div>
                  <div>
                    <div className="font-semibold text-yellow-700">
                      Trung Bình
                    </div>
                    <div className="text-yellow-600">Không xấu, không tốt</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mt-1"></div>
                  <div>
                    <div className="font-semibold text-red-700">Ngày Xấu</div>
                    <div className="text-red-600">Tránh khởi động quan trọng</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                📚 Cách Đọc Lịch
              </h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li>• Cột bên trái là ngày Dương</li>
                <li>• Dòng nhỏ dưới là ngày Âm (Ngày/Tháng)</li>
                <li>• Nhãn màu cho biết độ tốt xấu của ngày</li>
                <li>• Các ngày nhạt là tháng trước/sau</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                ✨ Sử Dụng Lịch
              </h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li>• Tìm ngày "Tốt" để khởi động dự án mới</li>
                <li>• Lên kế hoạch công việc quan trọng</li>
                <li>• Chọn ngày tốt để đi du lịch</li>
                <li>• Tổ chức sự kiện hay hôn lễ</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <AuthProvider>
      <CalendarContent />
    </AuthProvider>
  );
}
