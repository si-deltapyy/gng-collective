import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function AdminDashboard() {
  const session = await auth()

  // Otorisasi Sangat Ketat
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/")
  }

  // Tarik data pendaftar
  const registrations = await prisma.registration.findMany({
    include: { user: true, event: true }
  })

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Admin Dashboard</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-4">Nama User</th>
              <th className="p-4">Event</th>
              <th className="p-4">Bukti Pembayaran (Blob)</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(reg => (
              <tr key={reg.id} className="border-t">
                <td className="p-4">{reg.user.name}</td>
                <td className="p-4">{reg.event.title}</td>
                <td className="p-4">
                  {reg.paymentReceiptUrl ? (
                    <a href={reg.paymentReceiptUrl} target="_blank" className="text-blue-500 hover:underline">Lihat File</a>
                  ) : "Belum Upload"}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${reg.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {reg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}