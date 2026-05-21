import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DataTable } from "@/components/data-table";
import { readAllSheets } from "@/lib/excel";

export default function NikolaevkaArtikulyPage() {
  const data = readAllSheets("nikolaevka");
  const sheet = data?.sheets.find(s => s.name === "Артикулы по моделям");

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
              title="АРТИКУЛЫ ФИЛЬТРОВ ПО МОДЕЛЯМ - НИКОЛАЕВКА" 
            />
          ) : (
            <p className="text-gray-500">Ошибка загрузки данных</p>
          )}
        </main>
      </div>
    </div>
  );
}
