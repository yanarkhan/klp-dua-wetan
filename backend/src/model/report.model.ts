export class ReportResponse{
  id_laporan: string ;     
  id_user: number;
  judul: string;
  bukti: string; 
  lokasi: string;
  kategori : string;
  deskripsi: string;
  surat?: string | null; 
  usaha: string;
  tanggal: Date;
}

export class CreateReportRequest {
  id_laporan: string ;     
  id_user: number;
  judul: string;
  bukti: string; 
  lokasi: string;
  kategori : string;
  deskripsi: string;
  surat?: string | null; 
  usaha: string;
  tanggal: Date;
}

export class UpdateReportRequest {
  id_laporan: string ;     
  id_user: number;
  judul?: string;
  bukti?: string; 
  lokasi?: string;
  deskripsi?: string;
  surat?: string; 
  usaha?: string;
  tanggal?: Date;
}

export class SearchReportRequest {
  id_laporan?: string ;     
  judul?: string;
  lokasi?: string;
  deskripsi?: string;
  tanggal?: Date; 
  page: number; 
  size: number; 
}