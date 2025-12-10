import {z, ZodType } from "zod";

export class NewsValidation {
    static readonly CREATE: ZodType = z.object({
        judul_berita:  z.string().min(1), 
        deskripsi:  z.string().min(1),
        ringkas:z.string().min(1),
        tanggal:   z.coerce.date()
    });
    static readonly UPDATE: ZodType = z.object({
        id_berita:z.string().min(1).max(10), 
        judul_berita:  z.string().min(1).optional(), 
        deskripsi:  z.string().min(1).optional(),
        ringkas:z.string().min(1).optional(),
        tanggal:   z.coerce.date().optional()
    });
    static readonly SEARCH: ZodType = z.object({
        judul_berita:  z.string().min(1).optional(), 
        deskripsi:  z.string().min(1).optional(),
        ringkas:z.string().min(1).optional(),
        tanggal:   z.coerce.date().optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
    });
}