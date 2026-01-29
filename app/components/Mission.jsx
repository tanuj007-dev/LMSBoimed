"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import missionImg from "./assets/82bfc7143601dc7636262c1f67ce6f7371ba82cb.jpg";

export default function Mission() {
    return (
        <section className="relative w-full py-12 lg:py-20 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start text-left order-2 lg:order-1"
                    >
                        {/* Tag/Badge */}
                        <span className="inline-block px-6 py-2 rounded-full border border-blue-300 text-[#0088ff] text-xs font-medium tracking-wide bg-white mb-6">
                            About Us
                        </span>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-[60px] font-playfair text-[#1a2b4b] font-bold leading-tight mb-6">
                            Our Mission
                        </h2>

                        {/* Content */}
                        <div className="space-y-4 text-gray-600 text-[16px] leading-relaxed max-w-xl">
                            <p>
                                To enhance the participants' skills and self-confidence to deliver
                                high-quality healthcare services to our communities.
                            </p>
                            <p>
                                Incorporating a novel and harmonized platform with a specific focus
                                on individual professional development by offering tailored levels of
                                simulated training. It's the most successful way of having a
                                meaningful job and attaining career success
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Image with Overlay */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="relative w-full aspect-16/10 lg:aspect-[16/9] rounded-4xl overflow-hidden shadow-2xl">
                            <Image
                                src={missionImg}
                                alt="Medical Professionals Discussion"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Overlay Card - Transparent Custom Color */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-[#020043B2] backdrop-blur-lg p-4 md:p-6 rounded-2xl text-white border border-white/10 shadow-2xl"
                            >
                                <h3 className="text-lg md:text-xl font-semibold mb-1">
                                    Our mission is simple
                                </h3>
                                <p className="text-white/90 text-xs md:text-sm font-light leading-relaxed">
                                    Building confident professionals through training that elevates community care.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
