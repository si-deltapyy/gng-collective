// Hapus "use client" di baris paling atas (jika ada)

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Ambil sesi langsung dari server
  const session = await auth();

  // Jika tidak ada user yang login, lempar kembali ke halaman login
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-4">Selamat datang, {session.user.name}!</h1>
        <p className="text-gray-600 mb-6">
          Email Anda: {session.user.email} <br />
          Role Anda: {session.user.role}
        </p>
        
        {/* Konten Dashboard Lainnya */}
      </div>
    </div>
  );
}