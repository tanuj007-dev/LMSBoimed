import React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

// Importing local assets
import about1 from "./assets/about1.png";
import about2 from "./assets/about2.png";
import about3 from "./assets/about3.png";

export default function AboutUs() {
    return (
        <section className="relative w-full py-16 lg:py-24 bg-linear-to-br from-white via-blue-50/30 to-white overflow-hidden">
            {/* Decorative Dashed Lines (SVG Background) */}
            <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d="M0,50 Q25,25 50,50 T100,50"
                        fill="none"
                        stroke="#e0f2fe"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                        className="opacity-60"
                    />
                    <circle cx="85" cy="15" r="25" fill="none" stroke="#e0f2fe" strokeWidth="0.5" strokeDasharray="2 2" />
                    <circle cx="5" cy="85" r="20" fill="none" stroke="#e0f2fe" strokeWidth="0.5" strokeDasharray="2 2" />
                </svg>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Column: Image Collage */}
                    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex flex-col justify-center">
                        {/* Main Big Image (Building) */}
                        <div className="relative w-[80%] h-[80%] mx-auto z-10">
                            <Image
                                src={about2}
                                alt="BioMed Canada Building"
                                fill
                                className="object-cover rounded-3xl shadow-xl"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Top Left Floating Image */}
                        <div className="absolute top-4 left-4 w-[38%] h-[35%] z-20 hover:scale-105 transition-transform duration-300">
                            <Image
                                src={about1}
                                alt="Clinical Discussion"
                                fill
                                className="object-cover rounded-2xl shadow-lg border-[3px] border-white"
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                        </div>

                        {/* Bottom Right Floating Image */}
                        <div className="absolute bottom-4 right-4 w-[38%] h-[35%] z-20 hover:scale-105 transition-transform duration-300">
                            <Image
                                src={about3}
                                alt="E-Learning Presentation"
                                fill
                                className="object-cover rounded-2xl shadow-lg border-[3px] border-white"
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col space-y-5 text-left">

                        {/* Tagline */}
                        <div className="flex items-center gap-2 text-[#0088ff] font-bold tracking-wider text-xs uppercase">
                            <Plus className="w-5 h-5 stroke-[4px]" />
                            <span>About Us</span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl font-playfair text-[#1a2b4b] leading-tight font-medium">
                            About Us
                        </h2>

                        {/* Description Paragraphs */}
                        <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed">
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

                    </div>
                </div>
            </div>
        </section>
    );
}
