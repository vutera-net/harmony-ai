"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Crown, ShieldCheck, Zap, CreditCard } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  description: string;
};

const PLANS: Plan[] = [
  {
    id: "FREE",
    name: "Khởi Đầu",
    price: "0",
    period: "vĩnh viễn",
    description: "Dành cho những người mới bắt đầu khám phá bản thân.",
    features: ["Lá số cơ bản", "3 lời khuyên từ Master AI", "1 báo cáo PDF/quý"],
    highlighted: false,
  },
  {
    id: "AN_NHIEN",
    name: "An Nhiên",
    price: "199.000",
    period: "tháng",
    description: "Đồng hành cùng Master AI để tìm thấy sự bình an hàng ngày.",
    features: ["Luận giải chuyên sâu", "Chat không giới hạn", "3 báo cáo PDF/quý", "Nhắc nhở vận trình ngày"],
    highlighted: true,
  },
  {
    id: "BINH_AN",
    name: "Bình An",
    price: "1.490.000",
    period: "năm",
    description: "Sự đầu tư dài hạn cho sự thấu hiểu và phát triển bền vững.",
    features: ["Tất cả quyền lợi An Nhiên", "12 báo cáo PDF/quý", "Ưu tiên hỗ trợ từ Master AI", "Phân tích Bát Trạch nhà ở"],
    highlighted: false,
  },
];

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<string>("FREE");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  const fetchCurrentPlan = async () => {
    try {
      const res = await fetch("/api/subscription");
      if (res.ok) {
        const data = await res.json();
        setCurrentPlan(data.plan || "FREE");
      }
    } catch (err) {
      console.error("Failed to fetch plan:", err);
    }
  };

  const upgradePlan = async (planId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      if (res.ok) {
        setCurrentPlan(planId);
        alert(`Chúc mừng bạn đã nâng cấp lên gói ${planId}!`);
      }
    } catch (err) {
      console.error("Upgrade failed:", err);
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
            <CreditCard size={20} />
          </div>
          <div>
            <h2 className="font-serif text-xl text-harmony-gold">Quản Lý Gói Cước</h2>
            <p className="text-xs text-slate-500">Nâng cấp trải nghiệm cùng Sanctuary</p>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-harmony-gold mb-4">Chọn Hành Trình Của Bạn</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Hãy chọn gói cước phù hợp với nhu cầu chiêm nghiệm của bạn. Mọi gói cước đều hướng đến sự thấu hiểu và bình an.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                plan.highlighted 
                  ? "bg-slate-900 border-harmony-gold shadow-[0_0_30px_rgba(212,175,55,0.1)]" 
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-harmony-gold text-slate-950 text-[10px] font-bold uppercase rounded-full tracking-widest">
                  Phổ biến nhất
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="inline-block p-3 rounded-2xl bg-slate-800 text-harmony-gold mb-4">
                  {plan.id === "FREE" ? <Zap size={24} /> : plan.id === "AN_NHIEN" ? <Crown size={24} /> : <ShieldCheck size={24} />}
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-500 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-slate-500">/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                    <Check size={16} className="text-harmony-gold" />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => upgradePlan(plan.id)}
                disabled={isLoading || currentPlan === plan.id}
                className={`w-full py-4 rounded-2xl font-medium transition-all ${
                  currentPlan === plan.id 
                    ? "bg-slate-800 text-slate-500 cursor-default" 
                    : plan.highlighted 
                      ? "bg-harmony-gold text-slate-950 hover:bg-harmony-gold/90" 
                      : "bg-slate-800 text-white hover:bg-slate-700"
                }`}
              >
                {currentPlan === plan.id ? "Gói hiện tại" : isLoading ? "Đang xử lý..." : "Chọn gói này"}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-slate-900/50 border border-slate-800 rounded-3xl text-center">
          <h4 className="text-lg font-serif text-harmony-gold mb-2">Cam Kết Từ Sanctuary</h4>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của bạn. 
            Bạn có thể thay đổi hoặc hủy gói cước bất cứ lúc nào trong trang quản lý tài khoản.
          </p>
        </div>
      </div>
    </main>
  );
}
