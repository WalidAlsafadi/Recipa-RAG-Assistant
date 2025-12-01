import React from "react";
import { Sparkles } from "lucide-react"; // Removed ArrowDown
import { Button } from "@/components/ui/button";

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  return (
    <section 
      id="hero"
      role="region"
      aria-labelledby="hero-heading"
      // Use h-screen with min-h-dvh fallback for better mobile app compatibility
      // h-screen works better on PWAs and native mobile contexts
      className="relative w-full h-screen min-h-dvh flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

      <div className="relative z-10 text-center max-w-[90rem] mx-auto flex flex-col items-center justify-center" tabIndex={-1}>
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest shadow-2xl animate-in fade-in zoom-in duration-1000">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
          <span>AI-Powered Culinary Intelligence</span>
        </div>

        {/* --- MAIN PILLAR (TITLE) --- */}
        <h1 id="hero-heading" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-extrabold text-white mb-6 sm:mb-8 tracking-tight leading-[0.9] drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Precision <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-500">
            Cooking.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-gray-100 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 px-2 sm:px-4">
          A professional tool for exploring <strong className="text-white">The Low-Cost Cookbook</strong> with accuracy, speed, and ease.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <Button
            onClick={() => onScrollTo("qa-section")}
            size="lg"
            aria-label="Try RecipaAI now"
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl border-2 border-orange-500 shadow-2xl font-bold tracking-wide w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
          >
            Try It Now!
          </Button>
          <Button
            onClick={() => onScrollTo("how-it-works")}
            variant="outline"
            size="lg"
            className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/40 rounded-xl px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl backdrop-blur-sm font-bold tracking-wide w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            aria-label="View system architecture"
          >
            System Architecture
          </Button>
        </div>
      </div>
      
     
    </section>
  );
}