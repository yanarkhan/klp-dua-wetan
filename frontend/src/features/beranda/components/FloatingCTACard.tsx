"use client";

import Link from "next/link";
import Image from "next/image";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function FloatingCTACard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        bg-white/40 backdrop-blur-sm        
        border border-white/40 
        rounded-[2rem] 
        shadow-2xl 
        p-6 md:p-8 
        w-full max-w-[500px] 
        flex flex-col items-center text-center space-y-5
      "
    >
      {/* Icon Ilustrasi */}
      <div className="relative w-20 h-20 md:w-28 md:h-28 -mt-2 drop-shadow-md">
        <Image
          src="/images/illustrator/checkmark.svg"
          alt="Ilustrasi Layanan"
          fill
          className="object-contain"
        />
      </div>

      {/* Teks Header */}
      <div className="space-y-1">
        <p className="text-gray-700 font-semibold text-xs md:text-sm tracking-wide uppercase">
          Layanan Warga
        </p>
        <h1 className="text-gray-900 font-extrabold text-lg md:text-2xl leading-tight">
          Ayo Buat Laporan Masyarakat!
        </h1>
      </div>

      {/* Tombol Aksi */}
      <div className="w-full space-y-3">
        <Button
          asChild
          className="w-full bg-[#5FA5F9] hover:bg-blue-500 text-white font-bold text-base md:text-lg h-12 md:h-14 rounded-xl shadow-lg transition-transform hover:scale-[1.01] active:scale-95"
        >
          <Link href="/laporan/buat">Buat Laporan Sekarang</Link>
        </Button>

        <div className="w-full bg-white/50 border border-white/50 rounded-xl py-2 px-4 flex items-center justify-center gap-2 text-xs md:text-sm text-gray-700">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="leading-tight text-center font-medium">
            Belum pernah melapor?{" "}
            <Link
              href="/bantuan"
              className="text-blue-600 font-bold hover:underline"
            >
              Pelajari disini!
            </Link>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
