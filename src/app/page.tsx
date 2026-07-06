import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { CasesSection } from "@/components/sections/CasesSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { ProblemSection } from "@/components/sections/ProblemSection";

export default function Home() {
  return (
    <>
      <main>
        <div className="relative">
          <div className="hero-shell dream-hero-surface">
            <Header />
            <HeroSection />
          </div>
          <ProblemSection />
        </div>
        <CasesSection />
        <FinalCTASection />
        <PackagesSection />
      </main>
      <Footer />
      <StickyCtaBar />
    </>
  );
}
