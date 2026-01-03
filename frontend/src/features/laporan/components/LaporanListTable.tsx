"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Laporan } from "../types";
import { LaporanStatusBadge } from "./LaporanStatusBadge";

interface Props {
  data: Laporan[];
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export function LaporanListTable({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center bg-white">
        <p className="text-gray-500">Belum ada riwayat laporan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-600 font-medium border-b border-neutral-200">
            <tr>
              <th className="px-6 py-4">Judul Laporan</th>
              <th className="px-6 py-4">Lokasi</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {data.map((item) => (
              <tr key={item.id_laporan} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 font-medium text-neutral-900">
                  {item.judul}
                </td>
                <td className="px-6 py-4 text-neutral-600 truncate max-w-[150px]">
                  {item.lokasi}
                </td>
                <td className="px-6 py-4 text-neutral-600">
                  {item.kategori}
                </td>
                <td className="px-6 py-4">
                  <LaporanStatusBadge status={item.currentStatus?.status} />
                </td>
                <td className="px-6 py-4 text-neutral-600">
                  {formatDate(item.tanggal)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/laporan/${item.id_laporan}`}>
                      <Eye className="w-4 h-4 text-neutral-500 hover:text-blue-600" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}