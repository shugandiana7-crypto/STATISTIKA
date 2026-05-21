import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MetricCard } from "@/components/metric-card";
import { StatsChart } from "@/components/stats-chart";
import { getAllStats, readAllSheets } from "@/lib/excel";
import Link from "next/link";

export default function HomePage() {
  const stats = getAllStats();
  const tehnikaData = readAllSheets("tehnika");
  const grafikData = readAllSheets("grafik");

  const totalTehnika = tehnikaData?.sheets.find(s => s.name === "Весь список")?.data.rows.length || 0;
  const tehnikaNik = tehnikaData?.sheets.find(s => s.name === "Николаевка")?.data.rows.length || 0;
  const tehnikaBal = tehnikaData?.sheets.find(s => s.name === "Балхаш")?.data.rows.length || 0;
  const tehnikaBaza = tehnikaData?.sheets.find(s => s.name === "База")?.data.rows.length || 0;

  const chartData = [
    { name: "Николаевка", value: tehnikaNik },
    { name: "Балхаш", value: tehnikaBal },
    { name: "База", value: tehnikaBaza },
  ];

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-9">
          <h1 className="text-3xl font-bold text-white mb-2">Панель управления ТО</h1>
          <p className="text-gray-400 mb-8">ТОО &quot;Базис СТ&quot; - система учета технического обслуживания</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <MetricCard title="Всего техники" value={totalTehnika} />
            <MetricCard title="Участок Николаевка" value={tehnikaNik} />
            <MetricCard title="Участок Балхаш" value={tehnikaBal} />
            <MetricCard title="Карт ТО" value={26} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <StatsChart data={chartData} />
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Быстрый доступ</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/grafik" className="bg-blue-600/20 hover:bg-blue-600/40 p-4 rounded-xl transition-colors">
                  <div className="text-blue-400 font-semibold">Годовой график ТО</div>
                  <div className="text-gray-400 text-sm">{grafikData?.sheets.length || 0} листов</div>
                </Link>
                <Link href="/tehnika" className="bg-green-600/20 hover:bg-green-600/40 p-4 rounded-xl transition-colors">
                  <div className="text-green-400 font-semibold">Список техники</div>
                  <div className="text-gray-400 text-sm">{totalTehnika} единиц</div>
                </Link>
                <Link href="/balhash" className="bg-yellow-600/20 hover:bg-yellow-600/40 p-4 rounded-xl transition-colors">
                  <div className="text-yellow-400 font-semibold">ТО Балхаш</div>
                  <div className="text-gray-400 text-sm">Июнь 2026</div>
                </Link>
                <Link href="/nikolaevka" className="bg-purple-600/20 hover:bg-purple-600/40 p-4 rounded-xl transition-colors">
                  <div className="text-purple-400 font-semibold">ТО Николаевка</div>
                  <div className="text-gray-400 text-sm">Июнь 2026</div>
                </Link>
                <Link href="/karty" className="bg-red-600/20 hover:bg-red-600/40 p-4 rounded-xl transition-colors">
                  <div className="text-red-400 font-semibold">Карты ТО</div>
                  <div className="text-gray-400 text-sm">26 моделей</div>
                </Link>
                <Link href="/trudoemkost" className="bg-cyan-600/20 hover:bg-cyan-600/40 p-4 rounded-xl transition-colors">
                  <div className="text-cyan-400 font-semibold">Трудоёмкость</div>
                  <div className="text-gray-400 text-sm">Нормативы ТО</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Участки</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-600/30 to-blue-800/30 p-6 rounded-xl border border-blue-500/20">
                <h4 className="text-white font-bold text-lg mb-2">Николаевка</h4>
                <p className="text-gray-300">{tehnikaNik} единиц техники</p>
                <p className="text-gray-400 text-sm mt-2">Основной участок добычи</p>
              </div>
              <div className="bg-gradient-to-br from-green-600/30 to-green-800/30 p-6 rounded-xl border border-green-500/20">
                <h4 className="text-white font-bold text-lg mb-2">Балхаш</h4>
                <p className="text-gray-300">{tehnikaBal} единиц техники</p>
                <p className="text-gray-400 text-sm mt-2">Вспомогательный участок</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600/30 to-purple-800/30 p-6 rounded-xl border border-purple-500/20">
                <h4 className="text-white font-bold text-lg mb-2">База</h4>
                <p className="text-gray-300">{tehnikaBaza} единиц техники</p>
                <p className="text-gray-400 text-sm mt-2">Ремонтная база</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
