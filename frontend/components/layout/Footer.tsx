import React from "react";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 py-20 relative z-10 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-2xl font-bold text-slate-900 mb-6">
          Recipa<span className="text-orange-600">AI</span>
        </div>
        <p className="text-slate-500 mb-10 max-w-lg mx-auto">
          A professional RAG demonstration built with precision engineering.
        </p>
        <button
          onClick={onScrollToTop}
          aria-label="Scroll to top"
          className="mb-8 p-3 bg-gray-100 rounded-full text-slate-500 hover:bg-orange-600 hover:text-white transition-colors"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
          &copy; 2025 RecipaAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}