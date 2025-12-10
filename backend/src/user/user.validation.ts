import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(15, "Username maksimal 15 karakter")
      .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan underscore"),

    password_hash: z
      .string()
      .min(6, "Password minimal 6 karakter")
      .max(100, "Password maksimal 100 karakter"),

    name: z
      .string()
      .min(3, "Nama minimal 3 karakter")
      .max(50, "Nama maksimal 50 karakter"),

    email: z
      .string()
      .email("Format email tidak valid")
      .max(50, "Email maksimal 50 karakter"),

    notlp: z
      .string()
      .min(10, "Nomor HP minimal 10 digit")
      .max(15, "Nomor HP maksimal 15 digit")
      .regex(/^[0-9]+$/, "Nomor HP hanya boleh angka"),

    tipe_user: z
      .string()
      .min(4)
      .max(10),
  });
  static readonly LOGIN = z.object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(15, "Username maksimal 15 karakter")
      .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan underscore"),

    password_hash: z
      .string()
      .min(6, "Password minimal 6 karakter")
      .max(100, "Password maksimal 100 karakter"),
  });

  static readonly UPDATE = z.object({
    name: z.string().min(3).max(50).optional(),
    email: z.string().email().max(50).optional(),
    notlp: z.string().min(10).max(15).regex(/^[0-9]+$/).optional(),
    password_hash: z.string().min(6).max(100).optional(),
  });
}
