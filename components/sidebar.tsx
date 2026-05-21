'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Главная', icon: '📊' },
  { href: '/grafik', label: 'Годовой график ТО', icon: '📅' },
  { href: '/tehnika', label: 'Список техники', icon: '🚜' },
  { href: '/balhash', label: 'ТО Балхаш', icon: '🔧' },
  { href: '/nikolaevka', label: 'ТО Николаевка', icon: '⚙️' },
  { href: '/smazka', label: 'Смазочные материалы', icon: '🛢️' },
  { href: '/dolivka', label: 'Доливка', icon: '💧' },
  { href: '/trudoemkost', label: 'Трудоёмкость', icon: '⏱️' },
  { href: '/karty', label: 'Карты ТО', icon: '📋' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-900 to-slate-950 p-6 border-r border-slate-800/50">
      <h2 className="text-xs font-semibold tracking-widest text-slate-500 mb-6">РАЗДЕЛЫ</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg shadow-primary/25' 
                  : 'text-slate-300 hover:bg-slate-800/60 hover:translate-x-1'
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
