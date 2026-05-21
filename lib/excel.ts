import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');

export const FILES = {
  grafik: 'ГОДОВОЙ_ГРАФИК_ТО_2026.xlsx',
  tehnika: 'список_техники_по_участкам.xlsx',
  balhash: 'ТО_БАЛХАШ_НА ИЮНЬ.xlsx',
  nikolaevka: 'ТО_Николаевка_Июнь_2026.xlsx',
  smazka_balhash: 'смазка балхаш.xlsx',
  smazka_nik: 'смазка ник-ка.xlsx',
  dolivka: 'ДОЛИВКА на Июнь.xlsx',
  trudoemkost: 'Трудоёмкость_ТО_спецтехника.xlsx',
  karty: 'Карты ТО.xlsx',
};

export type FileKey = keyof typeof FILES;

export interface ExcelData {
  headers: string[];
  rows: (string | number)[][];
  sheetName: string;
}

export interface MultiSheetData {
  sheets: { name: string; data: ExcelData }[];
}

export function readExcelFile(fileKey: FileKey): ExcelData | null {
  try {
    const filePath = path.join(DATA_DIR, FILES[fileKey]);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return null;
    }

    const buffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const rawData = XLSX.utils.sheet_to_json<(string | number)[]>(worksheet, {
      header: 1,
      defval: '',
    });

    if (rawData.length === 0) {
      return { headers: [], rows: [], sheetName };
    }

    const headers = rawData[0].map(h => String(h || ''));
    const rows = rawData.slice(1);

    return { headers, rows, sheetName };
  } catch (error) {
    console.error(`Error reading file ${fileKey}:`, error);
    return null;
  }
}

export function readAllSheets(fileKey: FileKey): MultiSheetData | null {
  try {
    const filePath = path.join(DATA_DIR, FILES[fileKey]);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const buffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    
    const sheets = workbook.SheetNames.map(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json<(string | number)[]>(worksheet, {
        header: 1,
        defval: '',
      });

      const headers = rawData.length > 0 ? rawData[0].map(h => String(h || '')) : [];
      const rows = rawData.slice(1);

      return {
        name: sheetName,
        data: { headers, rows, sheetName }
      };
    });

    return { sheets };
  } catch (error) {
    console.error(`Error reading all sheets from ${fileKey}:`, error);
    return null;
  }
}

export function getAllStats() {
  const stats: Record<string, number> = {};
  
  for (const key of Object.keys(FILES) as FileKey[]) {
    const data = readExcelFile(key);
    stats[key] = data?.rows.length || 0;
  }

  return stats;
}
