"use server"

import { put } from "@vercel/blob"
import { auth } from "@/auth"

export async function uploadFile(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const file = formData.get("file") as File
  if (!file) throw new Error("No file provided")

  const blob = await put(file.name, file, {
    access: "public",
  })

  // Di sini Anda bisa menggunakan prisma untuk menyimpan blob.url ke tabel Registration
  return blob.url
}