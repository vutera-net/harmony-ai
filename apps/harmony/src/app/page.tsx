import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Ecosystem from '@/components/Ecosystem';
import SocialProof from '@/components/SocialProof';
import { BenefitsGrid } from '@/components/BenefitsGrid';
import { PathSection } from '@/components/PathSection';
import { FinalCTA } from '@/components/FinalCTA';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#FDFCF9]">
      <Hero />
      <Intro />
      <Ecosystem />
      <BenefitsGrid />
      <SocialProof />
      <PathSection />
      <FinalCTA />
    </main>
  );
}
