"use client";

import { useState } from "react";
import { saveEvent, deleteEvent } from "@/app/actions/eventActions";

// Definisi tipe data agar TypeScript tidak error
type Event = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: Date;
  price: number;
  createdAt: Date;
};

export default function EventManager({ initialEvents }: { initialEvents: Event[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Format tanggal untuk input type="date" (YYYY-MM-DD)
  const formatDateForInput = (date: Date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  // Format tanggal untuk Tampilan Tabel
  const formatDateForTable = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });
  };

  // Handler Buka Modal Tambah
  const handleAddNew = () => {
    setEditingEvent(null);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  // Handler Buka Modal Edit
  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  // Handler Hapus
  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus event "${title}"?`)) {
      await deleteEvent(id);
    }
  };

  // Handler Submit Form (Create / Update)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await saveEvent(formData, editingEvent?.id);

    if (result?.error) {
      setErrorMsg(result.error);
      setIsLoading(false);
    } else {
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-5xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kelola Event</h1>
          <p className="text-gray-600">Buat, edit, atau hapus event yang tersedia untuk pendaftaran.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
        >
          + Tambah Event
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Info Event</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tanggal & Harga</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {initialEvents.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-500">Belum ada event.</td></tr>
              ) : (
                initialEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{event.title}</div>
                      <div className="text-xs font-medium text-gray-500 mt-1">Slug: {event.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{formatDateForTable(event.date)}</div>
                      <div className="text-xs font-bold text-red-600 mt-1">Rp {event.price.toLocaleString("id-ID")}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateForTable(event.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(event)} className="text-blue-600 hover:text-blue-900 font-bold px-3 py-1 bg-blue-50 rounded-lg mr-2">Edit</button>
                      <button onClick={() => handleDelete(event.id, event.title)} className="text-red-600 hover:text-red-900 font-bold px-3 py-1 bg-red-50 rounded-lg">Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL FORM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-900">
                {editingEvent ? "Edit Event" : "Tambah Event Baru"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {errorMsg && <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg border border-red-100">{errorMsg}</div>}
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Judul Event</label>
                <input type="text" name="title" required defaultValue={editingEvent?.title || ""} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none text-sm text-gray-800" placeholder="Contoh: Flash Tattoo Vol. 1" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">URL Slug (Unik)</label>
                <input type="text" name="slug" required defaultValue={editingEvent?.slug || ""} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none text-sm text-gray-800" placeholder="contoh: flash-tattoo-vol-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tanggal Pelaksanaan</label>
                  <input type="date" name="date" required defaultValue={editingEvent ? formatDateForInput(editingEvent.date) : ""} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none text-sm text-gray-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Harga (Rp)</label>
                  <input type="number" name="price" required defaultValue={editingEvent?.price || 0} min="0" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none text-sm text-gray-800" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Deskripsi Singkat</label>
                <textarea name="description" rows={3} required defaultValue={editingEvent?.description || ""} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none text-sm text-gray-800 resize-none" placeholder="Deskripsi event..." />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">Batal</button>
                <button type="submit" disabled={isLoading} className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isLoading ? "Menyimpan..." : "Simpan Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}