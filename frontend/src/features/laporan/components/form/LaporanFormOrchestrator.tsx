"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLaporanSchema, defaultValues, CreateLaporanFormValues } from "../../lib/form-schema";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";

// Import Steps
import StepIntro from "./StepIntro";
import StepConsent from "./StepConsent"; 
import StepFoto from "./StepFoto";       
import StepLokasi from "./StepLokasi";   
import StepDetailLaporan from "./StepDetailLaporan";
import StepKategoriLaporan from "./StepKategoriLaporan";
import StepTinjauLaporan from "./StepTinjauLaporan";
import SuccessDialog from "./components/SuccessDialog";

type BreadcrumbItemType = {
  label: string;
  href?: string;
  active?: boolean;
};

export default function LaporanFormOrchestrator() {
  const [internalStep, setInternalStep] = useState(0);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const methods = useForm<CreateLaporanFormValues>({
    resolver: zodResolver(createLaporanSchema),
    defaultValues,
    mode: "onChange", 
  });

  const nextStep = () => setInternalStep((prev) => prev + 1);
  const prevStep = () => setInternalStep((prev) => Math.max(0, prev - 1));
  const jumpToStep = (stepIndex: number) => setInternalStep(stepIndex);

  const handleFinalSubmit = async (data: CreateLaporanFormValues) => {
    console.log("FINAL SUBMIT DATA:", data);
    setIsSuccessOpen(true);
  };

  const renderStep = () => {
    switch (internalStep) {
      case 0: return <StepIntro onNext={nextStep} />;
      case 1: return <StepConsent onNext={nextStep} onBack={prevStep} />;
      case 2: return <StepFoto onNext={nextStep} onBack={prevStep} />;
      case 3: return <StepLokasi onNext={nextStep} onBack={prevStep} />;
      case 4: return <StepDetailLaporan onNext={nextStep} onBack={prevStep} />;
      case 5: return <StepKategoriLaporan onNext={nextStep} onBack={prevStep} />;
      case 6: return <StepTinjauLaporan onSubmit={methods.handleSubmit(handleFinalSubmit)} onBack={prevStep} onEdit={jumpToStep} />;
      default: return <div>Step tidak ditemukan</div>;
    }
  };

  const getBreadcrumbItems = (): BreadcrumbItemType[] => {
    const base: BreadcrumbItemType[] = [
      { label: "Beranda", href: "/dashboard", active: false },
      { label: "Laporan", href: "/laporan", active: false },
    ];

    if (internalStep === 0 || internalStep === 1) {
      return [...base, { label: "Buat Laporan", active: true, href: "#" }];
    }

    const flowSteps = [
      { id: 2, label: "Foto" },
      { id: 3, label: "Lokasi" },
      { id: 4, label: "Detail" },
      { id: 5, label: "Kategori" },
      { id: 6, label: "Tinjau" },
    ];

    const currentFlow = flowSteps.filter(s => s.id <= internalStep);
    
    return [
      ...base,
      ...currentFlow.map((s, idx) => ({
        label: s.label,
        active: idx === currentFlow.length - 1,
        href: "#" 
      }))
    ];
  };

  const breadcrumbs = getBreadcrumbItems();

  return (
    <div className="w-full max-w-lg md:max-w-4xl mx-auto bg-white min-h-[calc(100vh-80px)] md:min-h-0 md:rounded-2xl md:shadow-sm md:border md:border-slate-100 p-0 md:p-8 overflow-hidden relative">
      
      {/* Hidden di Mobile, Block di Desktop */}
      <div className="hidden md:block mb-8 px-0">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {item.active ? (
                    <BreadcrumbPage className="font-semibold text-slate-900">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink 
                      href={item.href || "#"} 
                      className="text-slate-500 hover:text-blue-600"
                    >
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="mx-2" />
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <FormProvider {...methods}>
        {renderStep()}
      </FormProvider>

      <SuccessDialog 
        isOpen={isSuccessOpen} 
        onOpenChange={setIsSuccessOpen} 
      />
    </div>
  );
}