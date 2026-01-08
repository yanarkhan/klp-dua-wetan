"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Image as ImageIcon,
  MapPin,
  FileText,
  Paperclip,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  onSubmit: () => void;
  onBack: () => void;
  onEdit: (stepIndex: number) => void;
}

export default function StepTinjauLaporan({ onSubmit, onBack, onEdit }: Props) {
  const { watch } = useFormContext();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const values = watch();

  useEffect(() => {
    if (values.foto instanceof File) {
      const url = URL.createObjectURL(values.foto);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [values.foto]);

  const ReviewSection = ({ label, value, stepIndex, icon }: any) => (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          {icon} {label}
        </h3>
        <button
          onClick={() => onEdit(stepIndex)}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
        >
          Ubah
        </button>
      </div>
      <div className="pt-1">{value}</div>
    </div>
  );

  return (
    <div className="p-4 md:p-0 space-y-8 animate-in fade-in slide-in-from-right-8 duration-300 pb-20 md:max-w-3xl md:mx-auto">
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
          Tinjau Data Laporan
        </h2>
        <p className="text-sm text-slate-500">
          Mohon periksa kembali kebenaran data sebelum dikirim.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Judul & Kategori */}
        <ReviewSection
          label="Informasi Dasar"
          stepIndex={4}
          icon={<FileText className="w-3.5 h-3.5" />}
          value={
            <div className="space-y-1">
              <p className="text-base font-bold text-slate-900 leading-tight">
                {values.judulLaporan}
              </p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                {values.kategoriLaporan}
              </span>
            </div>
          }
        />

        {/* 2. Bukti Foto */}
        <ReviewSection
          label="Bukti Laporan"
          stepIndex={2}
          icon={<ImageIcon className="w-3.5 h-3.5" />}
          value={
            <div className="relative w-full aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Bukti"
                  fill
                  className="object-contain"
                />
              ) : (
                <span className="text-xs text-slate-400 p-4">
                  Tidak ada foto
                </span>
              )}
            </div>
          }
        />

        {/* 3. Lokasi */}
        <ReviewSection
          label="Lokasi Laporan"
          stepIndex={3}
          icon={<MapPin className="w-3.5 h-3.5" />}
          value={
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">
                {values.lokasiLaporan}
              </p>
              {values.detailLokasi && (
                <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 mt-2">
                  <span className="font-semibold text-slate-500 text-xs block mb-1">
                    Patokan:
                  </span>
                  {values.detailLokasi}
                </p>
              )}
            </div>
          }
        />

        {/* 4. Deskripsi & Usaha */}
        <ReviewSection
          label="Detail & Usaha"
          stepIndex={4}
          icon={<FileText className="w-3.5 h-3.5" />}
          value={
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Deskripsi Masalah
                </p>
                <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap break-words bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                  {values.deskripsiLaporan}
                </p>
              </div>
              {values.usahaDilakukan && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Usaha Dilakukan
                  </p>
                  <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap break-words bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                    {values.usahaDilakukan}
                  </p>
                </div>
              )}
            </div>
          }
        />

        {/* 5. Lampiran */}
        {values.suratPermohonan && (
          <ReviewSection
            label="Surat Permohonan"
            stepIndex={4}
            icon={<Paperclip className="w-3.5 h-3.5" />}
            value={
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-700">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-green-800 truncate">
                    {values.suratPermohonan.name}
                  </p>
                  <p className="text-[10px] text-green-600">
                    Terlampir • Siap dikirim
                  </p>
                </div>
              </div>
            }
          />
        )}
      </div>

      {/* Pernyataan */}
      <div className="bg-gradient-to-br from-slate-50 to-white p-5 rounded-xl border border-slate-200 shadow-sm mt-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              Pernyataan Tanggung Jawab
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dengan ini saya menyatakan bahwa laporan yang saya buat adalah
              benar, tidak mengandung unsur fitnah/hoaks, dan saya bersedia
              bertanggung jawab apabila di kemudian hari ditemukan
              ketidaksesuaian.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <Checkbox
                id="confirm"
                checked={isConfirmed}
                onCheckedChange={(c) => setIsConfirmed(!!c)}
                className="data-[state=checked]:bg-blue-600 border-slate-400"
              />
              <Label
                htmlFor="confirm"
                className="text-sm font-semibold text-slate-800 cursor-pointer select-none"
              >
                Ya, saya setuju dan siap mengirim laporan.
              </Label>
            </div>
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
          className="w-full md:w-auto md:min-w-[240px] bg-blue-600 hover:bg-blue-700 shadow-lg font-bold text-base h-12 rounded-full"
          onClick={onSubmit}
          disabled={!isConfirmed}
        >
          Kirim Laporan
        </Button>
      </div>
    </div>
  );
}
