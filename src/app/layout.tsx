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
    "Dreamy tech webstudio der hjælper dig fra hobby, idé og drøm til brand, webshop og launch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-dream-bg">{children}</body>
    </html>
  );
}
