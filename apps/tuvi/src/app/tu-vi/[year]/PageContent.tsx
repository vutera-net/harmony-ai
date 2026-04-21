"use client";

import { AuthProvider } from "@harmony/auth/context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TuViYearContent } from "./TuViYearContent";

export function PageContent({ year }: { year: string }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <TuViYearContent year={year} />
        <Footer />
      </div>
    </AuthProvider>
  );
}
