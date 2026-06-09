"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Status } from "@prisma/client";

// Fungsi untuk Create & Update
export async function saveEvent(formData: FormData, eventId?: string) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const dateString = formData.get("date") as string;
  const price = parseInt(formData.get("price") as string) || 0;
  const includes = formData.get("includes") as string;
  const status = formData.get("status") as Status;
  
  if (!title || !slug || !dateString) {
    return { error: "Judul, Slug, dan Tanggal wajib diisi." };
  }

  try {
    if (eventId) {
      // Mode Edit
      await prisma.event.update({
        where: { id: eventId },
        data: { title, slug, description, date: new Date(dateString), price, includes, status },
      });
    } else {
      // Mode Tambah Baru
      await prisma.event.create({
        data: { title, slug, description, date: new Date(dateString), price, includes, status },
      });
    }

    revalidatePath("/admin/events"); // Refresh data tabel
    return { success: true };
  } catch (error: any) {
    console.error("Prisma Error:", error);
    
    // Penanganan error duplikat dari Prisma (Unique constraint failed)
    if (error.code === 'P2002') {
      return { error: "Slug sudah dipakai. Silakan gunakan slug lain yang unik." };
    }

    // ✅ KEMBALIKAN STRING, BUKAN OBJEK ERROR
    return { error: error.message || "Gagal menyimpan event ke database." };
  }
}

// Fungsi untuk Delete
export async function deleteEvent(eventId: string) {
  try {
    await prisma.event.delete({
      where: { id: eventId },
    });
    revalidatePath("/admin/events");
    return { success: true };
  } catch (error: any) {
    // ✅ Sama di sini, kembalikan string yang rapi
    return { error: error.message || "Gagal menghapus event." };
  }
}