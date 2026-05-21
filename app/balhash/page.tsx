import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DataTable } from "@/components/data-table";
import { readExcelFile } from "@/lib/excel";

export default function BalhashPage() {
  const data = readExcelFile("balhash");

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-9">
          {data ? (
            <DataTable 
              headers={data.headers} 
              rows={data.rows} 
              title="ТО БАЛХАШ - ИЮНЬ 2026" 
            />
          ) : (
            <p className="text-gray-500">Ошибка загрузки данных</p>
          )}
        </main>
      </div>
    </div>
  );
}
