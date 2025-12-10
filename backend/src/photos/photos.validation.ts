import {z, ZodType } from "zod";

export class PhotosValidation {
    static readonly CREATE: ZodType = z.object ({
        id_laporan:  z.string().min(1).optional(), 
        id_status:  z.number().min(1).optional(), 
        id_berita:  z.number().min(1).optional(), 
        nama:  z.string().min(1),
        url:z.string().min(1)        
    });
    static readonly UPDATE: ZodType = z.object ({
        id_foto:  z.string().min(1), 
        id_laporan:  z.string().min(1).optional(), 
        id_status:  z.number().min(1).optional(), 
        id_berita:  z.number().min(1).optional(), 
        nama:  z.string().min(1),
        url:z.string().min(1)
    })
    static readonly SEARCH: ZodType = z.object ({
        id_laporan:  z.string().min(1).optional(), 
        id_status:  z.number().min(1).optional(), 
        id_berita:  z.number().min(1).optional(), 
        nama:  z.string().min(1),
        url:z.string().min(1),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
    })
}