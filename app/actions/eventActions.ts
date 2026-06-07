"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Fungsi untuk Create & Update
export async function saveEvent(formData: FormData, eventId?: string) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const dateString = formData.get("date") as string;
  const price = parseInt(formData.get("price") as string) || 0;

  if (!title || !slug || !dateString) {
    return { error: "Judul, Slug, dan Tanggal wajib diisi." };
  }

  try {
    if (eventId) {
      // Mode Edit
      await prisma.event.update({
        where: { id: eventId },
        data: { title, slug, description, date: new Date(dateString), price },
      });
    } else {
      // Mode Tambah Baru
      await prisma.event.create({
        data: { title, slug, description, date: new Date(dateString), price },
      });
    }

    revalidatePath("/admin/events"); // Refresh data tabel
    return { success: true };
  } catch (error: any) {
    console.error(error);
    // Error paling umum adalah P2002 (Unique constraint failed) jika Slug sudah dipakai
    return { error: "Gagal menyimpan event. Pastikan 'Slug' bersifat unik dan belum dipakai." };
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
  } catch (error) {
    return { error: "Gagal menghapus event." };
  }
}