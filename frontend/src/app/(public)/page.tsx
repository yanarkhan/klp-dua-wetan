import { HeroSection } from "@/features/landing/components/HeroSection";
import { StatsSection } from "@/features/landing/components/StatsSection";
import { NewsSection } from "@/features/landing/components/NewsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col pb-20">
      <HeroSection />
      <StatsSection />
      <NewsSection />
    </main>
  );
}
