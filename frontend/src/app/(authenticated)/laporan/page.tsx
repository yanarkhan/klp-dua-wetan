import LaporanHero from "@/features/laporan/components/LaporanHero";
import LaporanStatsSection from "@/features/laporan/components/LaporanStatsSection";
import LaporanActiveTable from "@/features/laporan/components/LaporanActiveTable";
import { getLaporanStats, getRecentLaporan } from "@/features/laporan/lib/data";

export default function LaporanPage() {
  // Fetch Data
  const stats = getLaporanStats();
  const recentLaporan = getRecentLaporan(5);

  return (
    <section className="flex flex-col pb-20 bg-neutral-50 min-h-screen">
      <LaporanHero total={stats.total} />
      <LaporanStatsSection stats={stats} />

      <div className="mx-auto w-full max-w-5xl space-y-8">
        <LaporanActiveTable laporan={recentLaporan} />
      </div>
    </section>
  );
}
