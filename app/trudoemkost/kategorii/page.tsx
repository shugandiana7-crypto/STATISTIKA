import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DataTable } from "@/components/data-table";
import { readAllSheets } from "@/lib/excel";

export default function TrudoemkostKategoriiPage() {
  const data = readAllSheets("trudoemkost");
  const sheet = data?.sheets.find(s => s.name === "Сводка по категориям");

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-9">
          {sheet ? (
            <DataTable 
              headers={sheet.data.headers} 
              rows={sheet.data.rows} 
              title="СВОДКА ТРУДОЁМКОСТИ ПО КАТЕГОРИЯМ ТЕХНИКИ" 
            />
          ) : (
            <p className="text-gray-500">Ошибка загрузки данных</p>
          )}
        </main>
      </div>
    </div>
  );
}
