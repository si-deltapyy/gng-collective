"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";

interface TicketProps {
  registrationId: string;
  eventName: string;
  userName: string;
  category: string;
  date: string;
}

export default function TicketGenerator({ registrationId, eventName, userName, category, date }: TicketProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    
    setIsGenerating(true);
    try {
      // Menggunakan html-to-image yang support modern CSS & Tailwind
      const dataUrl = await toPng(ticketRef.current, {
        quality: 1,
        pixelRatio: 2, // Agar hasil download HD (Retina Display)
        backgroundColor: "#ffffff",
        style: {
          transform: "scale(1)", // Memastikan gambar tidak terpotong
          transformOrigin: "top left",
        }
      });

      // Buat elemen <a> palsu untuk memicu download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `GNG-Ticket-${registrationId.slice(-6)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error("Gagal mengunduh tiket:", error);
      alert("Terjadi kesalahan saat membuat tiket. Pastikan browser Anda mendukung fitur ini.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-4 border-t border-green-200 pt-6">
      <button 
        onClick={downloadTicket}
        disabled={isGenerating}
        className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mb-6"
      >
        {isGenerating ? (
          "Sedang Membuat E-Ticket..."
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Generate & Download E-Ticket
          </>
        )}
      </button>

      {/* Tampilan Visual E-Ticket */}
      <div className="flex justify-center overflow-hidden p-4 bg-gray-50 rounded-2xl border border-gray-100">
        
        {/* Kontainer Tiket Asli (Ref) */}
        <div 
          ref={ticketRef} 
          className="w-full max-w-sm bg-white border-2 border-gray-900 rounded-2xl shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] flex flex-col relative"
        >
          {/* Header Tiket */}
          <div className="bg-gray-900 text-white p-6 rounded-t-xl text-center">
            <h2 className="text-2xl font-black uppercase tracking-widest">GNG Collective</h2>
            <p className="text-gray-400 text-xs font-bold tracking-[0.2em] mt-1 uppercase">Official E-Ticket</p>
          </div>

          {/* Badan Tiket (Informasi) */}
          <div className="p-6 space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Event</p>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">{eventName}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Atas Nama</p>
                <p className="font-bold text-gray-900 truncate">{userName}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Kategori</p>
                <p className="font-bold text-gray-900">{category}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tanggal</p>
              <p className="font-bold text-gray-900">{date}</p>
            </div>
          </div>

          {/* Garis Potong (Perforated Line) */}
          <div className="relative h-0 border-t-2 border-dashed border-gray-300 my-2">
            <div className="absolute -left-3 -top-3 w-6 h-6 bg-gray-50 rounded-full border-r-2 border-gray-900"></div>
            <div className="absolute -right-3 -top-3 w-6 h-6 bg-gray-50 rounded-full border-l-2 border-gray-900"></div>
          </div>

          {/* Area QR Code */}
          <div className="p-6 flex flex-col items-center bg-white rounded-b-xl">
            <div className="p-2 border-4 border-gray-900 rounded-xl bg-white mb-2">
              <QRCodeCanvas value={registrationId} size={150} level={"H"} />
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">ID: {registrationId}</p>
          </div>
        </div>
      </div>

    </div>
  );
}