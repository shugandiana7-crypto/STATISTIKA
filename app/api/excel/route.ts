import { NextRequest, NextResponse } from 'next/server';
import { readExcelFile, readAllSheets, getAllSheets, FILE_MAP, FileKey } from '@/lib/excel';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const file = searchParams.get('file') as FileKey | null;
  const sheet = searchParams.get('sheet');
  const allSheets = searchParams.get('allSheets') === 'true';
  
  if (!file || !(file in FILE_MAP)) {
    return NextResponse.json({ 
      error: 'Invalid file parameter',
      availableFiles: Object.keys(FILE_MAP)
    }, { status: 400 });
  }

  try {
    if (allSheets) {
      const data = readAllSheets(file);
      return NextResponse.json({ data, sheets: getAllSheets(file) });
    }
    
    const sheetIndex = sheet ? parseInt(sheet, 10) : 0;
    const data = readExcelFile(file, sheetIndex);
    const sheets = getAllSheets(file);
    
    return NextResponse.json({ data, sheets });
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
