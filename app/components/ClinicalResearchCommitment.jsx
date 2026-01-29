"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, ShieldCheck, Handshake, PlusCircle, Award, Users, Heart } from "lucide-react";
import commitmentImg from "./assets/bc7ce05f67cc3f8d09f304d13ac5a415cccabdb0 (1).png"; // Using a placeholder that fits the theme
import bgVector from "./assets/Vector (3).png";

const FeatureCard = ({ icon: Icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white p-6 rounded-2xl border border-blue-50 shadow-[0_10px_30px_rgba(0,136,255,0.05)] hover:shadow-[0_15px_40px_rgba(0,136,255,0.1)] transition-all duration-300 flex flex-col items-start text-left h-full group"
    >
        <div className="relative w-12 h-12 mb-4">
            <div className="absolute inset-[-4px] bg-[#008dff] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative z-10 w-full h-full bg-[#008dff] rounded-full flex items-center justify-center text-white shadow-[0_8px_20px_rgba(0,141,255,0.3)]">
                <Icon className="w-6 h-6" />
            </div>
        </div>
        <h3 className="text-lg font-bold text-[#1a2b4b] mb-2 font-poppins">
            {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed font-light">
            {description}
        </p>
    </motion.div>
);

export default function ClinicalResearchCommitment() {
    const sideFeatures = [
        {
            icon: ShieldCheck,
            title: "ICH/GCP Guidelines",
            description: "Strict adherence to international clinical research standards"
        },
        {
            icon: Handshake,
            title: "Ethical Operations",
            description: "Operating with the highest ethical standards in all practices"
        }
    ];

    const bottomFeatures = [
        {
            icon: PlusCircle,
            title: "Patient Safety",
            description: "Guaranteeing safety and confidentiality of all the patients"
        },
        {
            icon: Award,
            title: "Quality Services",
            description: "Providing exceptional quality services to all present stakeholders"
        },
        {
            icon: Users,
            title: "Community Health",
            description: "Enriching the healthy life of people of our communities or societies"
        },
        {
            icon: Heart,
            title: "Humanity",
            description: "Working to benefit humanity through medical advancements"
        }
    ];

    return (
        <section className="relative w-full py-16 lg:py-24 bg-[#f8fbff] overflow-hidden font-poppins">
            {/* Background Vector Pattern */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-[-10%] w-[70%] h-full">
                    <Image
                        src={bgVector}
                        alt=""
                        fill
                        className="object-contain opacity-25 scale-[1.5] origin-right-top"
                        priority={false}
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 text-[#008dff] mb-4"
                    >
                        <div className="bg-[#008dff] p-1 rounded-sm flex items-center justify-center">
                            <Plus className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Commitment</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-playfair font-bold text-[#1a2b4b] mb-6"
                    >
                        Our <span className="text-[#008dff]">Commitment</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg font-light"
                    >
                        We are dedicated to maintaining the highest standards in medical research and clinical trials
                    </motion.p>
                </div>

                {/* Grid Layout Section */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mb-6">
                    {/* Central Image - First on mobile */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2 lg:col-span-2 relative aspect-video rounded-3xl overflow-hidden border-4 border-white"
                    >
                        <Image
                            src={commitmentImg}
                            alt="Our Commitment to Clinical Excellence"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Left Feature - Second on mobile */}
                    <div className="order-2 lg:order-1 lg:col-span-1 lg:mt-28">
                        <FeatureCard 
                            index={0}
                            icon={sideFeatures[0].icon}
                            title={sideFeatures[0].title}
                            description={sideFeatures[0].description}
                        />
                    </div>

                    {/* Right Feature - Third on mobile */}
                    <div className="order-3 lg:order-3 lg:col-span-1 lg:mt-28">
                        <FeatureCard 
                            index={1}
                            icon={sideFeatures[1].icon}
                            title={sideFeatures[1].title}
                            description={sideFeatures[1].description}
                        />
                    </div>
                </div>

                {/* Bottom Row of Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bottomFeatures.map((feature, idx) => (
                        <FeatureCard 
                            key={idx}
                            index={idx + 2}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
