"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUsersSummary } from "../hooks/useAdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersSummaryTable() {
  const { data: users, isLoading } = useUsersSummary();

  if (isLoading) return <Skeleton className="h-[300px] w-full rounded-2xl" />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-800">List Pengguna</h3>
        <Link
          href="/admin/pengguna"
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
                <th className="px-6 py-4 font-semibold">Nama Pelapor</th>
                <th className="px-6 py-4 font-semibold">Nomor Telepon</th>
                <th className="px-6 py-4 font-semibold">Total Laporan</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {users?.map((user) => (
                <tr
                  key={user.id_user}
                  className="hover:bg-neutral-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-neutral-800">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{user.notlp}</td>
                  <td className="px-6 py-4 font-medium text-neutral-600">
                    {user.total_reports} Laporan
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Badge
                      variant="outline"
                      className={
                        user.status === "Aktif"
                          ? "text-green-600 bg-green-50 border-green-200"
                          : "text-red-600 bg-red-50 border-red-200"
                      }
                    >
                      {user.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
