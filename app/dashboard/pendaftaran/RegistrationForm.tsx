"use client";

import { useState } from "react";
import { registerEvent } from "@/app/actions/registrationActions";

export default function RegistrationForm({ user, eventSlug }: { user: any, eventSlug: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("eventSlug", eventSlug);

    const result = await registerEvent(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
    // Asumsi: jika sukses, navigasi atau tutup modal di-handle oleh action/parent
  };

  return (
    // Dihapus p-6 md:p-8 karena padding sudah di-handle oleh Wrapper Modal
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Pesan Error */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Bagian Data Otomatis (Disabled) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Lengkap</label>
          <input 
            type="text" 
            defaultValue={user?.name || ""} 
            disabled 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed font-medium text-sm" 
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Terdaftar</label>
          <input 
            type="email" 
            defaultValue={user?.email || ""} 
            disabled 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed font-medium text-sm" 
          />
        </div>
      </div>

      {/* Bagian Input Profil */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
        
        <div className="space-y-1.5 md:col-span-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Nomor WA</label>
          <input 
            name="phone" 
            type="tel" 
            required 
            defaultValue={user?.phone || ""}
            disabled={!!user?.phone} // Disable hanya jika nomor WA sudah ada di DB
            placeholder="0812xxxxxx"
            className={`w-full px-4 py-3 border border-gray-200 rounded-xl font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              user?.phone ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900"
            }`} 
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Umur</label>
          <input 
            name="age" 
            type="number" 
            required 
            min="10"
            max="100"
            defaultValue={user?.age || ""} 
            placeholder="Misal: 24" 
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 text-sm font-medium" 
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Gender</label>
          <div className="relative">
            <select 
              name="gender" 
              required 
              defaultValue={user?.gender || ""} 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none text-sm font-medium"
            >
              <option value="" disabled className="text-gray-400">Pilih...</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            {/* Ikon Chevron untuk Select */}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Bagian Kualifikasi (Clean Radio Cards) */}
      <div className="space-y-3 pt-6 border-t border-gray-100">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Kualifikasi Peserta</label>
        <div className="flex flex-col sm:flex-row gap-3">
          
          <label className="relative flex-1 cursor-pointer group">
            <input type="radio" name="qualification" value="UMUM" required className="peer sr-only" />
            <div className="p-4 border border-gray-200 rounded-xl peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-1 peer-checked:ring-blue-500 hover:bg-gray-50 transition-all flex items-center justify-between">
              <span className="font-semibold text-gray-800 peer-checked:text-blue-700 text-sm">Umum</span>
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 bg-white flex items-center justify-center transition-colors">
                {/* Lingkaran dalam diperbaiki */}
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 opacity-0 peer-checked:opacity-100 transition-transform scale-50 peer-checked:scale-100"></div>
              </div>
            </div>
          </label>

          <label className="relative flex-1 cursor-pointer group">
            <input type="radio" name="qualification" value="MAHASISWA" required className="peer sr-only" />
            <div className="p-4 border border-gray-200 rounded-xl peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-1 peer-checked:ring-blue-500 hover:bg-gray-50 transition-all flex items-center justify-between">
              <span className="font-semibold text-gray-800 peer-checked:text-blue-700 text-sm">Pelajar / Mahasiswa</span>
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 bg-white flex items-center justify-center transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 opacity-0 peer-checked:opacity-100 transition-transform scale-50 peer-checked:scale-100"></div>
              </div>
            </div>
          </label>

        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-8">
        <button 
          type="submit" 
          disabled={isLoading} 
          className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gray-900/20 active:scale-[0.98] flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </>
          ) : (
            "Selesaikan Pendaftaran"
          )}
        </button>
      </div>
      
    </form>
  );
}