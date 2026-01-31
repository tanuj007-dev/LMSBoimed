"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Instagram,
  ChevronDown,
  Send,
  Check,
  Search
} from "lucide-react";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import logo from "../components/assets/logo.png";
import doctorImg from "../components/assets/38fa7cda-e83d-4252-8f82-c0945dac1c79.png";

const countries = [
  { name: "Canada", code: "+1", countryCode: "CA" },
  { name: "United States", code: "+1", countryCode: "US" },
  { name: "United Kingdom", code: "+44", countryCode: "GB" },
  { name: "Australia", code: "+61", countryCode: "AU" },
  { name: "India", code: "+91", countryCode: "IN" },
  { name: "Germany", code: "+49", countryCode: "DE" },
  { name: "France", code: "+33", countryCode: "FR" },
  { name: "United Arab Emirates", code: "+971", countryCode: "AE" },
  { name: "Singapore", code: "+65", countryCode: "SG" },
  { name: "Japan", code: "+81", countryCode: "JP" },
  { name: "Malaysia", code: "+60", countryCode: "MY" },
  { name: "Philippines", code: "+63", countryCode: "PH" },
  { name: "China", code: "+86", countryCode: "CN" },
  { name: "South Korea", code: "+82", countryCode: "KR" },
  { name: "Thailand", code: "+66", countryCode: "TH" },
  { name: "Indonesia", code: "+62", countryCode: "ID" },
  { name: "Vietnam", code: "+84", countryCode: "VN" },
];

