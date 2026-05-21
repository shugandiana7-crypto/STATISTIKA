"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/grafik", label: "Годовой график ТО" },
  { href: "/tehnika", label: "Список техники" },
  { href: "/balhash", label: "ТО Балхаш" },
  { href: "/nikolaevka", label: "ТО Николаевка" },
  { href: "/smazka", label: "Смазочные материалы" },
  { href: "/dolivka", label: "Доливка" },
  { href: "/trudoemkost", label: "Трудоёмкость" },
  { href: "/karty", label: "Карты ТО" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="h-[90px] flex items-center justify-between px-6 lg:px-9 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <h1 className="text-xl lg:text-2xl font-extrabold tracking-wide">
        СИСТЕМА ТО СПЕЦТЕХНИКИ 2026
      </h1>

      <button
        className="lg:hidden p-2 text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="fixed inset-0 top-[90px] bg-[#0b1120]/98 z-40 lg:hidden p-6">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-4 rounded-2xl font-semibold bg-white/5 text-gray-300 hover:bg-blue-600 hover:text-white transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
