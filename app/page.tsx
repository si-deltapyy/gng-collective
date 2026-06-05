import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-gray-300">
      {/* Navigation Bar (Glassmorphism effect) */}
      <nav className="w-full p-6 flex justify-between items-center bg-white/60 backdrop-blur-md fixed top-0 z-50 shadow-sm border-b border-gray-200">
        <div className="text-2xl font-black tracking-tighter text-gray-900 flex items-center gap-1">
          GNG<span className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></span>
        </div>
        <div className="space-x-4">
          <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            Masuk
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center min-h-[85vh] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

        <div className="relative z-10">
          <div className="inline-block mb-6 px-5 py-2 rounded-full border border-gray-300 bg-white/50 backdrop-blur-sm text-sm font-semibold text-gray-600 shadow-sm hover:scale-105 transition-transform cursor-default">
            ✨ Pendaftaran Batch 1 Telah Dibuka
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 mb-4 drop-shadow-sm">
            GNG <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-800">Collective</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium text-gray-500 mb-8 tracking-wide">
            Grow And Growth.
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Wadah eksklusif bagi para inovator untuk bertumbuh bersama. Perluas koneksi, tingkatkan skill, dan capai potensi maksimalmu.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
            {/* Interactive Primary Button */}
            <Link 
              href="/register" 
              className="group relative px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Daftar Event 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
            </Link>
            
            {/* Interactive Secondary Button */}
            <Link 
              href="/login" 
              className="px-8 py-4 bg-transparent text-gray-800 border-2 border-gray-300 rounded-xl font-bold text-lg hover:border-gray-900 hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300"
            >
              Sudah Punya Akun?
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Dark Gray Inversion */}
      <section className="py-24 px-6 bg-gray-900 text-gray-50 rounded-t-[3rem] relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Kenapa Memilih Kami?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Ekosistem yang dirancang khusus untuk memfasilitasi pertumbuhan karir dan personal Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-gray-400 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:-translate-y-3 transition-all duration-300 group backdrop-blur-sm cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-inner">
                🌱
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Grow</h3>
              <p className="text-gray-400 leading-relaxed">Tingkatkan skill dan pengetahuan melalui sesi mentoring eksklusif dan lokakarya intensif.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-gray-400 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:-translate-y-3 transition-all duration-300 group backdrop-blur-sm cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all shadow-inner">
                📈
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Growth</h3>
              <p className="text-gray-400 leading-relaxed">Akselerasi karir dan bisnis Anda dengan wawasan data-driven dan studi kasus nyata.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-gray-400 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:-translate-y-3 transition-all duration-300 group backdrop-blur-sm cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-inner">
                🤝
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Collective</h3>
              <p className="text-gray-400 leading-relaxed">Bergabung dengan jejaring profesional elit untuk kolaborasi dan ekspansi tanpa batas.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}