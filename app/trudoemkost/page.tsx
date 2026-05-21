import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DataTable } from "@/components/data-table";
import { readAllSheets } from "@/lib/excel";
import Link from "next/link";

export default function TrudoemkostPage() {
  const data = readAllSheets("trudoemkost");
  const mainSheet = data?.sheets.find(s => s.name === "Трудоёмкость ТО");

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-9">
          <h1 className="text-3xl font-bold text-white mb-6">ТРУДОЁМКОСТЬ ТО СПЕЦТЕХНИКИ</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl">
              <h3 className="text-white font-bold text-lg">Сводная таблица</h3>
              <p className="text-blue-200">{mainSheet?.data.rows.length || 0} записей</p>
            </div>
            <Link href="/trudoemkost/kategorii" className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-lg">Сводка по категориям</h3>
              <p className="text-green-200">{data?.sheets.find(s => s.name === "Сводка по категориям")?.data.rows.length || 0} записей</p>
            </Link>
            <Link href="/trudoemkost/normy" className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-lg">Нормы трудоёмкости</h3>
              <p className="text-purple-200">{data?.sheets.find(s => s.name === "Нормы трудоёмкости")?.data.rows.length || 0} записей</p>
            </Link>
          </div>

          {mainSheet && (
            <DataTable 
              headers={mainSheet.data.headers} 
              rows={mainSheet.data.rows} 
              title="СВОДНАЯ ТАБЛИЦА ТРУДОЁМКОСТИ ТО" 
            />
          )}
        </main>
      </div>
    </div>
  );
}
