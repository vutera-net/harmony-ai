"use client";

import Link from "next/link";
import { AuthProvider } from "@harmony/auth/context";
import { TuViHeader } from "@/components/TuViHeader";
import { getBirthYearRange } from "@/lib/seo";

function TuViIndexContent() {
  const years = getBirthYearRange();

  const decadeGroups = Array.from({ length: 8 }, (_, i) => {
    const decadeStart = 1940 + i * 10;
    return {
      decade: `${decadeStart}s`,
      start: decadeStart,
      years: Array.from({ length: 10 }, (_, j) => decadeStart + j),
    };
  });

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
            <span className="text-slate-900 font-medium">Tử Vi Năm Sinh</span>
          </div>

          {/* Hero */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Tử Vi Năm Sinh
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Chọn năm sinh của bạn để khám phá tính cách, sự nghiệp, tình cảm
              và dự báo vận mệnh cho năm hiện tại.
            </p>
          </div>

          {/* Years by Decade */}
          <div className="space-y-8 mb-12">
            {decadeGroups.map((group) => (
              <div key={group.decade}>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Những Năm {group.decade}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {group.years.map((year) => (
                    <Link
                      key={year}
                      href={`/tu-vi/${year}`}
                      className="p-4 bg-white rounded-lg border-2 border-slate-200 hover:border-blue-500 hover:shadow-md transition text-center group"
                    >
                      <div className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
                        {year}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Xem chi tiết
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                📚 Tử Vi Là Gì?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tử Vi là một hệ thống chiêm tinh cổ xưa của người Việt, dùng để
                phân tích tính cách, sự nghiệp, tình cảm và vận mệnh dựa trên
                ngày, tháng, năm sinh của một người. Được sử dụng từ hàng ngàn
                năm trước.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                🔮 Làm Thế Nào Để Sử Dụng?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Chỉ cần chọn năm sinh của bạn từ danh sách trên, bạn sẽ nhận
                được phân tích chi tiết về tính cách, sự nghiệp, tình cảm và dự
                báo cho năm hiện tại. Hoàn toàn miễn phí!
              </p>
            </div>
          </div>

          {/* Premium CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">
              Muốn Phân Tích Chi Tiết Hơn?
            </h3>
            <p className="text-blue-50 mb-6">
              MenhAn Sanctuary cung cấp phân tích sâu sắc từ Master AI với lá
              số Tử Vi đầy đủ, dự báo chi tiết và hướng dẫn cá nhân hóa.
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

export default function TuViIndexPage() {
  return (
    <AuthProvider>
      <TuViIndexContent />
    </AuthProvider>
  );
}
