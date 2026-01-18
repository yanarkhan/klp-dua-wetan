"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearToken } from "@/lib/auth/token";

interface AdminNavbarProps {
  user: {
    name: string;
    email: string;
  };
}

export default function AdminNavbar({ user }: AdminNavbarProps) {
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  const handleLogout = () => {
    clearToken();
    window.location.href = "/login";
  };

  return (
    <header className="flex h-[80px] items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-neutral-200/60 sticky top-0 z-30">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md gap-3 px-4 py-2.5 bg-neutral-50 rounded-xl border border-neutral-100 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
        <Search className="h-5 w-5 text-neutral-400" />
        <input 
            type="text" 
            placeholder="Cari menu atau data..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-neutral-400 text-neutral-700"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-neutral-50 text-neutral-400 hover:text-neutral-600 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-neutral-200"></div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-xl p-1 pr-3 hover:bg-neutral-50 transition-all outline-none group">
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm group-hover:border-blue-100 transition-colors">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-neutral-800 leading-tight group-hover:text-blue-700 transition-colors">
                    {user.name}
                </p>
                <p className="text-[11px] font-medium text-neutral-400">Administrator</p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border-neutral-100 shadow-lg shadow-neutral-200/50">
            <DropdownMenuLabel className="font-bold text-neutral-700">Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-neutral-100" />
            
            <DropdownMenuItem className="rounded-lg cursor-pointer text-neutral-600 focus:text-blue-600 focus:bg-blue-50">
              <span>Pengaturan Profil</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleLogout} className="rounded-lg cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 mt-1">
              <span>Keluar Aplikasi</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}