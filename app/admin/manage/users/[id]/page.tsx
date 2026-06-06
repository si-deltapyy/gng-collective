import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function RegistrationDetail({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

    const user = await prisma.user.findFirst({
        where: { id: params.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    if (!user) {
        redirect("/admin/manage/users"); // Redirect jika user tidak ditemukan
    }

    return (
        <div className="animate-fade-in w-full max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Detail User</h1>
                <p className="text-gray-600">Informasi lengkap tentang user yang terdaftar.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Profil User</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Nama Lengkap</p>
                            <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Role</p>
                            <p className="text-lg font-semibold text-gray-900">{user.role}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Tanggal Bergabung</p>
                            <p className="text-lg font-semibold text-gray-900">{new Date(user.createdAt).toLocaleDateString("id-ID")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}