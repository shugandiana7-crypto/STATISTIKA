import { DataTable } from '@/components/data-table';
import { readExcelFile } from '@/lib/excel';

export const dynamic = 'force-dynamic';

export default function DolivkaPage() {
  const data = readExcelFile('dolivka');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Доливка на Июнь</h1>
      <DataTable 
        headers={data.headers} 
        rows={data.rows} 
        title="План доливки на июнь 2026"
      />
    </div>
  );
}
