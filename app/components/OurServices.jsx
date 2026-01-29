"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import servicesImg from "./assets/a3e7d474f1ee97892449518f0b312a33efbd31d7.png";

const ServiceItem = ({ title, description, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex flex-col mb-6 lg:mb-8 group"
    >
        <div className="relative w-10 h-10 mb-4">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#0088ff] rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative z-10 w-full h-full bg-[#0088ff] rounded-full flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-5 h-5" />
            </div>
        </div>
        <h3 className="text-lg font-bold text-[#1a2b4b] mb-2 font-poppins leading-tight group-hover:text-[#0088ff] transition-colors">
            {title}
        </h3>
        <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed font-light">
            {description}
        </p>
    </motion.div>
);

export default function OurServices() {
    return (
        <section className="relative w-full py-8 lg:py-16 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">

                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center mb-8 lg:mb-14"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="relative w-5 h-5 flex items-center justify-center">
                            <div className="absolute w-4 h-[2px] bg-[#0088ff]"></div>
                            <div className="absolute h-4 w-[2px] bg-[#0088ff]"></div>
                        </div>
                        <span className="text-[#0088ff] font-bold tracking-widest text-[10px] uppercase">Our Services</span>
                    </div>

                    <h2 className="text-3xl md:text-[50px] font-playfair text-[#1a2b4b] font-bold leading-tight mb-4">
                        Bridge To The <span className="text-[#0088ff]">Future</span>
                    </h2>

                    <p className="max-w-2xl text-gray-500 text-[12px] md:text-sm leading-relaxed font-poppins opacity-90">
                        We revolutionize the path from knowledge to career, bridging skills gaps to build a future-ready
                        workforce and deliver proven value to industry partners.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-center">

                    {/* Left Column Services */}
                    <div className="flex flex-col order-2 lg:order-1">
                        <ServiceItem
                            index={0}
                            title="Global Site Management Organization (SMO)"
                            description="Biomed Canada's key advantage lies in its centralized, end-to-end clinical trial management, which leverages deep expertise in both the Canadian and global regulatory landscape."
                        />
                        <ServiceItem
                            index={1}
                            title="Clinical Trials Management"
                            description="Managing all kind of clinical trials with biggest pharmaceutical companies globally."
                        />
                    </div>

                    {/* Center Column Image */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full aspect-[4/5] lg:aspect-auto h-full min-h-[350px] lg:min-h-[500px] rounded-4xl overflow-hidden shadow-2xl order-1 lg:order-2"
                    >
                        <Image
                            src={servicesImg}
                            alt="Professional Instructor with Clinical Research Book"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                    </motion.div>

                    {/* Right Column Services */}
                    <div className="flex flex-col order-3 lg:order-3">
                        <ServiceItem
                            index={2}
                            title="E-Learning Professional Development"
                            description="Our highly qualified healthcare, research, and medical professionals analyze the outcome of new required skills and constantly update the review materials."
                        />
                        <ServiceItem
                            index={3}
                            title="Industry-Relevant Corporate Training"
                            description="Cutting-edge corporate training designed to match current industry needs & emerging trends in healthcare & clinical research."
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