const ContactPage = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.includes(searchQuery)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="bg-[#fcfdfa] min-h-screen font-poppins text-[#1a2b4b]">
      {/* --- MAIN CONTACT SECTION --- */}
      <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4 relative z-10">
          
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-[12px] font-medium text-gray-400 mb-4 justify-center uppercase tracking-widest"
            >
              <span>BioMed Canada</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-[#0088ff]">Get in t ouch</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 tracking-tight"
            >
              Contact us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            >
              Have questions about our clinical research programs or corporate training? 
              Our expert team is here to provide the support and clarity you need.
            </motion.p>
          </div>

          {/* Two-Column Layout: Form on Left, Info on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
            
            {/* Left Side: Contact Form (Span 7) */}
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form className="bg-white rounded-[32px] md:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-[0_40px_100px_-20px_rgba(0,136,255,0.08)] border border-gray-100 relative z-10 h-full flex flex-col justify-between group/form">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-playfair font-black text-[#1a2b4b]">Get In Touch</h2>
               
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Your name"
                        className="w-full bg-white border border-gray-300 rounded-2xl px-6 py-4 focus:border-gray-400 outline-none transition-all text-[15px] font-medium placeholder:text-gray-400"
                      />
                    
                    </div>
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="Email address"
                        className="w-full bg-white border border-gray-300 rounded-2xl px-6 py-4 focus:border-gray-400 outline-none transition-all text-[15px] font-medium placeholder:text-gray-400"
                      />
                
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative flex border border-gray-300 rounded-2xl focus-within:border-gray-400 transition-all">
                      <div className="relative" ref={dropdownRef}>
                        <button 
                          type="button"
                          onClick={() => setIsCountryOpen(!isCountryOpen)}
                          className="h-full px-4 border-r border-gray-200 flex items-center gap-2 hover:bg-gray-50 transition-all rounded-l-2xl"
                        >
                          <ReactCountryFlag 
                            countryCode={selectedCountry.countryCode} 
                            svg 
                            style={{ width: '1.4em', height: '1.4em' }} 
                          />
                          <ChevronDown 
                            size={14} 
                            className={`text-gray-400 transition-transform duration-300 ${isCountryOpen ? 'rotate-180' : ''}`} 
                          />
                        </button>

                        <AnimatePresence>
                          {isCountryOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 5, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 mt-2 z-50 overflow-hidden"
                            >
                              <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                                <div className="relative">
                                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                                  <input 
                                    type="text"
                                    placeholder="Search country..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-[#0088ff] transition-all"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                              </div>
                              <div className="max-h-60 overflow-y-auto">
                                {filteredCountries.length > 0 ? (
                                  filteredCountries.map((country) => (
                                    <button
                                      key={country.countryCode}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedCountry(country);
                                        setIsCountryOpen(false);
                                        setSearchQuery("");
                                      }}
                                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                    >
                                      <div className="flex items-center gap-3">
                                        <ReactCountryFlag countryCode={country.countryCode} svg style={{ width: '1.2em', height: '1.2em' }} />
                                        <div className="text-left">
                                          <p className="text-[13px] font-bold text-[#1a2b4b]">{country.name}</p>
                                          <p className="text-[11px] text-gray-400">{country.code}</p>
                                        </div>
                                      </div>
                                      {selectedCountry.countryCode === country.countryCode && (
                                        <Check size={14} className="text-[#0088ff]" />
                                      )}
                                    </button>
                                  ))
                                ) : (
                                  <div className="p-4 text-center text-xs text-gray-400">
                                    No countries found
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex-1 flex items-center px-4 relative">
                        <span className="text-[15px] font-medium text-gray-900 mr-2">{selectedCountry.code}</span>
                        <input 
                          type="tel" 
                          placeholder="99999-99999"
                          className="w-full bg-transparent py-4 outline-none text-[15px] font-medium placeholder:text-gray-400"
                        />
                        
                      </div>
                    </div>

                    <div className="relative border border-gray-300 rounded-2xl focus-within:border-gray-400 transition-all px-6">
                      <select className="w-full bg-transparent py-4 outline-none appearance-none text-[15px] font-medium text-gray-400 cursor-pointer">
                        <option>Interested in</option>
                        <option>Clinical Research Training</option>
                        <option>Corporate Solutions</option>
                        <option>Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 pointer-events-none">
                       
                        <ChevronDown size={20} className="text-gray-400" />
                      </div>
                  
                    </div>
                  </div>

                  <div className="relative">
                    <textarea 
                      rows={5}
                      placeholder="How can we help?"
                      className="w-full bg-white border border-gray-300 rounded-[24px] px-6 py-6 md:py-10 focus:border-gray-400 outline-none resize-none transition-all text-[15px] font-medium placeholder:text-gray-400"
                    />
 
                  </div>
                </div>

                <div className="mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#0088ff] text-white py-4 rounded-full font-extrabold text-lg shadow-[0_15px_30px_-5px_rgba(0,136,255,0.3)] hover:bg-[#0077ee] transition-all flex items-center justify-center gap-3 group"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.button>
                  <p className="mt-6 text-center text-[11px] text-gray-400 font-medium">
                    By clicking, you agree to our <span className="text-[#0088ff] hover:underline cursor-pointer">Terms</span> and 
                    <span className="text-[#0088ff] hover:underline cursor-pointer ml-1">Privacy Policy</span>.
                  </p>
                </div>
              </form>
            </motion.div>

            {/* Right Side: Info Card & Integrated Map (Span 5) */}
            <motion.div 
              className="lg:col-span-5 flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 border border-gray-100 relative overflow-hidden h-full flex flex-col gap-8 shadow-[0_40px_100px_-20px_rgba(0,136,255,0.05)]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-12 -mt-12 blur-2xl" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-8 relative z-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase text-[#0088ff]">Address</span>
                      <p className="text-[13px] sm:text-[14px] font-bold leading-relaxed text-[#1a2b4b]">
                        123 Clinical Plaza, Suite #101,<br />
                        Toronto, ON M5V 2H1, Canada
                      </p>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase text-[#0088ff]">Social Connect</span>
                      <div className="flex gap-3">
                        {[Facebook, Linkedin, Instagram].map((Icon, i) => (
                          <Link 
                            key={i} 
                            href="#" 
                            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1a2b4b] hover:text-[#0088ff] transition-all shadow-sm border border-gray-100 group"
                          >
                            <Icon size={16} className="group-hover:scale-110 transition-transform" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase text-[#0088ff]">Direct Contact</span>
                      <div className="space-y-1">
                        <p className="text-[13px] sm:text-[14px] font-bold text-[#1a2b4b] hover:text-[#0088ff] transition-colors cursor-pointer block wrap-break-word">
                          info@biomedcanada.com
                        </p>
                        <p className="text-[13px] sm:text-[14px] font-bold text-[#1a2b4b] hover:text-[#0088ff] transition-colors cursor-pointer block">
                          +1 647 123 4567
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase text-[#0088ff]">Working Hours</span>
                      <div className="space-y-1">
                        <p className="text-[12px] sm:text-[13px] font-bold text-[#1a2b4b]">Mon - Fri: 09:00 AM - 06:00 PM</p>
                        <p className="text-[12px] sm:text-[13px] font-bold text-[#1a2b4b]">Sat - Sun: Emergency Only</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- INTEGRATED MAP --- */}
                <div className="relative mt-auto rounded-[24px] overflow-hidden min-h-[300px] md:min-h-[400px] border border-gray-100 group">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.436486443758!2d-79.3831842!3d43.653226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb2ce09de99d%3A0x8071590fc6cf680!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1625500000000!5m2!1sen!2sca" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                    className="absolute inset-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white/20 to-transparent pointer-events-none" />
                  
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- TRUST FACTOR MARQUEE --- */}
          <div className="py-8 md:py-12 border-y border-gray-100 overflow-hidden relative group">
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-[#fcfdfa] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-l from-[#fcfdfa] to-transparent z-10" />
            
            <motion.div 
              className="flex whitespace-nowrap gap-12 md:gap-16 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[
                "Health Canada Approved", "ISO 9001:2015", "GCP Certified", "FDA Compliant", 
                "SOC2 Type II", "Biotech Excellence Award", "Global Clinical Partner",
                "Health Canada Approved", "ISO 9001:2015", "GCP Certified", "FDA Compliant", 
                "SOC2 Type II", "Biotech Excellence Award", "Global Clinical Partner"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#0088ff]" />
                  <span className="text-lg md:text-2xl font-playfair font-black text-[#1a2b4b] uppercase tracking-widest group-hover:text-[#1a2b4b] transition-colors duration-700">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER SECTION --- */}
      <section className="bg-white pt-16 md:pt-16 pb-0 overflow-hidden relative border-t border-gray-100/50">
        {/* Decorative Background Elements for Depth */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50/50 rounded-full blur-[120px] opacity-40 pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            
            {/* Left Content - High Visibility & Premium Typography */}
            <motion.div 
              {...fadeUp} 
              className="text-[#1a2b4b] space-y-8 pb-10 sm:pb-16 md:pb-28"
            >
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-[2px] bg-[#0088ff]" />
                  <span className="text-[#0088ff] font-bold text-[11px] uppercase tracking-[0.3em]">Newsletter</span>
                </motion.div>
                
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-black leading-[1.1] tracking-tight text-[#1a2b4b]">
                  Get expert tips & <br /> 
                  <span className="relative">
                    <span className="relative z-10 text-[#0088ff]">clinical insights</span>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="absolute bottom-2 left-0 w-full h-3 bg-blue-50 -z-10 origin-left"
                    />
                  </span>
                </h2>
                
                <p className="text-gray-500 text-base md:text-lg max-w-md font-medium leading-relaxed">
                  Join 5,000+ industry professionals receiving our monthly breakthroughs, 
                  regulatory updates, and clinical excellence reports.
                </p>
              </div>

              {/* Premium Mailbar */}
              <div className="relative max-w-lg group">
                <div className="absolute -inset-1 bg-linear-to-r from-[#0088ff] to-[#00aaff] rounded-full blur opacity-10 group-focus-within:opacity-20 transition duration-500" />
                <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white border border-blue-100/60 rounded-[24px] sm:rounded-full p-2 focus-within:border-[#0088ff]/40 focus-within:ring-8 focus-within:ring-[#0088ff]/5 transition-all shadow-xl">
                  <div className="flex items-center flex-1 min-w-0">
                    <Mail className="ml-4 text-blue-200 w-5 h-5 shrink-0" />
                    <input 
                      type="email" 
                      placeholder="Professional email address"
                      className="w-full bg-transparent pl-3 pr-4 py-3 text-[#1a2b4b] placeholder:text-gray-300 outline-none text-sm font-medium"
                    />
                  </div>
                  <button className="bg-[#1a2b4b] text-white px-8 sm:px-10 py-3.5 rounded-full font-black hover:bg-[#0088ff] transition-all duration-500 shadow-2xl text-sm whitespace-nowrap active:scale-95 mt-2 sm:mt-0">
                    Subscribe Now
                  </button>
                </div>
              </div>

              {/* Benefit Tags */}
              <div className="flex flex-wrap items-center gap-8 pt-2">
                {[
                  { label: "Weekly Insights" },
                  { label: "Case Studies" },
                  { label: "Regulatory Updates" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 group cursor-default">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#0088ff] transition-colors duration-300">
                      <Check size={12} className="text-[#0088ff] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[11px] text-gray-400 uppercase tracking-widest font-bold group-hover:text-[#1a2b4b] transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Image - Anchored to Bottom */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative hidden lg:flex justify-end items-end h-full"
            >
              <div className="relative w-[420px] group flex items-end">
                {/* Subtle Radial Glow behind doctor */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-[80px] -z-10" />
                
                <div className="relative w-full flex items-end justify-center">
                  <Image 
                    src={doctorImg} 
                    alt="Clinical Expert" 
                    className="object-cover w-auto h-[520px] z-10 transition-transform duration-700 group-hover:scale-[1.02] origin-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                  />
                  
                  {/* Premium Badge */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="absolute -left-12 bottom-36 bg-white/95 backdrop-blur-xl p-5 rounded-[24px] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] z-20 border border-blue-50 flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-default"
                  >
                    <div className="w-12 h-12 bg-linear-to-br from-[#0088ff] to-[#0066cc] rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <Linkedin size={24} />
                    </div>
                    <div className="pr-4">
                      <p className="text-base font-black text-[#1a2b4b]">5,000+</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest whitespace-nowrap">Clinical Network</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
