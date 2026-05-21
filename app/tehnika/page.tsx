import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DataTable } from "@/components/data-table";
import { readAllSheets } from "@/lib/excel";
import Link from "next/link";

export default function TehnikaPage() {
  const data = readAllSheets("tehnika");

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-9">
          <h1 className="text-3xl font-bold text-white mb-6">СПИСОК ТЕХНИКИ ПО УЧАСТКАМ</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl">
              <h3 className="text-white font-bold text-lg">Весь список</h3>
              <p className="text-blue-200">{data?.sheets.find(s => s.name === "Весь список")?.data.rows.length || 0} единиц</p>
            </div>
            <Link href="/tehnika/nikolaevka" className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-lg">Николаевка</h3>
              <p className="text-green-200">{data?.sheets.find(s => s.name === "Николаевка")?.data.rows.length || 0} единиц</p>
            </Link>
            <Link href="/tehnika/balhash" className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-6 rounded-2xl hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-lg">Балхаш</h3>
              <p className="text-yellow-200">{data?.sheets.find(s => s.name === "Балхаш")?.data.rows.length || 0} единиц</p>
            </Link>
            <Link href="/tehnika/baza" className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl hover:scale-105 transition-transform">
              <h3 className="text-white font-bold text-lg">База</h3>
              <p className="text-purple-200">{data?.sheets.find(s => s.name === "База")?.data.rows.length || 0} единиц</p>
            </Link>
          </div>

          {data?.sheets.find(s => s.name === "Весь список") && (
            <DataTable 
              headers={data.sheets.find(s => s.name === "Весь список")!.data.headers} 
              rows={data.sheets.find(s => s.name === "Весь список")!.data.rows} 
              title="Весь список техники ТОО Базис СТ" 
            />
          )}
        </main>
      </div>
    </div>
  );
}
