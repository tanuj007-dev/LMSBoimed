"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, ArrowRight, Activity, Microscope, Heart, FlaskConical } from "lucide-react";
import img1 from "./assets/b78dc956e1dcdc0ed24117763af58eccd9ba51f9.png";
import img2 from "./assets/23689b16df56cbef48c6d5a6e622d358223846dc.png";
import img3 from "./assets/2015645498f32d77ad270b7bf99d35f39becf46b.png";
import img4 from "./assets/0f032114b422a6a83015ae0f4e961a6d26455340.png";

const skills = [
  {
    title: "Phlebotomy Techniques",
    description: "Master venipuncture and blood-sample collection using cutting-edge simulators and hands-on clinical practice. Review cardiovascular basics and infection control.",
    image: img1,
    icon: Activity,
    color: "blue",
  },
  {
    title: "Intramuscular Injection",
    description: "Prepare for safe IM administration with musculo-skeletal insertion training. firsthand experience in our dedicated skills laboratory.",
    image: img2,
    icon: Microscope,
    color: "teal",
  },
  {
    title: "Medication Administration",
    description: "Develop critical decision-making skills for safe medication delivery. Essential training for healthcare professionals in diverse clinical settings.",
    image: img3,
    icon: Heart,
    color: "rose",
  },
  {
    title: "Electrocardiography",
    description: "Fundamentals of cardiovascular anatomy and ECG procedures. Learn interpretation and treatment modalities with in-house hands-on training.",
    image: img4,
    icon: FlaskConical,
    color: "indigo",
  },
];

const PracticalSkills = () => {
  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-white font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="bg-[#0088ff] p-1 rounded-sm flex items-center justify-center">
              <Plus className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="text-[#0088ff] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              Practical Workshops
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-playfair text-[#1a2b4b] font-bold mb-4"
          >
            Practical <span className="text-[#0088ff]">Skills Development</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-6 leading-relaxed"
          >
            Select your clinical and research path, master critical thinking and industry-relevant skills, and gain real-world experience.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#ef383f] text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-red-500/20 hover:bg-[#d32f36] transition-all transform hover:-translate-y-0.5"
          >
            Click To Apply
          </motion.button>
        </div>

        {/* Skills List */}
        <div className="space-y-5">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col md:flex-row items-center gap-8 bg-linear-to-br from-[#f0f9ff] to-white border-[2px] border-blue-200/60 rounded-[32px] p-6 md:p-8 hover:border-[#0088ff]/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={skill.image}
                    alt={skill.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#0088ff] transition-colors">
                  {skill.title}
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-10">
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0088ff] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#0077ee] transition-all transform hover:-translate-y-0.5"
          >
            Click to load more
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default PracticalSkills;
