import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import RegistrationForm from "./RegistrationForm";

const prisma = new PrismaClient();

export default async function FlashTattooPage() {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  // Tarik data profil terbaru user
  const dbUser = await prisma.user.findFirst({
    where: { id: session.user.id },
  });

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100 mb-3">
          Event Registrasi
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pendaftaran Flash Tattoo</h1>
        <p className="text-gray-600">
          Lengkapi data diri Anda untuk mengamankan slot pada sesi Flash Tattoo.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <RegistrationForm user={dbUser} eventSlug="flash-tattoo" />
      </div>
    </div>
  );
}