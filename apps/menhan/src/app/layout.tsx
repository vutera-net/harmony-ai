import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@harmony/auth";
import { BrandHeader, BrandFooter } from "@harmony/ui";

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
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen antialiased selection:bg-harmony-gold/30 flex flex-col">
        <AuthProvider>
          <BrandHeader 
            appName="MenhAn Sanctuary" 
            appUrl="/" 
            navLinks={[
              { label: "Destiny Journal", href: "/journal" },
              { label: "AI Mentor", href: "/mentor" },
              { label: "Reports", href: "/reports" },
            ]}
            showAuth={true}
          />
          <main className="flex-grow">
            {children}
          </main>
          <BrandFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
