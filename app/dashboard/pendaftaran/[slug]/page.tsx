
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";

// Import komponen client yang akan kita buat di bawah
import RegistrationAction from "./RegistrationAction"; 

export default async function PendaftaranEventPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {

  const resolvedParams = await params;
  const eventSlug = resolvedParams.slug;

  const session = await auth();
  if (!session || !session.user) redirect("/login");

  const dbUser = await prisma.user.findFirst({
    where: { id: session.user.id },
  });
  
  const event = await prisma.event.findUnique({
    where: { slug: eventSlug },
  });

  if (!event) notFound();

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(event.date);

  const formattedPrice = event.price > 0 
    ? `Rp ${event.price.toLocaleString("id-ID")}` 
    : "Gratis";

  const category = event.title.includes("Tattoo") ? "Art / Ink" : "Visual Art";

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <Link 
        href="/dashboard/competitions" 
        className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        ← Kembali ke Daftar Event
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 w-full bg-gray-900"></div>
        
        <div className="p-8 md:p-10 -mt-16">
          <div className="bg-white inline-block p-2 rounded-2xl shadow-sm mb-6 border border-gray-100">
            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-gray-50 text-gray-700 border border-gray-100">
              {category}
            </span>
            <span className="px-4 py-2 ml-2 rounded-xl text-sm font-bold bg-green-50 text-green-700 border border-green-100">
              Kouta Terbatas
            </span>
          </div>

          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
            {event.title}
          </h1>

          <div className="flex items-center text-gray-500 font-medium mb-8">
            <span className="mr-4">📅 {formattedDate}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              event.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {event.status === 'PUBLISHED' ? 'Pendaftaran Buka' : 'Segera Hadir'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-gray-100 pt-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Tentang Event Ini</h3>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>

              {event.includes && (
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    Apa yang didapatkan?
                  </h3>
                  <p className="text-gray-700 font-medium">✨ {event.includes}</p>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Pendaftaran</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 text-sm">Biaya Pendaftaran</span>
                  <span className="font-bold text-gray-900">{formattedPrice}</span>
                </div>
                
                {/* Panggil komponen Client di sini dan lempar datanya */}
                <RegistrationAction 
                  eventStatus={event.status} 
                  dbUser={dbUser} 
                  eventSlug={event.slug} 
                />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}