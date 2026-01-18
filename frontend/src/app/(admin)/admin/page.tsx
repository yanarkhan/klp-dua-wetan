import { Calendar } from "lucide-react";
import DashboardStats from "@/features/admin/dashboard/components/DashboardStats";
import UsersSummaryTable from "@/features/admin/dashboard/components/UsersSummaryTable";
import RecentReportsTable from "@/features/admin/dashboard/components/RecentReportsTable";

export default function AdminDashboardPage() {
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-500 p-2 md:p-4 lg:p-0">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Halo, Admin 👋
        </h1>
        <div className="flex items-center gap-2 text-neutral-500 font-medium text-sm">
          <Calendar className="h-4 w-4" />
          <p>{currentDate}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      {/* Data Sections */}
      <div className="flex flex-col gap-10">
        {/* List Pengguna */}
        <UsersSummaryTable />

        {/* Laporan Terbaru */}
        <RecentReportsTable />
      </div>
    </div>
  );
}
