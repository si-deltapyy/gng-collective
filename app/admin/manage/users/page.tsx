import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function AdminUserManagement() {
  const users = await prisma.user.findMany({
    where: { role: "USER" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

    return (
        <div className="animate-fade-in">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Manajemen Pengguna</h1>
                    <p className="text-gray-500 font-medium mt-1">Kelola data pengguna yang terdaftar di platform.</p>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold tracking-widest text-gray-500 uppercase">
                                <th className="p-4">Nama</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Tanggal Bergabung</th>
                                <th className="p-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">Belum ada pengguna terdaftar.</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-900">{user.name}</td>
                                        <td className="p-4 text-gray-500">{user.email}</td>
                                        <td className="p-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString("id-ID")}</td>
                                        <td className="p-4 text-right">
                                            <Link href={`/admin/manage/users/${user.id}`} className="text-sm font-bold text-blue-600 hover:text-blue-800">
                                                Detail &rarr;
                                            </Link>
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