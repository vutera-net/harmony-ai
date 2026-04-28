"use client";

import { AuthProvider } from "@harmony/auth/context";
import { TuViHeader } from "@/components/TuViHeader";
import { Footer } from "@/components/Footer";
import { LuckyDaysCalculator } from "@/components/LuckyDaysCalculator";

function LuckyDaysContent() {
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
            <span className="text-slate-900 font-medium">Ngày Tốt Xấu</span>
          </div>

          {/* Hero */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Tìm Ngày Tốt Nhất Cho Bạn
            </h1>
            <p className="text-lg text-slate-600">
              Khám phá những ngày tốt nhất trong tháng để khởi động dự án,
              ký hợp đồng, hoặc đưa ra quyết định quan trọng dựa trên lịch
              âm dương.
            </p>
          </div>

          {/* Calculator */}
          <LuckyDaysCalculator />

          {/* Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                📚 Lịch Âm Dương Là Gì?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Lịch âm dương là hệ thống lịch kết hợp giữa lịch âm (dựa trên
                chu kỳ mặt trăng) và lịch dương (dựa trên chu kỳ trái đất).
                Nó giúp xác định những ngày tốt và xấu cho các hoạt động khác
                nhau.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                ✨ Ngày Tốt Dùng Để Làm Gì?
              </h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li>• Khởi động các dự án mới</li>
                <li>• Ký hợp đồng, giao kèo</li>
                <li>• Khởi công xây dựng</li>
                <li>• Tổ chức hôn lễ, sự kiện</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              ❓ Câu Hỏi Thường Gặp
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">
                  Độ chính xác của dự báo?
                </h4>
                <p className="text-slate-600 text-sm mt-1">
                  Dự báo dựa trên các nguyên tắc của Tử Vi học. Kết quả có thể
                  khác nhau tùy vào từng cá nhân và tình huống cụ thể.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">
                  Cần biết giờ sinh không?
                </h4>
                <p className="text-slate-600 text-sm mt-1">
                  Giờ sinh giúp tăng độ chính xác, nhưng lịch âm dương chính
                  xác chỉ với năm, tháng, ngày.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LuckyDaysPage() {
  return (
    <AuthProvider>
      <LuckyDaysContent />
    </AuthProvider>
  );
}
