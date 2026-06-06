import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import RegistrationForm from "../flash-tatto/RegistrationForm";

const prisma = new PrismaClient();

export default async function LivePaintingPage() {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  // Tarik data profil terbaru user dari database untuk auto-fill
  const dbUser = await prisma.user.findFirst({
    where: { id: session.user.id },
  });

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pendaftaran Live Painting</h1>
        <p className="text-gray-600">Lengkapi data diri Anda di bawah ini. Data profil akan otomatis diperbarui.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Kita pindahkan form ke Client Component agar interaktif */}
        <RegistrationForm user={dbUser} eventSlug="live-painting" />
      </div>
    </div>
  );
}