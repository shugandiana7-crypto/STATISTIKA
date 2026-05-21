import { readExcelFile, readAllSheets, getAllSheets, FILE_MAP, FileKey } from '@/lib/excel';
import { NextResponse } from 'next/server';

export interface DashboardStats {
  totalMachines: number;
  juneTOBalhash: number;
  juneTONikolaevka: number;
  totalJuneTO: number;
  totalTOCards: number;
  grafikRows: number;
  smazkaRows: number;
  trudoemkostRows: number;
  chartData: {
    name: string;
    value: number;
  }[];
}

export async function GET() {
  try {
    const tehnikaData = readExcelFile('tehnika');
    const balhashData = readExcelFile('balhash');
    const nikolaevkaData = readExcelFile('nikolaevka');
    const grafikData = readExcelFile('grafik');
    const smazkaBalhashData = readExcelFile('smazka_balhash');
    const smazkaNikData = readExcelFile('smazka_nik');
    const trudoemkostData = readExcelFile('trudoemkost');
    const kartySheets = getAllSheets('karty');

    const stats: DashboardStats = {
      totalMachines: tehnikaData.totalRows,
      juneTOBalhash: balhashData.totalRows,
      juneTONikolaevka: nikolaevkaData.totalRows,
      totalJuneTO: balhashData.totalRows + nikolaevkaData.totalRows,
      totalTOCards: kartySheets.length,
      grafikRows: grafikData.totalRows,
      smazkaRows: smazkaBalhashData.totalRows + smazkaNikData.totalRows,
      trudoemkostRows: trudoemkostData.totalRows,
      chartData: [
        { name: 'График ТО', value: grafikData.totalRows },
        { name: 'Балхаш', value: balhashData.totalRows },
        { name: 'Николаевка', value: nikolaevkaData.totalRows },
        { name: 'Смазка', value: smazkaBalhashData.totalRows + smazkaNikData.totalRows },
        { name: 'Трудоемкость', value: trudoemkostData.totalRows },
      ],
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
