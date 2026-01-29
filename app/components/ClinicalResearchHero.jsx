"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clinicalResearchHero from "./assets/3bbc11007bdf796feebe4778a4190d41ae438976 (1).png";

export default function ClinicalResearchHero() {
  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[60vh] lg:min-h-[75vh] flex items-end overflow-hidden font-poppins">
      <div className="absolute inset-0">
        <Image
          src={clinicalResearchHero}
          alt="Clinical research lab scene"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60 md:bg-black/70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">
        <div className="max-w-4xl text-left text-white">
          {/* Logo Brand Name - Professional Size */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-baseline text-5xl font-playfair sm:text-6xl md:text-7xl lg:text-[60px] font-bold mb-2 tracking-tight drop-shadow-lg"
          >
            <span className="text-[#c21d24]">Bio</span>
            <span className="text-[#008dff]">Med</span>
          </motion.div>

          {/* Main Title - Serif Font matching image */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] font-playfair font-bold leading-[1.1] text-white mb-8 tracking-tight drop-shadow-md"
          >
            Clinical Research
          </motion.h1>

          {/* Description - Same text as image, optimized sizing */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-[16px] text-white/95 leading-relaxed font-light max-w-3xl drop-shadow-sm"
          >
            Trusted by industry professionals worldwide, BioMed Canada combines
            clinical expertise with advanced e-learning to prepare you for success in
            the medical and pharmaceutical industry.
            <br />
            Trusted by industry professionals worldwide, BioMed Canada combines
            clinical expertise with advanced e-learning to prepare you for success in
            the medical and pharmaceutical industry.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
