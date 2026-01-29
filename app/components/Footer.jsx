"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

// Assets
import logo from './assets/logo.png';
import founderImg from './assets/c87d2bff9a2736ccf2586e5a520444e537acc446.png';

const Footer = () => {
    return (
        <footer className="bg-[#F2FAFF] py-10 md:py-16 px-4 md:px-8 lg:px-16 border-t border-blue-50">
            <div className="max-w-[1400px] mx-auto">
                {/* Rebalanced 12-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">

                    {/* Brand Column - Wider (Span 6) */}
                    <div className="lg:col-span-6 flex flex-col items-start px-1">
                        <div className="relative h-12 w-52 mb-6">
                            <Image src={logo} alt="BioMed Canada" fill className="object-contain" />
                        </div>

                        {/* Founder Badge - Balanced */}
                        <div className="flex items-center gap-3 bg-white border border-blue-50 p-3 rounded-2xl mb-6 shadow-sm hover:border-blue-100 transition-colors">
                            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-blue-50 shadow-inner">
                                <Image src={founderImg} alt="Dr. Anthony Alsayed" fill className="object-cover" />
                            </div>
                            <div className="pr-1">
                                <h4 className="text-[#1a2b4b] font-bold text-[13px] md:text-sm leading-tight mb-0.5">Dr. Anthony Alsayed</h4>
                                <Link href="#" className="text-[#0088ff] text-[11px] md:text-xs font-medium hover:underline block">About the Founder</Link>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm md:text-[16px] leading-relaxed max-w-[500px] font-poppins opacity-90">
                            Trusted by industry professionals worldwide, BioMed Canada combines clinical expertise with advanced e-learning to prepare you for success in the medical and pharmaceutical industry.
                        </p>
                    </div>

                    {/* Quick Links Column (Span 2) */}
                    <div className="lg:col-span-2 flex flex-col">
                        <h3 className="text-[#0088ff] font-bold text-sm md:text-base uppercase tracking-widest mb-6 border-b border-blue-100/50 pb-2 w-fit">Quick Links</h3>
                        <div className="flex flex-col gap-4">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Clinical Research', href: '/clinical-research' },
                                { name: 'Corporate Training', href: '/corporate-training' },
                                { name: 'Courses', href: '#' },
                                { name: 'Blog', href: '/blogs' },
                                { name: 'Contact', href: '/contact' }
                            ].map((item) => (
                                <Link key={item.name} href={item.href} className="text-gray-500 text-sm md:text-[15px] hover:text-[#0088ff] transition-all hover:translate-x-1 duration-300">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Legal Column (Span 2) */}
                    <div className="lg:col-span-2 flex flex-col">
                        <h3 className="text-[#0088ff] font-bold text-sm md:text-base uppercase tracking-widest mb-6 border-b border-blue-100/50 pb-2 w-fit">Legal</h3>
                        <div className="flex flex-col gap-4">
                            {['Terms & Conditions', 'Privacy Policy', 'Cookie Notice', 'Cookie Preferences', 'Trust Center'].map((item) => (
                                <Link key={item} href="#" className="text-gray-500 text-sm md:text-[15px] hover:text-[#0088ff] transition-all hover:translate-x-1 duration-300">{item}</Link>
                            ))}
                        </div>
                    </div>

                    {/* Social Media Column (Span 2) */}
                    <div className="lg:col-span-2 flex flex-col items-start">
                        <h3 className="text-[#0088ff] font-bold text-sm md:text-base uppercase tracking-widest mb-6 border-b border-blue-100/50 pb-2 w-fit">Social</h3>
                        <div className="flex flex-col gap-4">
                            {[
                                { name: 'Facebook', icon: Facebook },
                                { name: 'Instagram', icon: Instagram },
                                { name: 'LinkedIn', icon: Linkedin },
                                { name: 'YouTube', icon: Youtube },
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="flex items-center gap-3 text-gray-500 text-sm md:text-[15px] hover:text-[#0088ff] transition-all group"
                                >
                                    <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:scale-110 transition-all text-[#0088ff] group-hover:shadow-md border border-blue-50/50">
                                        <social.icon size={16} strokeWidth={2} />
                                    </span>
                                    <span className="font-poppins group-hover:translate-x-1 transition-transform">{social.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Centered & Balanced */}
                <div className="pt-8 border-t border-blue-100/60">
                    <div className="text-gray-400 text-xs md:text-[13px] font-poppins text-center opacity-80">
                        2025 © BioMed | <Link href="#" className="hover:text-[#0088ff] transition-colors">Privacy Policy</Link> | <Link href="#" className="hover:text-[#0088ff] transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
