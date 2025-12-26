"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const MOCK_REPORT = {
  id: "1",
  title: "Ada Jalan rusak di ...",
  category: "Jalan",
  location: "RT/RW",
  status: "Menunggu" as const,
};

export default function LaporanPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-gray-900">Laporan Milikmu</h2>
        <Link
          href="/laporan"
          className="text-sm font-bold text-blue-600 hover:text-blue-700"
        >
          Lihat Semua
        </Link>
      </div>

      {/* Card Laporannya */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] p-4 flex flex-row gap-5 items-center border border-gray-50 group hover:border-blue-100 transition-colors">
        {/* FOTO CONTAINER */}
        <div className="relative w-28 h-28 bg-gray-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-gray-100">
          <Camera className="w-8 h-8 text-gray-400 mb-5 group-hover:text-blue-400 transition-colors" />

          <div className="absolute bottom-0 left-0 right-0 bg-[#1D4ED8] text-white text-[10px] font-bold text-center py-1.5 uppercase tracking-wide">
            {MOCK_REPORT.status}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-2 w-full pr-2">
          <Badge
            variant="secondary"
            className="w-fit px-3 py-1 text-[10px] font-bold uppercase bg-gray-100 text-gray-600 hover:bg-gray-200 border-0"
          >
            {MOCK_REPORT.category}
          </Badge>

          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {MOCK_REPORT.title}
          </h3>

          <p className="text-xs font-bold text-gray-500 mt-1 uppercase">
            {MOCK_REPORT.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
