import { DefaultSession } from "next-auth"

// Mengubah tipe bawaan dari next-auth
declare module "next-auth" {
  /**
   * Mengembalikan tipe dari `session.user` yang sudah ditambahkan `role`
   */
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  /**
   * Mengembalikan tipe dari `user` bawaan NextAuth yang sudah ditambahkan `role`
   */
  interface User {
    id: string
    role: string
  }
}