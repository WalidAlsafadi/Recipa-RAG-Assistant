import React from "react";
import Image from "next/image";
import { Linkedin, Github, Mail } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/constants";

export default function Team() {
  return (
    <section id="team" className="min-h-screen flex flex-col justify-center py-20 bg-white relative overflow-hidden">
       {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-6xl font-extrabold text-gray-900 mb-4">Engineering Team</h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="group bg-white p-10 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="relative w-40 h-40 mb-6">
                <div className="absolute inset-0 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden group-hover:border-orange-100 transition-colors">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-bold text-gray-900 text-2xl mb-2">{member.name}</h3>
                <p className="text-orange-600 text-sm uppercase font-bold mb-6">{member.role}</p>
              </div>

              <div className="flex gap-4 mt-auto">
                <a href={member.linkedin} target="_blank" className="p-2 rounded-full text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all"><Linkedin className="h-5 w-5" /></a>
                <a href={member.github} target="_blank" className="p-2 rounded-full text-gray-400 hover:bg-[#333] hover:text-white transition-all"><Github className="h-5 w-5" /></a>
                <a href={member.email} className="p-2 rounded-full text-gray-400 hover:bg-orange-500 hover:text-white transition-all"><Mail className="h-5 w-5" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}