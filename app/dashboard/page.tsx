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
        
        <div className="space-x-4">
          <a href="/pendaftaran/flash-tatto" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Daftar Flash Tattoo
          </a>
          <a href="/pendaftaran/live-painting" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Daftar Live Painting
          </a>
        </div>

        <div className="mt-8">
          <a href="/api/auth/signout" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}