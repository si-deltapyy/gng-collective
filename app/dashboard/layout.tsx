import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans text-gray-900">
      <Sidebar user={session.user} />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}