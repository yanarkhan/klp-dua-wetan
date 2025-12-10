export class StatusResponse {
  id_status: number;
  id_laporan: string;
  status: string;
  keterangan?: string | null;
  tanggal: Date;
}

export class CreateStatusRequest {
  status: string;
  keterangan?: string | null;
  tanggal: Date | string; 
}

export class UpdateStatusRequest {
  id_status: number;
  status: string;
  keterangan?: string | null;
  tanggal: Date | string; 
}