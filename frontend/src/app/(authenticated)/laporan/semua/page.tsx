"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchLaporanAPI } from "@/features/laporan/lib/data";
import { LaporanListTable } from "@/features/laporan/components/LaporanListTable";
import { Laporan } from "@/features/laporan/types";

export default function SemuaLaporanPage() {
  const [data, setData] = useState<Laporan[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadInitial = async () => {
      const res = await fetchLaporanAPI(null, 5);
      setData(res.data);
      setNextCursor(res.nextCursor);
      setTotalItems(res.total);
      setIsLoading(false);
    };
    loadInitial();
  }, []);

  const handleLoadMore = async () => {
    if (!nextCursor) return;
    setIsLoadingMore(true);
    const res = await fetchLaporanAPI(nextCursor, 5);
    setData((prev) => [...prev, ...res.data]);
    setNextCursor(res.nextCursor);
    setIsLoadingMore(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Header & Navigasi */}
      <div className="flex flex-col gap-4">
        <Link
          href="/laporan"
          className="flex w-fit items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Semua Laporan</h1>
      </div>

      {/* search filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Cari Laporan (Judul, Lokasi...)"
            className="pl-10 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-sm">
          <Link href="/laporan/buat">
            <Plus className="mr-2 h-4 w-4" />
            Buat Laporan
          </Link>
        </Button>
      </div>

      {/* Table Content */}
      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-4">
          <LaporanListTable data={data} />

          {/* Footer Info */}
          <div className="flex items-center justify-between text-sm text-slate-500 px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-xs">
                📄
              </span>
              <span>
                Total Laporan:{" "}
                <span className="font-semibold text-slate-900">
                  {totalItems}
                </span>
              </span>
            </div>
            <div className="text-xs">Menampilkan {data.length} data</div>
          </div>

          {/* Pagination */}
          {nextCursor && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="min-w-[150px] bg-white"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memuat...
                  </>
                ) : (
                  "Muat Lebih Banyak"
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
