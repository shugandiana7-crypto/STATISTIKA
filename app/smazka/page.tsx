import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DataTable } from "@/components/data-table";
import { readExcelFile } from "@/lib/excel";

export default function SmazkaPage() {
  const balhash = readExcelFile("smazka_balhash");
  const nik = readExcelFile("smazka_nik");

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-9 space-y-8">
          {balhash ? (
            <DataTable 
              headers={balhash.headers} 
              rows={balhash.rows} 
              title="СМАЗОЧНЫЕ МАТЕРИАЛЫ - БАЛХАШ" 
            />
          ) : (
            <p className="text-gray-500">Ошибка загрузки данных Балхаш</p>
          )}
          
          {nik ? (
            <DataTable 
              headers={nik.headers} 
              rows={nik.rows} 
              title="СМАЗОЧНЫЕ МАТЕРИАЛЫ - НИКОЛАЕВКА" 
            />
          ) : (
            <p className="text-gray-500">Ошибка загрузки данных Николаевка</p>
          )}
        </main>
      </div>
    </div>
  );
}
