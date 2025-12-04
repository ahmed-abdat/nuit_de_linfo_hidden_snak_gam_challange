import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hidden-snak-gam-chall.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RetroCollect - Vintage Gaming Store",
    template: "%s | RetroCollect",
  },
  description: "Découvrez notre collection de consoles rétro et jeux vintage. Un secret se cache peut-être dans cette boutique nostalgique...",
  keywords: ["retro gaming", "vintage consoles", "game boy", "nintendo", "collection", "nuit de l'info", "2025"],
  authors: [{ name: "Team Mauritania" }],
  creator: "Team Mauritania",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "RetroCollect",
    title: "RetroCollect - Vintage Gaming Store",
    description: "Découvrez notre collection de consoles rétro et jeux vintage. Un secret se cache peut-être dans cette boutique nostalgique...",
  },
  twitter: {
    card: "summary_large_image",
    title: "RetroCollect - Vintage Gaming Store",
    description: "Découvrez notre collection de consoles rétro et jeux vintage.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: 'bg-slate-900 border-slate-700 text-white',
          }}
        />
      </body>
    </html>
  );
}
