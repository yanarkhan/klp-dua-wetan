"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function StepLokasi({ onNext, onBack }: Props) {
  const { register, watch, setValue, trigger, formState: { errors } } = useFormContext();
  const isSameLocation = watch("isSameLocation");
  const lokasiFoto = watch("lokasiFoto");

  const handleToggle = (checked: boolean) => {
    setValue("isSameLocation", checked);
    checked ? setValue("lokasiLaporan", lokasiFoto) : setValue("lokasiLaporan", "");
  };

  const handleNext = async () => {
    const isValid = await trigger(["lokasiLaporan", "detailLokasi"]);
    if (isValid) onNext();
  };

  return (
    <div className="p-4 md:p-0 space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Lokasi Kejadian</h2>
          <p className="text-sm text-slate-500">Pastikan lokasi akurat agar petugas mudah menemukan.</p>
       </div>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-4 items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 border border-blue-100 text-blue-600 shadow-sm">
                <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-0.5">Terdeteksi dari Foto</p>
                <p className="text-sm font-medium text-slate-900 truncate">{lokasiFoto}</p>
            </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-slate-100 pb-4">
            <Label htmlFor="same-loc" className="text-sm font-medium text-slate-700 cursor-pointer">
                Gunakan lokasi foto?
            </Label>
            <Switch id="same-loc" checked={isSameLocation} onCheckedChange={handleToggle} />
        </div>

        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Alamat Lengkap <span className="text-red-500">*</span></Label>
                <Textarea 
                    {...register("lokasiLaporan")}
                    disabled={isSameLocation}
                    className="bg-white resize-none"
                    placeholder="Nama jalan, RT/RW, Kelurahan..."
                    rows={3}
                />
                {errors.lokasiLaporan && (
                    <p className="text-xs text-red-500 font-medium">{errors.lokasiLaporan.message as string}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label>Patokan (Opsional)</Label>
                <Input {...register("detailLokasi")} placeholder="Contoh: Depan warung warna biru" className="h-11" />
            </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="pt-6 flex flex-col-reverse md:flex-row gap-3 md:justify-end">
        <Button 
            variant="ghost" 
            onClick={onBack} 
            className="w-full md:w-auto text-slate-500 hover:text-slate-900 rounded-full h-12"
        >
          Kembali
        </Button>
        <Button 
            className="w-full md:w-auto md:min-w-[200px] bg-blue-600 hover:bg-blue-700 shadow-lg font-bold text-base h-12 rounded-full" 
            onClick={handleNext}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}