"use client";

import React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

// Import images
import img1 from "./assets/79c8ba58-f665-4db1-86fe-35d6d1201d86.png";
import img2 from "./assets/5e30198b-7726-462a-a27c-306c5087877e.png";
import img3 from "./assets/e94f1fa3-bb47-4b31-94de-5261d48881a9.png";
import img4 from "./assets/eda8cbbc-3bc9-4ee8-9265-e5af3b0bc6a4.png";
import img5 from "./assets/712841c8-1d63-4d63-83c1-9a08e8633755.png";
import img6 from "./assets/c2bd3dec-c7f1-4092-a659-18de67670a1c.png";

const TherapeuticAreas = () => {
    const images = [img1, img2, img3, img4, img5, img6];

    return (
        <section className="py-16 md:py-24 bg-white font-poppins relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                {/* Badge */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 mb-4"
                >
                    <div className="w-5 h-5 bg-[#008dff] rounded flex items-center justify-center text-white shadow-[0_4px_10px_rgba(0,141,255,0.3)]">
                        <Plus className="w-3 h-3" />
                    </div>
                    <span className="text-[#008dff] font-bold tracking-[0.2em] text-[10px] uppercase">Therapy</span>
                </motion.div>

                {/* Title */}
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-[60px] font-playfair font-bold text-[#1a2b4b] mb-6 tracking-tight leading-tight"
                >
                    <span className="text-[#008dff]">Therapeutic</span> Areas
                </motion.h2>

                {/* Subtitle */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-600 text-center text-sm sm:text-base mb-16 max-w-3xl mx-auto"
                >
                    Allergy, Cardiology, Dermatology, Endocrinology, Gastroentrology, Immunology,
                    Neurology, Musculoskeletal, Pediatric, Psychiatric, Pulmonary, Rheumatology,
                    Sleep Medicine, and more
                </motion.p>

                {/* Images Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-4 items-end">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="relative aspect-1/2 w-full max-w-[500px] mx-auto group cursor-pointer"
                        >
                            <div className="relative w-full h-full transition-all duration-700 ease-out group-hover:-translate-y-4">
                                <Image
                                    src={img}
                                    alt={`Therapeutic Area ${index + 1}`}
                                    fill
                                    className="object-cover drop-shadow-sm group-hover:drop-shadow-xl transition-all duration-700"
                                    sizes="(max-width: 768px) 50vw, 16vw"
                                />
                            </div>
                            {/* Reflection/Shadow effect */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-black/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-[#f0f9ff] to-transparent opacity-30 pointer-events-none -z-10" />
        </section>
    );
};

export default TherapeuticAreas;
