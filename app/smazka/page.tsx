import { DataTable } from '@/components/data-table';
import { readExcelFile } from '@/lib/excel';

export const dynamic = 'force-dynamic';

export default function SmazkaPage() {
  const dataBalhash = readExcelFile('smazka_balhash');
  const dataNik = readExcelFile('smazka_nik');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Смазочные материалы</h1>
      
      <DataTable 
        headers={dataBalhash.headers} 
        rows={dataBalhash.rows} 
        title="Смазка - Балхаш"
      />
      
      <DataTable 
        headers={dataNik.headers} 
        rows={dataNik.rows} 
        title="Смазка - Николаевка"
      />
    </div>
  );
}
