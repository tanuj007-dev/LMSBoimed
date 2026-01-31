"use client";

import React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

// Importing local assets
import about1 from "./assets/about1.png";
import about2 from "./assets/about2.png";
import about3 from "./assets/about3.png";

export default function AboutUs() {
    return (
        <section className="relative w-full py-16 lg:py-24 bg-white overflow-hidden">
            {/* Decorative Dashed Lines (SVG Background) */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Right Light Gradient Glow */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px]"></div>

                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d="M0,50 Q25,25 50,50 T100,50"
                        fill="none"
                        stroke="#0088ff"
                        strokeWidth="0.3"
                        strokeDasharray="4 4"
                        className="opacity-25"
                    />
                    <circle cx="85" cy="15" r="25" fill="none" stroke="#0088ff" strokeWidth="0.3" strokeDasharray="4 4" className="opacity-20" />
                    <circle cx="5" cy="85" r="20" fill="none" stroke="#0088ff" strokeWidth="0.3" strokeDasharray="4 4" className="opacity-20" />
                </svg>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Column: Image Collage */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full aspect-square max-w-[550px] mx-auto flex flex-col justify-center px-8 sm:px-6 mb-12 lg:mb-0"
                    >
                        {/* Main Big Image (Building) */}
                        <div className="relative w-full h-[85%] z-10">
                            <Image
                                src={about2}
                                alt="BioMed Canada Building"
                                fill
                                className="object-cover rounded-[2.5rem] shadow-xl"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Top Left Floating Image */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="absolute top-0 -left-4 w-[42%] h-[38%] z-20 hover:scale-105 transition-transform duration-300"
                        >
                            <div className="relative w-full h-full pb-2.5 pr-2.5 bg-white rounded-br-[1.8rem] rounded-tl-[1.2rem]  ">
                                <div className="relative w-full h-full overflow-hidden rounded-[1.2rem]">
                                    <Image
                                        src={about1}
                                        alt="Clinical Discussion"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom Right Floating Image */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="absolute bottom-0 -right-4 w-[42%] h-[38%] z-20 hover:scale-105 transition-transform duration-300"
                        >
                            <div className="relative w-full h-full pt-2.5 pl-2.5 bg-white rounded-tl-[1.8rem] rounded-br-[1.2rem]  ">
                                <div className="relative w-full h-full overflow-hidden rounded-[1.2rem]">
                                    <Image
                                        src={about3}
                                        alt="E-Learning Presentation"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col space-y-5 text-left"
                    >

                        {/* Tagline */}
                        <div className="flex items-center gap-2 text-[#0088ff] font-bold tracking-wider text-xs uppercase">
                            <Plus className="w-5 h-5 stroke-[4px]" />
                            <span>About Us</span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-[60px] font-playfair text-[#1a2b4b] leading-tight font-medium">
                            About Us
                        </h2>

                        {/* Description Paragraphs */}
                        <div className="space-y-4 text-gray-600 text-[16px] leading-relaxed">
                            <p>
                                BioMed Canada is a leading medical and clinical research
                                organization conducting multi-therapeutic clinical trials across
                                Canada in collaboration with global partners. With outpatient facilities
                                and a strong business model, we provide high-quality, cost-efficient
                                clinical services for patients and pharmaceutical companies.
                            </p>
                            <p>
                                Our transition into online learning through e-BioMed Corporate
                                Training extends our mission: empowering healthcare providers,
                                clinical researchers, IMGs, INGs, and other professionals to advance
                                their skills and contribute meaningfully to global health.
                            </p>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
