"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import logo from "./assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <Image
              src={logo}
              alt="BioMed Canada Logo"
              width={200}
              height={60}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { name: "Home", href: "/", active: true },
              { name: "Clinical Research", href: "/clinical-research" },
              { name: "Corporate Training", href: "/corporate-training" },
              { name: "Courses", href: "#" },
              { name: "Blog", href: "/blogs" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[15px] font-medium transition-colors duration-200 ${link.active ? "text-[#0088ff] font-semibold" : "text-gray-600 hover:text-[#0088ff]"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section: Icons & Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            <button className="text-gray-700 hover:text-[#0088ff] transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {/* Optional: Add badge if needed */}
            </button>
            <Link href="/login" className="text-[15px] font-medium text-gray-700 hover:text-[#0088ff] transition-colors">
              Login
            </Link>
            <button className="bg-[#0088ff] text-white px-6 py-2.5 rounded-full font-medium text-[15px] shadow-[0_4px_0_#0066cc] active:shadow-none active:translate-y-[4px] transition-all hover:bg-[#1a93ff]">
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#0088ff] focus:outline-none p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg transition-all duration-300 ease-in-out origin-top ${isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
          }`}
      >
        <div className="flex flex-col p-4 space-y-4">
          {[
            { name: "Home", href: "/" },
            { name: "Clinical Research", href: "/clinical-research" },
            { name: "Corporate Training", href: "/corporate-training" },
            { name: "Courses", href: "#" },
            { name: "Blog", href: "/blogs" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-[#0088ff] hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors text-[15px]"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="border-t border-gray-100 my-2 pt-2 space-y-3">
            <Link
              href="/login"
              className="flex items-center gap-2 text-gray-600 hover:text-[#0088ff] px-4 py-2 rounded-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" /> Login
            </Link>
            <button className="w-full bg-[#0088ff] text-white py-3 rounded-full font-medium shadow-[0_4px_0_#0066cc] active:shadow-none active:translate-y-[4px] transition-all hover:bg-[#1a93ff]">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
