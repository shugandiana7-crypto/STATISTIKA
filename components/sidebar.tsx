"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-72 min-h-[calc(100vh-90px)] bg-gradient-to-b from-[#111827] to-[#020617] p-6 border-r border-white/5">
      <h2 className="text-xs tracking-widest text-gray-500 mb-6">РАЗДЕЛЫ</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-4 rounded-2xl font-semibold transition-all ${
              pathname === item.href
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                : "bg-white/5 text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 hover:text-white hover:translate-x-1"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
