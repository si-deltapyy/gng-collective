"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/authActions"; // Sesuaikan path

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    
    // Panggil Server Action
    const result = await registerUser(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      setIsLoading(false);
    } else if (result?.success) {
      alert("Registrasi berhasil! Silakan login.");
      router.push("/login"); // Arahkan ke halaman login
    }
  };

  return (
    <main className="min-h-screen bg-gray-200 flex items-center justify-center p-6 font-sans selection:bg-gray-900 selection:text-white relative overflow-hidden">
      {/* Background Noise / Brutalist Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none"></div>
      
      {/* Abstract Typography Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[15rem] font-black text-gray-300/30 whitespace-nowrap pointer-events-none tracking-tighter -rotate-6">
        JOIN US
      </div>

      {/* Main Register Card - Brutalist Style */}
      <div className="relative z-10 w-full max-w-md bg-white border-4 border-gray-900 shadow-[12px_12px_0px_0px_rgba(17,24,39,1)] transition-all duration-300 my-10">
        
        {/* Header Section */}
        <div className="bg-gray-900 px-8 py-10 text-left relative overflow-hidden group">
          <p className="text-xs font-bold tracking-[0.2em] text-gray-400 mb-2 uppercase">
            Collective // Registry
          </p>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter group-hover:text-red-500 transition-colors duration-300">
            Bergabung.
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-serif italic">
            Langkah pertama untuk Grow And Growth bersama kami.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Error Message Box (Sharp & Aggressive) */}
          {errorMessage && (
            <div className="p-4 bg-red-600 text-white border-2 border-gray-900 text-sm font-bold uppercase tracking-wide">
              {errorMessage}
            </div>
          )}

          {/* Input Nama */}
          <div className="space-y-3 relative group">
            <label className="text-xs font-black tracking-widest text-gray-900 uppercase block">
              Nama Lengkap
            </label>
            <input 
              name="name" 
              type="text" 
              required 
              placeholder="JOHN DOE" 
              className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-300 text-gray-900 rounded-none focus:outline-none focus:border-gray-900 transition-all font-medium placeholder-gray-300 uppercase"
            />
          </div>

          {/* Input Email */}
          <div className="space-y-3 relative group">
            <label className="text-xs font-black tracking-widest text-gray-900 uppercase block">
              Email Profesional
            </label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="YOUR@EMAIL.COM" 
              className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-300 text-gray-900 rounded-none focus:outline-none focus:border-gray-900 transition-all font-medium placeholder-gray-300 uppercase"
            />
          </div>

          {/* Input Password */}
          <div className="space-y-3 relative group">
            <label className="text-xs font-black tracking-widest text-gray-900 uppercase block">
              Password
            </label>
            <input 
              name="password" 
              type="password" 
              required 
              placeholder="••••••••" 
              className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-300 text-gray-900 rounded-none focus:outline-none focus:border-gray-900 transition-all font-medium placeholder-gray-300"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-8 flex items-center justify-center gap-2 py-5 bg-gray-900 text-white font-black text-xl uppercase tracking-widest border-2 border-gray-900 hover:bg-white hover:text-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <span className="animate-pulse">Memproses...</span>
            ) : (
              <>
                Daftar Sekarang <span className="group-hover:translate-x-2 transition-transform">→</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="p-6 bg-gray-100 border-t-2 border-gray-900 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Sudah terdaftar dalam sistem? <br className="md:hidden" />
            <Link 
              href="/login" 
              className="text-gray-900 font-black uppercase tracking-wider hover:text-red-600 hover:underline decoration-2 underline-offset-4 transition-all ml-1"
            >
              Akses Log In
            </Link>
          </p>
        </div>
        
      </div>
    </main>
  );
}