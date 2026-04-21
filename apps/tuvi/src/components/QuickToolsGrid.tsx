import Link from "next/link";

interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const tools: ToolCard[] = [
  {
    id: "calendar",
    title: "📅 Lịch Vạn Niên",
    description: "Xem ngày tốt xấu, múi giờ hoàng đạo",
    icon: "📅",
    href: "/tools/calendar",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "lucky-days",
    title: "🌟 Ngày Tốt Của Bạn",
    description: "Tìm ngày tốt nhất cho quyết định quan trọng",
    icon: "🌟",
    href: "/tools/lucky-days",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "chart",
    title: "♦️ Lá Số Cơ Bản",
    description: "Xem lá số Tử Vi rút gọn ngay lập tức",
    icon: "♦️",
    href: "/tools/basic-chart",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "horoscope",
    title: "🔮 Dự Báo Năm",
    description: "Nhận dự báo vận mệnh cho năm hiện tại",
    icon: "🔮",
    href: "/tools/horoscope",
    color: "from-amber-500 to-orange-500",
  },
];

export function QuickToolsGrid() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Công Cụ Miễn Phí
          </h2>
          <p className="text-lg text-slate-600">
            Bắt đầu khám phá vận mệnh của bạn chỉ trong vài giây
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href}>
              <div className="h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-slate-200 hover:border-blue-300 overflow-hidden group">
                <div className={`h-24 bg-gradient-to-br ${tool.color} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">
            Muốn phân tích sâu hơn?
          </p>
          <a
            href="https://menhan.vutera.net"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition font-medium"
          >
            Khám Phá MenhAn Sanctuary →
          </a>
        </div>
      </div>
    </section>
  );
}
