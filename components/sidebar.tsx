"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Главная", icon: "🏠" },
  { 
    label: "Годовой график ТО", 
    icon: "📅",
    children: [
      { href: "/grafik", label: "Все листы" },
      { href: "/grafik/nikka", label: "Николаевка" },
      { href: "/grafik/balhash", label: "Балхаш" },
      { href: "/grafik/mch", label: "Актуальные м.ч." },
    ]
  },
  { 
    label: "Список техники", 
    icon: "🚜",
    children: [
      { href: "/tehnika", label: "Весь список" },
      { href: "/tehnika/nikolaevka", label: "Николаевка" },
      { href: "/tehnika/balhash", label: "Балхаш" },
      { href: "/tehnika/baza", label: "База" },
    ]
  },
  { 
    label: "ТО Балхаш", 
    icon: "🔧",
    children: [
      { href: "/balhash", label: "ТО Июнь 2026" },
      { href: "/balhash/artikuly", label: "Артикулы по моделям" },
    ]
  },
  { 
    label: "ТО Николаевка", 
    icon: "🛠",
    children: [
      { href: "/nikolaevka", label: "ТО Июнь 2026" },
      { href: "/nikolaevka/artikuly", label: "Артикулы по моделям" },
    ]
  },
  { 
    label: "Смазочные материалы", 
    icon: "🛢",
    children: [
      { href: "/smazka/balhash", label: "Балхаш" },
      { href: "/smazka/nikolaevka", label: "Николаевка" },
    ]
  },
  { href: "/dolivka", label: "Доливка на Июнь", icon: "💧" },
  { 
    label: "Трудоёмкость ТО", 
    icon: "⏱",
    children: [
      { href: "/trudoemkost", label: "Сводная таблица" },
      { href: "/trudoemkost/kategorii", label: "Сводка по категориям" },
      { href: "/trudoemkost/normy", label: "Нормы трудоёмкости" },
    ]
  },
  { href: "/karty", label: "Карты ТО (26 моделей)", icon: "📋" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => 
      prev.includes(label) 
        ? prev.filter(l => l !== label) 
        : [...prev, label]
    );
  };

  return (
    <aside className="hidden lg:block w-72 min-h-[calc(100vh-90px)] bg-gradient-to-b from-[#111827] to-[#020617] p-6 border-r border-white/5 overflow-y-auto">
      <h2 className="text-xs tracking-widest text-gray-500 mb-6">РАЗДЕЛЫ</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          if ('children' in item && item.children) {
            const isOpen = openMenus.includes(item.label);
            const isActive = item.children.some(child => pathname === child.href);
            
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/80 to-blue-500/80 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </span>
                  <span className="text-xs">{isOpen ? "▼" : "▶"}</span>
                </button>
                {isOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          pathname === child.href
                            ? "bg-blue-600 text-white"
                            : "text-gray-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`px-4 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                pathname === item.href
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
