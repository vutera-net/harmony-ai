export function Hero() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Khám Phá Vận Mệnh Của Bạn
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-8">
          Dùng Tử Vi và Phong Thủy hiểu sâu hơn về bản thân,
          <br />
          tìm kiếm định hướng trong cuộc sống
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
            Tra Cứu Miễn Phí
          </button>
          <button className="px-8 py-3 border-2 border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 font-medium transition">
            Tìm Hiểu Thêm
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-slate-600">
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
    </section>
  );
}
