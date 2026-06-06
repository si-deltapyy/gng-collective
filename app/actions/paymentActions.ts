"use server";

import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function uploadPaymentReceipt(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  const registrationId = formData.get("registrationId") as string;

  if (!file || !registrationId) {
    return { error: "File atau ID pendaftaran tidak valid." };
  }

  try {
    // 1. Upload ke Vercel Blob
    const blob = await put(`receipts/${registrationId}-${file.name}`, file, {
      access: "public",
    });

    // 2. Update Database
    await prisma.registration.update({
      where: { id: registrationId },
      data: {
        paymentReceiptUrl: blob.url,
        status: "REVIEW", // Status berubah menjadi Menunggu Admin
      },
    });

    // 3. Refresh halaman agar status terbaru muncul
    revalidatePath(`/dashboard/my-events/${registrationId}`);
    return { success: true };

  } catch (error: any) {
    console.error("Upload error:", error);
    return { error: "Gagal mengunggah file. Coba lagi nanti." };
  }
}