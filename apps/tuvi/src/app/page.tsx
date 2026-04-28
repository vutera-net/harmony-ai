"use client";

import { AuthProvider } from "@harmony/auth/context";
import { TuViHeader } from "@/components/TuViHeader";
import { Hero } from "@/components/Hero";
import { QuickToolsGrid } from "@/components/QuickToolsGrid";
import { Footer } from "@/components/Footer";

function TuViHome() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TuViHeader />
      <main className="flex-1">
        <Hero />
        <QuickToolsGrid />
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <TuViHome />
    </AuthProvider>
  );
}
