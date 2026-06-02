"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Wifi, Cpu, Clock, Terminal } from "lucide-react";
import { setMuted, getMuted, playClickSound } from "@/lib/sounds";
import { Magnetic } from "../effects/Magnetic";

interface TaskbarProps {
  openWindows: { id: string; title: string; isMinimized: boolean; isOpen: boolean }[];
  activeWindowId: string | null;
  onRestoreWindow: (id: string) => void;
  onToggleTheme: () => void;
  cpuUsage: number;
  onOpenRootTerminal: () => void;
  onOpenCommandPalette?: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  activeWindowId,
  onRestoreWindow,
  onToggleTheme,
  cpuUsage,
  onOpenRootTerminal,
  onOpenCommandPalette,
}) => {
  const [timeStr, setTimeStr] = useState("");
  const [soundMuted, setSoundMuted] = useState(false);
  const [isMelting, setIsMelting] = useState(false);

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen to sound volume mute/unmute
  useEffect(() => {
    setSoundMuted(getMuted());
  }, []);

  // Trigger melting strobe if CPU usage reaches 100%
  useEffect(() => {
    if (cpuUsage >= 100 && !isMelting) {
      setIsMelting(true);
      const timer = setTimeout(() => {
        setIsMelting(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [cpuUsage, isMelting]);

  const handleToggleSound = () => {
    const newMuted = !soundMuted;
    setMuted(newMuted);
    setSoundMuted(newMuted);
    if (!newMuted) playClickSound(0.4);
  };

  const handleTabClick = (id: string) => {
    playClickSound(0.3);
    onRestoreWindow(id);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 h-[52px] taskbar z-[9999] flex items-center justify-between px-4 select-none font-mono text-xs">
      {/* Left: Brand Badge start button */}
      <div className="flex items-center space-x-3">
        <Magnetic>
          <button
            onClick={() => {
              playClickSound(0.4);
              onToggleTheme();
            }}
            className="h-9 px-3 rounded taskbar-btn flex items-center justify-center space-x-1 hover:scale-105"
            title="Toggle Cream Light Theme (Reboots System)"
          >
            <span className="unbounded font-extrabold text-[#00D4FF] animate-pulse">⚡ Y.V</span>
          </button>
        </Magnetic>

        {/* Root CLI shortcut */}
        <Magnetic>
          <button
            onClick={() => {
              playClickSound(0.4);
              onOpenRootTerminal();
            }}
            className="p-2 rounded taskbar-btn flex items-center justify-center hidden sm:flex"
            title="Execute Root CLI Shell"
          >
            <Terminal className="w-4 h-4 text-[#00FF88]" />
          </button>
        </Magnetic>

        {/* Command Palette shortcut */}
        <Magnetic>
          <button
            onClick={() => {
              playClickSound(0.4);
              onOpenCommandPalette?.();
            }}
            className="h-9 w-9 rounded taskbar-btn flex items-center justify-center font-mono text-[9px] font-extrabold text-[#00D4FF]"
            title="Open Command Palette (⌘+K / /)"
          >
            <span>⌘K</span>
          </button>
        </Magnetic>
      </div>

      {/* Center: Open Window Tabs */}
      <div className="flex-1 flex items-center justify-start px-6 space-x-2 overflow-x-auto scrollbar-none max-w-xl md:max-w-2xl">
        {openWindows.map(
          (win) =>
            win.isOpen && (
              <button
                key={win.id}
                onClick={() => handleTabClick(win.id)}
                className={`px-3 py-1.5 rounded border text-[10px] uppercase font-bold tracking-wider transition-all duration-200 shrink-0 max-w-[120px] truncate ${
                  activeWindowId === win.id
                    ? "bg-[#00D4FF]/15 text-[#00D4FF] border-[#00D4FF]"
                    : win.isMinimized
                    ? "bg-black/20 text-[var(--text-secondary)] border-[var(--border)]"
                    : "taskbar-btn"
                }`}
              >
                {win.title.replace(".exe", "").replace(".app", "").replace(".json", "").replace(".sh", "").replace(".pdf", "")}
              </button>
            )
        )}
      </div>

      {/* Right: Telemetry metrics */}
      <div className="flex items-center space-x-4">
        {/* Scroll CPU Meter */}
        <div 
          className={`flex items-center space-x-1.5 hidden md:flex ${
            isMelting ? "text-red-500 animate-pulse font-extrabold" : "text-[var(--text-secondary)]"
          }`}
          title="CPU load increases as scroll depth increases"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span className="text-[10px]">
            {isMelting ? "CPU_MELT" : `CPU: ${Math.round(cpuUsage)}%`}
          </span>
          <div className="w-12 h-2 bg-white/10 border border-white/15 rounded-full overflow-hidden relative">
            <div 
              className={`h-full rounded-full transition-all duration-300 absolute left-0 top-0 ${
                isMelting ? "bg-red-500" : "bg-[#00FF88]"
              }`}
              style={{ width: `${cpuUsage}%` }}
            />
          </div>
        </div>

        {/* Wifi Connected Node */}
        <div className="flex items-center space-x-1 text-[#00FF88] hidden md:flex" title="Wi-Fi Signal: Strong Encryption socket connected">
          <Wifi className="w-3.5 h-3.5" />
          <span className="text-[10px] hidden lg:inline">ONLINE</span>
        </div>

        {/* Sound toggle */}
        <button
          onClick={handleToggleSound}
          className="p-1.5 taskbar-btn rounded transition shrink-0"
          title={soundMuted ? "Unmute click sounds" : "Mute click sounds"}
        >
          {soundMuted ? <VolumeX className="w-3.5 h-3.5 text-[var(--text-secondary)]" /> : <Volume2 className="w-3.5 h-3.5 text-[#00D4FF]" />}
        </button>

        {/* Digital Time clock */}
        <div className="flex items-center space-x-1.5 text-[var(--text-primary)] font-bold hidden sm:flex shrink-0" title="User Machine Time">
          <Clock className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
          <span>{timeStr}</span>
        </div>
      </div>
    </div>
  );
};
