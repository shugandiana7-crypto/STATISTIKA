import { DataTable } from '@/components/data-table';
import { readExcelFile } from '@/lib/excel';

export const dynamic = 'force-dynamic';

export default function NikolaevkaPage() {
  const data = readExcelFile('nikolaevka');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ТО Николаевка - Июнь 2026</h1>
      <DataTable 
        headers={data.headers} 
        rows={data.rows} 
        title="Техническое обслуживание участка Николаевка"
      />
    </div>
  );
}
