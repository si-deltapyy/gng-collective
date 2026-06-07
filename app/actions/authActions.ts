"use server";

import prisma from "@/lib/prisma";
import { KirimAuthWA } from "./waActions";
import bcrypt from "bcryptjs";


export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  const phone = formData.get("phone") as string;

  // Validasi input dasar
  if (!name || !email || !password || !role || !phone) {
    return { error: "Semua field harus diisi!" };
  }

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email sudah terdaftar. Silakan gunakan email lain." };
    }

    // Hash password (jalan di server)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke database
    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: "USER",
      },
    });

    await KirimAuthWA({
      nama: name,
      no_wa: phone, // Anda bisa menambahkan input nomor WA di form registrasi jika ingin mengirim pesan ini
    });

    return { success: true };
  } catch (error) {
    console.error("Registration Error:", error);
    return { error: "Terjadi kesalahan pada server. Coba lagi nanti." };
  }
}