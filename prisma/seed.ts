import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { hash } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log("Memulai proses seeding database...")

  // 1. Seeder untuk Event Flash Tattoo
  const flashTattoo = await prisma.event.upsert({
    where: { slug: 'flash-tattoo' },
    update: {}, // Jika sudah ada, jangan lakukan apa-apa
    create: {
      slug: 'flash-tattoo',
      title: 'Flash Tattoo // Symbols We Carry',
      description: 'Abadikan potongan emosi terdalam di permukaan kulit. Sesi flash tattoo eksklusif untuk kolektif GNG.',
      includes: 'Kopi + Flash Tattoo Design', // Tambahkan field includes
      price: 25000, // Harga pendaftaran
      date: new Date('2026-07-20T10:00:00Z'), // Sesuaikan tanggal event
    },
  })
  console.log(`Event dibuat/diperbarui: ${flashTattoo.title}`)

  // 2. Seeder untuk Event Live Painting
  const livePainting = await prisma.event.upsert({
    where: { slug: 'live-painting' },
    update: {},
    create: {
      slug: 'live-painting',
      title: 'Live Painting // The Face I Show',
      description: 'Cat, Kuas, dan Pensil dapat digunakan selama kegiatan berlangsung.',
      includes: 'Include Kopi + Canvas', // Tambahkan field includes
      price: 25000, // Harga pendaftaran
      date: new Date('2026-07-21T15:00:00Z'), // Sesuaikan tanggal event
    },
  })
  console.log(`Event dibuat/diperbarui: ${livePainting.title}`)

  const hashedPassword = await bcrypt.hash("gng123", 10);

  const Admin = await prisma.user.upsert({
    where: { email: "admin@gng" },
    update: {},
    create: {
      name: "Admin GNG",
      email: "admin@gng",
      password: hashedPassword, // Hash password untuk keamanan
      role: "ADMIN"
    }
  })
  console.log(`User dibuat/diperbarui: ${Admin.name}`)

  console.log("Seeding selesai! 🚀")
}

main()
  .catch((e) => {
    console.error("Terjadi error saat seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })