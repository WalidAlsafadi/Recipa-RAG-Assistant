import React from "react";
import { ARCHITECTURE_STEPS } from "@/lib/constants";

export default function Architecture() {
  return (
    <section 
      id="how-it-works" 
      className="min-h-screen flex flex-col justify-center py-20 bg-white border-b border-gray-200 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)", 
          backgroundSize: "32px 32px" 
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
            System Architecture
          </h2>
          <div className="w-24 h-2 bg-orange-500 mx-auto mb-6 rounded-full" />
          <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Leveraging vector embeddings and Large Language Models for precise information retrieval.
          </p>
        </div>

        {/* REMOVED: The diagram image section was here */}

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ARCHITECTURE_STEPS.map((item, idx) => (
            <div 
              key={idx} 
              className="p-10 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 bg-white group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 border border-orange-100 group-hover:bg-orange-600 group-hover:border-orange-600 transition-colors">
                <item.icon className="h-8 w-8 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}