// "use client";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
export default async function FlashTattoPage() {
    const session = await auth();
    
      // Jika tidak ada user yang login, lempar kembali ke halaman login
      if (!session || !session.user) {
        redirect("/login");
      }

    if (!session) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">You are not logged in. Please log in to access the dashboard.</p>
      </div>
    );
  }
}