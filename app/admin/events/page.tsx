import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import EventManager from "./EventManager";

// Pastikan halaman tidak di-cache secara agresif agar data selalu up-to-date
export const dynamic = "force-dynamic";

export default async function AdminEventPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  // Tarik data event dari database
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <EventManager initialEvents={events} />
  );
}