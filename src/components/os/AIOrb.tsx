"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ChevronRight } from "lucide-react";
import { playClickSound, playBeepSound } from "@/lib/sounds";

interface AIOrbProps {
  onOpenWindow: (winId: string) => void;
}

export const AIOrb: React.FC<AIOrbProps> = ({ onOpenWindow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [replyText, setReplyText] = useState("Awaiting secure uplink... Query me anything.");
  const [isTyping, setIsTyping] = useState(false);

  const prompts = [
    { label: "Who is Yaswanth?", q: "whoami", response: "Yaswanth Veer is a 22-year-old developer born in Palamaner and based in Bengaluru. He publishes textbook blueprints, engineers empathetic LLM agents, and designs visuals that feel like sharp, unstable fever dreams." },
    { label: "Show AI projects", q: "ai_proj", response: "Affirmative. Launching PROJECTS_GALLERY.exe featuring voice chat protocol payloads and empathetic IBM hackathon pipelines. Initiating sector mount...", targetWin: "projects" },
    { label: "Show startups", q: "startup", response: "Affirmative. Yaswanth built DTC direct platforms for mango farmers ('The Rythu') to cut middlemen, assisting 9,000+ peers. Mounting projects gallery...", targetWin: "projects" },
    { label: "Download resume", q: "resume", response: "Affirmative. Initializing download protocol for resume telemetry, mounting PDF sector analytics...", targetWin: "resume" },
    { label: "Contact Yaswanth", q: "contact", response: "Affirmative. Opening secure communication socket channel to transmit encrypted payload...", targetWin: "contact" },
  ];

  const handlePromptClick = (p: typeof prompts[0]) => {
    if (isTyping) return;
    playClickSound(0.35);
    setIsTyping(true);
    setReplyText("");
    
    const fullText = p.response;
    let idx = 0;
    
    // Simulate Jarvis terminal typing
    const typingInterval = setInterval(() => {
      setReplyText((prev) => prev + fullText.charAt(idx));
      idx++;
      if (idx >= fullText.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        // Trigger action after typing
        if (p.targetWin) {
          setTimeout(() => {
            onOpenWindow(p.targetWin);
          }, 600);
        }
      }
    }, 18);
  };

  return (
    <div className="fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px))] right-4 z-[99999] select-none font-mono">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-80 bg-[#0F0F15]/95 border border-[#00D4FF]/30 rounded-2xl overflow-hidden shadow-2xl p-4 space-y-4"
            style={{
              boxShadow: "0 10px 40px rgba(0, 212, 255, 0.15)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                  JARVIS.AI // ONLINE
                </span>
              </div>
              <button
                onClick={() => {
                  playClickSound(0.3);
                  setIsOpen(false);
                }}
                className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Response Console screen */}
            <div className="bg-black/50 border border-white/10 p-3 rounded-lg min-h-[90px] flex flex-col justify-between">
              <p className="text-[10px] leading-relaxed text-[#00D4FF]">
                {replyText}
                {isTyping && <span className="animate-pulse">_</span>}
              </p>
              <div className="text-[7px] text-white/30 text-right uppercase mt-2">
                Secure Uplink Telemetry
              </div>
            </div>

            {/* Prompt Quick Chips */}
            <div className="space-y-2 pt-1">
              <div className="text-[8px] uppercase tracking-wider text-white/40">
                Quick Prompts
              </div>
              <div className="flex flex-col space-y-1.5 max-h-[140px] overflow-y-auto pr-1 window-scroll">
                {prompts.map((p, idx) => (
                  <button
                    key={idx}
                    disabled={isTyping}
                    onClick={() => handlePromptClick(p)}
                    className="w-full text-left px-2.5 py-1.5 bg-white/5 hover:bg-[#00D4FF]/10 border border-white/10 hover:border-[#00D4FF]/30 rounded-lg text-[9px] text-white/70 hover:text-white flex items-center justify-between transition group"
                  >
                    <span>{p.label}</span>
                    <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-[#00D4FF] group-hover:translate-x-0.5 transition" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing floating JARVIS Orb */}
      <motion.button
        onClick={() => {
          playBeepSound();
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00D4FF]/30 to-[#FF0080]/30 border border-[#00D4FF]/50 flex items-center justify-center shadow-lg relative group overflow-hidden"
        style={{
          boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
        }}
      >
        {/* Breathing backdrop animation */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-[#00D4FF]/20 filter blur-sm"
        />

        <Sparkles className="w-5 h-5 text-[#00D4FF] animate-pulse relative z-10 group-hover:scale-110 transition duration-300" />
      </motion.button>
    </div>
  );
};
