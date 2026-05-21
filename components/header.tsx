'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/grafik', label: 'Годовой график ТО' },
  { href: '/tehnika', label: 'Список техники' },
  { href: '/balhash', label: 'ТО Балхаш' },
  { href: '/nikolaevka', label: 'ТО Николаевка' },
  { href: '/smazka', label: 'Смазочные материалы' },
  { href: '/dolivka', label: 'Доливка' },
  { href: '/trudoemkost', label: 'Трудоёмкость' },
  { href: '/karty', label: 'Карты ТО' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="h-[72px] flex items-center justify-between px-4 md:px-8 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-50">
      <h1 className="text-lg md:text-2xl font-extrabold tracking-wide text-white">
        СИСТЕМА ТО 2026
      </h1>
      
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-slate-900/98 border-b border-slate-800 shadow-xl">
          <nav className="p-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary to-blue-500 text-white' 
                      : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
