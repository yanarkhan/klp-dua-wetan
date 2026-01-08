import { z } from "zod";

export const createLaporanSchema = z.object({
  // FOTO
  foto: z
    .custom<File>((v) => v instanceof File, {
      message: "Wajib menyertakan foto laporan",
    })
    .nullable(),

  // LOKASI
  lokasiFoto: z.string().optional(),
  isSameLocation: z.boolean(),
  lokasiLaporan: z.string().min(5, "Lokasi laporan wajib diisi minimal 5 karakter"),
  detailLokasi: z.string().max(100, "Detail lokasi maksimal 100 karakter").optional(),

  // DETAIL LAPORAN
  judulLaporan: z.string()
    .min(5, "Judul laporan minimal 5 karakter")
    .max(150, "Judul laporan maksimal 150 karakter"),
  
  deskripsiLaporan: z.string()
    .min(50, "Deskripsi laporan minimal 50 karakter")
    .max(2000, "Maksimal 2000 karakter"),

  usahaDilakukan: z.string()
    .min(10, "Mohon jelaskan usaha yang sudah dilakukan (min 10 karakter)")
    .max(1000, "Maksimal 1000 karakter"),

  // Surat Permohonan WAJIB (Kata pak Topikk)
  suratPermohonan: z
    .custom<File>((v) => v instanceof File, {
      message: "Surat permohonan wajib dilampirkan dalam format PDF/DOC",
    }),

  // KATEGORI
  kategoriLaporan: z.string()
    .min(1, "Wajib memilih kategori laporan"),
});

export type CreateLaporanFormValues = z.infer<typeof createLaporanSchema>;

export const defaultValues: Partial<CreateLaporanFormValues> = {
  foto: null,
  lokasiFoto: "Kelurahan Kelapa Dua Wetan, Jakarta Timur (Mock)", 
  isSameLocation: true, 
  lokasiLaporan: "Kelurahan Kelapa Dua Wetan, Jakarta Timur (Mock)",
  detailLokasi: "",
  judulLaporan: "",
  deskripsiLaporan: "",
  usahaDilakukan: "",
  suratPermohonan: undefined, // undefined buat picu trigger validation required
  kategoriLaporan: "",
};