"use client";

import { LeadCaptureForm } from "./LeadCaptureForm";

export function Hero() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Khám Phá Vận Mệnh Của Bạn
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8">
            Dùng Tử Vi và Phong Thủy hiểu sâu hơn về bản thân,
            <br />
            tìm kiếm định hướng trong cuộc sống
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-slate-600 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Hoàn toàn miễn phí</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Không cần đăng ký</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Kết quả tức thì</span>
            </div>
          </div>
        </div>

        {/* Lead Capture Form */}
        <div className="max-w-xl mx-auto">
          <LeadCaptureForm
            luckAreas={["sự nghiệp", "mối quan hệ", "gia đình"]}
            challengeAreas={["tài chính", "sức khỏe"]}
            source="tuvi-home"
          />
        </div>
      </div>
    </section>
  );
}
