"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import corporateTrainingHero from "./assets/e6fca35457fb1647d6098da7c61ed87f5f738e4f.png";

export default function CorporateTrainingHero() {
  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[60vh] lg:min-h-[75vh] flex items-end overflow-hidden font-poppins">
      <div className="absolute inset-0">
        <Image
          src={corporateTrainingHero}
          alt="Corporate training scene"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="max-w-5xl text-left text-white">
          {/* Logo Brand Name */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-baseline text-3xl sm:text-4xl font-playfair md:text-5xl lg:text-[60px] font-bold mb-1 tracking-tight"
          >
            <span className="text-white">e-</span>
            <span className="text-[#c21d24]">Bio</span>
            <span className="text-[#008dff]">Med</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] font-playfair font-bold leading-[1.1] text-white mb-4 tracking-tight"
          >
            Corporate Professional Training
          </motion.h1>

          {/* Subheading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 max-w-3xl tracking-wide uppercase sm:normal-case"
          >
            Expert in Medical & Research Professional Skills Development
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-xs sm:text-sm md:text-base lg:text-[16px] text-white/80 leading-relaxed font-light max-w-2xl"
          >
            Select your clinical and research path, master critical thinking and
            industry-relevant skills, and gain real-world experience and learn from
            field experts through workshops, externships, internships, and industry
            networking that can lead you to a dream job.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
