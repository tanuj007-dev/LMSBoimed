"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Importing generated avatars
import avatar1 from "./assets/avatar1.png";
import avatar2 from "./assets/avatar2.png";
import avatar3 from "./assets/avatar3.png";
import avatar4 from "./assets/avatar4.png";
import avatar5 from "./assets/avatar5.png";
import badgeIcon from "./assets/testimonial_badge_icon.png";

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Esther Howard",
            role: "CEO of GIGL",
            content: "As an international medical graduate, I found the e-BioMed workshops invaluable. The certification not only boosted my confidence but also opened doors to job opportunities in Canada.",
            avatar: avatar1,
        },
        {
            id: 2,
            name: "Cameron Michelle T.",
            role: "Pharmacovigilance Specialist",
            content: "What sets BioMed Canada apart is the focus on both knowledge and application. The simulations and AI-driven training made complex topics easier to understand and apply.",
            avatar: avatar2,
        },
        {
            id: 3,
            name: "Rahul M",
            role: "IMG Trainee",
            content: "The BioMed Canada training helped me bridge the gap between theory and practice. The interactive modules and case studies prepared me for real-world clinical research projects.",
            avatar: avatar3,
        },
        {
            id: 4,
            name: "David Smith",
            role: "Clinical Researcher",
            content: "The depth of information and the practical approach taken in the workshops are unmatched. Highly recommend for any professional in the medical field looking to upskill.",
            avatar: avatar4,
        },
        {
            id: 5,
            name: "Sarah Jenkins",
            role: "Healthcare Consultant",
            content: "BioMed Canada is the gold standard for professional development. The focus on real-world application through simulation is exactly what the industry needs right now.",
            avatar: avatar5,
        },
    ];

    return (
        <section className="relative w-full py-12 lg:py-16 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">

                {/* Header Section - Compact */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center mb-10 lg:mb-16"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="relative w-7 h-7">
                            <Image
                                src={badgeIcon}
                                alt="Testimonials Badge"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-[#0088ff] font-bold tracking-widest text-[10px] uppercase">Testimonials</span>
                    </div>

                    <h2 className="text-3xl md:text-[50px] font-playfair text-[#1a2b4b] font-bold leading-tight mb-4">
                        Client <span className="text-[#0088ff]">Testimonial</span>
                    </h2>

                    <p className="max-w-2xl text-gray-500 text-xs md:text-sm leading-relaxed font-poppins opacity-80">
                        Hear from our successful graduates who have transformed their careers through
                        BioMed Canada's advanced training.
                    </p>
                </motion.div>

                {/* Swiper Slider */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative swiper-container-custom py-10"
                >
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        loop={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={{
                            nextEl: ".swiper-button-next-custom",
                            prevEl: ".swiper-button-prev-custom",
                        }}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 1.8, spaceBetween: 30 },
                            1024: { slidesPerView: 2.5, spaceBetween: 40 },
                        }}
                        className="testimonial-swiper !pb-14"
                    >
                        {testimonials.map((t) => (
                            <SwiperSlide key={t.id} className="!h-auto !flex items-center justify-center">
                                <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_15px_40px_rgba(0,136,255,0.1)] flex flex-col items-center text-center border border-blue-50/50 max-w-xl self-stretch h-full transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,136,255,0.15)]">

                                    {/* Avatar Area */}
                                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 mx-auto">
                                        <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-grow">
                                        <p className="text-gray-600 text-[13px] md:text-[15px] leading-relaxed font-light italic mb-8 px-2">
                                            "{t.content}"
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <h4 className="text-[#1a2b4b] font-bold text-base md:text-lg mb-0.5">{t.name}</h4>
                                        <p className="text-[#0088ff] font-medium text-[10px] md:text-xs uppercase tracking-wider">{t.role}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Arrows - Compact */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 flex justify-between pointer-events-none px-2 lg:-mx-8">
                        <button className="swiper-button-prev-custom pointer-events-auto w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center text-[#0088ff] hover:bg-[#0088ff] hover:text-white transition-all duration-300 shadow-md">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="swiper-button-next-custom pointer-events-auto w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center text-[#0088ff] hover:bg-[#0088ff] hover:text-white transition-all duration-300 shadow-md">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

            </div>

        </section>
    );
}
