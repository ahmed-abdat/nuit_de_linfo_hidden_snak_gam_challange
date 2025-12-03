import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RetroSnake - Game Boy Edition | Nuit de l'Info 2025",
  description: "Jouez au Snake classique directement dans un Game Boy virtuel. Créé pour le Défi #483 AUTOCUT de la Nuit de l'Info 2025.",
  keywords: ["snake", "game boy", "retro gaming", "nuit de l'info", "2025", "AUTOCUT"],
  authors: [{ name: "Team Mauritania" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
