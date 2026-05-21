import { DataTable } from '@/components/data-table';
import { readExcelFile } from '@/lib/excel';

export const dynamic = 'force-dynamic';

export default function BalhashPage() {
  const data = readExcelFile('balhash');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ТО Балхаш - Июнь 2026</h1>
      <DataTable 
        headers={data.headers} 
        rows={data.rows} 
        title="Техническое обслуживание участка Балхаш"
      />
    </div>
  );
}
