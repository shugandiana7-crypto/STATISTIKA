import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export interface ExcelData {
  headers: string[];
  rows: (string | number)[][];
  totalRows: number;
}

export const FILE_MAP = {
  grafik: 'ГОДОВОЙ_ГРАФИК_ТО_2026.xlsx',
  tehnika: 'список_техники_по_участкам.xlsx',
  balhash: 'ТО_БАЛХАШ_НА ИЮНЬ.xlsx',
  nikolaevka: 'ТО_Николаевка_Июнь_2026.xlsx',
  smazka_balhash: 'смазка балхаш.xlsx',
  smazka_nik: 'смазка ник-ка.xlsx',
  dolivka: 'ДОЛИВКА на Июнь.xlsx',
  trudoemkost: 'Трудоёмкость_ТО_спецтехника.xlsx',
  karty: 'Карты ТО.xlsx',
} as const;

export type FileKey = keyof typeof FILE_MAP;

export function readExcelFile(fileKey: FileKey, sheetIndex = 0): ExcelData {
  const fileName = FILE_MAP[fileKey];
  const filePath = path.join(process.cwd(), 'data', fileName);
  
  if (!fs.existsSync(filePath)) {
    return { headers: [], rows: [], totalRows: 0 };
  }

  const fileBuffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  
  const sheetName = workbook.SheetNames[sheetIndex];
  const worksheet = workbook.Sheets[sheetName];
  
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
    header: 1, 
    defval: '' 
  }) as (string | number)[][];
  
  if (jsonData.length === 0) {
    return { headers: [], rows: [], totalRows: 0 };
  }

  const headers = jsonData[0].map(h => String(h || 'Колонка'));
  const rows = jsonData.slice(1).filter(row => row.some(cell => cell !== ''));

  return {
    headers,
    rows,
    totalRows: rows.length,
  };
}

export function getAllSheets(fileKey: FileKey): string[] {
  const fileName = FILE_MAP[fileKey];
  const filePath = path.join(process.cwd(), 'data', fileName);
  
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileBuffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  
  return workbook.SheetNames;
}

export function readAllSheets(fileKey: FileKey): Record<string, ExcelData> {
  const fileName = FILE_MAP[fileKey];
  const filePath = path.join(process.cwd(), 'data', fileName);
  
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const fileBuffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  
  const result: Record<string, ExcelData> = {};
  
  workbook.SheetNames.forEach((sheetName, index) => {
    const data = readExcelFile(fileKey, index);
    result[sheetName] = data;
  });
  
  return result;
}
