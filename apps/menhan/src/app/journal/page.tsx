"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, BookOpen, Sparkles, CheckCircle2, XCircle, Clock } from "lucide-react";
import { DatePicker, formatDateVN } from "@harmony/ui";

type JournalEntry = {
  id: string;
  content: string;
  eventDate: string;
  status: "unverified" | "verified" | "mismatch";
  verification?: string;
  trustScore?: number;
  prediction?: {
    content: string;
    category: string;
  };
};

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [content, setContent] = useState("");
  const [eventDate, setEventDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/journal");
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (err) {
      console.error("Failed to fetch entries:", err);
    }
  };

  const addEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, eventDate }),
      });
      if (res.ok) {
        setContent("");
        await fetchEntries();
      }
    } catch (err) {
      console.error("Failed to add entry:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEntry = async (id: string) => {
    setIsVerifying(id);
    try {
      const res = await fetch(`/api/journal/${id}/verify`, {
        method: "POST",
      });
      if (res.ok) {
        await fetchEntries();
      }
    } catch (err) {
      console.error("Verification failed:", err);
    } finally {
      setIsVerifying(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-harmony-purple/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-harmony-teal/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-slate-800 backdrop-blur-md bg-slate-950/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-harmony-gold flex items-center justify-center text-slate-950">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="font-serif text-xl text-harmony-gold">Nhật Ký Vận Mệnh</h2>
            <p className="text-xs text-slate-500">Đối soát thực tế với lời tiên tri của Master AI</p>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 max-w-5xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Entry Section */}
        <section className="lg:col-span-1">
          <div className="sticky top-6 p-6 bg-slate-900 border border-slate-800 rounded-3xl backdrop-blur-md">
            <h3 className="text-lg font-serif text-harmony-gold mb-4 flex items-center gap-2">
              <Sparkles size={18} /> Ghi chép sự kiện
            </h3>
            <form onSubmit={addEntry} className="space-y-4">
               <div>
                 <DatePicker
                   label="Ngày xảy ra"
                   value={eventDate}
                   onChange={(date) => setEventDate(date)}
                   className="w-full"
                 />
               </div>

              <div>
                <label className="text-xs text-slate-500 block mb-1 ml-1">Mô tả sự kiện</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ví dụ: Hôm nay nhận được lời mời làm việc bất ngờ từ một công ty nước ngoài..."
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-harmony-gold/50 outline-none transition-all h-32 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !content.trim()}
                className="w-full py-3 bg-harmony-gold text-slate-950 font-medium rounded-xl hover:bg-harmony-gold/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? "Đang lưu..." : "Lưu vào Nhật ký"}
              </button>
            </form>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="lg:col-span-2 space-y-6">
          <AnimatePresence initial={false}>
            {entries.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-slate-500"
              >
                <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                <p>Bạn chưa có ghi chép nào trong nhật ký vận mệnh.</p>
              </motion.div>
            ) : (
              entries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l-2 border-slate-800 space-y-4"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-[-9px] top-2 w-4 h-4 rounded-full border-2 border-slate-950 ${
                    entry.status === "verified" ? "bg-green-500" : 
                    entry.status === "mismatch" ? "bg-red-500" : "bg-slate-700"
                  }`} />
                  
                  <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-sm hover:border-slate-700 transition-all group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                         <Calendar size={14} />
                         {formatDateVN(entry.eventDate)}
                       </div>

                      <div className="flex items-center gap-2">
                        {entry.status === "verified" && <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20 flex items-center gap-1"><CheckCircle2 size={10} /> Đúng dự báo</span>}
                        {entry.status === "mismatch" && <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full border border-red-500/20 flex items-center gap-1"><XCircle size={10} /> Sai lệch</span>}
                        {entry.status === "unverified" && (
                          <button 
                            onClick={() => verifyEntry(entry.id)}
                            disabled={isVerifying === entry.id}
                            className="text-[10px] bg-harmony-gold/10 text-harmony-gold px-2 py-0.5 rounded-full border border-harmony-gold/20 hover:bg-harmony-gold/20 transition-all flex items-center gap-1"
                          >
                            {isVerifying === entry.id ? "Đang đối soát..." : <><Sparkles size={10} /> Đối soát với AI</>}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-slate-200 mb-4 leading-relaxed">{entry.content}</p>
                    
                    {entry.verification && (
                      <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border-l-4 border-harmony-gold italic text-sm text-slate-400">
                        "{entry.verification}"
                        {entry.trustScore !== undefined && (
                          <div className="mt-2 flex items-center gap-2 text-[10px] text-harmony-gold/70 font-medium">
                            <Clock size={10} />
                            Độ khớp: {(entry.trustScore * 100).toFixed(0)}%
                          </div>
                        )}
                      </div>
                    )}

                    {entry.prediction && (
                      <div className="mt-3 text-xs text-slate-500 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <span>Liên kết dự báo: </span>
                        <span className="text-harmony-gold/80 font-medium italic">"{entry.prediction.content.substring(0, 60)}..."</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
