"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import differenceImg from "./assets/b8ffe7c6b77060fc77c93bc84c096aa476262177.png";

const BiomedDifference = () => {
  return (
    <section className="relative w-full py-4 lg:py-8 px-4 md:px-8 bg-white font-poppins">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[1400px] mx-auto bg-[#f0f9ff] rounded-[2.5rem] p-4 md:p-8 lg:p-10 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Image with Overlay */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative order-1"
          >
            <div className="relative w-full aspect-16/10 lg:aspect-video rounded-4xl overflow-hidden shadow-xl">
              <Image
                src={differenceImg}
                alt="The e-BioMed Difference"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left order-2"
          >
            {/* Heading */}
            <h2 className="text-3xl md:text-[50px] font-playfair text-[#1a2b4b] font-bold leading-tight mb-6">
              The <span className="text-[#0088ff]">e-BioMed</span> Difference
            </h2>

            {/* Content */}
            <div className="space-y-4 text-gray-700 text-[15px] md:text-[16px] leading-relaxed max-w-xl font-poppins">
              <p>
                Experience a revolutionary approach to clinical research training through our 
                <span className="text-[#0088ff] font-semibold"> Live sessions</span> and 
                <span className="text-[#0088ff] font-semibold"> simulated practicums</span>. 
                We combine state-of-the-art local technology with hands-on instruction 
                to ensure you are learning by doing, seeing, and practicing in real-world scenarios.
              </p>
              <p>
                Our user-friendly training materials and flexible schedules are designed for both 
                individuals and groups, fostering professional networking in a stress-free environment. 
                Move beyond traditional methods with a modern coaching curriculum that emphasizes 
                teamwork and shared feedback for maximum skill retention.
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default BiomedDifference;
