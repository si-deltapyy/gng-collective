"use client";

import { useSession, signOut } from "next-auth/react";
export default function DashboardPage() {
  const { data: session } = useSession();
    if (!session) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">You are not logged in. Please log in to access the dashboard.</p>
      </div>
    );
  }
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}!</h1>
      <p className="text-gray-600 mb-6">This is your dashboard.</p>
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
            Sign Out
        </button>
    </div>
  );
}