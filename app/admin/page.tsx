import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

const prisma = new PrismaClient()

export default async function AdminDashboard() {
  const session = await auth()

  // Otorisasi Sangat Ketat
  if (!session || session.user?.role !== "Admin") {
    redirect("/") // Redirect ke dashboard biasa jika bukan admin
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
            {registrations.map((reg) => (
              <tr key={reg.id} className="border-t">
                <td className="p-4">{reg.user.name}</td>
                <td className="p-4">{reg.event.title}</td>
                <td className="p-4">
                  {reg.paymentReceiptUrl ? (
                    <a href={reg.paymentReceiptUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Lihat Bukti
                    </a>
                  ) : (
                    <span className="text-gray-500">Belum Ada</span>
                  )}
                </td>
                <td className="p-4">
                  {reg.status === "pending" && <span className="text-yellow-600">Pending</span>}
                  {reg.status === "approved" && <span className="text-green-600">Approved</span>}
                  {reg.status === "rejected" && <span className="text-red-600">Rejected</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}