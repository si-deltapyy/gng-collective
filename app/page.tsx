"use client"; // Tambahkan ini karena kita akan menggunakan interaksi sisi klien (meski dominan CSS)

import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LandingPage() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-gray-900 selection:text-white overflow-hidden">
      {/* Kumpulan CSS Animasi Kustom yang Disematkan Langsung */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        
        /* Custom Hover Effect for Art Vibe */
        .art-hover:hover {
          background-color: #111827; /* gray-900 */
          color: #f9fafb; /* gray-50 */
          transform: skewX(-2deg) scale(1.02);
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className="w-full p-6 flex justify-between items-center bg-white/70 backdrop-blur-md fixed top-0 z-50 shadow-sm border-b border-gray-200 transition-all duration-300">
        <div className="text-2xl font-black tracking-tighter text-gray-900 flex items-center gap-2 group cursor-pointer">
          <img src="/logo.png" alt="GNG Logo" className="w-14 h-14 object-contain" />
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-900 group-hover:bg-red-500 transition-colors"></span>
          </span>
        </div>
        <div className="space-x-6 flex items-center">
          {session ? (
            <Link href="/dashboard" className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
              DASHBOARD
            </Link>
          ) : (
            <>
              <Link href="/auth" className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                LOG IN
              </Link>
              <Link href="/auth" className="text-sm font-bold border-2 border-gray-900 text-gray-900 px-5 py-2 rounded-none hover:bg-gray-900 hover:text-white transition-all duration-300">
                JOIN US
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center min-h-screen relative">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[10%] left-[-5%] w-72 h-72 bg-gray-300 mix-blend-multiply rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-96 h-96 bg-gray-400 mix-blend-multiply rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
          <div className="animate-fade-in inline-block mb-8 px-4 py-1.5 border border-gray-900 text-xs font-bold text-gray-900 tracking-[0.3em] uppercase">
            #surakartasupportsystem
          </div>
          
          <h1 className="animate-fade-in delay-200 text-6xl md:text-9xl font-black tracking-tighter text-gray-900 mb-6 leading-[0.85] uppercase">
            Move The <br />
            <span className="font-serif italic text-gray-500 font-light lowercase mb-5">City</span> Rhythm.
          </h1>
          
          <div className="animate-fade-in delay-600 flex justify-center w-full">
            <Link 
              href="#batch-1" 
              className="group relative px-10 py-5 bg-gray-900 text-white font-black text-xl hover:scale-105 transition-all duration-500 overflow-hidden rounded-full flex items-center gap-4"
            >
              EXPLORE NOW
              <span className="group-hover:rotate-90 group-hover:translate-x-1 transition-transform duration-300 inline-block">↓</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dramatic Marquee (Running Text) Separator */}
      <div className="w-full bg-gray-900 text-gray-50 py-4 overflow-hidden border-y-2 border-gray-900 relative z-20 transform -rotate-1 scale-110">
        <div className="animate-marquee whitespace-nowrap text-2xl font-black tracking-widest uppercase">
          <span className="mx-4 text-gray-400">///</span> GROW AND GROWTH <span className="mx-4 text-gray-400">///</span> SURAKARTA SUPPORT SYSTEM <span className="mx-4 text-gray-400">///</span> THE MASK WE WEAR <span className="mx-4 text-gray-400">///</span> PRETTY ANGRY 
          <span className="mx-4 text-gray-400">///</span> GROW AND GROWTH <span className="mx-4 text-gray-400">///</span> SURAKARTA SUPPORT SYSTEM <span className="mx-4 text-gray-400">///</span> THE MASK WE WEAR <span className="mx-4 text-gray-400">///</span> PRETTY ANGRY 
        </div>
      </div>

      {/* Keresahan & Manifesto Section */}
      <section className="py-32 px-6 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 sticky top-32">
            <h2 className="text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none">
              Keresahan & <br />
              <span className="text-gray-400">Pergerakan.</span>
            </h2>
            <div className="w-20 h-2 bg-gray-900 mb-6"></div>
          </div>
          
          <div className="md:col-span-7 space-y-8 text-xl text-gray-600 font-medium leading-relaxed">
            <p className="first-letter:text-7xl first-letter:font-black first-letter:text-gray-900 first-letter:float-left first-letter:mr-4 first-letter:mt-2">
              Potensi yang besar belum sepenuhnya bertumbuh menjadi pergerakan yang saling menguatkan. Ketika proses dijalani bersama, peluang untuk menciptakan koneksi, kolaborasi, dan kesempatan baru menjadi jauh lebih besar.
            </p>
            
            {/* Artistic Quote Block */}
            <div className="relative p-10 bg-white border border-gray-200 art-hover transition-all duration-500 my-12 group">
              <div className="absolute -top-6 -left-6 text-6xl text-gray-300 group-hover:text-gray-700 font-serif">"</div>
              <p className="text-2xl font-serif italic relative z-10">
               Kami percaya bahwa di tengah citra Surakarta sebagai kota slow living, saling terhubung dan saling mendukung justru mampu menciptakan ritme baru bagi kota ini.
              </p>
            </div>
            
            <p>
              Karena perubahan tidak selalu lahir dari sesuatu yang besar. Kadang ia berawal dari <i><b className="text-lg">Noise Kecil</b></i>, ruang kecil, media kecil, dan orang-orang yang memilih untuk <b>Tetap Bergerak</b>.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-32 px-6 bg-gray-200 border-t border-gray-300 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-xs font-bold tracking-[0.2em] text-gray-500 mb-4 uppercase">Tentang Kami</h2>
            {/* <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              GNG COLLECTIVE.
            </h3> */}
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
               Ruang untuk belajar, bergerak, dan berkembang bersama. Karena tumbuh sendirian belum tentu menciptakan perubahan.
             </p>
            <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-gray-900 pl-4">
              Ruang ini berawal dari sebuah keresahan tentang Surakarta—kota yang dikenal dengan budaya dan kreativitasnya, namun output dari ekosistem tersebut sering kali belum terlihat dan belum terhubung secara merata.
            </p>
          </div>
          
          <div className="md:w-1/2 w-full grid grid-cols-2 gap-4">
              <img src="/text-gng.png" alt="GNG Logo" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Event Batch 1 Section - PRETTY ANGRY */}
      <section id="batch-1" className="py-32 px-6 bg-gray-950 text-gray-50 relative z-20 overflow-hidden">
        {/* Noise overlay for brutalist feel */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-start mb-24 border-b border-gray-800 pb-16">
            <div className="md:w-7/12">
              <div className="inline-block mb-6 px-3 py-1 text-white text-s font-black tracking-[0.2em] uppercase">
                Pameran Karya, Live Painting, <br/>Live Mural/Grafity, dan Tattoo Flash
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter hover:text-red-500 transition-colors duration-300 cursor-default">
                PRETTY <br/>
                <span className="text-gray-600">ANGRY</span>
              </h2>
              <h3 className="text-3xl font-serif italic text-gray-400 mb-8 mt-4">Soft Outside, Loud Inside.</h3>
              
              <div className="bg-transparent border-l-2 border-white pl-6">
                <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Tema Utama: The Mask We Wear</h4>
                <p className="text-gray-400 leading-relaxed text-lg max-w-md">
                  Sebuah eksplorasi tentang tekanan, ekspektasi, emosi, dan <em>chaos</em> yang tersembunyi di balik penampilan yang terlihat sangat tenang.
                </p>
              </div>
            </div>
            
            <div className="md:w-5/12 w-full flex flex-col justify-center items-end text-right">
              <p className="text-gray-500 mb-8 font-medium">Tidak hanya datang tapi kamu juga bisa berpartisipasi.</p>
              <Link 
                href="/auth" 
                className="w-full text-center border-2 border-white px-10 py-6 bg-transparent text-white font-black text-2xl uppercase hover:bg-white hover:text-black transition-all duration-300"
              >
                DAFTAR SEKARANG
              </Link>
            </div>
          </div>
          
          {/* Sub-themes Grid with Glitch/Invert Hover */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-800">
            {/* Live Painting */}
            <div className="p-10 border border-gray-800 hover:bg-white hover:text-black transition-all duration-300 group cursor-crosshair">
              <div className="text-xs font-black tracking-widest text-gray-500 mb-8 group-hover:text-black transition-colors">01 // LIVE PAINTING</div>
              <h3 className="text-3xl font-black mb-4 uppercase">The Face I Show</h3>
              <p className="text-gray-400 group-hover:text-gray-800 font-medium leading-relaxed">
                Wajah yang kita tampilkan ke dunia nyata: terlihat tenang, rapi, dan seolah selalu baik-baik saja.
              </p>
            </div>

            {/* Mural */}
            <div className="p-10 border border-gray-800 hover:bg-white hover:text-black transition-all duration-300 group cursor-crosshair">
              <div className="text-xs font-black tracking-widest text-gray-500 mb-8 group-hover:text-black transition-colors">02 // MURAL</div>
              <h3 className="text-3xl font-black mb-4 uppercase">The Noise Inside</h3>
              <p className="text-gray-400 group-hover:text-gray-800 font-medium leading-relaxed">
                Kontras absolut. Di luar tampak hening, namun di dalam kepala penuh dengan suara yang saling berteriak.
              </p>
            </div>

            {/* Tattoo */}
            <div className="p-10 border border-gray-800 hover:bg-white hover:text-black transition-all duration-300 group cursor-crosshair">
              <div className="text-xs font-black tracking-widest text-gray-500 mb-8 group-hover:text-black transition-colors">03 // TATTOO</div>
              <h3 className="text-3xl font-black mb-4 uppercase">Symbols We Carry</h3>
              <p className="text-gray-400 group-hover:text-gray-800 font-medium leading-relaxed">
                Potongan-potongan kecil dari emosi terdalam yang kita bawa dan abadikan diam-diam di permukaan kulit.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Brutalist Footer */}
      <footer className="bg-gray-900 py-16 text-center border-t border-gray-800">
        <h1 className="text-7xl font-black text-gray-800 mb-6 tracking-tighter">GNG COLLECTIVE</h1>
        <p className="text-gray-500 text-sm font-bold tracking-widest uppercase">
          © 2026 SURAKARTA CC <a href="https://deltapytech.my.id" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-300"> DELTAPY TECH</a>. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </main>
  );
}