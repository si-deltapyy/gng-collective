"use client"

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SuccessPage() {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

    return (
        <div className="animate-fade-in w-full max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4">Pendaftaran Berhasil!</h1>
            <p className="text-gray-700 mb-6">Terima kasih telah mendaftar. Kami telah menerima informasi Anda dan akan segera memprosesnya.</p>
            <p className="text-gray-700 mb-6">Silakan cek Whatsapp Anda untuk informasi lebih lanjut atau hubungi kami jika ada pertanyaan.</p>
            <a href="/dashboard/my-events" className="inline-block px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all">
                Lihat Event Saya
            </a>
        </div>
    );
}