import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation"
import Link from "next/link";

const prisma = new PrismaClient();

export default async function DashboardIndex() {
  const session = await auth();

  if (!session || session.user?.role !== "USER") {
      redirect("/admin") // Redirect ke dashboard biasa jika bukan admin
    }

  const userId = session?.user?.id || "";

  async function countEvent(id: string) {
    return await prisma.registration.count({
      where: { userId: id },
    });
  }

  const eventCount = await countEvent(userId);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang, {session?.user?.name}!</h1>
        <p className="text-gray-600">Pantau status pendaftaran dan kelola informasi akun Anda di sini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric Cards */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-sm font-medium text-gray-500 mb-1">Status Pendaftaran</p>
          {session?.user ? (
            <p className="text-2xl font-bold text-green-600">Aktif</p>
          ) : (
            <p className="text-2xl font-bold text-red-600">Tidak Aktif</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-sm font-medium text-gray-500 mb-1">Role Akun</p>
          <p className="text-2xl font-bold text-blue-600 capitalize">{session?.user?.role || "Peserta"}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-sm font-medium text-gray-500 mb-1">Event Kamu</p>
          <p className="text-2xl font-bold text-gray-900">{eventCount}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Penting</h2>
        <div className="p-4 bg-blue-50 text-blue-800 rounded-xl border border-blue-100">
          <p className="font-medium">Kontribusi Pretty Angry Sudah Dibuka!</p>
          <p className="text-sm mt-1">Silakan menuju menu "Partisipasi" di sidebar untuk ikut berkontribusi bersama kami. atau <a href="/dashboard/competitions" className="text-blue-600 hover:underline font-semibold"><i className="fas fa-external-link-alt"></i> <i>Lihat event yang tersedia.</i></a></p>
        </div>
      </div>
    </div>
  );
}