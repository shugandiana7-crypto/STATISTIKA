"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { useState, useEffect } from "react";

interface SheetData {
  name: string;
  data: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export default function KartyPage() {
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/karty")
      .then(res => res.json())
      .then(data => {
        setSheets(data.sheets || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const currentSheet = sheets.find(s => s.name === selectedSheet);

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-9">
          <h1 className="text-3xl font-bold text-white mb-6">КАРТЫ ТЕХНИЧЕСКОГО ОБСЛУЖИВАНИЯ</h1>
          <p className="text-gray-400 mb-6">26 моделей техники с детальными картами ТО</p>
          
          {loading ? (
            <p className="text-gray-500">Загрузка...</p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-8">
                {sheets.map((sheet) => (
                  <button
                    key={sheet.name}
                    onClick={() => setSelectedSheet(sheet.name)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedSheet === sheet.name
                        ? "bg-blue-600 text-white"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-semibold text-sm truncate">{sheet.name}</div>
                    <div className="text-xs opacity-70">{sheet.data.rows.length} строк</div>
                  </button>
                ))}
              </div>

              {currentSheet && (
                <div className="bg-white/5 rounded-2xl p-6 overflow-x-auto">
                  <h2 className="text-xl font-bold text-white mb-4">{currentSheet.name}</h2>
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        {currentSheet.data.headers.map((h, i) => (
                          <th key={i} className="text-left p-2 text-gray-400 border-b border-white/10">
                            {h || `Колонка ${i + 1}`}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentSheet.data.rows.map((row, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                          {row.map((cell, j) => (
                            <td key={j} className="p-2 text-gray-300">
                              {String(cell || "")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!selectedSheet && (
                <p className="text-gray-500">Выберите модель техники для просмотра карты ТО</p>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
