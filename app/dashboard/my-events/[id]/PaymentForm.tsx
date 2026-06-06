"use client";

import { useState } from "react";
import { uploadPaymentReceipt } from "@/app/actions/paymentActions";

export default function PaymentForm({ registrationId }: { registrationId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileName) {
      setError("Silakan pilih file bukti pembayaran terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("registrationId", registrationId);

    const result = await uploadPaymentReceipt(formData);

    if (result?.error) {
      setError(result?.error);
      setIsLoading(false);
    }
    // Jika sukses, halaman akan direfresh secara otomatis oleh server action (revalidatePath)
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Bukti Pembayaran</h3>
      <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600">
        Silakan transfer biaya pendaftaran ke <strong>BCA 1234567890 a/n GNG Collective</strong>. Unggah foto atau screenshot struk pada form di bawah ini.
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

        <div className="relative">
          <input 
            type="file" 
            name="file" 
            id="file-upload" 
            accept="image/*,.pdf"
            className="hidden" 
            onChange={handleFileChange}
          />
          <label 
            htmlFor="file-upload" 
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              fileName ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
              <svg className={`w-8 h-8 mb-2 ${fileName ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              {fileName ? (
                <span className="text-blue-700 font-bold text-sm truncate max-w-[200px]">{fileName}</span>
              ) : (
                <p className="text-sm text-gray-600 font-medium">Klik untuk unggah atau drag & drop</p>
              )}
            </div>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isLoading ? "Mengunggah File..." : "Kirim Bukti Pembayaran"}
        </button>
      </form>
    </div>
  );
}