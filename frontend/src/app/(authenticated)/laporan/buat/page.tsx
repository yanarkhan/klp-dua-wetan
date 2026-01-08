import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LaporanFormOrchestrator from "@/features/laporan/components/form/LaporanFormOrchestrator";

export default function BuatLaporanPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <Link 
            href="/laporan/semua" 
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Batal
          </Link>
          <span className="ml-4 text-sm font-semibold text-slate-900 border-l border-slate-200 pl-4">
            Laporan Baru
          </span>
        </div>
      </div>

      {/* Form Container */}
      <div className="container mx-auto px-0 md:px-4 py-6">
        <LaporanFormOrchestrator />
      </div>
    </main>
  );
}