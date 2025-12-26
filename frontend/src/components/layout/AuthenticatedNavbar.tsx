"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/layout/UserMenu";
import { MobileNavMenu } from "@/components/ui/resizable-navbar";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { name: "Beranda", href: "/beranda" },
  { name: "Laporan", href: "/laporan" },
  { name: "Bantuan", href: "/bantuan" },
];

export function AuthenticatedNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Link href="/beranda" className="flex items-center gap-3">
              <Image
                src="/images/logos/Mitra-2.png"
                alt="Logo Kelurahan"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
              <span className="hidden text-sm font-semibold text-foreground md:inline-block">
                LAMAS KDW
              </span>
            </Link>
          </div>

          {/* Center */}
          <div className="hidden items-center gap-1 md:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <UserMenu />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* --- MOBILE MENU --- */}
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          className="top-16 left-0 right-0 absolute border-b border-border bg-background shadow-xl px-4 pb-4 pt-2 md:hidden"
        >
          {/* Container flex column bakal list menu */}
          <div className="flex flex-col gap-1 w-full">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block w-full rounded-md px-4 py-3 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </MobileNavMenu>
      </nav>
    </header>
  );
}
