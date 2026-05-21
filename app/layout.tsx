import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Система ТО Спецтехники 2026",
  description: "Система управления техническим обслуживанием спецтехники",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} bg-background`}>
      <body className="min-h-screen">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <main className="p-6 lg:p-8 min-h-[calc(100vh-72px)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
