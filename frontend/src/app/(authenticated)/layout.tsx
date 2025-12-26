import { AuthenticatedNav } from "@/components/layout/AuthenticatedNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal Warga | LAMAS Kelurahan Kelapa Dua Wetan",
  description: "Akses layanan aspirasi dan pengaduan masyarakat.",
};

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthenticatedNav />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
