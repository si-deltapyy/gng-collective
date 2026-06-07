import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma"; // Pastikan menggunakan prisma global
import Link from "next/link";
import PaymentForm from "./PaymentForm";
import TicketGenerator from "./TicketGenerator"; 

// 1. Ubah tipe params menjadi Promise
export default async function RegistrationDetail({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  // 2. Lakukan 'await' untuk mengekstrak (unwrap) id dari params
  const { id } = await params;

  // 3. Gunakan 'id' yang sudah diekstrak ke dalam query Prisma
  const registration = await prisma.registration.findUnique({
    where: { id: id }, // <-- Gunakan id di sini
    include: { event: true, user: true }, 
  });

  if (!registration || registration.userId !== session.user.id) {
    redirect("/dashboard/my-events");
  }

  const { status, event, user } = registration;
  
  const formattedDate = new Date(event.date).toLocaleDateString("id-ID", { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  // Logika Checkpoint
  const steps = [
    { title: "Pendaftaran Berhasil", desc: "Data Anda telah tercatat di sistem.", isCompleted: true, isActive: false },
    { 
      title: "Upload Pembayaran", 
      desc: "Unggah bukti transfer untuk verifikasi.", 
      isCompleted: status !== "PENDING", 
      isActive: status === "PENDING" 
    },
    { 
      title: "Verifikasi Admin", 
      desc: status === "REJECTED" ? "Pembayaran Ditolak." : "Menunggu persetujuan admin GNG.", 
      isCompleted: status === "APPROVED" || status === "REJECTED", 
      isActive: status === "REVIEW",
      isError: status === "REJECTED"
    },
    { 
      title: "E-Ticket Tersedia", 
      desc: "Unduh tiket untuk akses masuk event.", 
      isCompleted: status === "APPROVED", 
      isActive: status === "APPROVED" 
    },
  ];

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/dashboard/my-events" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detail Pendaftaran</h1>
          {/* Gunakan id di sini juga jika diperlukan */}
          <p className="text-sm text-gray-500">ID: {id}</p> 
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kiri: Info Event & Action */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full mb-4">
              Kategori: {registration.qualification}
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-6 pb-6 border-b border-gray-100">{event.description}</p>
            
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-500">Tanggal Pelaksanaan:</span>
              <span className="font-bold text-gray-900">{formattedDate}</span>
            </div>
          </div>

          {status === "PENDING" && (
            <PaymentForm 
              registrationId={registration.id}
              nominal={event.price} />
          )}

          {status === "REVIEW" && (
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
              <h3 className="font-bold text-blue-800 mb-2">Pengecekan Sedang Berlangsung</h3>
              <p className="text-blue-700 text-sm">Bukti pembayaran Anda berhasil diunggah dan sedang direview oleh Admin. Silakan cek halaman ini secara berkala.</p>
            </div>
          )}

          {status === "REJECTED" && (
            <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
              <h3 className="font-bold text-red-800 mb-2">Pembayaran Ditolak</h3>
              <p className="text-red-700 text-sm">Bukti pembayaran yang Anda unggah tidak valid. Silakan hubungi admin atau lakukan pendaftaran ulang.</p>
            </div>
          )}

          {status === "APPROVED" && (
            <div className="bg-green-50 border border-green-200 p-6 md:p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Pendaftaran Berhasil!</h3>
              <p className="text-green-700 text-sm mb-2">Pembayaran telah diverifikasi. Anda resmi terdaftar dalam event ini.</p>
              
              <TicketGenerator 
                registrationId={registration.id}
                eventName={event.title}
                userName={user.name}
                category={registration.qualification}
                date={formattedDate}
              />
            </div>
          )}
        </div>

        {/* Kanan: Timeline Checkpoint */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 self-start">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Status Perjalanan</h3>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-white
                    ${step.isCompleted ? 'border-green-500 bg-green-50' : step.isActive ? 'border-blue-500 ring-4 ring-blue-50' : step.isError ? 'border-red-500 bg-red-50' : 'border-gray-200'}
                  `}>
                    {step.isCompleted ? (
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    ) : step.isError ? (
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                      <span className={`text-xs font-bold ${step.isActive ? 'text-blue-600' : 'text-gray-400'}`}>{index + 1}</span>
                    )}
                  </div>
                  {index !== steps.length - 1 && (
                    <div className={`w-0.5 h-full min-h-[3rem] mt-2 ${step.isCompleted ? 'bg-green-500' : 'bg-gray-100'}`}></div>
                  )}
                </div>
                <div className="pb-6">
                  <h4 className={`text-sm font-bold ${step.isActive ? 'text-blue-700' : step.isCompleted ? 'text-gray-900' : step.isError ? 'text-red-700' : 'text-gray-500'}`}>{step.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}