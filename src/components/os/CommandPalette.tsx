"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Search } from "lucide-react";
import { playClickSound } from "@/lib/sounds";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteCommand: (cmdId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onExecuteCommand,
}) => {
  const [input, setInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    { id: "about", label: "about yaswanth", desc: "👤 Open bio, timeline, and error log facts" },
    { id: "projects", label: "open projects", desc: "📂 Launch active projects showcase" },
    { id: "skills", label: "show skills", desc: "📊 Inspect interactive JSON skills tree" },
    { id: "resume", label: "open resume", desc: "📄 Trigger career telemetry PDF analytics" },
    { id: "contact", label: "hire yaswanth", desc: "⚙️ Initiate CONTACT.sh uplink connection" },
    { id: "chatbot", label: "launch ai lab", desc: "🤖 Start YASWANTH_BOT.app conversation" },
    { id: "secret", label: "secret", desc: "🎁 Decrypt mystery binary payload folder" },
  ];

  // Filter commands
  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setInput("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          playClickSound(0.45);
          onExecuteCommand(filtered[selectedIndex].id);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, onExecuteCommand]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-md z-[99999] flex items-start md:items-center justify-center p-4 pt-[15vh] md:pt-4">
      {/* Click outside to close */}
      <div className="absolute inset-0 w-full h-full" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-lg bg-[#0F0F15]/95 border border-[#00D4FF]/30 rounded-xl overflow-hidden shadow-2xl relative z-10 flex flex-col font-mono"
        style={{
          boxShadow: "0 20px 50px rgba(0, 212, 255, 0.15)",
        }}
      >
        {/* Header CLI prompt input */}
        <div className="flex items-center space-x-3 px-4 py-3 border-b border-white/10 bg-white/5">
          <Search className="w-4 h-4 text-[#00D4FF]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or query YaswanthOS..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-xs text-white placeholder-white/35 outline-none"
          />
          <span className="text-[9px] text-[#00FF88] border border-[#00FF88]/30 px-1.5 py-0.5 rounded">
            SYS_CON
          </span>
        </div>

        {/* Commands List */}
        <div className="flex-1 max-h-[280px] overflow-y-auto py-2 window-scroll bg-black/30">
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-white/40 italic">
              No matching system commands found. Try &apos;open&apos; or &apos;skills&apos;.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const active = selectedIndex === idx;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    playClickSound(0.45);
                    onExecuteCommand(cmd.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-4 py-3 cursor-pointer flex items-center justify-between transition border-l-2 ${
                    active
                      ? "bg-white/10 text-white border-[#00D4FF]"
                      : "text-white/60 border-transparent hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Terminal className={`w-3.5 h-3.5 ${active ? "text-[#00D4FF]" : "text-white/30"}`} />
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold ${active ? "text-[#00D4FF]" : ""}`}>
                        &gt; {cmd.label}
                      </span>
                      <span className="text-[9px] text-white/40 mt-0.5">{cmd.desc}</span>
                    </div>
                  </div>
                  {active && (
                    <span className="text-[8px] bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 px-1.5 py-0.5 rounded select-none uppercase font-bold animate-pulse">
                      Execute ⏎
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 border-t border-white/5 bg-black/40 flex items-center justify-between text-[8px] text-white/30 select-none">
          <span>Navigate with ↑↓ arrows</span>
          <span>Press [Esc] to exit</span>
        </div>
      </motion.div>
    </div>
  );
};
