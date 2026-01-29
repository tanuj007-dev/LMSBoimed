"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import visionImg from "./assets/208079b2963daeeb01d36eac9fd953c6e229ceaf.jpg";

export default function OurVision() {
    return (
        <section className="relative w-full py-12 lg:py-20 bg-white overflow-hidden">
            {/* Background Decor - Glow on bottom right */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-50/60 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* Left Column: Image with Overlay */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative order-1 lg:order-1"
                    >
                        <div className="relative w-full aspect-16/10 lg:aspect-[16/9] rounded-4xl overflow-hidden shadow-2xl">
                            <Image
                                src={visionImg}
                                alt="Medical Professional using Tablet"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Transparent Overlay Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:max-w-sm bg-[#020043B2] backdrop-blur-lg p-6 rounded-2xl text-white border border-white/10 shadow-2xl"
                            >
                                <h3 className="text-xl font-semibold mb-2">
                                    Our Vision is simple
                                </h3>
                                <p className="text-white/90 text-[14px] font-light leading-relaxed">
                                    Leading healthcare transformation through empowered, continuously growing professionals.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column: Text Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start text-left order-2 lg:order-2"
                    >
                        {/* Heading */}
                        <h2 className="text-4xl md:text-[60px] font-playfair text-[#1a2b4b] font-bold leading-tight mb-8">
                            Our Vision
                        </h2>

                        {/* Content */}
                        <div className="space-y-6 text-gray-600 text-[16px] leading-relaxed max-w-xl">
                            <p>
                                To be a leader in transforming healthcare delivery by fostering
                                an environment where healthcare professionals are empowered
                                through continuous learning and growth.
                            </p>
                            <p>
                                Our vision is to create a dynamic and integrated platform that
                                enhances the skills, confidence, and expertise of participants.
                                we aim to equip every individual with the tools they need to
                                excel in their careers
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
