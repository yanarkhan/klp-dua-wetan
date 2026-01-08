"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Paperclip, FileText, UploadCloud, X, AlertCircle } from "lucide-react";
import { useRef } from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function StepDetailLaporan({ onNext, onBack }: Props) {
  const { register, trigger, watch, setValue, formState: { errors } } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const deskripsiValue = watch("deskripsiLaporan") || "";
  const suratFile = watch("suratPermohonan");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("suratPermohonan", file, { shouldValidate: true });
    }
  };

  const handleRemoveFile = () => {
      setValue("suratPermohonan", null);
      if (fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  };

  const handleNext = async () => {
    // TRIGGER VALIDASI
    const isValid = await trigger(["judulLaporan", "deskripsiLaporan", "usahaDilakukan", "suratPermohonan"]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="p-4 md:p-0 space-y-6 animate-in fade-in slide-in-from-right-8 duration-300 md:max-w-3xl md:mx-auto">
      <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Tulis Detail Laporan</h2>
          <p className="text-sm text-slate-500">Ceritakan dengan detail, jelas, dan padat.</p>
       </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-xs md:text-sm text-blue-800 leading-relaxed flex gap-2">
         <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
         <div>
            Kamu bisa tulis deskripsi masalah, waktu kejadian, dan detail lain yang diperlukan.
         </div>
      </div>

      <div className="space-y-5">
        {/* Judul */}
        <div className="space-y-2">
            <Label>Judul Laporan <span className="text-red-500">*</span></Label>
            <Input 
                {...register("judulLaporan")}
                placeholder="Contoh: Tumpukan Sampah Liar di Pinggir Jalan"
                className="h-11"
            />
            {errors.judulLaporan && (
                <p className="text-xs text-red-500 font-medium">{errors.judulLaporan.message as string}</p>
            )}
        </div>

        {/* Deskripsi */}
        <div className="space-y-2">
            <Label>Deskripsi Lengkap <span className="text-red-500">*</span></Label>
            <Textarea 
                {...register("deskripsiLaporan")}
                placeholder="Isi deskripsi minimal 50 karakter..."
                rows={5}
                className="bg-white resize-none focus:ring-blue-500"
            />
            <div className="flex justify-between items-center">
                {errors.deskripsiLaporan ? (
                    <p className="text-xs text-red-500 font-medium">{errors.deskripsiLaporan.message as string}</p>
                ) : <span></span>}
                <span className="text-xs text-slate-400">{deskripsiValue.length}/2000</span>
            </div>
        </div>

        {/* Usaha Dilakukan */}
        <div className="space-y-2">
            <Label>Usaha yang Sudah Dilakukan <span className="text-red-500">*</span></Label>
            <Textarea 
                {...register("usahaDilakukan")}
                placeholder="Contoh: Sudah melapor ke Pak RT tapi belum ada respon..."
                rows={2}
                className="bg-white resize-none focus:ring-blue-500"
            />
             {errors.usahaDilakukan && (
                <p className="text-xs text-red-500 font-medium">{errors.usahaDilakukan.message as string}</p>
            )}
        </div>

        {/* Lampiran Surat (UI FIX: Cleaner & Mandatory) */}
        <div className="space-y-2 pt-2">
            <Label className="flex items-center gap-1">
                Lampiran Surat Permohonan <span className="text-red-500">*</span>
                <span className="text-[10px] font-normal text-slate-400 ml-1">(Wajib PDF/DOC)</span>
            </Label>
            
            {!suratFile ? (
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                        border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                        ${errors.suratPermohonan ? 'border-red-300 bg-red-50/50 hover:bg-red-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}
                    `}
                >
                    <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
                        <UploadCloud className={`w-5 h-5 ${errors.suratPermohonan ? 'text-red-500' : 'text-blue-600'}`} />
                    </div>
                    <p className="text-sm font-medium text-slate-700">Ketuk untuk unggah surat</p>
                    <p className="text-xs text-slate-400 mt-1">Format: .pdf, .doc, .docx (Maks 5MB)</p>
                    {errors.suratPermohonan && (
                        <p className="text-xs text-red-600 font-semibold mt-2 bg-red-100 px-2 py-1 rounded">
                            {errors.suratPermohonan.message as string || "Wajib melampirkan surat"}
                        </p>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-between p-3 bg-white border border-blue-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate max-w-[200px] md:max-w-xs">
                                {suratFile.name}
                            </p>
                            <p className="text-xs text-slate-500">
                                {(suratFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                    <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        onClick={handleRemoveFile}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            )}
            
            <input 
                type="file" 
                ref={fileInputRef}
                accept=".pdf,.doc,.docx" 
                onChange={handleFileChange}
                className="hidden"
            />
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