import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Ecosystem from '@/components/Ecosystem';
import SocialProof from '@/components/SocialProof';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Intro />
      <Ecosystem />
      <SocialProof />
      <Footer />
    </main>
  );
}
