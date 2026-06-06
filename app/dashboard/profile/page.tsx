import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan Profil</h1>
        <p className="text-gray-600">Perbarui informasi data diri dan kredensial Anda di sini.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
        <form className="p-6 md:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
              <input 
                type="text" 
                defaultValue={session?.user?.name || ""}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Utama</label>
              <input 
                type="email" 
                defaultValue={session?.user?.email || ""}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">Email tidak dapat diubah setelah registrasi.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ubah Password</h3>
            <label className="text-sm font-semibold text-gray-700">Password Baru</label>
            <input 
              type="password" 
              placeholder="Kosongkan jika tidak ingin mengubah"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all max-w-md"
            />
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="button" 
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}