import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DataTable } from "@/components/data-table";
import { readAllSheets } from "@/lib/excel";
import Link from "next/link";

export default function GrafikPage() {
  const data = readAllSheets("grafik");

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-9">
          <h1 className="text-3xl font-bold text-white mb-6">ГОДОВОЙ ГРАФИК ТО 2026</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Link href="/grafik/nikka" className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-lg">Николаевка</h3>
              <p className="text-blue-200">{data?.sheets.find(s => s.name === "Ник-ка")?.data.rows.length || 0} записей</p>
            </Link>
            <Link href="/grafik/balhash" className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-lg">Балхаш</h3>
              <p className="text-green-200">{data?.sheets.find(s => s.name === "Балхаш")?.data.rows.length || 0} записей</p>
            </Link>
            <Link href="/grafik/mch" className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-lg">Актуальные м.ч.</h3>
              <p className="text-purple-200">{data?.sheets.find(s => s.name === "Актуальные м.ч.")?.data.rows.length || 0} записей</p>
            </Link>
            <div className="bg-gradient-to-br from-gray-600 to-gray-800 p-6 rounded-2xl">
              <h3 className="text-white font-bold text-lg">База</h3>
              <p className="text-gray-200">{data?.sheets.find(s => s.name === "База")?.data.rows.length || 0} записей</p>
            </div>
          </div>

          {data?.sheets.map((sheet) => (
            <div key={sheet.name} className="mb-8">
              <DataTable 
                headers={sheet.data.headers} 
                rows={sheet.data.rows} 
                title={`Лист: ${sheet.name}`} 
              />
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
