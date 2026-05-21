import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DataTable } from "@/components/data-table";
import { readAllSheets } from "@/lib/excel";

export default function KartyPage() {
  const data = readAllSheets("karty");

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-9 space-y-8">
          <h1 className="text-3xl font-bold mb-6">КАРТЫ ТЕХНИЧЕСКОГО ОБСЛУЖИВАНИЯ</h1>
          
          {data?.sheets.map((sheet, index) => (
            <DataTable
              key={index}
              headers={sheet.data.headers}
              rows={sheet.data.rows}
              title={sheet.name}
            />
          ))}

          {!data && (
            <p className="text-gray-500">Ошибка загрузки данных</p>
          )}
        </main>
      </div>
    </div>
  );
}
