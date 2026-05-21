import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DataTable } from "@/components/data-table";
import { readAllSheets } from "@/lib/excel";
import Link from "next/link";

export default function BalhashPage() {
  const data = readAllSheets("balhash");
  const mainSheet = data?.sheets.find(s => s.name === "ТО Июнь 2026 БАЛХАШ");

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-9">
          <h1 className="text-3xl font-bold text-white mb-6">ТО БАЛХАШ - ИЮНЬ 2026</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl">
              <h3 className="text-white font-bold text-lg">Потребность в фильтрах и смазочных</h3>
              <p className="text-green-200">{mainSheet?.data.rows.length || 0} записей</p>
            </div>
            <Link href="/balhash/artikuly" className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-lg">Артикулы по моделям</h3>
              <p className="text-blue-200">{data?.sheets.find(s => s.name === "Артикулы по моделям")?.data.rows.length || 0} записей</p>
            </Link>
          </div>

          {mainSheet && (
            <DataTable 
              headers={mainSheet.data.headers} 
              rows={mainSheet.data.rows} 
              title="ПОТРЕБНОСТЬ В ФИЛЬТРАХ И СМАЗОЧНЫХ МАТЕРИАЛАХ - БАЛХАШ" 
            />
          )}
        </main>
      </div>
    </div>
  );
}
