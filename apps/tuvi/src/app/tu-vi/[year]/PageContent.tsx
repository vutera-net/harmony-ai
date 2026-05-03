"use client";

import { AuthProvider } from "@harmony/auth/context";
import { TuViHeader } from "@/components/TuViHeader";
import { TuViYearContent } from "./TuViYearContent";

export function PageContent({ year }: { year: string }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <TuViHeader />
        <TuViYearContent year={year} />
      </div>
    </AuthProvider>
  );
}
