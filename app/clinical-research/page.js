"use client";

import dynamic from "next/dynamic";
import ClinicalResearchHero from "../components/ClinicalResearchHero";

// Lazy load components that are below the fold
const ClinicalResearchCommitment = dynamic(() => import("../components/ClinicalResearchCommitment"), { ssr: true });
const TherapeuticAreas = dynamic(() => import("../components/TherapeuticAreas"), { ssr: true });
const ClinicalResearchGallery = dynamic(() => import("../components/ClinicalResearchGallery"), { ssr: true });
const ClinicalResearchCTA = dynamic(() => import("../components/ClinicalResearchCTA"), { ssr: true });

export default function ClinicalResearchPage() {
  return (
    <main>
      <ClinicalResearchHero />
      <ClinicalResearchCommitment />
      <TherapeuticAreas />
      <ClinicalResearchGallery />
      <ClinicalResearchCTA />
    </main>
  );
}
