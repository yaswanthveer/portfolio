"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { playSuccessSound } from "@/lib/sounds";

interface Badge {
  id: string;
  name: string;
  desc: string;
  xp: number;
}

interface XPSystemContextType {
  xp: number;
  unlockedBadges: string[];
  triggerAchievement: (id: string) => void;
  incrementStat: (name: string) => void;
}

const XPSystemContext = createContext<XPSystemContextType | undefined>(undefined);

const BADGES_DATABASE: Record<string, Badge> = {
  explorer: { id: "explorer", name: "Curious Explorer", desc: "Clicked profile image 5 times", xp: 50 },
  multitasker: { id: "multitasker", name: "Multitasking Wizard", desc: "Opened 5 floating application windows", xp: 100 },
  researcher: { id: "researcher", name: "Tech Researcher", desc: "Viewed details of 3 case studies", xp: 100 },
  hunter: { id: "hunter", name: "Easter Egg Hunter", desc: "Discovered a hidden OS command prompt secret", xp: 150 },
};

export const XPSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [toasts, setToasts] = useState<{ id: string; badge: Badge }[]>([]);
  const [, setStats] = useState<Record<string, number>>({ windowsOpened: 0, projectsViewed: 0, profileClicks: 0 });

  // Load from localStorage on mount
  useEffect(() => {
    const savedXp = localStorage.getItem("yaswanth_os_xp");
    const savedBadges = localStorage.getItem("yaswanth_os_badges");
    if (savedXp) setXp(parseInt(savedXp));
    if (savedBadges) setUnlockedBadges(JSON.parse(savedBadges));
  }, []);

  const triggerAchievement = (id: string) => {
    const badge = BADGES_DATABASE[id];
    if (!badge || unlockedBadges.includes(id)) return;

    // Play Synthesized Cyber Arpeggio
    playSuccessSound();

    const nextBadges = [...unlockedBadges, id];
    const nextXp = xp + badge.xp;

    setUnlockedBadges(nextBadges);
    setXp(nextXp);

    localStorage.setItem("yaswanth_os_xp", nextXp.toString());
    localStorage.setItem("yaswanth_os_badges", JSON.stringify(nextBadges));

    // Push Toast
    const toastId = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id: toastId, badge }]);

    // Remove toast after 5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 5000);
  };

  const incrementStat = (name: string) => {
    setStats((prev) => {
      const nextVal = (prev[name] || 0) + 1;
      const nextStats = { ...prev, [name]: nextVal };

      // Achievements Checks
      if (name === "profileClicks" && nextVal === 5) {
        triggerAchievement("explorer");
      }
      if (name === "windowsOpened" && nextVal === 5) {
        triggerAchievement("multitasker");
      }
      if (name === "projectsViewed" && nextVal === 3) {
        triggerAchievement("researcher");
      }

      return nextStats;
    });
  };

  return (
    <XPSystemContext.Provider value={{ xp, unlockedBadges, triggerAchievement, incrementStat }}>
      {children}

      {/* Cyber Toast Overlay container */}
      <div className="fixed bottom-16 right-4 flex flex-col space-y-3 z-[999999] pointer-events-none max-w-sm w-full select-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ x: 320, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 320, opacity: 0, scale: 0.9 }}
              className="bg-[#0F0F15]/95 border border-[#FF0080]/30 rounded-xl p-4 flex items-center space-x-3.5 shadow-2xl relative overflow-hidden pointer-events-auto font-mono"
              style={{
                boxShadow: "0 10px 30px rgba(255, 0, 128, 0.15)",
              }}
            >
              {/* Gold light sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF0080]/5 to-transparent -translate-x-full animate-[pulse_3s_infinite]" />

              <div className="w-10 h-10 rounded-lg bg-[#FF0080]/10 border border-[#FF0080]/30 flex items-center justify-center text-[#FF0080] shrink-0">
                <Trophy className="w-5 h-5 animate-bounce" />
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="text-[9px] font-bold text-[#FF0080] tracking-widest uppercase">
                  ⭐ ACHIEVEMENT UNLOCKED!
                </div>
                <div className="text-xs font-bold text-white leading-tight">
                  {t.badge.name}
                </div>
                <div className="text-[9px] text-white/50 leading-tight">
                  {t.badge.desc}
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-center justify-center bg-[#00FF88]/10 border border-[#00FF88]/20 px-2 py-1.5 rounded">
                <span className="text-[10px] font-extrabold text-[#00FF88]">+{t.badge.xp}</span>
                <span className="text-[7px] text-[#00FF88]/70 uppercase font-bold tracking-wider mt-0.5">XP</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </XPSystemContext.Provider>
  );
};

export const useXPSystem = () => {
  const context = useContext(XPSystemContext);
  if (!context) throw new Error("useXPSystem must be used within a XPSystemProvider");
  return context;
};
