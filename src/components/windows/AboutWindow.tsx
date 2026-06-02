"use client";

import React from "react";
import { Calendar, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { playClickSound } from "@/lib/sounds";
import { useXPSystem } from "@/components/effects/XPSystem";

interface AboutWindowProps {
  onTriggerContact: () => void;
}

export const AboutWindow: React.FC<AboutWindowProps> = ({ onTriggerContact }) => {
  const xpSystem = useXPSystem();
  const timelineEvents = [
    {
      year: "2021",
      title: "The Genesis",
      loc: "Chennai",
      desc: "Began Computer Science Engineering at Saveetha University. Mastered Python and built first data pipelines."
    },
    {
      year: "2022",
      title: "Authoring Success",
      loc: "Saveetha",
      desc: "Wrote and published physical book 'Breaking the Code' to aid peers struggling with modular codebase architecture."
    },
    {
      year: "2023",
      title: "AI & NLP Deployment",
      loc: "ArmsofTech.AI",
      desc: "Engineered voice chat systems with Protocol Buffers, optimizing payloads by 40% and latency by 30%."
    },
    {
      year: "2024",
      title: "DTC & IBM Hackathons",
      loc: "Saveetha / IBM",
      desc: "Launched The Rythu direct-sales app. Built SheCodes.AI on Watsonx Granite, winning national level recognitions."
    },
    {
      year: "2025 - Present",
      title: "Ready to Ship",
      loc: "Bengaluru",
      desc: "Architecting interactive AI systems that think and beautiful user interfaces that feel completely alive."
    }
  ];

  return (
    <div className="p-6 space-y-8 select-text">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center border-b border-white/10 pb-6">
        {/* Profile picture holder with RGB glitch styling */}
        <div
          data-cursor="image"
          onClick={() => {
            playClickSound(0.3);
            xpSystem.incrementStat("profileClicks");
          }}
          className="relative group w-32 h-44 md:w-48 md:h-64 border border-white/20 bg-black rounded-lg overflow-hidden shrink-0 cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/veer.jpg"
            alt="Veer Deployed Mockup"
            className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105"
          />
          {/* Glitch Overlay effect */}
          <div className="absolute inset-0 bg-[#00D4FF]/10 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none" />
          <div className="absolute inset-0 bg-[#FF0080]/10 mix-blend-color-burn opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 bg-black/60 py-1 text-[10px] font-mono text-center tracking-widest text-[#00FF88] uppercase opacity-75 pointer-events-none">
            GLITCH_ME
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <span className="bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase font-semibold">
              SWE × AI-ML × UI/UX
            </span>
          </div>
          <h1 className="hero-text text-3xl font-extrabold text-white">
            YASWANTH VEER
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-xl">
            I am a Computer Science Engineer and author based in Bengaluru, India. I specialize in developing AI systems that process complex user intents and designing visual interfaces that feel tactile and responsive.
          </p>
        </div>
      </div>

      {/* Main Core Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-white/80">
        <div className="space-y-4">
          <h2 className="title-mono text-xs tracking-wider uppercase text-[#FF0080] font-semibold border-b border-white/5 pb-1">
            &gt; whoami
          </h2>
          <ul className="space-y-2 font-mono text-xs">
            <li><span className="text-[#00D4FF]">&gt; University:</span> Saveetha University (Chennai)</li>
            <li><span className="text-[#00D4FF]">&gt; Academic CPI:</span> 8.77 / 10.0 (Annoyingly consistent)</li>
            <li><span className="text-[#00D4FF]">&gt; Focus Area:</span> Speech NLP, empathetic Granite LLMs, high-fi UI</li>
            <li><span className="text-[#00D4FF]">&gt; Deployed Bots:</span> 8+ Conversational Voice Services</li>
            <li><span className="text-[#00D4FF]">&gt; Status:</span> 🟢 Available for SWE / AI-ML Roles</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="title-mono text-xs tracking-wider uppercase text-[#00FF88] font-semibold border-b border-white/5 pb-1">
            &gt; system_mission
          </h2>
          <p className="text-xs leading-relaxed">
            I do not believe in boring engineering. I spent my university tenure shipping premium DTC platforms for mango farmers, Watsonx granite assistants for returning mothers, and zero-fee jobs dashboards. If the code is robust but the interface is ugly, the system is broken. I build products that function flawlessly and look stunning.
          </p>
        </div>
      </div>

      {/* HORIZONTAL TIMELINE */}
      <div className="space-y-4">
        <h2 className="title-mono text-xs tracking-wider uppercase text-white font-semibold flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-[#00D4FF]" />
          <span>Horizontal Telemetry [Career Milestones]</span>
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 window-scroll snap-x">
          {timelineEvents.map((event, idx) => (
            <div
              key={idx}
              className="min-w-[240px] md:min-w-[280px] bg-white/5 border border-white/10 p-4 rounded-lg snap-start flex flex-col justify-between hover:border-white/20 transition group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-[#00D4FF] unbounded">{event.year}</span>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/60">
                    {event.loc}
                  </span>
                </div>
                <h3 className="font-bold text-white group-hover:text-[#00FF88] transition text-sm">
                  {event.title}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FUN FACTS AS ERROR LOGS */}
      <div className="space-y-4">
        <h2 className="title-mono text-xs tracking-wider uppercase text-white font-semibold flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-[#FFEB00]" />
          <span>System Bug Reports & Logs [Fun Facts]</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-[#FF0080]/5 border border-[#FF0080]/20 p-3 rounded flex items-start space-x-2 text-[#FF0080]">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <span className="font-extrabold">[ERROR] 002:</span> Published a textbook while debugging production instances.
            </div>
          </div>
          <div className="bg-[#FFEB00]/5 border border-[#FFEB00]/20 p-3 rounded flex items-start space-x-2 text-[#FFEB00]">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <span className="font-extrabold">[WARNING] 007:</span> Designed DTC platforms for mango farmers AND optimized ML parameters for corporate pipelines.
            </div>
          </div>
          <div className="bg-[#00D4FF]/5 border border-[#00D4FF]/20 p-3 rounded flex items-start space-x-2 text-[#00D4FF]">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <span className="font-extrabold">[INFO] 015:</span> Shipped 15+ complex client projects with a suspicious 100% satisfaction rating.
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center pt-4 border-t border-white/10">
        <button
          onClick={() => {
            playClickSound(0.4);
            onTriggerContact();
          }}
          className="px-6 py-2 bg-gradient-to-r from-[#FF0080] to-[#00D4FF] text-white font-bold tracking-widest text-xs uppercase rounded-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition duration-300"
        >
          &gt; Initiate Direct Recruiter Uplink
        </button>
      </div>
    </div>
  );
};
