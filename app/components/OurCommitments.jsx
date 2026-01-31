"use client";

import React from "react";
import { ChevronUp, Plus, ShieldCheck, Users, Award, Lock } from "lucide-react";
import { motion } from "framer-motion";

const CommitmentTile = ({ title, icon: Icon, variant = "light", index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`relative h-full min-h-[160px] md:min-h-[180px] rounded-3xl px-6 py-8 text-center shadow-[0_10px_25px_rgba(15,23,42,0.08)] flex flex-col items-center justify-center gap-4 transition-transform hover:-translate-y-1 ${
            variant === "blue"
                ? "bg-[#0b84f3] text-white"
                : "bg-white text-[#1a2b4b] border border-[#e8f1ff]"
        }`}
    >
        {variant === "light" && (
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-40 bg-[radial-gradient(circle_at_1px_1px,rgba(0,136,255,0.18)_1px,transparent_0)] bg-size-[12px_12px]" />
        )}
        
        {/* Row 1: Icon */}
        <div className={`p-3 rounded-2xl ${
            variant === "blue" ? "bg-white/20" : "bg-blue-50"
        }`}>
            <Icon className={`w-7 h-7 ${
                variant === "blue" ? "text-white" : "text-[#0b84f3]"
            }`} />
        </div>

        {/* Row 2: Text */}
        <div className="relative z-10 text-[15px] md:text-[17px] font-bold leading-snug max-w-[180px]">
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
        <section className="w-full bg-[#eef7ff] py-16 md:py-20 font-poppins overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.5fr] gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-[#0b84f3] rounded-lg flex items-center justify-center text-white">
                                <Plus className="w-4 h-4" />
                            </div>
                            <span className="text-[#0b84f3] font-bold tracking-[0.2em] text-xs uppercase">
                                Commitment
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-playfair font-extrabold text-[#1a2b4b] mb-5 leading-tight">
                            Our <span className="text-[#0b84f3]">Commitments</span>
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto lg:mx-0 text-base md:text-lg leading-relaxed">
                            We are dedicated to maintaining the highest standards in medical research and clinical trials
                            across all our operations, ensuring safety, quality, and excellence in healthcare.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                        <CommitmentTile 
                            index={0} 
                            title="Respect the ICH/GCP Guidelines" 
                            icon={ShieldCheck} 
                            variant="light" 
                        />
                        <CommitmentTile 
                            index={1} 
                            title="Enrich Healthy Communities" 
                            icon={Users} 
                            variant="blue" 
                        />
                        <CommitmentTile 
                            index={2} 
                            title="Provide Quality Services" 
                            icon={Award} 
                            variant="blue" 
                        />
                        <CommitmentTile 
                            index={3} 
                            title="Guarantee Patient Safety & Confidentiality" 
                            icon={Lock} 
                            variant="light" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
