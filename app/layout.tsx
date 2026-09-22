import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { weekConfig } from "@/config/week.config";

// ← Para cambiar la fuente, solo cambiá el import de arriba y este nombre de const
const font = Bricolage_Grotesque({
  variable: "--font-app", // ← no toques esto
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RecreoArgento",
  description: weekConfig.challenge.title,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${font.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f8f8f5]">{children}</body>
    </html>
  );
}
