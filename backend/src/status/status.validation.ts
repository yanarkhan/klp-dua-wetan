// status.validation.ts
import { z, ZodType } from "zod";

export class StatusValidation {
  static readonly CREATE: ZodType = z.object({
    status: z.string().min(1).max(50),
    keterangan: z.string().min(1).max(1000).optional().nullable(),
    tanggal: z.coerce.date(),
  });

  static readonly UPDATE: ZodType = z.object({
    id_status: z.number().int().positive(),
    status: z.string().min(1).max(50),
    keterangan: z.string().min(1).max(1000).optional().nullable(),
    tanggal: z.coerce.date(),
  });
}
