"use client";

import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { useDashboardStats } from "../hooks/useAdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardStats() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return <StatsSkeleton />;
  }

  if (!stats) return null;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatCard
        label="Total Semua Laporan"
        value={`${stats.total} Laporan`}
        icon={FileText}
        colorClass="bg-blue-50 text-blue-600"
        borderColor="border-blue-100"
      />
      <StatCard
        label="Total Laporan Hari Ini"
        value={`${stats.today} Laporan`}
        icon={FileText}
        colorClass="bg-cyan-50 text-cyan-600"
        borderColor="border-cyan-100"
      />
      <StatCard
        label="Laporan Diproses"
        value={`${stats.processed} Laporan`}
        icon={Clock}
        colorClass="bg-orange-50 text-orange-600"
        borderColor="border-orange-100"
      />

      <StatCard
        label="Laporan Selesai"
        value={`${stats.resolved} Laporan`}
        icon={CheckCircle}
        colorClass="bg-green-50 text-green-600"
        borderColor="border-green-100"
      />
      <StatCard
        label="Laporan Ditolak"
        value={`${stats.rejected} Laporan`}
        icon={XCircle}
        colorClass="bg-red-50 text-red-600"
        borderColor="border-red-100"
      />
      <StatCard
        label="Laporan Disetujui"
        value={`${stats.approved} Laporan`}
        icon={CheckCircle}
        colorClass="bg-yellow-50 text-yellow-600"
        borderColor="border-yellow-100"
      />
    </div>
  );
}

function StatCard({ label, value, icon: Icon, colorClass, borderColor }: any) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border ${borderColor} hover:shadow-md transition-shadow duration-300 flex items-center gap-5`}
    >
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-neutral-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-neutral-900">{value}</p>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-[100px] w-full rounded-2xl" />
      ))}
    </div>
  );
}
