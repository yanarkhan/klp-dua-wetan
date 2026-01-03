export type StatusLaporan = "menunggu" | "diproses" | "selesai" | "ditolak";

export interface StatusReport {
  id_status: number;
  status: StatusLaporan;
  keterangan: string;
  tanggal: Date;
}

export interface Laporan {
  id_laporan: string;
  judul: string;
  kategori: string;
  lokasi: string;
  deskripsi: string;
  bukti?: string;
  usaha: string;
  tanggal: Date;
  statusReports: StatusReport[];

  currentStatus?: StatusReport;
}

export interface LaporanStats {
  total: number;
  menunggu: number;
  diproses: number;
  selesai: number;
  ditolak: number;
}
