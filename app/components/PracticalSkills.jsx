"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Plus,
  ArrowRight,
  Activity,
  Microscope,
  Heart,
  FlaskConical,
  Stethoscope,
  Bandage,
  Brain,
} from "lucide-react";
import img1 from "./assets/b78dc956e1dcdc0ed24117763af58eccd9ba51f9.png";
import img2 from "./assets/23689b16df56cbef48c6d5a6e622d358223846dc.png";
import img3 from "./assets/2015645498f32d77ad270b7bf99d35f39becf46b.png";
import img4 from "./assets/0f032114b422a6a83015ae0f4e961a6d26455340.png";
import img5 from "./assets/Applying Shoulder Bandage.avif";
import img6 from "./assets/Doctor Examining Patient.avif";
import img7 from "./assets/Psychologist's Office.avif";

const skills = [
  {
    title: "Phlebotomy Techniques",
    description:
      "This workshop prepares participants to perform simple venipuncture. Phlebotomy is limited to blood-sample collection by introducing a needle into a client's vein. Review the basics of the cardiovascular system, the superficial anatomy of the extremities, identifying the site insertion, and infection control techniques. Participants will have the opportunity to practice intravenous insertion with our cutting-edge simulators/in-house hands-on experience.",
    image: img1,
    icon: Activity,
    color: "blue",
  },
  {
    title: "Intramuscular Injection",
    description:
      "This workshop prepares participants to administer an intramuscular injection. Review the musculoskeletal system and identify site insertion.  Participants will have the opportunity to practice their IM insertion and infection control techniques firsthand in the skills laboratory/in-house hands-on experience.",
    image: img2,
    icon: Microscope,
    color: "teal",
  },
  {
    title: "Medication Administration",
    description:
      "This course is designed to train healthcare professionals in the knowledge, skills, approaches, and decisions required to safely administer medications and treatments.",
    image: img3,
    icon: Heart,
    color: "rose",
  },
  {
    title: "Electrocardiography Techniques",
    description:
      "The course covers the fundamentals of cardiovascular anatomy and physiology, electrocardiography techniques and procedures, basic interpretation, and appropriate treatment modalities. In-house hands-on experience",
    image: img4,
    icon: FlaskConical,
    color: "indigo",
  },
  {
    title: "Wound Care Procedures",
    description:
      "This comprehensive course provides the essential tools and strategies to confidently address wound management. Participants will apply theory using visual case studies, collaborating assessments, and discussions. In-house hands-on experience.",
    image: img5,
    icon: Bandage,
    color: "amber",
  },
  {
    title: "Basic and Advanced Health Assessments",
    description:
      "This course is designed for healthcare providers working in a variety of practice settings to introduce them to the knowledge, principles, skills, and techniques required to perform basic and full clinical and physical health assessments.",
    image: img6,
    icon: Stethoscope,
    color: "emerald",
  },
  {
    title: "Mental Health: Addictions & Behavior",
    description:
      "This course is designed to provide comprehensive knowledge and practical skills for working with people with addictions and mental health of various types.",
    image: img7,
    icon: Brain,
    color: "purple",
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
            Select your clinical and research path, master critical thinking and
            industry-relevant skills, and gain real-world experience.
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
              className="group flex flex-col md:flex-row items-center gap-8 bg-linear-to-br from-[#f0f9ff] to-white border-2 border-blue-200/60 rounded-[32px] p-6 md:p-8 hover:border-[#0088ff]/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
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
