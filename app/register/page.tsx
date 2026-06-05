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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans selection:bg-gray-300">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 px-10 py-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h1 className="text-3xl font-black text-white mb-2 relative z-10 tracking-tight">
            Bergabung dengan <span className="text-gray-400">GNG.</span>
          </h1>
          <p className="text-gray-400 text-sm relative z-10 font-medium">
            Langkah pertama untuk Grow And Growth bersama kami.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-10 py-10 space-y-6">
          {/* Tampilkan pesan error jika ada */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
            <input 
              name="name" type="text" required placeholder="John Doe" 
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email Profesional</label>
            <input 
              name="email" type="email" required placeholder="john@example.com" 
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <input 
              name="password" type="password" required placeholder="••••••••" 
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Role</label>
            <select 
              name="role" required // Pastikan atribut name ini ada
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            >
              <option value="">Pilih Role Anda</option>
              <option value="artist">Artist</option>
              <option value="client">Client</option>
            </select>
          </div>

          <button 
            type="submit" disabled={isLoading}
            className="w-full mt-6 flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all disabled:opacity-70"
          >
            {isLoading ? "Memproses..." : "Selesaikan Pendaftaran"}
          </button>
        </form>

        <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Sudah terdaftar? <Link href="/login" className="text-gray-900 font-bold hover:underline">Masuk di sini</Link>
          </p>
        </div>
      </div>
    </main>
  );
}