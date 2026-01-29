"use client";

import React from "react";
import { ChevronUp, Plus } from "lucide-react";
import { motion } from "framer-motion";

const CommitmentTile = ({ title, variant = "light", index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`relative h-full min-h-[130px] md:min-h-[150px] rounded-2xl px-6 py-5 md:py-6 text-center shadow-[0_10px_25px_rgba(15,23,42,0.08)] ${
            variant === "blue"
                ? "bg-[#0b84f3] text-white"
                : "bg-white text-[#1a2b4b] border border-[#e8f1ff]"
        }`}
    >
        {variant === "light" && (
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-40 bg-[radial-gradient(circle_at_1px_1px,rgba(0,136,255,0.18)_1px,transparent_0)] bg-size-[12px_12px]" />
        )}
        <div className="relative z-10 text-sm md:text-base font-semibold leading-snug line-clamp-2 min-h-10 md:min-h-12">
            {title}
        </div>
        <div
            className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-md flex items-center justify-center shadow-md ${
                variant === "blue" ? "bg-white text-[#0b84f3]" : "bg-[#0b84f3] text-white"
            }`}
        >
            <ChevronUp className="w-4 h-4" />
        </div>
    </motion.div>
);

export default function OurCommitments() {
    return (
        <section className="w-full bg-[#eef7ff] py-10 md:py-14 font-poppins overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-8 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 mb-3">
                            <div className="w-5 h-5 bg-[#0b84f3] rounded flex items-center justify-center text-white">
                                <Plus className="w-3 h-3" />
                            </div>
                            <span className="text-[#0b84f3] font-bold tracking-[0.2em] text-[10px] uppercase">
                                Commitment
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#1a2b4b] mb-3">
                            Our <span className="text-[#0b84f3]">Commitments</span>
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto lg:mx-0 text-sm md:text-base">
                            We are dedicated to maintaining the highest standards in medical research and clinical trials
                            across all our operations, ensuring safety, quality, and excellence in healthcare.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <CommitmentTile index={0} title="Respect the ICH/GCP Guidelines" variant="light" />
                        <CommitmentTile index={1} title="Enrich Healthy Communities" variant="blue" />
                        <CommitmentTile index={2} title="Provide Quality Services" variant="blue" />
                        <CommitmentTile index={3} title="Guarantee Patient Safety & Confidentiality" variant="light" />
                    </div>
                </div>
            </div>
        </section>
    );
}
