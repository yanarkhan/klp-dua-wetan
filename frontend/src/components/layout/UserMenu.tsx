"use client";

import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const MOCK_USER = {
  name: "Budi Santoso",
  rt: "01",
  rw: "05",
  initials: "BS",
};

export function UserMenu() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 px-2 md:px-3"
        >
          <Avatar className="h-8 w-8 md:h-9 md:w-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              {MOCK_USER.initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start text-left md:flex">
            <span className="text-sm font-medium text-foreground">
              {MOCK_USER.name}
            </span>
            <span className="text-xs text-muted-foreground">
              RT {MOCK_USER.rt} / RW {MOCK_USER.rw}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{MOCK_USER.name}</p>
            <p className="text-xs text-muted-foreground">
              RT {MOCK_USER.rt} / RW {MOCK_USER.rw}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profil</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
