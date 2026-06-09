import Link from "next/link";
import prisma from "@/lib/prisma";

// 1. Tambahkan 'async' pada function komponen
export default async function CompetitionsPage() {
  
  let events: any[] = [];
  const activeEvents = events.filter((comp) => comp.status !== "DRAFT");
  
  // 2. Gunakan 'await' untuk mengambil data dari Prisma
  try {
    const data = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });

    events = data.map((event) => ({
      id: event.id,
      title: event.title,
      category: event.title.includes("Tattoo") ? "Art / Ink" : "Visual Art",
      description: event.description,
      includes: event.includes, // 3. Ubah 'inc' menjadi 'includes' agar sesuai dengan JSX
      status: event.status,
      slug: event.slug,
      price: event.price > 0 ? `Rp${event.price.toLocaleString("id-ID")}` : "Gratis",
    }));
  } catch (error) { 
    console.error("Error fetching events:", error);
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Keterlibatan</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.filter((comp) => comp.status !== "DRAFT").length > 0 ? (
          events
            .filter((comp) => comp.status !== "DRAFT")
            .map((comp) => (
              <div key={comp.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="h-2 w-full bg-gray-500"></div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-100">
                      {comp.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-lg font-bold bg-green-50 text-green-700 border border-green-100">
                      {comp.price}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{comp.title}</h2>
                  <p className="text-gray-600 mb-8 flex-1 leading-relaxed">
                    <span className="text-lg font-extrabold">{comp.includes}</span><br/>
                    <i>{comp.description}</i>
                  </p>
                  
                  <Link 
                    href={`/dashboard/pendaftaran/${comp.slug}`}
                    className={`mt-auto inline-block px-5 py-3 text-sm font-bold rounded-full text-white text-center transition-all ${
                      comp.status === "ARCHIVED" 
                        ? "bg-gray-400 cursor-not-allowed opacity-50" 
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    {comp.status === "ARCHIVED" ? "Segera Hadir" : "Daftar Sekarang →"}
                  </Link>
                </div>
              </div>
            ))
        ) : (
          <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📭</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Tidak Ada Event</h3>
            <p className="text-gray-500 font-medium">Belum ada event yang tersedia untuk saat ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}