import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import { getLaporanById } from "@/features/laporan/lib/data";

interface PageProps {
  params: { id: string };
}

export default function StatusLaporanPage({ params }: PageProps) {
  const laporan = getLaporanById(params.id);

  if (!laporan) notFound();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-6 pb-20 px-4 mt-6">
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-4">
        <Link
          href={`/laporan/${params.id}`}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Detail
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Riwayat Status</h1>
          <p className="text-sm text-slate-500 font-mono">
            #{laporan.id_laporan}
          </p>
        </div>
      </div>

      {/* timeline */}
      <div className="relative border-l-2 border-slate-200 ml-3.5 space-y-8 pl-8 py-2">
        {laporan.statusReports
          .sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime())
          .map((history, index) => {
            // Status terbaru (index 0) mendapat highlight visual
            const isLatest = index === 0;

            return (
              <div key={history.id_status} className="relative">
                {/* Timeline Dot Icon */}
                <div
                  className={`
                  absolute -left-[43px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-4 bg-white
                  ${
                    isLatest
                      ? "border-blue-100 text-blue-600"
                      : "border-white text-slate-300"
                  }
                `}
                >
                  {isLatest ? (
                    <Clock className="h-4 w-4 fill-blue-600 text-white" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 fill-slate-100" />
                  )}
                </div>

                {/* Card Content */}
                <div
                  className={`
                rounded-xl border p-4 transition-colors
                ${
                  isLatest
                    ? "bg-blue-50/50 border-blue-100 shadow-sm"
                    : "bg-white border-slate-100 opacity-80"
                }
              `}
                >
                  {/* Header Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <span
                      className={`font-bold capitalize text-sm ${
                        isLatest ? "text-blue-700" : "text-slate-700"
                      }`}
                    >
                      {history.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {formatDate(history.tanggal)}
                    </span>
                  </div>

                  {/* ket. sebelumnya */}
                  {history.keterangan ? (
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {history.keterangan}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400 italic">
                      Status diperbarui sistem
                    </p>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer Info */}
      <div className="text-center pt-8">
        <p className="text-xs text-slate-400">
          Akhir dari riwayat status laporan #{laporan.id_laporan}
        </p>
      </div>
    </div>
  );
}
