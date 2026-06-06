import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Validasi ketat: Harus login DAN harus memiliki role ADMIN
  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/dashboard"); // Tendang kembali ke dashboard user biasa
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans selection:bg-red-200">
      <AdminSidebar user={session.user} />
      
      <main className="flex-1 w-full p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}