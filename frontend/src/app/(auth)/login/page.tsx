"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Eye, EyeOff, ArrowLeft, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Alamat email/username wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
  rememberMe: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function handleSubmit(data: LoginFormValues) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Login Payload:", data);
    setIsLoading(false);
    alert("Login Berhasil (Demo Mode Doangg)");
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-muted/30 px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[400px]"
      >
        <div className="hidden md:block fixed top-8 left-8 z-10">
          <Button
            variant="ghost"
            asChild
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Beranda</span>
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex w-full mb-4 md:hidden">
          <Button
            variant="ghost"
            asChild
            className="pl-0 text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors justify-start"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Beranda</span>
            </Link>
          </Button>
        </div>

        <Card className="w-full border-border shadow-sm">
          <CardHeader className="space-y-4 text-center pb-6">
            <div className="flex justify-center mb-2">
              <Image
                src="/images/logos/lamas-logo.svg"
                alt="Logo LAMAS KDW"
                width={160}
                height={160}
                className="h-24 w-auto object-contain"
                priority
              />
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                Masuk Sistem LAMAS
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                Layanan Aspirasi dan Pengaduan Masyarakat{" "}
                <br className="hidden sm:block" />
                Kelurahan Kelapa Dua Wetan
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5"
              >
                {/* Field Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email/Username/RT RW</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="sabartaufik@gmail.com"
                          {...field}
                          className="bg-background"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata Sandi</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="bg-background pr-10"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Checkbox */}
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal text-muted-foreground cursor-pointer">
                          Ingat saya di perangkat ini
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memverifikasi...
                    </>
                  ) : (
                    "Masuk"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col border-t bg-muted/20 p-6">
            <Alert
              variant="default"
              className="border-blue-200 bg-blue-50 text-blue-900"
            >
              <ShieldAlert className="h-4 w-4 text-blue-600 mt-0.5" />
              <AlertDescription className="text-xs leading-relaxed ml-2">
                <strong>Perhatian:</strong> Sistem ini hanya untuk pengurus
                RT/RW yang telah terdaftar. Hubungi admin kelurahan jika Anda
                memerlukan akses.
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Pemerintah Kelurahan Kelapa Dua
          Wetan.
        </div>
      </motion.div>
    </div>
  );
}
