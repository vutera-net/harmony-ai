"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    gender: "MALE",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
    birthTimezone: "Asia/Ho_Chi_Minh",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/chat");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-harmony-purple/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-harmony-teal/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl font-serif text-harmony-gold">Hoàn Thiện Thông Tin</h1>
          <p className="text-slate-400 font-light italic">
            "Để Master AI có thể chiêm nghiệm chính xác vận mệnh của bạn, hãy cung cấp thông tin chi tiết."
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400 ml-1">Giới tính</label>
              <div className="flex p-1 bg-slate-800 rounded-xl">
                {(["MALE", "FEMALE"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: g })}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all ${
                      formData.gender === g 
                        ? "bg-harmony-gold text-slate-950 font-medium shadow-sm" 
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {g === "MALE" ? "Nam" : "Nữ"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400 ml-1">Ngày sinh</label>
              <input
                type="date"
                required
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-harmony-gold/50 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400 ml-1">Giờ sinh (HH:mm)</label>
              <input
                type="time"
                required
                value={formData.birthTime}
                onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-harmony-gold/50 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400 ml-1">Múi giờ</label>
              <select
                value={formData.birthTimezone}
                onChange={(e) => setFormData({ ...formData, birthTimezone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-harmony-gold/50 outline-none transition-all appearance-none"
              >
                <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</option>
                <option value="Asia/Tokyo">Nhật Bản (GMT+9)</option>
                <option value="America/New_York">New York (GMT-5)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400 ml-1">Nơi sinh (Thành phố, Tỉnh)</label>
            <input
              type="text"
              placeholder="Ví dụ: Hà Nội, Việt Nam"
              required
              value={formData.birthLocation}
              onChange={(e) => setFormData({ ...formData, birthLocation: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-harmony-gold/50 outline-none transition-all"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-harmony-gold text-slate-950 font-medium rounded-xl hover:bg-harmony-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-harmony-gold/20"
          >
            {loading ? "Đang lưu thông tin..." : "Hoàn tất & Tiến vào Sanctuary"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
