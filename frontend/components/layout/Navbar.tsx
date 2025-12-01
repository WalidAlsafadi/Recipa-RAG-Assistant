"use client";

import React, { useState } from "react";
import { Menu, X, Github } from "lucide-react";
import { NAV_SECTIONS, GITHUB_URL } from "@/lib/constants";
import { ModeToggle } from "@/components/ui/mode-toggle"; // Import Toggle
interface NavbarProps {
  scrolled: boolean;
  activeSection: string;
  onScrollTo: (id: string) => void;
}

export default function Navbar({ scrolled, activeSection, onScrollTo }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollTo(id);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile menu" className="fixed inset-0 z-[60] bg-white animate-in slide-in-from-right-full duration-300 md:hidden flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <span className="font-bold text-xl text-gray-900">
              Recipa<span className="text-orange-600">AI</span>
            </span>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <X className="h-7 w-7" />
            </button>
          </div>
          <div className="flex flex-col p-6 gap-4">
            {NAV_SECTIONS.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`w-full text-left text-2xl font-bold py-4 border-b border-gray-50 transition-colors ${
                  activeSection === item.id ? "text-orange-600" : "text-gray-800"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white border-gray-200 shadow-md py-3" // FIX: Solid white, no transparency
            : "bg-transparent border-transparent py-4 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <button aria-label="Go to top" className="cursor-pointer group w-auto md:w-64 text-left" onClick={() => onScrollTo("hero")}>
            <span className={`font-extrabold text-lg md:text-2xl transition-colors duration-300 ${scrolled ? "text-slate-900" : "text-white"}`}>
              Recipa<span className="text-orange-500">AI</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center justify-center">
            <div className={`flex gap-2 p-2 rounded-full border transition-all ${scrolled ? "bg-gray-100 border-gray-200" : "bg-black/20 border-white/10 backdrop-blur-md"}`}>
              {NAV_SECTIONS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onScrollTo(item.id)}
                  className={`px-5 py-2 rounded-full text-base font-bold transition-all ${
                    activeSection === item.id
                      ? "bg-orange-600 text-white shadow-md"
                      : scrolled
                      ? "text-slate-600 hover:bg-white hover:shadow-sm"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Github & Mobile Toggle */}
          <div className="flex items-center gap-4 w-auto md:w-64 justify-end">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all ${
                scrolled ? "text-slate-900 border-slate-200 hover:bg-slate-50" : "text-white border-white/30 hover:bg-white/10"
              }`}
            >
              <Github className="h-5 w-5" />
              <span className="font-bold text-sm">GitHub</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className={`md:hidden p-2 rounded-lg ${scrolled ? "text-slate-900" : "text-white"}`}
            >
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}