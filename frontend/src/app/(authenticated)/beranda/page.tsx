import BerandaHero from "@/features/beranda/components/BerandaHero";
import LaporanPreviewCard from "@/features/beranda/components/LaporanPreviewCard";

export default function BerandaPage() {
  return (
    <section className="flex flex-col gap-12 pb-20">
      <BerandaHero />
      <section className="w-full">
        <LaporanPreviewCard />
      </section>
    </section>
  );
}
