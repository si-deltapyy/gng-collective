"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  // Validasi input dasar
  if (!name || !email || !password || !role) {
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
        password: hashedPassword,
        role: "USER",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration Error:", error);
    return { error: "Terjadi kesalahan pada server. Coba lagi nanti." };
  }
}