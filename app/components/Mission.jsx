import React from "react";
import Image from "next/image";
import about1 from "./assets/about1.png"; // Using about1 as it fits the interaction theme

export default function Mission() {
    return (
        <section className="relative w-full py-20 lg:py-32 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col items-start text-left order-2 lg:order-1">
                        {/* Tag/Badge */}
                        <span className="inline-block px-8 py-2.5 rounded-full border border-blue-300 text-[#0088ff] text-sm font-medium tracking-wide bg-white mb-8">
                            About Us
                        </span>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-6xl font-playfair text-[#1a2b4b] font-bold leading-tight mb-8">
                            Our Mission
                        </h2>

                        {/* Content */}
                        <div className="space-y-6 text-gray-600 text-[15px] md:text-base leading-relaxed max-w-xl">
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
                    </div>

                    {/* Right Column: Image with Overlay */}
                    <div className="relative order-1 lg:order-2">
                        <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <Image
                                src={about1}
                                alt="Medical Professionals Discussion"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Overlay Card */}
                            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-[#2a3b5f]/90 backdrop-blur-md p-6 md:p-8 rounded-3xl text-white">
                                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                                    Our mission is simple
                                </h3>
                                <p className="text-blue-100 text-sm md:text-base font-light leading-relaxed">
                                    Building confident professionals through training that elevates community care.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
