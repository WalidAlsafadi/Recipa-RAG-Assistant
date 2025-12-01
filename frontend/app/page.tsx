"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Architecture from "@/components/home/Architecture";
import QAEngine from "@/components/home/QAEngine";
import Team from "@/components/home/Team";
import { NAV_SECTIONS } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy"; // NEW HOOK

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  
  // Use the new hook!
  const activeSection = useScrollSpy(NAV_SECTIONS.map(s => s.id));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900 dark:bg-slate-950 dark:text-white">
      <Navbar scrolled={scrolled} activeSection={activeSection} onScrollTo={scrollToSection} />
      <main>
        <Hero onScrollTo={scrollToSection} />
        <Architecture />
        <QAEngine />
        <Team />
      </main>
      <Footer onScrollToTop={() => scrollToSection("hero")} />
    </div>
  );
}