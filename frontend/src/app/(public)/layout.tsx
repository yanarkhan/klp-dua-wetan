import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
