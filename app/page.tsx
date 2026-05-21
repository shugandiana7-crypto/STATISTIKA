import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MetricCard } from "@/components/metric-card";
import { StatsChart } from "@/components/stats-chart";
import { getAllStats, readExcelFile } from "@/lib/excel";

export default function HomePage() {
  const stats = getAllStats();
  const tehnikaData = readExcelFile("tehnika");

  const chartData = [
    { name: "График ТО", value: stats.grafik },
    { name: "Балхаш", value: stats.balhash },
    { name: "Николаевка", value: stats.nikolaevka },
    { name: "Смазка", value: stats.smazka_balhash + stats.smazka_nik },
    { name: "Трудоёмкость", value: stats.trudoemkost },
  ];

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-9">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <MetricCard title="Всего техники" value={tehnikaData?.rows.length || 0} />
            <MetricCard title="ТО в июне" value={stats.balhash + stats.nikolaevka} />
            <MetricCard title="Участков" value={3} />
            <MetricCard title="Карт ТО" value={26} />
          </div>
          <StatsChart data={chartData} />
        </main>
      </div>
    </div>
  );
}
