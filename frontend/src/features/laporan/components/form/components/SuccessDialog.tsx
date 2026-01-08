"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SuccessDialog({ isOpen, onOpenChange }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* REVISI MOBILE: w-[90%] agar tidak mepet pinggir layar HP, rounded-2xl untuk look modern */}
      <DialogContent className="w-[90%] sm:max-w-md p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center justify-center text-center p-8 bg-white">
          
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          
          <DialogHeader className="mb-2 space-y-2">
            <DialogTitle className="text-2xl font-bold text-slate-900 text-center">
              Terima Kasih!
            </DialogTitle>
          </DialogHeader>
          
          <DialogDescription className="text-slate-500 text-sm md:text-base mb-8 max-w-[280px] mx-auto leading-relaxed text-center">
            Laporan Anda telah kami terima dan akan segera diproses oleh petugas terkait.
          </DialogDescription>

          <Button 
            asChild 
            className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-base h-12 rounded-full shadow-lg transition-transform active:scale-95" 
          >
            <Link href="/laporan">Kembali ke Beranda</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}