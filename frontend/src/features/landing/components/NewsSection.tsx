"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const NEWS_DATA = [
  {
    id: 1,
    title:
      "7 Tim Mengikuti Lomba Hadroh Kelurahan Kelapa Dua Wetan Dalam Rangka Memeriahkan Maulid Nabi Muhammad SAW",
    date: "15 November 2025",
    category: "Kegiatan",
    image: "/images/news-thumbnail/thumbnail-1.png",
    excerpt:
      "Sebanyak tujuh tim hadroh ikut berpartisipasi memeriahkan lomba tingkat kelurahan yang digelar di aula kantor kelurahan. Acara ini dihadiri oleh Camat Ciracas dan dibuka langsung oleh Lurah Kelapa Dua Wetan dengan penuh khidmat.",
    slug: "lomba-hadroh-2025",
  },
  {
    id: 2,
    title: "Jadwal Layanan Posyandu Balita & Lansia Bulan Ini",
    date: "12 November 2025",
    category: "Kesehatan",
    image: "/images/news-thumbnail/thumbnail-1.png",
    excerpt:
      "Informasi jadwal lengkap kegiatan Posyandu untuk balita dan pemeriksaan kesehatan lansia di setiap RW. Harap membawa buku KIA dan KTP untuk pendataan ulang warga yang berdomisili di wilayah Kelurahan Kelapa Dua Wetan.",
    slug: "jadwal-posyandu-november",
  },
  {
    id: 3,
    title: "Sosialisasi Pengelolaan Sampah Mandiri di RW 04",
    date: "10 November 2025",
    category: "Lingkungan",
    image: "/images/news-thumbnail/thumbnail-1.png",
    excerpt:
      "Warga RW 04 antusias mengikuti pelatihan daur ulang sampah rumah tangga menjadi kompos bermanfaat. Program ini bertujuan mengurangi volume sampah yang dibuang ke TPA Bantargebang.",
    slug: "sosialisasi-sampah-rw04",
  },
];

export function NewsSection() {
  return (
    <section className="w-full bg-muted/30 px-6 pb-24 pt-32 md:pt-36 md:px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Berita & Pengumuman
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Informasi terbaru dari Kelurahan Kelapa Dua Wetan
            </p>
          </div>

          <div className="hidden md:block">
            <Button variant="outline" asChild>
              <Link href="/berita">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Grid Berita */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {NEWS_DATA.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            >
              <Card className="group flex h-full flex-col overflow-hidden border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute left-4 top-4">
                    <Badge
                      variant="secondary"
                      className="bg-background/80 text-foreground backdrop-blur-sm"
                    >
                      {news.category}
                    </Badge>
                  </div>
                </div>

                {/* Header */}
                <CardHeader className="p-5 pb-2">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    <span>{news.date}</span>
                  </div>

                  <h3
                    className="line-clamp-2 text-lg font-bold leading-tight text-card-foreground transition-colors group-hover:text-primary"
                    title={news.title}
                  >
                    <Link href={`/berita/${news.slug}`}>{news.title}</Link>
                  </h3>
                </CardHeader>

                {/* Content */}
                <CardContent className="flex-1 p-5 pt-0">
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {news.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="p-5 pt-0">
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm font-semibold text-primary"
                    asChild
                  >
                    <Link
                      href={`/berita/${news.slug}`}
                      className="flex items-center gap-1"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center md:hidden">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/berita">Lihat Semua</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
