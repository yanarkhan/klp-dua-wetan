import { HeroSection } from "@/features/landing/components/HeroSection";
import { StatsSection } from "@/features/landing/components/StatsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col pb-20">
      <HeroSection />
      <StatsSection />

      <section className="container mx-auto px-4 mt-16 text-center">
        <h2 className="text-2xl font-bold text-foreground">Berita Terkini</h2>
        <p className="text-muted-foreground mt-2">Abis ini berita boy...</p>
      </section>
    </main>
  );
}
