import { DataTable } from '@/components/data-table';
import { readExcelFile } from '@/lib/excel';

export const dynamic = 'force-dynamic';

export default function TrudoemkostPage() {
  const data = readExcelFile('trudoemkost');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Трудоёмкость ТО</h1>
      <DataTable 
        headers={data.headers} 
        rows={data.rows} 
        title="Трудоёмкость технического обслуживания спецтехники"
      />
    </div>
  );
}
