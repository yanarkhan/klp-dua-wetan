"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRecentReports } from "../hooks/useAdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { ReportStatus } from "../lib/admin-dashboard-api";


const getStatusConfig = (status: ReportStatus) => {
  switch (status) {
    case "SUBMITTED":
      return { label: "Menunggu", class: "bg-neutral-100 text-neutral-600" };
    case "VERIFIED":
      return { label: "Disetujui", class: "bg-yellow-100 text-yellow-700" };
    case "IN_PROGRESS":
      return { label: "Diproses", class: "bg-orange-100 text-orange-700" };
    case "RESOLVED":
      return { label: "Selesai", class: "bg-green-100 text-green-700" };
    case "REJECTED":
      return { label: "Ditolak", class: "bg-red-100 text-red-700" };
    default:
      return { label: status, class: "bg-gray-100 text-gray-600" };
  }
};

export default function RecentReportsTable() {
  const { data: reports, isLoading } = useRecentReports();
 
  if (isLoading) return <Skeleton className="h-[300px] w-full rounded-2xl" />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-800">Laporan Terbaru</h3>
        <Link
          href="/admin/laporan"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          Lihat Semua <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-neutral-500 uppercase bg-neutral-50/50 border-b border-neutral-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Judul Laporan</th>
                <th className="px-6 py-4 font-semibold">Pelapor</th>
                <th className="px-6 py-4 font-semibold">Kategori</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {reports?.map((report) => {
                const statusConfig = getStatusConfig(report.status);
                return (
                  <tr
                    key={report.id_laporan}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-neutral-800">
                      {report.judul}
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {report.pelapor}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 ring-1 ring-inset ring-neutral-500/10">
                        {report.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={`rounded-full px-3 py-0.5 font-semibold border-0 hover:bg-opacity-80 ${statusConfig.class}`}
                      >
                        {statusConfig.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-neutral-500 text-xs font-medium">
                      {new Date(report.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
