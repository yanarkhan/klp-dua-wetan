 import {size, z, ZodType } from "zod";

export class ReportValidation {
  static readonly CREATE: ZodType = z.object({
    id_laporan: z.string().min(1).max(10),
    judul: z.string().min(3).max(150),
    bukti: z.string().min(3).max(255),
    lokasi: z.string().min(3).max(255),
    kategori: z.string().min(3).max(50),
    deskripsi: z.string().min(3),
    surat: z.string().min(3).max(255).nullable(),
    usaha: z.string().min(3),
    tanggal: z.coerce.date(),
  });
  static readonly UPDATE: ZodType = z.object({
    id_laporan: z.string().min(1).max(10),
    judul: z.string().min(3).max(150).optional(),
    bukti: z.string().min(3).max(255).optional(),
    lokasi: z.string().min(3).max(255).optional(),
    kategori: z.string().min(3).max(50).optional(),
    deskripsi: z.string().min(3).optional(),
    surat: z.string().min(3).max(255).nullable().optional(),
    usaha: z.string().min(3).optional(),
    tanggal: z.coerce.date().optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    id_laporan: z.string().min(1).optional(),
    judul: z.string().min(3).optional(),
    lokasi: z.string().min(3).optional(),
    deskripsi: z.string().min(3).optional(),
    tanggal: z.coerce.date().optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
} 