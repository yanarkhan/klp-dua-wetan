"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";

export interface NavItem {
  label: string;
  link: string;
}

const navigationItems: NavItem[] = [
  { label: "Beranda", link: "/" },
  { label: "Lapor", link: "/lapor" },
  { label: "Cek Status", link: "/cek-status" },
  { label: "Berita", link: "/berita" },
];

const navItems = navigationItems.map((item) => ({
  name: item.label,
  link: item.link,
}));

const governmentLogos = [
  { src: "/images/logos/Mitra-1.png", alt: "Institusi Pendukung 1" },
  { src: "/images/logos/Mitra-2.png", alt: "Institusi Pendukung 2" },
  { src: "/images/logos/Gunadarma.png", alt: "Universitas Gunadarma" },
  { src: "/images/logos/Aptikom.png", alt: "APTIKOM" },
];

export default function NavbarLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop */}
      <NavBody>
        <NavbarLogo logos={governmentLogos} />
        <NavItems items={navItems} />
        <NavbarButton href="/login" variant="primary" className="tracking-wide">
          Masuk
        </NavbarButton>
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo logos={governmentLogos} />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full rounded-md px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              {item.name}
            </Link>
          ))}

          <div className="mt-4 w-full border-t pt-4">
            <NavbarButton href="/login" variant="primary" className="w-full">
              Masuk
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
