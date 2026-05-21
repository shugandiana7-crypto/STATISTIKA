import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Система ТО Спецтехники 2026",
  description: "Управление техническим обслуживанием спецтехники",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="bg-[#0b1120]">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
