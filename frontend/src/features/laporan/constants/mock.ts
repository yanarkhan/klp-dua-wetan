import { Laporan, PaginatedResponse } from "../types";

// Helper generate mock history
const createHistory = (status: any, date: string, note = ""): any => ({
  id: Math.random().toString(),
  laporanId: "idx",
  status,
  catatan: note,
  createdAt: date,
  createdBy: "system"
});

export const MOCK_DATABASE: Laporan[] = [
  {
    id: "uuid-1",
    tiketId: "KDW-2510-001",
    judul: "Penerangan Jalan Mati Total",
    deskripsi: "Lampu PJU di pertigaan jalan utama mati sudah 3 hari.",
    lokasi: "Jl. Raya Kelapa Dua Wetan No. 45",
    kategori: "Infrastruktur",
    usaha: null, // User perorangan
    foto: ["/images/placeholder-report.jpg"],
    pelaporId: "user-1",
    createdAt: "2025-10-24T08:00:00Z",
    updatedAt: "2025-10-25T09:00:00Z",
    riwayatStatus: [
      // ORDER BY createdAt DESC
      createHistory("diproses", "2025-10-25T09:00:00Z", "Petugas sedang cek lokasi"),
      createHistory("menunggu", "2025-10-24T08:00:00Z", "Laporan masuk"),
    ]
  },
  {
    id: "uuid-2",
    tiketId: "KDW-2510-002",
    judul: "Permohonan Izin UMKM",
    deskripsi: "Pengajuan surat keterangan usaha untuk warung makan.",
    lokasi: "RT 05 RW 02",
    kategori: "Administrasi",
    usaha: "Warung Makan Bu Siti", // Field Usaha terisi
    foto: [],
    pelaporId: "user-1",
    createdAt: "2025-10-26T10:00:00Z",
    updatedAt: "2025-10-26T10:00:00Z",
    riwayatStatus: [
      createHistory("menunggu", "2025-10-26T10:00:00Z", "Dokumen sedang diverifikasi"),
    ]
  },
  {
    id: "uuid-3",
    tiketId: "KDW-2510-003",
    judul: "Selokan Tersumbat Sampah",
    deskripsi: "Banjir setiap hujan karena selokan mampet.",
    lokasi: "Belakang Posyandu Melati",
    kategori: "Lingkungan",
    usaha: null,
    foto: [],
    pelaporId: "user-1",
    createdAt: "2025-10-20T08:00:00Z",
    updatedAt: "2025-10-22T14:00:00Z",
    riwayatStatus: [
      createHistory("selesai", "2025-10-22T14:00:00Z", "Pembersihan selesai dilakukan PPSU"),
      createHistory("diproses", "2025-10-21T09:00:00Z", "Jadwal pembersihan dibuat"),
      createHistory("menunggu", "2025-10-20T08:00:00Z", "Laporan diterima"),
    ]
  },
  {
    id: "uuid-4",
    tiketId: "KDW-2510-004",
    judul: "Pohon Tumbang",
    deskripsi: "Menghalangi jalan setapak.",
    lokasi: "Taman Warga",
    kategori: "Lingkungan",
    usaha: null,
    foto: [],
    pelaporId: "user-1",
    createdAt: "2025-10-18T08:00:00Z",
    updatedAt: "2025-10-19T09:00:00Z",
    riwayatStatus: [
      createHistory("ditolak", "2025-10-19T09:00:00Z", "Lokasi masuk wilayah kelurahan tetangga"),
      createHistory("menunggu", "2025-10-18T08:00:00Z"),
    ]
  },
];

// SIMULASI API FETCH (Cursor Based)
export const fetchLaporanAPI = async (cursor: string | null = null, limit = 5): Promise<PaginatedResponse<Laporan>> => {
  // Simulasi delay network
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let data = [...MOCK_DATABASE];
  // Logic simple slicing untuk mock
  const startIndex = cursor ? data.findIndex(d => d.id === cursor) + 1 : 0;
  const slice = data.slice(startIndex, startIndex + limit);
  
  const nextItem = data[startIndex + limit];
  
  return {
    data: slice,
    nextCursor: nextItem ? nextItem.id : null
  };
};

export const fetchLaporanDetail = (id: string) => MOCK_DATABASE.find(l => l.id === id);