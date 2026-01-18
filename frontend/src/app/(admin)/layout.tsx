import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminNavbar from "@/components/layout/AdminNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | LAMAS KDW",
  description: "Panel administrasi untuk mengelola laporan dan pengguna",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session || session.user.tipe_user !== "ADMIN") {
    redirect("/beranda");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 font-jakarta">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden relative ml-[280px]">
        {/* Top Navbar */}
        <AdminNavbar user={session.user} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-neutral-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
