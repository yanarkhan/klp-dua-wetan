import { Laporan, LaporanStats, StatusReport } from "../types";

const MOCK_DATA: Laporan[] = [
  {
    id_laporan: "1",
    judul: "Lampu Jalan Mati",
    kategori: "Fasilitas",
    lokasi: "Jl. Makmur Raya",
    deskripsi: "Lampu jalan di depan RT 05 sudah mati sejak 3 hari yang lalu",
    bukti: "/images/laporan/lampu-jalan.jpg",
    usaha: "Sudah melapor ke RT dan RW, namun belum ada tindak lanjut",
    tanggal: new Date("2024-12-25T08:30:00"),
    statusReports: [
      {
        id_status: 2,
        status: "diproses",
        keterangan: "Tim teknis sudah ditugaskan untuk pengecekan lokasi",
        tanggal: new Date("2024-12-26T10:15:00"),
      },
      {
        id_status: 1,
        status: "menunggu",
        keterangan: "Laporan diterima dan sedang ditinjau",
        tanggal: new Date("2024-12-25T08:30:00"),
      },
    ],
  },
  {
    id_laporan: "2",
    judul: "Sampah Menumpuk",
    kategori: "Kebersihan",
    lokasi: "Jl. Melati Raya",
    deskripsi:
      "Tumpukan sampah di dekat musholla belum diangkut selama seminggu",
    usaha:
      "Sudah koordinasi dengan petugas kebersihan RT, namun belum dijadwalkan",
    tanggal: new Date("2024-12-24T14:20:00"),
    statusReports: [
      {
        id_status: 3,
        status: "menunggu",
        keterangan: "Laporan diterima",
        tanggal: new Date("2024-12-24T14:20:00"),
      },
      {
        id_status: 4,
        status: "diproses",
        keterangan: "Koordinasi dengan Dinas Kebersihan untuk penjadwalan",
        tanggal: new Date("2024-12-25T09:00:00"),
      },
    ],
  },
  {
    id_laporan: "3",
    judul: "Jalan Berlubang",
    kategori: "Infrastruktur",
    lokasi: "Jl. Melati Raya",
    deskripsi:
      "Lubang di jalan utama cukup besar dan berbahaya untuk pengendara motor",
    bukti: "/images/laporan/jalan-rusak.jpg",
    usaha: "Sudah memasang rambu peringatan sementara dengan bantuan warga",
    tanggal: new Date("2024-12-27T16:45:00"),
    statusReports: [
      {
        id_status: 5,
        status: "menunggu",
        keterangan: "Laporan masuk dan menunggu verifikasi",
        tanggal: new Date("2024-12-27T16:45:00"),
      },
    ],
  },
  {
    id_laporan: "4",
    judul: "Pohon Tumbang",
    kategori: "Fasilitas",
    lokasi: "Jl. Makmur Raya",
    deskripsi: "Pohon besar tumbang menutupi setengah jalan",
    bukti: "/images/laporan/pohon-tumbang.jpg",
    usaha: "Sudah menutup jalur dengan cone dan koordinasi RT untuk pengamanan",
    tanggal: new Date("2024-12-20T07:00:00"),
    statusReports: [
      {
        id_status: 8,
        status: "selesai",
        keterangan: "Pohon sudah dipotong dan jalan dibersihkan",
        tanggal: new Date("2024-12-20T15:00:00"),
      },
      {
        id_status: 7,
        status: "diproses",
        keterangan: "Tim SAR dan Dinas PU sudah dikirim ke lokasi",
        tanggal: new Date("2024-12-20T08:30:00"),
      },
      {
        id_status: 6,
        status: "menunggu",
        keterangan: "Laporan darurat diterima",
        tanggal: new Date("2024-12-20T07:00:00"),
      },
    ],
  },
  {
    id_laporan: "5",
    judul: "Gorong-gorong Tersumbat",
    kategori: "Infrastruktur",
    lokasi: "Jl. Makmur Raya",
    deskripsi: "Air menggenang karena gorong-gorong tersumbat sampah",
    usaha: "Sudah mencoba membersihkan sendiri tapi sampahnya terlalu dalam",
    tanggal: new Date("2024-12-18T10:30:00"),
    statusReports: [
      {
        id_status: 11,
        status: "selesai",
        keterangan: "Gorong-gorong sudah dibersihkan dan air mengalir normal",
        tanggal: new Date("2024-12-19T14:30:00"),
      },
      {
        id_status: 10,
        status: "diproses",
        keterangan: "Tim maintenance sudah ditugaskan",
        tanggal: new Date("2024-12-19T08:00:00"),
      },
      {
        id_status: 9,
        status: "menunggu",
        keterangan: "Laporan diterima",
        tanggal: new Date("2024-12-18T10:30:00"),
      },
    ],
  },
  {
    id_laporan: "6",
    judul: "Pencurian Motor",
    kategori: "Keamanan",
    lokasi: "Jl. Melati No. 12",
    deskripsi: "Motor hilang di depan rumah pukul 03.00 WIB",
    usaha: "Sudah lapor ke ketua RT dan cek CCTV warga sekitar",
    tanggal: new Date("2024-12-17T05:00:00"),
    statusReports: [
      {
        id_status: 13,
        status: "ditolak",
        keterangan:
          "Kasus pencurian merupakan kewenangan Kepolisian. Silakan melapor ke Polsek setempat.",
        tanggal: new Date("2024-12-17T09:00:00"),
      },
      {
        id_status: 12,
        status: "menunggu",
        keterangan: "Laporan diterima",
        tanggal: new Date("2024-12-17T05:00:00"),
      },
    ],
  },
];

// Helper Internal: Get Latest Status
function getCurrentStatus(laporan: Laporan): StatusReport | undefined {
  if (laporan.statusReports.length === 0) return undefined;
  return [...laporan.statusReports].sort(
    (a, b) => b.tanggal.getTime() - a.tanggal.getTime()
  )[0];
}

// Helper: Get Recent Laporan
export function getRecentLaporan(limit = 5): Laporan[] {
  const enriched = MOCK_DATA.map((l) => ({
    ...l,
    currentStatus: getCurrentStatus(l),
  }));

  return enriched
    .sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime())
    .slice(0, limit);
}

// Helper: Stats Logic
export function getLaporanStats(): LaporanStats {
  const stats: LaporanStats = {
    total: MOCK_DATA.length,
    menunggu: 0,
    diproses: 0,
    selesai: 0,
    ditolak: 0,
  };

  MOCK_DATA.forEach((l) => {
    const latest = getCurrentStatus(l);
    if (latest) {
      stats[latest.status]++;
    }
  });

  return stats;
}

// Helper: Get By ID
export function getLaporanById(id: string): Laporan | undefined {
  const laporan = MOCK_DATA.find((item) => item.id_laporan === id);
  if (!laporan) return undefined;
  return {
    ...laporan,
    currentStatus: getCurrentStatus(laporan),
  };
}

// Helper Pagination
export async function fetchLaporanAPI(cursor: string | null = null, limit = 5) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allData = MOCK_DATA.map((l) => ({
    ...l,
    currentStatus: getCurrentStatus(l),
  })).sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime());

  const startIndex = cursor
    ? allData.findIndex((d) => d.id_laporan === cursor) + 1
    : 0;
  const slice = allData.slice(startIndex, startIndex + limit);
  const nextItem = allData[startIndex + limit];

  return {
    data: slice,
    nextCursor: nextItem ? nextItem.id_laporan : null,
    total: allData.length,
  };
}
