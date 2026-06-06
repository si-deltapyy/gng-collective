"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function registerEvent(formData: FormData) {
  const session = await auth();
  
  // Pastikan session dan ID tersedia
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const eventSlug = formData.get("eventSlug") as string;
  const phone = formData.get("phone") as string;
  const age = parseInt(formData.get("age") as string);
  const gender = formData.get("gender") as string;
  const qualification = formData.get("qualification") as string;

  try {
    // 1. Update data profil User langsung menggunakan ID dari sesi
    await prisma.user.update({
      where: { id: session.user.id },
      data: { phone, age, gender },
    });

    // 2. Cari Event berdasarkan slug
    const event = await prisma.event.findUnique({
      where: { slug: eventSlug },
    });

    if (!event) throw new Error("Event tidak ditemukan.");

    // 3. Cek apakah user sudah mendaftar event ini sebelumnya
    const existingReg = await prisma.registration.findFirst({
      where: { userId: session.user.id, eventId: event.id },
    });

    if (existingReg) return { error: "Anda sudah terdaftar di event ini." };

    // 4. Buat Pendaftaran Baru
    await prisma.registration.create({
      data: {
        userId: session.user.id,
        eventId: event.id,
        qualification,
        status: "PENDING", 
      },
    });

  } catch (error: any) {
    console.error("Registration Error:", error);
    return { error: error.message || "Gagal melakukan pendaftaran." };
  }

  redirect("/dashboard/my-events");
}