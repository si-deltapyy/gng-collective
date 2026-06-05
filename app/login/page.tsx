"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Proses login menggunakan NextAuth Credentials provider
    const res = await signIn("credentials", {
      redirect: false, // Set false agar bisa menangkap error
      email,
      password,
    });

    if (res?.error) {
      setErrorMessage("Email atau password salah.");
      setIsLoading(false);
    } else {
      router.push("/dashboard"); // Arahkan ke dashboard jika sukses
      router.refresh();
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
            Selamat Datang Kembali
          </h1>
          <p className="text-gray-400 text-sm relative z-10 font-medium">
            Masuk untuk melanjutkan ke dashboard GNG.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-10 py-10 space-y-6">
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
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

          <button 
            type="submit" disabled={isLoading}
            className="w-full mt-6 flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all disabled:opacity-70"
          >
            {isLoading ? "Memeriksa Kredensial..." : "Masuk ke Akun"}
          </button>
        </form>

        <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Belum punya akun? <Link href="/register" className="text-gray-900 font-bold hover:underline">Daftar sekarang</Link>
          </p>
        </div>
      </div>
    </main>
  );
}