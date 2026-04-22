import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BrandHeader, BrandFooter } from "@harmony/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harmony AI | Digital Sanctuary",
  description: "Combining ancient Vietnamese metaphysics with modern AI to guide your destiny.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BrandHeader 
          appName="Harmony AI" 
          appUrl="/" 
          navLinks={[
            { label: "TuVi App", href: "https://tuvi.vutera.net" },
            { label: "MenhAn Sanctuary", href: "https://menhan.vutera.net" },
            { label: "Our Story", href: "#intro" },
          ]}
        />
        <main className="flex-grow">
          {children}
        </main>
        <BrandFooter />
      </body>
    </html>
  );
}
