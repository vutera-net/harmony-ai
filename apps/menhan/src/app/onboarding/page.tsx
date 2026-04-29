"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isMagicLoading, setIsMagicLoading] = useState(false);
  const [magicStep, setMagicStep] = useState(0);
  const [formData, setFormData] = useState({
    gender: "MALE",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
    birthTimezone: "Asia/Ho_Chi_Minh",
  });
  const [error, setError] = useState("");

  const magicMessages = [
    "Đang kết nối với tinh tú...",
    "Master AI đang chiêm nghiệm lá số của bạn...",
    "Thiết lập Sanctuary riêng tư...",
    "Khởi tạo hành trình bình an...",
  ];

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            const p = data.profile;
            setFormData({
              gender: p.gender,
              birthDate: p.birthDate ? new Date(p.birthDate).toISOString().split("T")[0] : "",
              birthTime: p.birthTime || "",
              birthLocation: p.birthLocation || "",
              birthTimezone: p.birthTimezone || "Asia/Ho_Chi_Minh",
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch initial profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

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

      // Start Magic Moment
      setIsMagicLoading(true);
      
      // Cycle through messages
      for (let i = 0; i < magicMessages.length; i++) {
        setMagicStep(i);
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      router.push("/chat");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-harmony-gold"></div>
      </div>
    );
  }

  if (isMagicLoading) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-harmony-gold/10 blur-[120px] rounded-full animate-pulse" />
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center space-y-8"
        >
          <div className="relative w-24 h-24 mx-auto">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-harmony-gold/30 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              ✨
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.p 
              key={magicStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl font-serif italic text-harmony-gold"
            >
              {magicMessages[magicStep]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </main>
    );
  }

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
               <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-2">

                {(() => {
                  const [y, m, d] = formData.birthDate.split("-");
                  return (
                    <>
                      <select
                        value={d}
                        onChange={(e) => setFormData({ ...formData, birthDate: `${y}-${m}-${e.target.value.padStart(2, "0")}` })}
                        className="px-2 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-harmony-gold/50 outline-none transition-all text-sm"
                      >
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={(i + 1).toString().padStart(2, "0")}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <select
                        value={m}
                        onChange={(e) => setFormData({ ...formData, birthDate: `${y}-${e.target.value.padStart(2, "0")}-${d}` })}
                        className="px-2 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-harmony-gold/50 outline-none transition-all text-sm"
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={(i + 1).toString().padStart(2, "0")}>
                            Tháng {i + 1}
                          </option>
                        ))}
                      </select>
                      <select
                        value={y}
                        onChange={(e) => setFormData({ ...formData, birthDate: `${e.target.value}-${m}-${d}` })}
                        className="px-2 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-harmony-gold/50 outline-none transition-all text-sm"
                      >
                        {Array.from({ length: 120 }, (_, i) => {
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
