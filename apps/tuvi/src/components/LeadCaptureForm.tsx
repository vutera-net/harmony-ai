"use client";

import { useState } from "react";

interface LeadCaptureFormProps {
  zodiac?: string;
  zodiacIndex?: number;
  year?: number;
  luckAreas: string[];
  challengeAreas: string[];
  source: string;
}

export function LeadCaptureForm({
  zodiac,
  year,
  source,
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [birthYear, setBirthYear] = useState(year?.toString() || "");
  const [loading, setLoading] = useState(false);
  const [aiHook, setAiHook] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Derive zodiac from birth year if not provided
      let zodiacToUse = zodiac;
      if (!zodiacToUse) {
        const yearNum = parseInt(birthYear, 10);
        const index = (yearNum - 1900) % 12;
        const zodiacs = [
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
        zodiacToUse = zodiacs[index];
      }

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          birthYear,
          zodiac: zodiacToUse,
          source,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit form");
      }

      const data = await response.json();
      setAiHook(data.aiHook);
      setRedirectUrl(data.redirectUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  // Hook reveal state
  if (aiHook) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-6">✨ Tiết Lộ Về Bạn</h3>
        <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6 mb-8">
          <p className="text-lg leading-relaxed italic text-blue-50">
            "{aiHook}"
          </p>
        </div>
        <p className="text-blue-100 mb-8">
          Đây chỉ là 1% thông tin — lá số đầy đủ của bạn chứa nhiều bí mật hơn.
        </p>
        <button
          onClick={handleRedirect}
          className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold"
        >
          Khám Phá MenhAn Ngay →
        </button>
      </div>
    );
  }

  // Form state
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8 border-2 border-blue-200">
      <h3 className="text-2xl font-bold text-blue-900 mb-2">
        🔮 Nhận Phân Tích Miễn Phí
      </h3>
      <p className="text-blue-700 mb-6">
        Để tiếp bước hành trình tìm hiểu bản thân, cần chút thông tin của bạn
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Email của bạn
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
          />
        </div>

        {/* Birth Year Input (if not pre-filled) */}
        {!year && (
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Năm sinh của bạn
            </label>
            <input
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="1990"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Gửi và Xem Tiết Lộ"}
        </button>

        <p className="text-xs text-blue-600 text-center">
          Bạn sẽ được chuyển đến MenhAn Sanctuary để khám phá lá số đầy đủ
        </p>
      </form>
    </div>
  );
}
