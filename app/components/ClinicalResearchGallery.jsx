"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import gallery1 from "./assets/476c9e5f581f8c4a1108ac8ed9a7c123e19fe94d.png";
import gallery2 from "./assets/24a8adace4bc93c0772fef34e98c375403f2dc5d.png";
import gallery3 from "./assets/e29ddfcd5c10976b908ce9a0c0be5d10930cc2ff.png";
import gallery4 from "./assets/f0b7b9cbbeab5b98898ad511acc1bf04bc946d93.png";

const galleryItems = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery1,
  gallery2,
  gallery3,
  gallery4,
];

export default function ClinicalResearchGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-2 text-[#0088ff] uppercase text-[11px] tracking-widest font-semibold mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-sm bg-[#0088ff] text-white text-[10px]">
                +
              </span>
              Gallery
            </div>
            <h2 className="text-3xl sm:text-[60px] font-bold text-[#1a2b4b] mb-3">
              Sites &amp; <span className="text-[#0088ff]">Facilities</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              As a medical and site network organization, our facilities in
              association with private outpatient clinics are fully equipped to be
              qualified to conduct the studies and to provide high-quality services.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group/gallery"
        >
          {/* Navigation Buttons - Positioned Left & Right */}
          <button
            type="button"
            className="gallery-prev absolute left-[-20px] md:left-[-180px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/80 backdrop-blur-md text-[#1a2b4b] flex items-center justify-center shadow-xl hover:bg-[#0088ff] hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-0 disabled:pointer-events-none group-active:scale-95"
            aria-label="Previous images"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            className="gallery-next absolute right-[-20px] md:right-[-180px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/80 backdrop-blur-md text-[#1a2b4b] flex items-center justify-center shadow-xl hover:bg-[#0088ff] hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-0 disabled:pointer-events-none group-active:scale-95"
            aria-label="Next images"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".gallery-prev",
              nextEl: ".gallery-next",
            }}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="gallery-swiper overflow-visible!"
          >
            {galleryItems.map((image, index) => (
              <SwiperSlide key={index}>
                <div 
                  onClick={() => setSelectedIndex(index)}
                  className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-[24px] overflow-hidden shadow-lg border border-gray-100 group/slide cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <Image
                    src={image}
                    alt={`Clinical facility ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/slide:scale-110"
                  />
                  {/* Overlay on hover */}
                 
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      
    </section>
  );
}
 
