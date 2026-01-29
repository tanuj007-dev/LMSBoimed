"use client";
import React from 'react';
import { motion } from 'framer-motion';

const ClinicalResearchCTA = () => {
  const stats = [
    { label: "Clinical Trials", value: "100+" },
    { label: "Students Trained", value: "5K+" },
    { label: "Years Experience", value: "25+" },
    { label: "Global Partners", value: "100+" },
  ];

  return (
    <section className="relative w-full py-6 md:py-10 px-4 md:px-8 bg-white font-poppins">
      <div className="max-w-7xl mx-auto relative">
        {/* Main Blue Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full bg-[#008dff] rounded-4xl md:rounded-[3rem] p-6 md:p-10 overflow-hidden flex flex-col items-center text-center shadow-xl"
        >
          {/* Background Decorative Elements */}
          {/* Dot Pattern - Top Left */}
          <div className="absolute top-6 left-6 w-16 h-16 opacity-40">
            <div className="grid grid-cols-6 gap-1.5">
              {[...Array(36)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-white rounded-full"
                ></div>
              ))}
            </div>
          </div>

          {/* Dashed Loop SVG */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M -100 300 C 100 250 200 50 400 200 C 600 350 800 100 1100 200"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="10 10"
              />
              <path
                d="M 500 -50 C 650 150 450 350 750 450"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="10 10"
              />
            </svg>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col items-center w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-3 tracking-tight leading-[1.1]"
            >
              Let Us Manage Your Clinical Trials
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white text-sm md:text-base lg:text-lg mb-6 max-w-2xl font-light leading-relaxed"
            >
              Join BioMed Canada's site management organization to deliver quality jobs.
            </motion.p>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#c21d24] text-white px-10 py-3 rounded-full font-medium text-sm md:text-base hover:bg-[#a3181d] transition-all duration-300 shadow-lg mb-8 md:mb-10 transform hover:-translate-y-0.5"
            >
              Explore Our Services
            </motion.button>

            {/* Divider Line */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full h-px bg-white/20 mb-6 md:mb-8 origin-center" 
            />

            {/* Statistics Bottom Section */}
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-white/20">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex flex-col items-center justify-center px-4"
                >
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-white/80 font-normal uppercase tracking-wider">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClinicalResearchCTA;
