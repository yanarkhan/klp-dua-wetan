"use client";

import { useState, useRef, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import Webcam from "react-webcam"; 
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, RotateCcw } from "lucide-react";
import ConsentDialog from "./components/ConsentDialog";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]); 
    let n = bstr.length; 
    const u8arr = new Uint8Array(n);
    while(n--){ u8arr[n] = bstr.charCodeAt(n); }
    return new File([u8arr], filename, {type:mime});
}

export default function StepFoto({ onNext, onBack }: Props) {
  const { setValue } = useFormContext();
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showConsent, setShowConsent] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const file = dataURLtoFile(imageSrc, "laporan-cam.jpg");
      setValue("foto", file, { shouldValidate: true });
      onNext();
    }
  }, [webcamRef, setValue, onNext]);

  const handleOpenGallery = () => setShowConsent(true);
  const handleConsentAgreed = () => {
    setShowConsent(false);
    setTimeout(() => fileInputRef.current?.click(), 100);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("foto", file, { shouldValidate: true });
      onNext();
    }
  };

  return (
    <div className="p-4 md:p-0 space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Ambil Foto Laporan</h2>
          <p className="text-sm text-slate-500">Pastikan foto terlihat jelas dan tidak buram.</p>
       </div>

      <div className="relative w-full aspect-[3/4] md:aspect-video bg-black rounded-xl overflow-hidden shadow-md">
         <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "environment" }}
            className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="absolute inset-0 border-[24px] border-black/20 pointer-events-none" />
         
         {/* Camera Controls inside Viewport */}
         <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-8 z-10">
             <Button 
                type="button"
                variant="secondary" 
                size="icon"
                onClick={handleOpenGallery}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40"
             >
                <ImageIcon className="w-5 h-5" />
             </Button>

             <button 
                onClick={capture}
                className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-transparent active:scale-95 transition-transform"
             >
                <div className="w-14 h-14 bg-white rounded-full" />
             </button>

             <Button 
                type="button"
                variant="secondary" 
                size="icon"
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40"
             >
                <RotateCcw className="w-5 h-5" />
             </Button>
         </div>
      </div>

      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
      <ConsentDialog isOpen={showConsent} onClose={() => setShowConsent(false)} onAgree={handleConsentAgreed} />

      {/* BUTTON */}
      <div className="pt-2 flex flex-col-reverse md:flex-row gap-3 md:justify-start">
        <Button 
            variant="ghost" 
            onClick={onBack} 
            className="w-full md:w-auto text-slate-500 hover:text-slate-900 rounded-full h-12 md:px-6"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
}