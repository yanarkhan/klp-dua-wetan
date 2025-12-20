"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Instagram, Facebook, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function FooterLanding() {
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Lapor Pengaduan", href: "/lapor" },
    { name: "Cek Status", href: "/cek-status" },
    { name: "Berita & Pengumuman", href: "/berita" },
  ];

  const socialMedia = [
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "Facebook", href: "https://facebook.com", icon: Facebook },
    { name: "Website", href: "/", icon: Globe },
  ];

  return (
    <footer className="w-full border-t border-border bg-background text-muted-foreground">
      <div className="container mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
          {/* KOLOM 1 */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden">
                <Image
                  src="/images/logos/Mitra-2.png"
                  alt="Logo Kelurahan"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="relative h-8 w-auto min-w-[30px]">
                <Image
                  src="/images/logos/Aptikom.png"
                  alt="Aptikom"
                  height={32}
                  width={60}
                  className="h-full w-auto object-contain"
                  style={{ width: "auto" }}
                />
              </div>

              {/* Logo Mitra 2 (Gunadarma) */}
              <div className="relative h-8 w-auto min-w-[30px]">
                <Image
                  src="/images/logos/Gunadarma.png"
                  alt="Gunadarma"
                  height={32}
                  width={60}
                  className="h-full w-auto object-contain"
                  style={{ width: "auto" }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-foreground">
                Kelurahan Kelapa Dua Wetan
              </h3>
              <p className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique, hic.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-2">
              {socialMedia.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    asChild
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </motion.div>

          {/* KOLOM 2 */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold tracking-wider text-foreground">
              Menu Utama
            </h4>
            <nav className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="w-fit text-sm transition-colors hover:text-primary hover:underline hover:underline-offset-4"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* KOLOM 3 */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            <h4 className="text-sm font-semibold tracking-wider text-foreground">
              Hubungi Kami
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-foreground">
                    Kantor Kelurahan
                  </span>
                  <span>Jl. Raya Kelapa Dua Wetan No. 1</span>
                  <span>Ciracas, Jakarta Timur 13730</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <Link
                  href="mailto:pelayanan@kelapadua.jakarta.go.id"
                  className="hover:text-primary hover:underline"
                >
                  pelayanan@kelapadua.jakarta.go.id
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>(021) 8770-1234</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs sm:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-center sm:text-left">
            &copy; {currentYear} Pemerintah Kelurahan Kelapa Dua Wetan. Hak
            Cipta Dilindungi.
          </p>
          <div className="flex gap-6">
            <Link href="/kebijakan-privasi" className="hover:text-primary">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="hover:text-primary">
              Syarat & Ketentuan
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
