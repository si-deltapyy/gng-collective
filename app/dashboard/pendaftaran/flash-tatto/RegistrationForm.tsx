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
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8 bg-white">
      {/* Pesan Error */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Bagian Data Otomatis (Disabled) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
          <input 
            type="text" 
            defaultValue={user?.name} 
            disabled 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed font-medium" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Email Terdaftar</label>
          <input 
            type="email" 
            defaultValue={user?.email} 
            disabled 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed font-medium" 
          />
        </div>
      </div>

      {/* Bagian Input Profil */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Nomor WA</label>
          <input 
            name="phone" 
            type="text" 
            required 
            defaultValue={user?.phone || ""} 
            placeholder="0812XXXXXXXX" 
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Umur</label>
          <input 
            name="age" 
            type="number" 
            required 
            defaultValue={user?.age || ""} 
            placeholder="Contoh: 24" 
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Gender</label>
          <select 
            name="gender" 
            required 
            defaultValue={user?.gender || ""} 
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
          >
            <option value="" disabled className="text-gray-400">Pilih Gender</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
      </div>

      {/* Bagian Kualifikasi (Clean Radio Cards) */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <label className="text-sm font-semibold text-gray-700">Kualifikasi Peserta</label>
        <div className="flex flex-col md:flex-row gap-4">
          <label className="relative flex-1 cursor-pointer">
            <input type="radio" name="qualification" value="UMUM" required className="peer sr-only" />
            <div className="p-5 border border-gray-200 rounded-xl peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-1 peer-checked:ring-blue-500 hover:bg-gray-50 transition-all flex items-center justify-between">
              <span className="font-semibold text-gray-800 peer-checked:text-blue-700">Umum</span>
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </label>

          <label className="relative flex-1 cursor-pointer">
            <input type="radio" name="qualification" value="MAHASISWA" required className="peer sr-only" />
            <div className="p-5 border border-gray-200 rounded-xl peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-1 peer-checked:ring-blue-500 hover:bg-gray-50 transition-all flex items-center justify-between">
              <span className="font-semibold text-gray-800 peer-checked:text-blue-700">Pelajar/Mahasiswa</span>
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button 
          type="submit" 
          disabled={isLoading} 
          className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses Data...
            </>
          ) : (
            "Selesaikan Pendaftaran"
          )}
        </button>
      </div>
    </form>
  );
}