"use client";

import { useState } from "react";
import { uploadPaymentReceipt } from "@/app/actions/paymentActions";

export default function PaymentForm({ 
  registrationId, 
  nominal 
}: { 
  registrationId: string;
  nominal: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  
  // State untuk animasi copy
  const [isCopiedRek, setIsCopiedRek] = useState(false);
  const [isCopiedNom, setIsCopiedNom] = useState(false);

  const accountNumber = "1433222222";

  // Fungsi Format Rupiah
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const handleCopyRekening = () => {
    navigator.clipboard.writeText(accountNumber);
    setIsCopiedRek(true);
    setTimeout(() => setIsCopiedRek(false), 2000);
  };

  const handleCopyNominal = () => {
    navigator.clipboard.writeText(nominal.toString());
    setIsCopiedNom(true);
    setTimeout(() => setIsCopiedNom(false), 2000);
  };

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
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Pembayaran & Konfirmasi</h3>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6 space-y-4">
        <p className="text-sm font-semibold text-blue-800">Transfer Pembayaran ke Rekening Berikut:</p>
        
        {/* Box 1: Nomor Rekening */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-lg border border-blue-100 gap-4">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Bank BCA</p>
            <p className="text-2xl font-black text-gray-900 tracking-wider">{accountNumber}</p>
            <p className="text-sm font-medium text-gray-600 mt-1">a/n <span className="font-bold text-gray-900">Eri Dwi Hasto Adi</span></p>
          </div>
          
          <button 
            type="button"
            onClick={handleCopyRekening}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all min-w-[140px] ${
              isCopiedRek 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
            }`}
          >
            {isCopiedRek ? "Tersalin!" : "Salin No. Rek"}
          </button>
        </div>

        {/* Box 2: Nominal Pembayaran */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-lg border border-blue-100 gap-4">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Nominal</p>
            <p className="text-2xl font-black text-red-600 tracking-wider">{formatRupiah(nominal)}</p>
            <p className="text-xs font-medium text-gray-500 mt-1">*Pastikan nominal transfer sesuai</p>
          </div>
          
          <button 
            type="button"
            onClick={handleCopyNominal}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all min-w-[140px] ${
              isCopiedNom 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 shadow-sm'
            }`}
          >
            {isCopiedNom ? "Tersalin!" : "Salin Nominal"}
          </button>
        </div>
      </div>

      {/* Tutorial Pembayaran */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Cara Melakukan Konfirmasi:</h4>
        <ol className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-xs">1</span>
            <p>Salin <strong>Nomor Rekening</strong> dan <strong>Nominal</strong> di atas.</p>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-xs">2</span>
            <p>Lakukan transfer melalui Mobile Banking atau ATM, lalu simpan tangkapan layar (screenshot) bukti transfer.</p>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs">3</span>
            <p>Unggah file bukti tersebut pada form di bawah ini lalu klik <strong>Kirim Bukti Pembayaran</strong>.</p>
          </li>
        </ol>
      </div>

      <hr className="border-gray-100 mb-6" />

      {/* Form Upload */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm font-semibold p-3 bg-red-50 rounded-lg border border-red-100">{error}</p>}

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
            className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              fileName ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
              <svg className={`w-8 h-8 mb-3 transition-colors ${fileName ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              {fileName ? (
                <div>
                  <p className="text-blue-700 font-bold text-sm truncate max-w-[250px]">{fileName}</p>
                  <p className="text-xs text-blue-500 mt-1">File siap diunggah</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-1">Klik untuk unggah dokumen</p>
                  <p className="text-xs text-gray-500 font-medium">Atau drag & drop (JPG, PNG, PDF maks. 5MB)</p>
                </div>
              )}
            </div>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading || !fileName}
          className="w-full py-4 mt-2 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mengunggah File...
            </>
          ) : (
            "Kirim Bukti Pembayaran"
          )}
        </button>
      </form>
    </div>
  );
}