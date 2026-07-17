import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "سوق إصلاح البناء | Building Repair Market",
  description: "منصة سعودية لربط المشترين والموردين في مجالات البناء والصيانة والتجديد والتشطيبات.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
