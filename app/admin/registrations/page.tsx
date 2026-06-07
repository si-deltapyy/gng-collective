import prisma from "@/lib/prisma";
import { updateRegistrationStatus } from "@/app/actions/adminActions";
import SearchFilter from "./SearchFilter";

// Baris ini akan menonaktifkan caching agresif dari Next.js pada halaman ini
export const dynamic = "force-dynamic";

export default async function RegistrationsLog({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
    
  const query = searchParams?.q || "";
  const statusFilter = searchParams?.status || "";

  const whereClause: any = {};

  if (statusFilter) {
    whereClause.status = statusFilter;
  }

  if (query) {
    whereClause.user = {
      name: {
        contains: query,
        mode: "insensitive", 
      },
    };
  }

  const registrations = await prisma.registration.findMany({
    where: whereClause,
    include: { 
      user: true,
      event: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Log Pendaftaran</h1>
          <p className="text-gray-500 font-medium mt-1">Verifikasi pembayaran dan persetujuan partisipan.</p>
        </div>
      </div>

      {/* Panggil komponen pencarian interaktif di sini */}
      <SearchFilter />

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold tracking-widest text-gray-500 uppercase">
                <th className="p-4">Peserta</th>
                <th className="p-4">Event & Kualifikasi</th>
                <th className="p-4">Bukti Bayar</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    {query || statusFilter 
                      ? "Tidak ada pendaftaran yang sesuai dengan pencarian Anda." 
                      : "Belum ada log pendaftaran."}
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{reg.user.name}</p>
                      <p className="text-xs text-gray-500">{reg.user.phone} • {reg.user.gender}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{reg.event.title}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded">
                        {reg.qualification}
                      </span>
                    </td>
                    <td className="p-4">
                      {reg.paymentReceiptUrl ? (
                        <a href={reg.paymentReceiptUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          Lihat File
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">Belum Upload</span>
                      )}
                    </td>
                    <td className="p-4">
                      {/* Warna Status */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        reg.status === 'REVIEW' ? 'bg-yellow-100 text-yellow-800' : 
                        reg.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                        reg.status === 'PENDING' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {reg.status === "REVIEW" && (
                        <div className="flex justify-end gap-2">
                          <form action={async () => {
                            "use server";
                            await updateRegistrationStatus(reg.id, "APPROVED");
                          }}>
                            <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition">Terima</button>
                          </form>
                          <form action={async () => {
                            "use server";
                            await updateRegistrationStatus(reg.id, "REJECTED");
                          }}>
                            <button className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition">Tolak</button>
                          </form>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}