import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk Sistem | LAMAS Kelurahan Kelapa Dua Wetan",
  description:
    "Portal login khusus pengurus RT/RW untuk mengakses Layanan Aspirasi dan Pengaduan Masyarakat.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen w-full">{children}</main>;
}
