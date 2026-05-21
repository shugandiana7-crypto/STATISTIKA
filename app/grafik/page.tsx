import { DataTable } from '@/components/data-table';
import { readExcelFile } from '@/lib/excel';

export const dynamic = 'force-dynamic';

export default function GrafikPage() {
  const data = readExcelFile('grafik');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Годовой график ТО 2026</h1>
      <DataTable 
        headers={data.headers} 
        rows={data.rows} 
        title="График технического обслуживания на 2026 год"
      />
    </div>
  );
}
