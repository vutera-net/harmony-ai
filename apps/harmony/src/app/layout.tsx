import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BrandHeader, BrandFooter } from "@harmony/ui";
import { AuthProvider } from "@harmony/auth/context";
import { HarmonyHeader } from "@/components/HarmonyHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harmony AI | Thánh Đường Số",
  description: "Kết hợp siêu hình học cổ truyền Việt Nam với AI hiện đại để dẫn lối vận mệnh của bạn.",
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
          <HarmonyHeader />
          <main className="flex-grow">
            {children}
          </main>
          <BrandFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
