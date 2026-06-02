"use client";

import React, { useState, useEffect } from "react";
import { playBootSound } from "@/lib/sounds";

interface BootSequenceProps {
  onComplete: () => void;
}

const bootLines = [
  "INITIALIZING YASWANTHOS v9.00 — CONNECTING NEURAL INTERFACE...",
  "================================================================",
  "> Initializing YaswanthOS kernel services .................. OK",
  "> Connecting neural interface matrix links ................. OK",
  "> Loading cognitive AI core models & intent parsers ........ OK",
  "> Synchronizing active projects gallery telemetry (8) ...... OK",
  "> Resolving Saveetha academic benchmarks (8.77 CPI) ........ OK",
  "> Cataloging 'Breaking the Code' published textbook ........ OK",
  "> Mounting Palamaner and Andhra home quadrants ............. OK",
  "> Checking empathetic Granite assistants (Watsonx) ......... OK",
  "> Synchronizing haptic synthesizers & mechanical nodes ..... OK",
  "",
  "Connecting Neural Interface...",
  "Loading AI Models...",
  "Loading Projects...",
  "Welcome Back.",
  "████████████████████████████████████ 100%"
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [crashed, setCrashed] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Play boot sound chime automatically
    playBootSound();

    // Staggered boot lines
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        
        // Trigger white strobe crash at last line
        if (index === bootLines.length - 1) {
          setTimeout(() => {
            setCrashed(true);
            setTimeout(() => {
              onComplete();
            }, 500); // end crash strobe and load desktop
          }, 350);
        }
      }, index * 220);
    });

    // Show skip button after 1.5 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1500);

    return () => clearTimeout(skipTimer);
  }, [onComplete]);

  const handleSkip = () => {
    playBootSound();
    setCrashed(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 w-full h-full bg-black z-[99999] flex flex-col justify-between p-6 md:p-12 select-none font-mono ${
        crashed ? "bg-white crashed-screen" : ""
      }`}
    >
      <div className="flex-1 overflow-y-auto space-y-1">
        {!crashed &&
          lines.map((line, idx) => {
            let color = "text-[#00FF41]";
            if (line.includes("WARNING")) {
              color = "text-yellow-400 font-bold";
            } else if (line.includes("100%")) {
              color = "text-[#00FF88] font-bold";
            } else if (line.startsWith("INITIALIZING YASWANTHOS")) {
              color = "text-[#00D4FF] font-extrabold text-sm md:text-base";
            }
            return (
              <div key={idx} className={`${color} text-xs md:text-sm leading-relaxed whitespace-pre-wrap`}>
                {line}
              </div>
            );
          })}
        {crashed && (
          <div className="w-full h-full flex flex-col justify-center items-center text-black font-extrabold text-2xl tracking-widest unbounded animate-pulse">
            [SYSTEM REBOOTED]
            <br />
            RECOVERING...
          </div>
        )}
      </div>

      {/* Skip Button */}
      {!crashed && showSkip && (
        <div className="flex justify-end select-none">
          <button
            onClick={handleSkip}
            className="px-4 py-1.5 border border-[#00FF41]/45 hover:border-[#00FF41] bg-[#00FF41]/5 hover:bg-[#00FF41]/20 text-[#00FF41] text-xs tracking-widest uppercase hover:scale-105 transition-all duration-200"
          >
            [SKIP BOOT] &gt;&gt;
          </button>
        </div>
      )}
    </div>
  );
};
