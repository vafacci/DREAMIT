import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { FAQSection } from "@/components/sections/FAQSection";
import { HelpSection } from "@/components/sections/HelpSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { ProblemSection } from "@/components/sections/ProblemSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="relative">
          <HeroSection />
          <ProblemSection />
        </div>
        <HelpSection />
        <PackagesSection />
        <FAQSection />
      </main>
      <Footer />
      <StickyCtaBar />
    </>
  );
}
