"use client";

import dynamic from "next/dynamic";
import Hero from "./components/Hero";

// Lazy load components that are below the fold
const AboutUs = dynamic(() => import("./components/AboutUs"), { ssr: true });
const Mission = dynamic(() => import("./components/Mission"), { ssr: true });
const OurVision = dynamic(() => import("./components/OurVision"), { ssr: true });
const Methodology = dynamic(() => import("./components/Methodology"), { ssr: true });
const Testimonials = dynamic(() => import("./components/Testimonials"), { ssr: true });
const StatsCounter = dynamic(() => import("./components/StatsCounter"), { ssr: true });
const OurServices = dynamic(() => import("./components/OurServices"), { ssr: true });
const OurCommitments = dynamic(() => import("./components/OurCommitments"), { ssr: true });
const FeaturedCourses = dynamic(() => import("./components/FeaturedCourses"), { ssr: true });
const LearningJourney = dynamic(() => import("./components/LearningJourney"), { ssr: true });

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Mission />
      <OurVision />
      <Methodology />
      <Testimonials />
      <StatsCounter />
      <OurServices />
      <OurCommitments />
      <FeaturedCourses />
      <LearningJourney />
    </main>
  );
}
