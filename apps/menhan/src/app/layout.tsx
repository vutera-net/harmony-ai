import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@harmony/auth";

export const metadata: Metadata = {
  title: "MenhAn Sanctuary | AI Mentor",
  description: "A digital sanctuary for self-understanding and spiritual balance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen antialiased selection:bg-harmony-gold/30">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
