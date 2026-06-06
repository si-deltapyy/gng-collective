import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-gray-50 font-sans selection:bg-red-500 selection:text-white relative overflow-hidden">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none z-0"></div>
      
      {/* Huge Background 404 Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-black text-gray-900/50 whitespace-nowrap pointer-events-none tracking-tighter z-0 -rotate-6">
        404
      </div>

      {/* Main Content Box - Brutalist Style */}
      <div className="relative z-10 text-center max-w-2xl border-4 border-gray-800 bg-gray-950 p-10 md:p-16 shadow-[16px_16px_0px_0px_rgba(220,38,38,1)] transition-all">
        <p className="text-red-500 font-black tracking-[0.3em] uppercase text-xs mb-4">
          System // Error
        </p>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
          Lost In The <br className="md:hidden" /> Noise.
        </h1>
        
        <p className="text-gray-400 font-serif italic text-lg mb-12">
          Halaman yang Anda cari tidak ditemukan di dalam ritme kota ini. 
          Mungkin sudah dihapus, atau Anda mengambil jalur yang salah.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {/* Primary Action */}
          <Link 
            href="/" 
            className="w-full md:w-auto px-8 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 border-2 border-white hover:border-red-600 flex items-center justify-center gap-3 group"
          >
            <span className="group-hover:-translate-x-2 transition-transform">←</span> 
            Kembali ke Awal
          </Link>
          
          {/* Secondary Action */}
          <Link 
            href="/dashboard" 
            className="w-full md:w-auto px-8 py-4 bg-transparent text-white font-black uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 border-2 border-gray-700 flex items-center justify-center"
          >
            Akses Dashboard
          </Link>
        </div>
      </div>
      
      {/* Bottom Ticker */}
      <div className="absolute bottom-6 text-xs font-bold tracking-[0.3em] text-gray-700 uppercase">
        GNG COLLECTIVE // ROUTE NOT FOUND
      </div>
    </main>
  );
}