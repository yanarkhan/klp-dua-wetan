"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

// Data Kategori Statis
const ALL_CATEGORIES = [
  "Sampah", "Arus Lalu lintas", "Banjir", "Bantuan Sosial", 
  "BPJS", "Demam Berdarah Dengue", "Fasilitas Olahraga", 
  "Imunisasi", "Jalan", "Pohon Tumbang", "Parkir Liar", 
  "Penerangan Jalan", "Ketertiban Umum", "Hewan Liar"
];

const POPULAR_CATEGORIES = ["Pohon Tumbang", "Jalan", "Parkir Liar", "Sampah"];

export default function StepKategoriLaporan({ onNext, onBack }: Props) {
  const { setValue, watch, trigger } = useFormContext();
  const selectedKategori = watch("kategoriLaporan");
  const [search, setSearch] = useState("");

  const filteredCategories = ALL_CATEGORIES.filter(c => 
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = async (kategori: string) => {
    setValue("kategoriLaporan", kategori);
    // Auto next after select for better UX
    const isValid = await trigger("kategoriLaporan");
    if(isValid) {
        setTimeout(() => onNext(), 200); 
    }
  };

  return (
    <div className="p-4 md:p-0 space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
       <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Pilih Kategori</h2>
          <p className="text-sm text-slate-500">Pilih kategori yang paling sesuai dengan laporanmu.</p>
       </div>

       {/* Search Bar */}
       <div className="relative">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
         <Input 
            placeholder="Cari Kategori Laporan" 
            className="pl-10 bg-slate-50 border-slate-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
       </div>

       {/* Popular Tags (Hidden if searching) */}
       {!search && (
         <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rekomendasi</h3>
            <div className="flex flex-wrap gap-2">
                {POPULAR_CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => handleSelect(cat)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-medium border transition-all",
                            selectedKategori === cat 
                                ? "bg-blue-600 text-white border-blue-600" 
                                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>
         </div>
       )}

       {/* List Categories */}
       <div className="space-y-1 h-[300px] overflow-y-auto pr-1 custom-scrollbar">
          {filteredCategories.length > 0 ? (
             filteredCategories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleSelect(cat)}
                    className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors group",
                        selectedKategori === cat ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-50"
                    )}
                >
                    <span className={cn(
                        "text-sm font-medium",
                        selectedKategori === cat ? "text-blue-700" : "text-slate-700"
                    )}>{cat}</span>
                    <ChevronRight className={cn(
                        "w-4 h-4",
                        selectedKategori === cat ? "text-blue-600" : "text-slate-300 group-hover:text-slate-400"
                    )} />
                </button>
             ))
          ) : (
            <div className="text-center py-8 text-sm text-slate-400">
                Kategori tidak ditemukan.
            </div>
          )}
       </div>

       <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="w-full">Kembali</Button>
      </div>
    </div>
  );
}