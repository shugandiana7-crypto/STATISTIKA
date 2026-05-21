"use client";

import { useState, useMemo } from "react";

interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
  title: string;
  searchable?: boolean;
}

export function DataTable({ headers, rows, title, searchable = true }: DataTableProps) {
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filteredRows = useMemo(() => {
    let result = rows;

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(row =>
        row.some(cell => String(cell).toLowerCase().includes(query))
      );
    }

    if (sortCol !== null) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortCol] ?? "";
        const bVal = b[sortCol] ?? "";

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        }

        return sortDir === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    return result;
  }, [rows, search, sortCol, sortDir]);

  const handleSort = (colIndex: number) => {
    if (sortCol === colIndex) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortCol(colIndex);
      setSortDir("asc");
    }
  };

  return (
    <div className="bg-[#0f172a]/90 rounded-3xl p-7 border border-white/5 shadow-xl">
      <h2 className="text-2xl font-bold mb-5">{title}</h2>

      {searchable && (
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-5 px-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
              {headers.map((header, i) => (
                <th
                  key={i}
                  onClick={() => handleSort(i)}
                  className="px-4 py-4 text-left text-sm font-semibold text-white cursor-pointer hover:bg-blue-500/50 transition-colors whitespace-nowrap"
                >
                  {header}
                  {sortCol === i && (
                    <span className="ml-2">{sortDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-white/5 hover:bg-blue-600/10 transition-colors"
              >
                {headers.map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-3 text-gray-200">
                    {row[colIdx] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRows.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Нет данных
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Показано: {filteredRows.length} из {rows.length}
      </div>
    </div>
  );
}
