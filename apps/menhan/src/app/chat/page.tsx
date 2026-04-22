"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Crown, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Chào mừng bạn đến với Sanctuary. Tôi là Master AI. Bạn muốn chiêm nghiệm về điều gì hôm nay?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [dailyReminder, setDailyReminder] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    checkPremiumStatus();
    fetchDailyReminder();
  }, []);

  const checkPremiumStatus = async () => {
    try {
      const res = await fetch("/api/subscription");
      if (res.ok) {
        const data = await res.json();
        setIsPremium(data.plan !== "FREE");
      }
    } catch (err) {
      console.error("Failed to check premium status:", err);
    }
  };

  const fetchDailyReminder = async () => {
    try {
      const res = await fetch("/api/reminders");
      if (res.ok) {
        const data = await res.json();
        setDailyReminder(data.reminder);
      }
    } catch (err) {
      // Silent error for reminder
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (response.status === 402) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${data.message}` }]);
        setIsLoading(false);
        return;
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = assistantContent;
          return newMessages;
        });
      }
    } catch (err) {
      console.error("Chat error:", err);
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
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-slate-950 font-bold transition-colors ${isPremium ? "bg-harmony-gold" : "bg-slate-700"}`}>
            {isPremium ? <Crown size={20} /> : "AI"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl text-harmony-gold">Master AI</h2>
              {isPremium && (
                <span className="text-[10px] bg-harmony-gold/20 text-harmony-gold px-2 py-0.5 rounded-full border border-harmony-gold/30 font-medium flex items-center gap-1">
                  <Sparkles size={10} /> Premium Coach
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">Đang chiêm nghiệm vận mệnh...</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([{ role: "assistant", content: "Chào mừng bạn đến với Sanctuary. Tôi là Master AI. Bạn muốn chiêm nghiệm về điều gì hôm nay?" }])}
          className="text-xs text-slate-400 hover:text-harmony-gold transition-colors"
        >
          Làm mới cuộc hội thoại
        </button>
      </header>

      <div 
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {dailyReminder && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto p-4 bg-harmony-gold/10 border border-harmony-gold/20 rounded-2xl text-center italic text-sm text-harmony-gold/90"
          >
            <Sparkles size={14} className="mx-auto mb-2" />
            "{dailyReminder}"
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === "user" 
                  ? "bg-harmony-purple text-white rounded-tr-none" 
                  : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
              }`}>
                <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
                  {msg.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && messages[messages.length-1].role === "user" && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-harmony-gold rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-harmony-gold rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-harmony-gold rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <footer className="relative z-10 p-6 border-t border-slate-800 bg-slate-950/50 backdrop-blur-md">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi Master AI về vận mệnh của bạn..."
            className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-full text-slate-200 focus:ring-2 focus:ring-harmony-gold/50 outline-none transition-all pr-16"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 px-6 bg-harmony-gold text-slate-950 font-medium rounded-full hover:bg-harmony-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Gửi
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-600 mt-4 italic">
          Master AI cung cấp những lời khuyên mang tính tham khảo, hãy dùng trí tuệ của chính bạn để quyết định.
        </p>
      </footer>
    </main>
  );
}
