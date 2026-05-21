import { DataTable } from '@/components/data-table';
import { readAllSheets, getAllSheets } from '@/lib/excel';

export const dynamic = 'force-dynamic';

export default function KartyPage() {
  const sheets = getAllSheets('karty');
  const allData = readAllSheets('karty');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Карты технического обслуживания</h1>
      
      <div className="bg-card rounded-2xl p-6 border border-border shadow-xl">
        <h2 className="text-xl font-bold mb-4">Доступные карты ТО ({sheets.length} шт.)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {sheets.map((sheet, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50"
            >
              <p className="font-medium text-sm">{sheet}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {allData[sheet]?.totalRows || 0} записей
              </p>
            </div>
          ))}
        </div>
      </div>

      {sheets.map((sheetName, index) => {
        const sheetData = allData[sheetName];
        if (!sheetData || sheetData.totalRows === 0) return null;
        
        return (
          <DataTable 
            key={index}
            headers={sheetData.headers} 
            rows={sheetData.rows} 
            title={`Карта ТО: ${sheetName}`}
          />
        );
      })}
    </div>
  );
}
