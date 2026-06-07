"use server";

export async function KonfirmasiDaftar(formDatasheet: { nama: string; no_wa: string; event: string }) {
  const SENDER_ID = "ajik";
  
  // Gunakan \n untuk enter di WhatsApp dan * untuk bold
  const isiPesan = `Halo *${formDatasheet.nama}*!\n\nTerima kasih telah mendaftar untuk event *${formDatasheet.event}* di GNG Collective.\n\nSegera lakukan pembayaran melalui dashboard untuk mengonfirmasi pendaftaran Anda.`;
  
  const payload = {
    sender: SENDER_ID,
    numbers: formDatasheet.no_wa,
    message: isiPesan,
    delay: 2
  };

  try {
    const apiUrl = "https://wa.deltapytech.my.id/broadcast";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.warn("Bot WA gagal mengirim, tapi pendaftaran database sukses.");
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Error API WA:", error);
    return { success: false };
  }
}

export async function KirimAuthWA(formDatasheet: { nama: string; no_wa: string }) {
  const SENDER_ID = "ajik";

  const isiPesan =`Halo *${formDatasheet.nama}*!\n\nAnda baru saja berkontribusi di GNG Collective. Terima kasih banyak atas dukungan Anda!\n\nJika Anda memiliki pertanyaan atau ingin terlibat lebih lanjut, jangan ragu untuk menghubungi kami.`;

  const payload = {
    sender: SENDER_ID,
    numbers: formDatasheet.no_wa,
    message: isiPesan,
    delay: 2
  };

    try {
    const apiUrl = "https://wa.deltapytech.my.id/broadcast";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.warn("Bot WA gagal mengirim, tapi login sukses.");
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("Error API WA:", error);
    return { success: false };
  }
}