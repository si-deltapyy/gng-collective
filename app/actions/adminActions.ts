"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function updateRegistrationStatus(registrationId: string, newStatus: string) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized access");

  try {
    await prisma.registration.update({
      where: { id: registrationId },
      data: { status: newStatus },
    });
    
    // Refresh halaman admin agar tabel terupdate
    revalidatePath("/admin/registrations");
    return { success: true };
  } catch (error) {
    return { error: "Gagal memperbarui status pendaftaran." };
  }
}