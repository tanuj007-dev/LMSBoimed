"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const StatItem = ({ number, label, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Dynamic extraction of numeric value for animation
    const numericValue = parseInt(number.replace(/\D/g, ''));

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const duration = 2000; // 2 seconds animation
        const increment = numericValue / (duration / 16); // 60fps approx

        const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
                setCount(numericValue);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, numericValue]);

    return (
        <div ref={countRef} className="flex flex-col items-center justify-center text-white py-4 md:py-5 transition-transform hover:scale-105 duration-300">
            <div className="text-4xl md:text-4xl lg:text-6xl font-bold font-poppins mb-1 flex items-baseline">
                <span>{isVisible ? count : 0}</span>
                <span className="text-2xl md:text-2xl lg:text-6xl ml-0.5">{suffix}</span>
            </div>
            <p className="text-[10px] md:text-xs lg:text-sm font-medium uppercase tracking-wider opacity-90 text-center px-4">
                {label}
            </p>
        </div>
    );
};

export default function StatsCounter() {
    const stats = [
        { number: "100", suffix: "+", label: "Clinical Trials" },
        { number: "5", suffix: "k", label: "Students Trained" },
        { number: "25", suffix: "+", label: "Years Of Experience" },
        { number: "100", suffix: "+", label: "Global Partners" },
    ];

    return (
        <section className="relative w-full bg-[#0088ff] py-6 md:py-10">
            {/* Optional Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-white rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-white rounded-full blur-[120px]"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10"
            >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x-0 lg:divide-x divide-white/20">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            number={stat.number}
                            suffix={stat.suffix}
                            label={stat.label}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
