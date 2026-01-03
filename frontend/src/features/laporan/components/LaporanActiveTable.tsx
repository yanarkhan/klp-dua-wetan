"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Laporan } from "../types";
import { LaporanStatusBadge } from "./LaporanStatusBadge";

interface Props {
  laporan: Laporan[];
}

export default function LaporanActiveTable({ laporan }: Props) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-neutral-800 px-1">
        Laporan Aktif Milikmu
      </h2>

      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-600 font-medium border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Judul Laporan</th>
                <th className="px-6 py-4 whitespace-nowrap">Kategori</th>
                <th className="px-6 py-4 whitespace-nowrap">Tanggal</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-right whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {laporan.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                    Belum ada laporan aktif.
                  </td>
                </tr>
              ) : (
                laporan.map((item) => (
                  <tr key={item.id_laporan} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-neutral-900">
                      {item.judul}
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {item.kategori}
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {formatDate(item.tanggal)}
                    </td>
                    <td className="px-6 py-4">
                      <LaporanStatusBadge status={item.currentStatus?.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/laporan/${item.id_laporan}`}>
                          <Eye className="w-4 h-4 text-neutral-500 hover:text-blue-600" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}