"use client";

import { motion } from "framer-motion";
import { NumberTicker } from "@/components/ui/number-ticker";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";
import { LaporanStats } from "../types";

interface Props {
  stats: LaporanStats;
}

export default function LaporanStatsSection({ stats }: Props) {
  const statItems = [
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      value: stats.total,
      label: "Total Laporan",
      color: "bg-blue-500",
      shadow: "shadow-blue-500/30",
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      value: stats.diproses,
      label: "Sedang Diproses",
      color: "bg-yellow-500",
      shadow: "shadow-yellow-500/30",
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-white" />,
      value: stats.selesai,
      label: "Laporan Selesai",
      color: "bg-emerald-500",
      shadow: "shadow-emerald-500/30",
    },
    {
      icon: <XCircle className="h-6 w-6 text-white" />,
      value: stats.ditolak,
      label: "Laporan Ditolak",
      color: "bg-rose-500",
      shadow: "shadow-rose-500/30",
    },
  ];

  return (
    <div className="relative z-30 w-full px-4 -mt-20 md:-mt-24 lg:-mt-28 pb-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="
            rounded-3xl 
            border border-white/40 
            bg-white/80 
            backdrop-blur-xl
            p-6 shadow-2xl md:p-8
          "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2 md:gap-y-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-neutral-100">
            {statItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-3 px-2 md:flex-row md:justify-center md:gap-4"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${item.color} ${item.shadow} md:h-14 md:w-14`}
                >
                  {item.icon}
                </div>

                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <span className="text-2xl font-bold leading-none tracking-tight text-neutral-800 md:text-3xl">
                    <NumberTicker value={item.value} />
                  </span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-500 md:text-xs">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
