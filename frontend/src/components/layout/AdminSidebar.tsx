"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Users, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Laporan Warga",
    href: "/admin/laporan",
    icon: MessageSquare,
    badge: 15, // nnti bisa diganti dengan props/state real
  },
  {
    label: "Pengguna",
    href: "/admin/pengguna",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/admin" ? pathname === path : pathname.startsWith(path);

  return (
    <aside className="fixed top-0 left-0 flex flex-col w-[280px] shrink-0 h-screen overflow-hidden px-[30px] pt-[40px] gap-[40px] border-r border-neutral-200 bg-white z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Logo Section */}
      <Link href="/admin" className="mx-auto mb-2">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12">
            <Image
              src="/images/logos/Mitra-2.png"
              alt="Logo LAMAS"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-neutral-900 leading-none">
              LAMAS
            </span>
            <span className="text-xs font-medium text-neutral-500 mt-1">
              Admin Panel
            </span>
          </div>
        </div>
      </Link>

      {/* Navigation Section */}
      <div className="flex w-full h-full overflow-hidden relative">
        <div className="flex h-full w-full overflow-y-auto pb-[50px] hide-scrollbar">
          <div className="flex flex-col w-full justify-between gap-16">
            <nav className="flex flex-col gap-2">
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;

                  return (
                    <li key={item.href} className="w-full">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center w-full rounded-[14px] py-[12px] px-4 gap-3 transition-all duration-300",
                          active
                            ? "bg-blue-50 text-blue-600"
                            : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                        )}
                      >
                        <Icon
                          className={cn(
                            "flex size-5",
                            active ? "text-blue-600" : "text-neutral-400"
                          )}
                        />
                        <span className="font-semibold text-sm">
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span
                            className={cn(
                              "flex size-5 rounded-full items-center justify-center font-bold text-[10px] ml-auto",
                              active
                                ? "bg-blue-100 text-blue-600"
                                : "bg-neutral-100 text-neutral-500"
                            )}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Logout Section */}
            <div className="mt-auto">
              <hr className="border-neutral-100 mb-6" />
              <button
                onClick={() => (window.location.href = "/login")}
                className="flex items-center w-full rounded-[14px] py-[12px] px-4 gap-3 hover:bg-red-50 group transition-all duration-300 text-left"
              >
                <LogOut className="flex size-5 text-neutral-400 group-hover:text-red-500" />
                <span className="font-semibold text-sm text-neutral-500 group-hover:text-red-600">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
