import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Camera, MapPin, Tag, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLaporanById } from "@/features/laporan/lib/data";
import { LaporanStatusBadge } from "@/features/laporan/components/LaporanStatusBadge";

interface PageProps {
  params: { id: string };
}

export default function DetailLaporanPage({ params }: PageProps) {
  const laporan = getLaporanById(params.id);

  if (!laporan) {
    notFound();
  }

  // Format Date Helper (Intl)
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(laporan.tanggal);

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6 pb-20 px-4 mt-6">
      
      {/* Header Back */}
      <div className="flex items-center gap-2">
         <Link 
          href="/laporan/semua" 
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Laporan Milikmu
        </Link>
      </div>

      <div className="flex h-48 w-full items-center justify-center rounded-xl bg-gray-200 text-gray-400 md:h-64 overflow-hidden relative">
        {laporan.bukti ? (
            <div className="text-sm">Gambar: {laporan.bukti}</div> 
        ) : (
            <Camera className="h-12 w-12" />
        )}
      </div>

      {/* Title sama Status */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase">ID Laporan</p>
          <p className="font-mono text-sm font-medium text-gray-900">#{laporan.id_laporan}</p>
        </div>
        <LaporanStatusBadge status={laporan.currentStatus?.status} />
      </div>

      {/* Detail Content */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
        
        {/* Permasalahan */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-900">Permasalahan:</h3>
          <p className="text-sm leading-relaxed text-gray-600">
            {laporan.deskripsi}
          </p>
        </div>

        {/* Kategori */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-900">Kategori:</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Tag className="h-4 w-4 text-blue-500" />
            {laporan.kategori}
          </div>
        </div>

        {/* Lokasi */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-900">Lokasi:</h3>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
            {laporan.lokasi}
          </div>
        </div>

        {/* Usaha */}
        <div className="space-y-2 pt-4 border-t border-gray-100">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gray-500" />
            Usaha yang sudah dilakukan:
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 italic bg-gray-50 p-3 rounded-lg border border-gray-100">
            "{laporan.usaha}"
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-1">
          <h3 className="font-bold text-gray-900">Status Laporan</h3>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-50" />
            <div>
              <p className="text-sm font-bold text-gray-900 capitalize">
                {laporan.currentStatus?.status || 'Menunggu'}
              </p>
              <p className="text-xs text-gray-500">
                Terakhir diperbarui: {formattedDate}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 text-center">
          <Button asChild variant="link" className="text-blue-600">
            <Link href={`/laporan/${laporan.id_laporan}/status`}>
              Lihat Status Selengkapnya
            </Link>
          </Button>
        </div>
      </div>

    </div>
  );
}