import { DataTable } from '@/components/data-table';
import { readExcelFile } from '@/lib/excel';

export const dynamic = 'force-dynamic';

export default function TehnikaPage() {
  const data = readExcelFile('tehnika');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Список техники по участкам</h1>
      <DataTable 
        headers={data.headers} 
        rows={data.rows} 
        title="Полный список спецтехники"
      />
    </div>
  );
}
