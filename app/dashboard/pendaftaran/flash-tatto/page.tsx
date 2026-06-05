"use client";

import { useSession, signOut } from "next-auth/react";
export default function FlashTattoPage() {
    const { data: session } = useSession();
    if (!session) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">You are not logged in. Please log in to access the dashboard.</p>
      </div>
    );
  }
}