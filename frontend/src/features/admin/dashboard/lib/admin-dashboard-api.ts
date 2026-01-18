export type ReportStatus =
  | "SUBMITTED"
  | "VERIFIED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED";

export interface DashboardStats {
  total: number;
  today: number;
  processed: number;
  resolved: number;
  rejected: number;
  approved: number;
}

export interface UserSummary {
  id_user: number;
  name: string;
  notlp: string;
  total_reports: number;
  status: "Aktif" | "Non-Aktif";
}

export interface RecentReport {
  id_laporan: string;
  judul: string;
  pelapor: string;
  kategori: string;
  status: ReportStatus;
  tanggal: string;
  lokasi: string;
}

// --- MOCK API IMPLEMENTATION ---

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    total: 45,
    today: 12,
    processed: 8,
    resolved: 20,
    rejected: 5,
    approved: 20,
  };
};

export const fetchUsersSummary = async (): Promise<UserSummary[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return [
    {
      id_user: 1,
      name: "Budiman Santoso",
      notlp: "081234567890",
      total_reports: 14,
      status: "Aktif",
    },
    {
      id_user: 2,
      name: "Siti Aminah",
      notlp: "089876543210",
      total_reports: 10,
      status: "Aktif",
    },
    {
      id_user: 3,
      name: "Rudi Hermawan",
      notlp: "085612345678",
      total_reports: 8,
      status: "Non-Aktif",
    },
    {
      id_user: 4,
      name: "Dewi Lestari",
      notlp: "081345678901",
      total_reports: 5,
      status: "Aktif",
    },
    {
      id_user: 5,
      name: "Ahmad Rizki",
      notlp: "087890123456",
      total_reports: 3,
      status: "Aktif",
    },
  ];
};

export const fetchRecentReports = async (): Promise<RecentReport[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return [
    {
      id_laporan: "LAP-001",
      judul: "Lampu PJU Mati Total",
      pelapor: "Budiman Santoso",
      lokasi: "Jl. Kelapa Dua Wetan Raya",
      kategori: "Fasilitas",
      status: "IN_PROGRESS",
      tanggal: "2025-10-24T10:00:00Z",
    },
    {
      id_laporan: "LAP-002",
      judul: "Tumpukan Sampah Liar",
      pelapor: "Siti Aminah",
      lokasi: "RT 05/RW 02",
      kategori: "Kebersihan",
      status: "SUBMITTED",
      tanggal: "2025-10-24T09:30:00Z",
    },
    {
      id_laporan: "LAP-003",
      judul: "Saluran Air Tersumbat",
      pelapor: "Rudi Hermawan",
      lokasi: "Gg. H. Ma'ruf",
      kategori: "Infrastruktur",
      status: "RESOLVED",
      tanggal: "2025-10-23T14:15:00Z",
    },
    {
      id_laporan: "LAP-004",
      judul: "Jalan Berlubang Parah",
      pelapor: "Dewi Lestari",
      lokasi: "Depan SDN 01 Pagi",
      kategori: "Infrastruktur",
      status: "VERIFIED",
      tanggal: "2025-10-23T08:00:00Z",
    },
  ];
};
