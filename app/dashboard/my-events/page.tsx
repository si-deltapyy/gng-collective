import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function MyEventsPage() {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  // Tarik data registrasi user beserta detail event-nya
  const registrations = await prisma.registration.findMany({
    where: { userId: session.user.id },
    include: { event: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Saya</h1>
        <p className="text-gray-600">Daftar event dan lomba yang sedang Anda ikuti.</p>
      </div>

      {registrations.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-medium">Anda belum terdaftar di event apa pun.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registrations.map((reg) => (
            <div key={reg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  reg.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'
                }`}>
                  Status: {reg.status}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {reg.event.title === "flash-tattoo" ? "Flash Tattoo" : "Live Painting"}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{reg.event.title}</h2>
              <p className="text-sm text-gray-500 mb-4">Mendaftar pada: {new Date(reg.createdAt).toLocaleDateString("id-ID")}</p>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="pt-4 border-t border-gray-100">
                  <Link href={`/dashboard/my-events/${reg.id}`} className="text-sm font-bold text-blue-600 hover:text-blue-800">
                    Detail Pendaftaran &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}