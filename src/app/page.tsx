import { Header } from "@/components/layout/Header";
import { HeroScrollExperience } from "@/components/sections/HeroScrollExperience";
import { ProblemScrollExperience } from "@/components/sections/ProblemScrollExperience";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative isolate bg-black">
        <HeroScrollExperience />
        <ProblemScrollExperience />
      </main>
    </>
  );
}
