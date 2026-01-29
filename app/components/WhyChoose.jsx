"use client";

import React from "react";
import { Plus, BookOpen, ClipboardCheck, BarChart3, Brain } from "lucide-react";
import { motion } from "framer-motion";

const WhyChoose = () => {
    const cards = [
        {
            title: "Skills Development",
            icon: <BookOpen className="w-7 h-7 md:w-8 md:h-8" />,
            bg: "bg-[#0088ff]",
            textColor: "text-white",
            iconCircleBg: "bg-white",
            iconStyleColor: "text-[#0088ff]",
            border: "border-[#1b6fd8]"
        },
        {
            title: "Quality & Results",
            icon: <ClipboardCheck className="w-7 h-7 md:w-8 md:h-8" />,
            bg: "bg-[#f4faff]",
            textColor: "text-[#1a2b4b]",
            iconCircleBg: "bg-[#0088ff]",
            iconStyleColor: "text-white",
            border: "border-[#cfe3ff]"
        },
        {
            title: "Expert Analysis",
            icon: <BarChart3 className="w-7 h-7 md:w-8 md:h-8" />,
            bg: "bg-[#f4faff]",
            textColor: "text-[#1a2b4b]",
            iconCircleBg: "bg-[#0088ff]",
            iconStyleColor: "text-white",
            border: "border-[#cfe3ff]"
        },
        {
            title: "AI & Simulation",
            icon: <Brain className="w-7 h-7 md:w-8 md:h-8" />,
            bg: "bg-[#0088ff]",
            textColor: "text-white",
            iconCircleBg: "bg-white",
            iconStyleColor: "text-[#0088ff]",
            border: "border-[#1b6fd8]"
        },
    ];

    return (
        <section className="relative w-full py-12 md:py-20 bg-white overflow-hidden">
            {/* Decorative Background - Floating Dashed Lines matching screenshot */}
            <div className="absolute inset-0 pointer-events-none">
                <svg
                    className="absolute w-full h-full opacity-20"
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M-50,400 C150,200 350,600 550,400 C750,200 950,400 1050,200"
                        fill="none"
                        stroke="#0088ff"
                        strokeWidth="1.5"
                        strokeDasharray="8 8"
                    />
                </svg>
            </div>

            <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Content Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col space-y-6"
                    >
                        <div className="flex items-center gap-2 text-[#0088ff] font-bold tracking-widest text-xs uppercase">
                            <Plus className="w-4 h-4 stroke-[4px]" />
                            <span>About Us</span>
                        </div>

                        {/* Heading in single line on desktop */}
                        <h2 className="text-3xl md:text-[48px] lg:text-[54px] font-playfair text-[#1a2b4b] leading-tight font-bold lg:whitespace-nowrap">
                            Why Choose <span className="text-[#0088ff]">e-BioMed</span>?
                        </h2>

                        <div className="space-y-5 text-gray-600 text-[15px] md:text-[16px] leading-relaxed max-w-xl">
                            <p>
                                e-BioMed provides skills development workshops and seminars
                                for healthcare providers, clinical research and health-related
                                professionals, IMGs, INGs, and others who wish to strengthen
                                their knowledge and skills in their field.
                            </p>
                            <p>
                                Our vision is simple and expressed by the terms "Quality &
                                Results". The success of our modern coaching method focuses
                                on reforming challenging procedures to ensure that your
                                knowledge and applied skills are maximized.
                            </p>
                        </div>

                        <button className="w-fit bg-[#0088ff] text-white px-8 py-3.5 rounded-2xl font-semibold shadow-lg shadow-blue-200 hover:bg-[#0077ee] transition-all hover:shadow-blue-300 hover:-translate-y-0.5 active:scale-95">
                            Discover Courses
                        </button>
                    </motion.div>

                    {/* Right Grid Column - Compact 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-4 md:gap-5 max-w-[550px] lg:ml-auto">
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`${card.bg} ${card.textColor} ${card.border} relative p-6 md:p-8 rounded-[2.5rem] border shadow-[0_12px_28px_rgba(15,23,42,0.18)] flex flex-col items-center justify-center text-center space-y-5 transition-all duration-500 transform-gpu hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,23,42,0.22)] group before:content-[''] before:absolute before:inset-0 before:rounded-[2.5rem] before:pointer-events-none before:shadow-[inset_0_2px_0_rgba(255,255,255,0.6),inset_0_-10px_18px_rgba(0,0,0,0.08)]`}
                            >
                                <div className={`${card.iconCircleBg} w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                                    {React.cloneElement(card.icon, { className: `${card.iconStyleColor} w-8 h-8 md:w-10 md:h-10` })}
                                </div>
                                <h3 className="font-bold text-base md:text-[19px] leading-snug tracking-tight">
                                    {card.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
