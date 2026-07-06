import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HelpSection } from "@/components/sections/HelpSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { OutcomesSection } from "@/components/sections/OutcomesSection";

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
        <HelpSection />
        <PackagesSection />
        <OutcomesSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyCtaBar />
    </>
  );
}
