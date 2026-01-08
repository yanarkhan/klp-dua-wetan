"use client";

import { Button } from "@/components/ui/button";
import { Camera, MapPin, HardDrive } from "lucide-react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function StepConsent({ onNext, onBack }: Props) {
  return (
    <div className="p-4 md:p-0 h-full flex flex-col justify-between animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto w-full">
        <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Izin Akses Diperlukan
            </h2>
            <p className="text-sm text-slate-500">
              Untuk memproses laporan, kami membutuhkan izin akses perangkat Anda.
            </p>
        </div>

        <div className="border border-blue-100 bg-blue-50 rounded-xl p-5 space-y-5">
            <h3 className="font-semibold text-slate-900 leading-relaxed">
                Fitur ini <span className="text-blue-700">mengakses, menyimpan,</span> dan <span className="text-blue-700">menggunakan:</span>
            </h3>
            <ul className="space-y-3">
                {[
                  { icon: Camera, label: "Kamera" },
                  { icon: MapPin, label: "Lokasi" },
                  { icon: HardDrive, label: "Media Penyimpanan" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                      <item.icon className="w-5 h-5 text-blue-600" />
                      {item.label}
                  </li>
                ))}
            </ul>
        </div>
      </div>

      {/* BUTTON */}
      <div className="pt-8 flex flex-col-reverse md:flex-row gap-3 md:justify-end max-w-2xl mx-auto w-full">
        <Button 
            variant="ghost" 
            onClick={onBack} 
            className="w-full md:w-auto text-slate-500 hover:text-slate-900 rounded-full h-12"
        >
          Kembali
        </Button>
        <Button 
            className="w-full md:w-auto md:min-w-[200px] bg-blue-600 hover:bg-blue-700 shadow-lg font-bold text-base h-12 rounded-full" 
            onClick={onNext}
        >
          Saya Setuju
        </Button>
      </div>
    </div>
  );
}