"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"; // Import Button Shadcn

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export default function ConsentDialog({ isOpen, onClose, onAgree }: Props) {
  const [dontShowAgain, setDontShowAgain] = useState(true);

  if (!isOpen) return null;

  return (
    // Overlay + Blur 
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-in fade-in duration-300">
      
      {/* Dialog Container */}
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 relative">
        <h3 className="font-bold text-lg text-slate-900 mb-4 text-center md:text-left">
          Panduan pemilihan foto
        </h3>

        <div className="text-sm text-slate-600 space-y-4 mb-6">
          <p>Foto dari gallery yang dapat digunakan untuk membuat laporan:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Diambil oleh aplikasi kamera tidak lebih dari dua jam yang lalu</li>
            <li>Memiliki informasi metadata tag lokasi</li>
          </ul>
          <p>Pastikan kamu telah mengaktifkan tag lokasi pada pengaturan aplikasi kamera.</p>
        </div>

        {/* Visual Mock: Camera Settings */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 w-full max-w-[200px] shadow-sm transform scale-100 md:scale-110 transition-transform">
             <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
                <div className="w-3 h-3 text-slate-400">←</div>
                <span className="text-xs font-bold text-slate-700">Setelan</span>
             </div>
             <div className="space-y-2">
                <div className="h-2 w-24 bg-slate-200 rounded"></div>
                <div className="flex items-center justify-between">
                    <div className="h-2 w-20 bg-slate-200 rounded"></div>
                    <div className="w-6 h-3 bg-slate-800 rounded-full flex justify-end p-0.5">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                </div>
                <div className="h-2 w-16 bg-slate-200 rounded"></div>
             </div>
          </div>
        </div>

        {/* FOOTER UI MOBILE */}
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center justify-center md:justify-start space-x-2">
                <Checkbox 
                  id="dontShow" 
                  checked={dontShowAgain}
                  onCheckedChange={(c) => setDontShowAgain(!!c)}
                  className="data-[state=checked]:bg-blue-600 border-slate-400"
                />
                <label
                    htmlFor="dontShow"
                    className="text-xs font-medium leading-none text-slate-600 cursor-pointer select-none"
                >
                    Tampilkan bantuan ini saat mulai
                </label>
            </div>

            {/* BUTTON */}
            <Button 
                onClick={onAgree} 
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold h-10 px-6 shadow-md transition-all active:scale-95"
            >
                Mengerti
            </Button>
        </div>
      </div>
    </div>
  );
}