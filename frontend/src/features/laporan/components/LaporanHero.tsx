"use client";

import Image from "next/image";
import Link from "next/link";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Button } from "@/components/ui/button";

interface Props {
  total: number;
}

export default function LaporanHero({ total }: Props) {
  return (
    <div className="flex flex-col pb-10 -mt-8">
      <section
        className="
          relative z-0 
          w-full 
          h-[400px] md:h-[500px] 
          overflow-hidden 
          shadow-sm bg-slate-900
          
          rounded-t-none
          rounded-b-[3rem]
          md:rounded-none
        "
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-authenticated.png"
            alt="Latar Belakang Laporan"
            fill
            className="object-cover object-center"
            priority
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center pt-8 space-y-6">
          <div className="space-y-2">
            <p className="text-slate-200 text-sm md:text-base font-medium tracking-wide uppercase opacity-90">
              Sejak menggunakan LAMAS KDW
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Kamu sudah melaporkan sebanyak
            </h2>
          </div>

          
          <div className="text-7xl md:text-8xl font-bold text-white tracking-tighter drop-shadow-lg">
            <NumberTicker value={total} />
          </div>

          {/* Single CTA */}
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 text-base font-semibold shadow-xl transition-transform hover:scale-105"
          >
            <Link href="/laporan/semua">Lihat Semua Laporan Kamu</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
