import React from "react";
import Image from "next/image";
import heroBg from "./assets/hero.png";

export default function Hero() {
    return (
        <div className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src={heroBg}
                    alt="BioMed Canada Background"
                    fill
                    priority
                    className="object-cover object-center"
                    quality={100}
                />
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/10"></div>
                {/* Blue tint overlay to match the reference style */}
                <div className="absolute inset-0 bg-[#0a192f]/30 mix-blend-multiply"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center">

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-5">
                    <span className="text-[#ff3333] font-bold">Bio</span>
                    <span className="text-[#0088ff] font-bold">Med</span>
                    <span className="text-white ml-3 font-semibold">Canada</span>
                </h1>

                {/* Subtext */}
                <p className="text-white text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-10 opacity-90 font-light">
                    Trusted by industry professionals worldwide, BioMed Canada combines
                    clinical expertise with advanced e-learning to prepare you for success in
                    the medical and pharmaceutical industry.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-[#0088ff] hover:bg-[#0077e6] text-white rounded-full font-semibold text-sm md:text-base transition-all duration-300 shadow-lg transform hover:-translate-y-1">
                        Clinical Research Management
                    </button>

                    <button className="w-full sm:w-auto px-8 py-3.5 bg-[#c92a2a] hover:bg-[#b02222] text-white rounded-full font-semibold text-sm md:text-base transition-all duration-300 shadow-lg transform hover:-translate-y-1">
                        E-learning Professional Development
                    </button>
                </div>
            </div>
        </div>
    );
}
