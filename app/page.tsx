import { MetricCard } from '@/components/metric-card';
import { StatsChart } from '@/components/stats-chart';
import { readExcelFile, getAllSheets } from '@/lib/excel';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const tehnikaData = readExcelFile('tehnika');
  const balhashData = readExcelFile('balhash');
  const nikolaevkaData = readExcelFile('nikolaevka');
  const grafikData = readExcelFile('grafik');
  const smazkaBalhashData = readExcelFile('smazka_balhash');
  const smazkaNikData = readExcelFile('smazka_nik');
  const trudoemkostData = readExcelFile('trudoemkost');
  const kartySheets = getAllSheets('karty');

  const chartData = [
    { name: 'График ТО', value: grafikData.totalRows },
    { name: 'Балхаш', value: balhashData.totalRows },
    { name: 'Николаевка', value: nikolaevkaData.totalRows },
    { name: 'Смазка', value: smazkaBalhashData.totalRows + smazkaNikData.totalRows },
    { name: 'Трудоемкость', value: trudoemkostData.totalRows },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard 
          title="Всего техники" 
          value={tehnikaData.totalRows} 
        />
        <MetricCard 
          title="ТО в июне" 
          value={balhashData.totalRows + nikolaevkaData.totalRows} 
        />
        <MetricCard 
          title="Участков" 
          value={3} 
        />
        <MetricCard 
          title="Карт ТО" 
          value={kartySheets.length} 
        />
      </div>

      <StatsChart data={chartData} />

      <div className="bg-card rounded-2xl p-6 border border-border shadow-xl">
        <h2 className="text-xl font-bold mb-4">Все Excel файлы</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-3 text-left text-sm font-semibold">Файл</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Статус</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Записей</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border hover:bg-accent/50">
                <td className="px-4 py-3">ГОДОВОЙ_ГРАФИК_ТО_2026.xlsx</td>
                <td className="px-4 py-3 text-green-400">Подключен</td>
                <td className="px-4 py-3">{grafikData.totalRows}</td>
              </tr>
              <tr className="border-b border-border hover:bg-accent/50">
                <td className="px-4 py-3">список_техники_по_участкам.xlsx</td>
                <td className="px-4 py-3 text-green-400">Подключен</td>
                <td className="px-4 py-3">{tehnikaData.totalRows}</td>
              </tr>
              <tr className="border-b border-border hover:bg-accent/50">
                <td className="px-4 py-3">ТО_БАЛХАШ_НА ИЮНЬ.xlsx</td>
                <td className="px-4 py-3 text-green-400">Подключен</td>
                <td className="px-4 py-3">{balhashData.totalRows}</td>
              </tr>
              <tr className="border-b border-border hover:bg-accent/50">
                <td className="px-4 py-3">ТО_Николаевка_Июнь_2026.xlsx</td>
                <td className="px-4 py-3 text-green-400">Подключен</td>
                <td className="px-4 py-3">{nikolaevkaData.totalRows}</td>
              </tr>
              <tr className="border-b border-border hover:bg-accent/50">
                <td className="px-4 py-3">смазка балхаш.xlsx</td>
                <td className="px-4 py-3 text-green-400">Подключен</td>
                <td className="px-4 py-3">{smazkaBalhashData.totalRows}</td>
              </tr>
              <tr className="border-b border-border hover:bg-accent/50">
                <td className="px-4 py-3">смазка ник-ка.xlsx</td>
                <td className="px-4 py-3 text-green-400">Подключен</td>
                <td className="px-4 py-3">{smazkaNikData.totalRows}</td>
              </tr>
              <tr className="border-b border-border hover:bg-accent/50">
                <td className="px-4 py-3">Трудоёмкость_ТО_спецтехника.xlsx</td>
                <td className="px-4 py-3 text-green-400">Подключен</td>
                <td className="px-4 py-3">{trudoemkostData.totalRows}</td>
              </tr>
              <tr className="border-b border-border hover:bg-accent/50">
                <td className="px-4 py-3">Карты ТО.xlsx</td>
                <td className="px-4 py-3 text-green-400">Подключен</td>
                <td className="px-4 py-3">{kartySheets.length} листов</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl">
          <h3 className="text-lg font-bold mb-2">Участок</h3>
          <p className="text-3xl font-extrabold">Балхаш</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white shadow-xl">
          <h3 className="text-lg font-bold mb-2">Участок</h3>
          <p className="text-3xl font-extrabold">Николаевка</p>
        </div>
        <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl p-6 text-white shadow-xl">
          <h3 className="text-lg font-bold mb-2">Участок</h3>
          <p className="text-3xl font-extrabold">База</p>
        </div>
      </div>
    </div>
  );
}
