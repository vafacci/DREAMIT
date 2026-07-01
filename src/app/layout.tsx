import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/vintage-paper.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DREAMit — Fra hobby til webshop",
  description:
    "Vi hjælper kreative mennesker med at gå fra hobby og idé til brand, webshop og launch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
