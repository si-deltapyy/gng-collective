"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Ambil nilai parameter dari URL secara langsung
  const currentQuery = searchParams.get("q") || "";
  const currentStatus = searchParams.get("status") || "";

  const handleReset = () => {
    // Hapus parameter dengan mengarahkan ulang ke halaman asli
    router.push(pathname);
    router.refresh(); // Paksa server untuk mengambil ulang data
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6">
      {/* Gunakan GET action untuk otomatis mengubah URL Parameter */}
      <form method="GET" action={pathname} className="flex flex-col md:flex-row gap-4">
        
        {/* Input Pencarian Nama */}
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            name="q"
            defaultValue={currentQuery} // Gunakan defaultValue, bukan value
            placeholder="Cari nama peserta..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Dropdown Filter Status */}
        <div className="w-full md:w-48 relative">
          <select
            name="status"
            defaultValue={currentStatus} // Gunakan defaultValue
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium text-gray-900 appearance-none"
          >
            <option value="">Semua Status</option>
            <option value="PENDING">Belum Upload</option>
            <option value="REVIEW">Menunggu (REVIEW)</option>
            <option value="APPROVED">Diterima (APPROVED)</option>
            <option value="REJECTED">Ditolak (REJECTED)</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-sm whitespace-nowrap"
          >
            Cari
          </button>
          
          {(currentQuery || currentStatus) && (
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 text-sm font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
}