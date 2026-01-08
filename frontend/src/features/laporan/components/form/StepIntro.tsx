"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, MapPin, Lock, Users } from "lucide-react";

interface Props {
  onNext: () => void;
}

export default function StepIntro({ onNext }: Props) {
  const [isAgreed, setIsAgreed] = useState(false);

  const infoItems = [
    {
      icon: <AlertCircle className="w-5 h-5 text-blue-600" />,
      title: "Tindak Lanjut Laporan",
      desc: "Hanya laporan terkait permasalahan di wilayah terdaftar yang akan ditindaklanjuti.",
    },
    {
      icon: <MapPin className="w-5 h-5 text-blue-600" />,
      title: "Lokasi Laporan",
      desc: "Lokasi diambil secara otomatis berdasarkan metadata foto atau input manual.",
    },
    {
      icon: <Lock className="w-5 h-5 text-blue-600" />,
      title: "Laporan Privat/Rahasia",
      desc: "Identitas pelapor dijaga kerahasiaannya oleh sistem dan petugas.",
    },
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      title: "Laporan Publik",
      desc: "Anda dapat memilih untuk mempublikasikan laporan agar terlihat oleh warga lain.",
    },
  ];

  return (
    <div className="p-4 md:p-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
          Sudah siap untuk membuat laporanmu?
        </h2>
        <p className="text-sm text-slate-500">
          Baca ini dulu sebelum membuat laporan ya!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-6 md:gap-y-8">
        {infoItems.map((item, idx) => (
          <div key={idx} className="flex gap-4 p-3 bg-slate-50 rounded-lg md:bg-transparent md:p-0">
            <div className="shrink-0 mt-0.5 w-8 h-8 md:w-auto md:h-auto flex items-center justify-center">
                {item.icon}
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-100 space-y-6">
        <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-xl">
          <Checkbox 
            id="terms" 
            checked={isAgreed} 
            onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
            className="mt-0.5"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-tight text-slate-700 cursor-pointer select-none"
          >
            Saya mengerti dan ingin melanjutkan pembuatan laporan.
          </label>
        </div>

        {/* BUTTON SYSTEM UPGRADE */}
        <div className="flex flex-col-reverse md:flex-row gap-3 md:justify-end">
          {/* Spacer untuk konsistensi layout jika nanti ada tombol Back */}
          <div className="hidden md:block w-full md:w-auto"></div> 
          
          <Button 
            className="w-full md:w-auto md:min-w-[200px] bg-blue-600 hover:bg-blue-700 shadow-lg font-bold text-base h-12 rounded-full" 
            disabled={!isAgreed}
            onClick={onNext}
          >
            Buat Laporan
          </Button>
        </div>
      </div>
    </div>
  );
}