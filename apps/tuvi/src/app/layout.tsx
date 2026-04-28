import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@harmony/auth";
import { BrandFooter } from "@harmony/ui";
import { TuViHeader } from "@/components/TuViHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TuVi - Lịch Vạn Niên & Dự Báo Vận Mệnh Miễn Phí",
  description:
    "Tra cứu Tử Vi, lịch vạn niên, ngày tốt xấu, lá số cơ bản miễn phí. Khám phá vận mệnh của bạn chỉ trong vài giây.",
  keywords:
    "tử vi, lịch vạn niên, dự báo vận mệnh, phong thủy, lá số, ngày tốt xấu",
  openGraph: {
    title: "TuVi - Dự Báo Vận Mệnh Miễn Phí",
    description:
      "Công cụ tra cứu Tử Vi và lịch vạn niên hoàn toàn miễn phí. Khám phá vận mệnh của bạn ngay hôm nay.",
    url: "https://tuvi.vutera.net",
    siteName: "TuVi",
    images: [
      {
        url: "https://tuvi.vutera.net/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <TuViHeader />
          <main className="flex-grow">
            {children}
          </main>
          <BrandFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
