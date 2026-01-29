"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import methodologyImg from "./assets/3bbc11007bdf796feebe4778a4190d41ae438976.png";

export default function Methodology() {
    return (
        <section className="relative w-full py-4 lg:py-8 px-4 md:px-8 bg-white">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-[1400px] mx-auto bg-[#f0f9ff] rounded-[2.5rem] p-4 md:p-8 lg:p-10 overflow-hidden"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col items-start text-left order-2 lg:order-1">
                        {/* Heading */}
                        <h2 className="text-3xl md:text-[50px] font-playfair text-[#1a2b4b] font-bold leading-tight mb-4">
                            Our Methodology
                        </h2>

                        {/* Content */}
                        <div className="space-y-3 text-gray-700 text-[15px] md:text-[16px] leading-relaxed max-w-xl font-poppins">
                            <p>
                                Integrating "New Coaching-Practice Methodology" based on AI and
                                Simulation for enhanced learning outcomes.
                            </p>
                            <p>
                                Taking e-BioMed comprehensive workshops & seminars, you will
                                possess powerful practical knowledge to succeed & increase your
                                satisfaction of being part of any tremendous medical & research
                                team whose help is important.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Image with Overlay */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="relative w-full aspect-16/10 lg:aspect-video rounded-[2rem] overflow-hidden shadow-xl">
                            <Image
                                src={methodologyImg}
                                alt="Medical Researcher at Microscope"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Transparent Overlay Card */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:max-w-[300px] bg-[#020043B2] backdrop-blur-md p-4 md:p-5 rounded-2xl text-white border border-white/10"
                            >
                                <h3 className="text-base md:text-lg font-semibold mb-1">
                                    Our Methodology is simple
                                </h3>
                                <p className="text-white/90 text-[12px] md:text-[13px] font-light leading-relaxed">
                                    Transforming professionals with AI-powered simulation training
                                    for real-world skill mastery, empowering them for team excellence.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
