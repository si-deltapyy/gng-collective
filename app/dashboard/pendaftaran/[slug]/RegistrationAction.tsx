"use client";

import { useState } from "react";
import RegistrationForm from "../RegistrationForm"; // Sesuaikan path jika perlu

interface RegistrationActionProps {
  eventStatus: string;
  dbUser: any;
  eventSlug: string;
}

export default function RegistrationAction({ eventStatus, dbUser, eventSlug }: RegistrationActionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Tombol Buka Modal & Pesan Tambahan */}
      <div className="mt-2 space-y-3">
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={eventStatus !== 'PUBLISHED'}
          className={`w-full py-4 text-sm font-bold rounded-2xl transition-all active:scale-[0.98] ${
            eventStatus === 'PUBLISHED' 
              ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-xl shadow-gray-900/20' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {eventStatus === 'PUBLISHED' ? 'Daftar Sekarang' : 'Belum Dibuka'}
        </button>

        {eventStatus === 'PUBLISHED' && (
          <p className="text-xs text-center text-gray-500 font-medium">
            Amankan slot Anda sekarang.
          </p>
        )}
      </div>

      {/* Modal Pendaftaran */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop gelap (Bisa diklik untuk menutup) */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Kontainer Modal Utama */}
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
            
            {/* Header Area (Tetap terlihat saat di-scroll) */}
            <div className="px-8 pt-8 pb-4 relative">
              {/* Tombol Close SVG yang Estetik */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"
                aria-label="Tutup modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Ikon dan Judul */}
              <div className="w-12 h-12 bg-gray-100 text-gray-900 rounded-2xl flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Form Pendaftaran</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Silakan lengkapi biodata di bawah ini untuk melanjutkan pendaftaran event Anda.
              </p>
            </div>

            {/* Area Konten Form (Bisa di-scroll jika kepanjangan) */}
            <div className="px-8 pb-8 pt-2 overflow-y-auto">
              <RegistrationForm user={dbUser} eventSlug={eventSlug} />
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}