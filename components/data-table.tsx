'use client';

import { useState, useMemo } from 'react';

interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
  searchable?: boolean;
  title?: string;
}

export function DataTable({ headers, rows, searchable = true, title }: DataTableProps) {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const searchLower = search.toLowerCase();
    return rows.filter(row =>
      row.some(cell => String(cell).toLowerCase().includes(searchLower))
    );
  }, [rows, search]);

  const sortedRows = useMemo(() => {
    if (sortColumn === null) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      
      const aNum = typeof aVal === 'number' ? aVal : parseFloat(String(aVal));
      const bNum = typeof bVal === 'number' ? bVal : parseFloat(String(bVal));
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }
      
      const comparison = String(aVal).localeCompare(String(bVal), 'ru');
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredRows, sortColumn, sortDirection]);

  const handleSort = (index: number) => {
    if (sortColumn === index) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(index);
      setSortDirection('asc');
    }
  };

  if (headers.length === 0 || rows.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <p className="text-muted-foreground">Нет данных для отображения</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-xl">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}
      
      <div className="text-sm text-muted-foreground mb-3">
        Показано: {sortedRows.length} из {rows.length} записей
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              {headers.map((header, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(index)}
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-primary/80 transition-colors whitespace-nowrap"
                >
                  <span className="flex items-center gap-2">
                    {header}
                    {sortColumn === index && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-border hover:bg-accent/50 transition-colors"
              >
                {headers.map((_, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 text-sm">
                    {row[cellIndex] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
