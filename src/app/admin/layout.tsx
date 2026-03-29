import AdminNavbarTop from "@/components/Admin/AdminNavbarTop";
import AdminNavbarSub from "@/components/Admin/AdminNavbarSub";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-[#f0f2f8] min-h-screen font-sans">
      <AdminNavbarTop />
      <AdminNavbarSub />

      <div className="p-6 lg:p-12 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <Link href="/admin/dashboard" className="hover:text-indigo-600">Mavia</Link>
            <ChevronRight size={12} />
            <span className="text-gray-500">Dashboard</span>
          </div>
        </div>

        <main className="animate-fade-in">
          {children}
        </main>
      </div>
      Page 1
    </div>
  );
}
