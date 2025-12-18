"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-40 md:pt-32 md:pb-32">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-section.png"
          alt="Kantor Kelurahan Kelapa Dua Wetan"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-neutral-950/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto w-full px-4 text-center">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md md:text-sm">
            Pelayanan Publik Digital Terpadu
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            Selamat Datang di Sistem <br />
            <span className="text-primary">LAMAS KDW</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl text-lg font-light leading-relaxed text-neutral-200 md:text-xl">
            Layanan Aspirasi dan Pengaduan Masyarakat Kelurahan Kelapa Dua
            Wetan. Sampaikan laporan Anda secara{" "}
            <span className="font-semibold text-white">online</span>,{" "}
            <span className="font-semibold text-white">cepat</span>, dan{" "}
            <span className="font-semibold text-white">transparan</span>.
          </p>

          {/* CTA */}
          <div className="mt-4 flex w-full justify-center">
            <Link href="/panduan" className="mt-4">
              <Button
                size="lg"
                className="h-14 rounded-xl px-8 text-base font-bold text-white shadow-lg transition-all duration-200 hover:opacity-90"
              >
                <Settings className="mr-2 h-5 w-5" />
                Cara Kerja Sistem
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
