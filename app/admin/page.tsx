import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  
  // Ambil statistik secara paralel untuk efisiensi
  const [totalUsers, totalEvents, pendingRegistrations] = await Promise.all([
    prisma.user.count({ where: { role: "USER" } }),
    prisma.event.count(),
    prisma.registration.count({ where: { status: "REVIEW" } }) // Yang sedang menunggu approval
  ]);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">System Overview</h1>
        <p className="text-gray-500 font-medium mt-1">Ringkasan aktivitas platform GNG Collective.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total User</p>
          <p className="text-4xl font-black text-gray-900">{totalUsers}</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Menunggu Approval</p>
          <p className="text-4xl font-black text-gray-900">{pendingRegistrations}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Event</p>
          <p className="text-4xl font-black text-gray-900">{totalEvents}</p>
        </div>
      </div>
    </div>
  );
}