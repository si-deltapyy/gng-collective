"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/authActions";

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  
  const [phone, setPhone] = useState("62"); // Default value 62

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ""); // Otomatis hapus huruf/simbol, hanya sisa angka

    // Jika user iseng mengetik '0' di awal, otomatis sulap jadi '62'
    if (val.startsWith("0")) {
      val = "62" + val.slice(1);
    } 
    // Jika user menghapus sampai habis, kembalikan ke default kosong agar tidak error
    else if (val === "") {
      val = "";
    }
    // Jika user mengetik angka selain 62 di awal, paksa tambahkan 62
    else if (!val.startsWith("62") && val.length > 0) {
      val = "62" + val;
    }

    setPhone(val);
  };

  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    if (isLoginMode) {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setErrorMessage("Kredensial tidak valid. Silakan coba lagi.");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } else {
      formData.append("role", "USER");
      
      const result = await registerUser(formData);

      if (result?.error) {
        setErrorMessage(result.error);
        setIsLoading(false);
      } else if (result?.success) {
        setSuccessMessage("Registrasi berhasil! Silakan masuk ke akun Anda.");
        setIsLoginMode(true); 
        setIsLoading(false);
        e.currentTarget.reset(); 
      }
    }
  };

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-6 font-sans transition-colors duration-700 ease-in-out selection:bg-gray-300 ${
      isLoginMode ? "bg-gray-50" : "bg-slate-100"
    }`}>
      
      <div className="w-full max-w-md flex flex-col relative">
        
        {/* === LOGO ATAS === */}
        <div className={`text-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
          isLoginMode 
            ? "opacity-100 translate-y-0 h-24 mb-2" 
            : "opacity-0 translate-y-12 h-0 overflow-hidden pointer-events-none"
        }`}>
          <Link href="/" className="inline-flex flex-col items-center group">
            <img src="/logo.png" alt="GNG Logo" className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 group-hover:text-gray-900 transition-colors mt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Kembali ke Beranda
            </div>
          </Link>
        </div>

        {/* === MAIN CARD === */}
        <div className={`bg-white rounded-[2rem] overflow-hidden transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
          isLoginMode 
            ? "shadow-xl shadow-gray-200/50 border border-gray-100" 
            : "shadow-2xl shadow-slate-300/60 border border-slate-200"
        }`}>
          
          <div className="p-8 md:p-10">
            
            {/* Header Cross-Fade Container */}
            <div className="relative h-[68px] mb-8 text-center">
              <div className={`absolute inset-x-0 top-0 transition-all duration-500 ease-in-out ${
                isLoginMode ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
              }`}>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Selamat Datang</h1>
                <p className="text-gray-500 text-sm">Silakan masuk menggunakan akun Anda.</p>
              </div>
              
              <div className={`absolute inset-x-0 top-0 transition-all duration-500 ease-in-out ${
                !isLoginMode ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
              }`}>
                <h1 className="text-2xl font-bold text-slate-800 mb-1">Mulai Perjalanan</h1>
                <p className="text-gray-500 text-sm">Daftar untuk bergabung di kolektif kami.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMessage && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium text-center animate-fade-in">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="p-4 bg-green-50 text-green-700 border border-green-100 rounded-xl text-sm font-medium text-center animate-fade-in">
                  {successMessage}
                </div>
              )}

              {/* === INPUT KHUSUS REGISTER (Nama & WA) === */}
              {/* Menggunakan grid transition agar form memanjang perlahan ke bawah tanpa patah */}
              <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                isLoginMode ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100 mb-4"
              }`}>
                <div className="overflow-hidden">
                  
                  {/* Input Nama Lengkap */}
                  <div className="space-y-2 pb-4">
                    <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                    <input 
                      name="name" 
                      type="text" 
                      required={!isLoginMode} 
                      disabled={isLoginMode}
                      placeholder="John Doe" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-all placeholder-gray-400"
                    />
                  </div>

                  {/* Input No Whatsapp & Note */}
                  <div className="space-y-2 pb-2">
                    <label className="text-sm font-semibold text-gray-700">No. WhatsApp</label>
                    <input 
                      name="phone" 
                      type="tel" 
                      value={phone}
                      onChange={handlePhoneChange}
                      required={!isLoginMode} 
                      disabled={isLoginMode}
                      placeholder="6281XXXXXXXX" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-all placeholder-gray-400"
                    />
                    <p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed">
                      *Nomor ini akan digunakan untuk mengirimkan informasi pendaftaran dan autentikasi event.
                    </p>
                  </div>

                </div>
              </div>

              {/* === INPUT STANDAR (Selalu Muncul) === */}
              {/* Input Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="nama@email.com" 
                  className={`w-full px-4 py-3 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 transition-all placeholder-gray-400 ${
                    isLoginMode ? "bg-gray-50 border-gray-200 focus:ring-gray-900 focus:bg-white" : "bg-slate-50 border-slate-200 focus:ring-slate-800 focus:bg-white"
                  }`}
                />
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  {isLoginMode && (
                    <Link href="#" className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                      Lupa sandi?
                    </Link>
                  )}
                </div>
                <input 
                  name="password" 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  className={`w-full px-4 py-3 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 transition-all placeholder-gray-400 ${
                    isLoginMode ? "bg-gray-50 border-gray-200 focus:ring-gray-900 focus:bg-white" : "bg-slate-50 border-slate-200 focus:ring-slate-800 focus:bg-white"
                  }`}
                />
              </div>

              {/* Button Cross-Fade Content */}
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full h-[54px] mt-6 text-white font-bold rounded-xl transition-all duration-500 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center relative overflow-hidden ${
                  isLoginMode ? "bg-gray-900 hover:bg-gray-800" : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 animate-pulse">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Memproses...
                  </span>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <span className={`absolute transition-all duration-500 ${isLoginMode ? "opacity-100 transform-none" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
                      Masuk ke Akun
                    </span>
                    <span className={`absolute transition-all duration-500 ${!isLoginMode ? "opacity-100 transform-none" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                      Daftar Sekarang
                    </span>
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Footer Cross-Fade Link */}
          <div className={`p-6 border-t text-center transition-all duration-500 relative h-16 flex items-center justify-center ${
            isLoginMode ? "bg-gray-50 border-gray-100" : "bg-slate-50 border-slate-200"
          }`}>
            <div className={`absolute transition-all duration-500 ${isLoginMode ? "opacity-100 transform-none" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
              <p className="text-sm text-gray-600 font-medium">
                Belum punya akun?
                <button type="button" onClick={toggleMode} className="text-gray-900 font-bold hover:underline decoration-2 underline-offset-4 ml-1">
                  Daftar Sekarang
                </button>
              </p>
            </div>
            <div className={`absolute transition-all duration-500 ${!isLoginMode ? "opacity-100 transform-none" : "opacity-0 translate-y-2 pointer-events-none"}`}>
              <p className="text-sm text-gray-600 font-medium">
                Sudah punya akun?
                <button type="button" onClick={toggleMode} className="text-slate-800 font-bold hover:underline decoration-2 underline-offset-4 ml-1">
                  Masuk di Sini
                </button>
              </p>
            </div>
          </div>
          
        </div>

        {/* === LOGO BAWAH === */}
        <div className={`text-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
          !isLoginMode 
            ? "opacity-100 translate-y-0 h-24 mt-8" 
            : "opacity-0 -translate-y-12 h-0 overflow-hidden pointer-events-none"
        }`}>
          <Link href="/" className="inline-flex flex-col items-center group">
            <img src="/logo.png" alt="GNG Logo" className="h-12 w-auto object-contain transition-all duration-300 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 group-hover:text-slate-900 transition-colors mt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Kembali ke Beranda
            </div>
          </Link>
        </div>

      </div>
    </main>
  );
}