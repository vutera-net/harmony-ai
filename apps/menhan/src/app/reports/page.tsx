"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Sparkles, AlertCircle } from "lucide-react";

export default function ReportsPage() {
  const [charts, setCharts] = useState<{ id: string; type: string }[]>([]);
  const [quota, setQuota] = useState({ used: 0, total: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const profileRes = await fetch("/api/profile");
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        // This is a simplification; in reality, we'd have a dedicated /api/reports endpoint
        // For now, let's assume we fetch charts for the user.
        // We will mock the charts list for this demo if the API is not ready.
        setCharts([{ id: "mock-chart-1", type: "TzVi" }]);
      }
    } catch (err) {
      console.error("Failed to fetch reports data:", err);
    }
  };

  const generatePDF = async (chartId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/pdf/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chartId }),
      });
      const data = await res.json();

      if (res.ok) {
        window.open(data.reportUrl, "_blank");
      } else {
        setError(data.message || "Có lỗi xảy ra khi tạo báo cáo.");
      }
    } catch (err) {
      setError("Không thể kết nối với máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-harmony-purple/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-harmony-teal/5 blur-[150px] rounded-full" />
      </div>

      <header className="relative z-10 p-6 border-b border-slate-800 backdrop-blur-md bg-slate-950/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-harmony-gold flex items-center justify-center text-slate-950">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="font-serif text-xl text-harmony-gold">Kho Báo Cáo</h2>
            <p className="text-xs text-slate-500">Lưu trữ các bản luận giải chi tiết của bạn</p>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full p-6">
        {/* Quota Card */}
        <div className="mb-8 p-6 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-slate-400">Hạn ngạch báo cáo quý này</h3>
            <p className="text-2xl font-bold text-harmony-gold">{quota.used}/{quota.total} <span className="text-sm font-normal text-slate-500">bản</span></p>
          </div>
          <button className="px-4 py-2 bg-harmony-gold/10 text-harmony-gold rounded-xl text-xs font-medium hover:bg-harmony-gold/20 transition-all border border-harmony-gold/20">
            Nâng cấp gói
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {charts.map((chart) => (
            <motion.div
              key={chart.id}
              whileHover={{ y: -5 }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 bg-harmony-gold/10 text-harmony-gold rounded-2xl">
                  <FileText size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{chart.type}</span>
              </div>
              <div>
                <h3 className="text-lg font-serif text-slate-100">Bản Mệnh {chart.type === 'TzVi' ? 'Tử Vi' : 'Bát Tự'}</h3>
                <p className="text-sm text-slate-500">Luận giải chi tiết về vận trình, năng lượng và lời khuyên từ Master AI.</p>
              </div>
              <button
                onClick={() => generatePDF(chart.id)}
                disabled={isLoading}
                className="w-full py-3 bg-harmony-gold text-slate-950 font-medium rounded-xl hover:bg-harmony-gold/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? "Đang khởi tạo..." : <><Download size={16} /> Tải Bản Mệnh Độc Bản</>}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
