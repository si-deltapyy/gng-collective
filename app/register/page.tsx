"use client";

import { useState } from "react";
import Link from "next/link";
// Jika menggunakan lucide-react untuk icon, pastikan sudah diinstall: npm install lucide-react
// import { UploadCloud, ArrowRight } from "lucide-react"; 

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi proses upload & register
    setTimeout(() => {
      setIsLoading(false);
      alert("Registrasi berhasil! Silakan cek email Anda.");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans selection:bg-gray-300">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-900 px-10 py-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h1 className="text-3xl font-black text-white mb-2 relative z-10 tracking-tight">
            Bergabung dengan <span className="text-gray-400">GNG.</span>
          </h1>
          <p className="text-gray-400 text-sm relative z-10 font-medium">
            Langkah pertama untuk Grow And Growth bersama kami.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="px-10 py-10 space-y-6">
          {/* Input Nama */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
            <input 
              type="text" 
              required
              placeholder="John Doe" 
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder-gray-400"
            />
          </div>

          {/* Input Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email Profesional</label>
            <input 
              type="email" 
              required
              placeholder="john@example.com" 
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder-gray-400"
            />
          </div>

          {/* Input Password */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder-gray-400"
            />
          </div>

          {/* Custom File Upload untuk Bukti Pembayaran */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Bukti Pembayaran</label>
            <div className="relative">
              <input 
                type="file" 
                id="file-upload" 
                required
                accept="image/*,.pdf"
                className="hidden" 
                onChange={handleFileChange}
              />
              <label 
                htmlFor="file-upload" 
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  fileName ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {/* Icon Upload (menggunakan SVG inline agar tidak perlu install library tambahan) */}
                  <svg className={`w-8 h-8 mb-3 ${fileName ? 'text-gray-900' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="text-sm text-gray-600 font-medium">
                    {fileName ? (
                      <span className="text-gray-900 font-bold">{fileName}</span>
                    ) : (
                      <>Klik untuk unggah atau seret file</>
                    )}
                  </p>
                  {!fileName && <p className="text-xs text-gray-400 mt-1">PNG, JPG atau PDF (Maks. 5MB)</p>}
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-6 flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              <>Selesaikan Pendaftaran</>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Sudah terdaftar?{" "}
            <Link href="/login" className="text-gray-900 font-bold hover:underline decoration-2 underline-offset-4">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}