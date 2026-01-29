"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Clock, BookOpen, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Importing course images
import course1 from "./assets/1a63f85c958481f88ea3a89bc4a5cbd3c62eef29.png";
import course2 from "./assets/614e2285b2709586bcaaeb1e0cd9a6121a2bdbd0 (1).png";
import course3 from "./assets/47d0f68276e03ec9c34a549997f05f626b69de92.png";
import badgeIcon from "./assets/testimonial_badge_icon.png";
import cardEdgeVector from "./assets/Vector (2).png";

const CourseCard = ({ title, code, oldPrice, newPrice, duration, lessons, students, image, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="relative rounded-4xl p-[2px] bg-linear-to-br from-[#1d4ed8]/55 via-[#60a5fa]/45 to-[#bfdbfe]/35 shadow-[0_10px_30px_rgba(0,136,255,0.05)] hover:shadow-[0_15px_40px_rgba(0,136,255,0.1)] transition-all duration-500 group h-full"
    >
        <div className="bg-linear-to-br from-white via-[#f8fbff] to-[#eef6ff] rounded-[calc(2.5rem-1px)] p-4 flex flex-col h-full">
            {/* Course Image Container - Padded and Rounded */}
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden mb-5">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col grow px-1">
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#f4faff] text-[#0088ff] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {code}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-[11px] font-medium">{oldPrice}</span>
                        <span className="text-[#f43f5e] font-extrabold text-base">{newPrice}</span>
                    </div>
                </div>

                <h3 className="text-[17px] md:text-[19px] font-bold text-[#1a2b4b] mb-4 leading-tight font-poppins line-clamp-2">
                    {title}
                </h3>

                {/* Course Meta */}
                <div className="flex items-center gap-3 text-gray-500 text-[10px] md:text-[11px] mb-6 font-medium">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{duration}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{lessons}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{students}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex items-center gap-3">
                    <button className="flex-1 bg-[#0088ff] text-white py-2.5 rounded-full text-xs font-bold shadow-[0_8px_15px_rgba(0,136,255,0.25)] hover:bg-[#0077ee] transition-all hover:-translate-y-0.5 active:translate-y-0">
                        Enroll Now
                    </button>
                    <button className="flex-1 border border-[#0088ff] text-[#0088ff] py-2.5 rounded-full text-xs font-bold hover:bg-blue-50 transition-all text-center">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

export default function FeaturedCourses() {
    const [activeTab, setActiveTab] = useState("clinical");
    const getTabIndex = (tab) => (tab === "clinical" ? 0 : tab === "biopharma" ? 1 : 2);

    const courses = [
        {
            title: "Electrocardiography Techniques",
            code: "EKG",
            oldPrice: "CA$150",
            newPrice: "CA$99.99",
            duration: "90 Days",
            lessons: "20 lessons",
            students: "All Participant",
            image: course1
        },
        {
            title: "Phlebotomy Techniques",
            code: "PH",
            oldPrice: "CA$150",
            newPrice: "CA$99.99",
            duration: "90 Days",
            lessons: "20 lessons",
            students: "All Participant",
            image: course2
        },
        {
            title: "Comprehensive Health Assessment",
            code: "HA",
            oldPrice: "CA$150",
            newPrice: "CA$99.99",
            duration: "90 Days",
            lessons: "20 lessons",
            students: "All Participant",
            image: course3
        }
    ];

    return (
        <section className="relative w-full py-8 lg:py-14 bg-white overflow-hidden">
            {/* Background Decorative Dots */}
           
           

            <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">

                {/* Header Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center mb-6 md:mb-10"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="relative w-5 h-5 md:w-6 md:h-6">
                            <Image src={badgeIcon} alt="Badge" fill className="object-contain" />
                        </div>
                        <span className="text-[#0088ff] font-bold tracking-widest text-[10px] md:text-xs uppercase">Our Courses</span>
                    </div>

                    <h2 className="text-3xl md:text-[50px] font-playfair text-[#1a2b4b] font-bold leading-tight mb-3">
                        Our Featured <span className="text-[#0088ff]">Courses</span>
                    </h2>

                    <p className="max-w-2xl text-gray-500 text-[11px] md:text-sm leading-relaxed font-poppins opacity-90 mx-auto">
                        Select your clinical and research path, master critical thinking and industry-relevant skills, and gain real-world experience
                    </p>
                </motion.div>

                {/* Tabs - Responsive & Snappy */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="flex justify-center w-full mb-8 md:mb-12"
                >
                    <div className="relative flex w-full max-w-4xl p-1.5 bg-[#f8fbff] rounded-2xl md:rounded-full border border-blue-50/50 shadow-inner overflow-x-auto no-scrollbar scroll-smooth">
                        <div className="flex w-full min-w-max md:min-w-0 relative">
                            <motion.span
                                className="absolute inset-y-0 rounded-xl md:rounded-full shadow-md z-0"
                                animate={{
                                    x: `${getTabIndex(activeTab) * 100}%`,
                                    width: "33.3333%",
                                    backgroundColor: activeTab === "clinical" ? "#e11d48" : "#0088ff"
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                            />
                            <button
                                onClick={() => setActiveTab("clinical")}
                                className={`relative z-10 flex-1 px-2 md:px-6 py-3 rounded-xl md:rounded-full text-[11px] md:text-sm font-bold transition-colors duration-300 w-[110px] sm:w-[130px] md:w-auto ${activeTab === "clinical" ? "text-white" : "text-gray-500 hover:text-[#0088ff]"}`}
                            >
                                <span className="md:hidden">Clinical Skills</span>
                                <span className="hidden md:inline">Clinical Skills & Patient Care</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("biopharma")}
                                className={`relative z-10 flex-1 px-2 md:px-6 py-3 rounded-xl md:rounded-full text-[11px] md:text-sm font-bold transition-colors duration-300 w-[110px] sm:w-[130px] md:w-auto ${activeTab === "biopharma" ? "text-white" : "text-gray-500 hover:text-[#0088ff]"}`}
                            >
                                <span className="md:hidden">Research & Bio</span>
                                <span className="hidden md:inline">Clinical Research & Biopharma</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("alevel")}
                                className={`relative z-10 flex-1 px-2 md:px-6 py-3 rounded-xl md:rounded-full text-[11px] md:text-sm font-bold transition-colors duration-300 w-[110px] sm:w-[130px] md:w-auto ${activeTab === "alevel" ? "text-white" : "text-gray-500 hover:text-[#0088ff]"}`}
                            >
                                <span className="md:hidden">A-Level</span>
                                <span className="hidden md:inline">A-Level Subjects</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Courses Grid */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    >
                        {courses.map((course, index) => (
                            <div key={index} className="relative">
                                {index === 0 && (
                                    <div className="pointer-events-none absolute -top-10 -left-8 w-24 h-24 opacity-70 hidden md:block">
                                        <Image src={cardEdgeVector} alt="" fill className="object-contain" />
                                    </div>
                                )}
                                {index === 2 && (
                                    <div className="pointer-events-none absolute -bottom-6 -right-8 w-24 h-24 opacity-70 rotate-180 hidden md:block">
                                        <Image src={cardEdgeVector} alt="" fill className="object-contain" />
                                    </div>
                                )}
                                <div className="relative z-10">
                                    <CourseCard {...course} index={index} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
}
