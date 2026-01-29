"use client";

import dynamic from "next/dynamic";
import CorporateTrainingHero from "../components/CorporateTrainingHero";

// Lazy load components below the fold
const WhyChoose = dynamic(() => import("../components/WhyChoose"), { ssr: true });
const BiomedDifference = dynamic(() => import("../components/BiomedDifference"), { ssr: true });
const PracticalSkills = dynamic(() => import("../components/PracticalSkills"), { ssr: true });
const LearningJourneyCTA = dynamic(() => import("../components/LearningJourneyCTA"), { ssr: true });

export default function CorporateTrainingPage() {
  return (
    <main className="min-h-screen">
      <CorporateTrainingHero />
      <WhyChoose />
      <BiomedDifference />
      <PracticalSkills />
      <LearningJourneyCTA />
    </main>
  );
}
