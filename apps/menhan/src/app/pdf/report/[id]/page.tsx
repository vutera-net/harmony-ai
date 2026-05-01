import { prisma } from "@harmony/database";
import { notFound } from "next/navigation";
import { formatDateVN } from "@/lib/date-utils";

const db = prisma;

export default async function PDFReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const chart = await db.chart.findUnique({
    where: { id },
    include: {
      profile: true,
      predictions: true,
    },
  });

  if (!chart) notFound();

  const { profile, predictions } = chart;

  return (
    <div className="pdf-container bg-[#fdfbf7] text-[#2c2c2c] p-12 font-serif" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Cover Page */}
      <section className="h-full flex flex-col items-center justify-center text-center space-y-8 mb-20 border-b-2 border-harmony-gold pb-20">
        <div className="w-32 h-32 rounded-full bg-harmony-gold/20 flex items-center justify-center mb-8">
          <span className="text-6xl">☯</span>
        </div>
        <h1 className="text-5xl font-bold text-harmony-gold tracking-widest uppercase">Bản Mệnh Độc Bản</h1>
        <div className="text-2xl italic text-slate-600">
          {profile.fullName || "Vị khách quý"}
        </div>
        <div className="text-sm tracking-widest uppercase text-slate-400">
          Harmony AI Sanctuary • {new Date().getFullYear()}
        </div>
      </section>

      {/* Analysis Section */}
      <section className="space-y-12 py-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-harmony-gold mb-4">Luận Giải Tổng Quan</h2>
          <div className="h-1 w-20 bg-harmony-gold mx-auto mb-8" />
        </div>

        <div className="prose prose-slate max-w-none text-lg leading-relaxed text-justify">
          {chart.analysis ? (
            <div dangerouslySetInnerHTML={{ __html: chart.analysis as any }} />
          ) : (
            <p>Đang cập nhật luận giải chi tiết cho bản mệnh...</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-8 py-10 border-y border-slate-200">
          <div>
            <h3 className="font-bold text-harmony-gold uppercase text-sm mb-2">Ngũ Hành Chủ Đạo</h3>
            <p className="text-xl">{profile.energyType || "Đang phân tích"}</p>
          </div>
          <div>
            <h3 className="font-bold text-harmony-gold uppercase text-sm mb-2">Điểm Năng Lượng</h3>
            <p className="text-xl">Cân bằng</p>
          </div>
        </div>
      </section>

      {/* Predictions Section */}
      <section className="space-y-8 py-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-harmony-gold mb-4">Điểm Nhấn Vận Trình</h2>
          <div className="h-1 w-20 bg-harmony-gold mx-auto mb-8" />
        </div>

        <div className="space-y-6">
          {predictions.map((p, i) => (
            <div key={i} className="p-6 bg-white border border-slate-100 rounded-lg shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-harmony-gold">{p.category}</span>
                <span className="text-xs text-slate-400">{p.targetDate ? formatDateVN(p.targetDate) : "Vĩnh viễn"}</span>
              </div>
              <p className="text-slate-700 italic leading-relaxed">"{p.content}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-xs text-slate-400 italic">
        Bản báo cáo này được tạo bởi Master AI của Harmony Sanctuary.<br/>
        Vận mệnh nằm trong tay bạn, hãy dùng trí tuệ để dẫn lối.
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500&display=swap');
        
        .pdf-container {
          font-family: 'Playfair Display', serif;
        }
        .pdf-container p, .pdf-container span, .pdf-container div {
          font-family: 'Inter', sans-serif;
        }
        .pdf-container h1, .pdf-container h2, .pdf-container h3 {
          font-family: 'Playfair Display', serif;
        }
        @media print {
          body { background: white; }
          .pdf-container { box-shadow: none; margin: 0; padding: 0; }
        }
      `}</style>
    </div>
  );
}
