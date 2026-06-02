"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { AboutWindow } from "../windows/AboutWindow";
import { ProjectsWindow } from "../windows/ProjectsWindow";
import { SkillsWindow } from "../windows/SkillsWindow";
import { ResumeWindow } from "../windows/ResumeWindow";
import { ChatbotWindow } from "../windows/ChatbotWindow";
import { Terminal } from "./Terminal";
import { playClickSound, playBeepSound, playSuccessSound } from "@/lib/sounds";
import canvasConfetti from "canvas-confetti";
import { useXPSystem } from "../effects/XPSystem";
import { CommandPalette } from "./CommandPalette";
import { AIOrb } from "./AIOrb";
import { Magnetic } from "../effects/Magnetic";

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  accentColor: string;
  initialX: number;
  initialY: number;
  defaultWidth?: string;
  defaultHeight?: string;
}

export const Desktop: React.FC = () => {
  // XP System context hooks
  const { xp, unlockedBadges, triggerAchievement, incrementStat } = useXPSystem();

  // Command palette state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Background Parallax spring coordinate offsets
  const gridX = useSpring(0, { stiffness: 70, damping: 22 });
  const gridY = useSpring(0, { stiffness: 70, damping: 22 });

  // Typed key buffer for secret developer payloads
  const [typedBuffer, setTypedBuffer] = useState("");

  // Status rotation loop array
  const statuses = [
    "🟢 AVAILABLE_FOR_OPPORTUNITIES",
    "⚡ COMPILED WITH ZERO WARNINGS",
    "🤖 JARVIS STATUS: SENTIENT",
    "🧠 INVENTING CREATIVE AI BLUEPRINTS",
    "📚 AUTHOR OF 'BREAKING THE CODE'",
    "📈 CPI INDEX: 8.77 / 10.0 CONSISTENT",
  ];
  const [currentStatusIdx, setCurrentStatusIdx] = useState(0);

  // Theme state
  const [theme, setTheme] = useState<"dark" | "light" | "gold">("dark");
  const [isRebooting, setIsRebooting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Time greeting state
  const [greeting, setGreeting] = useState("");

  // Scholar mode and cheat active states
  const [isScholarMode, setIsScholarMode] = useState(false);
  const [isUltraChaos, setIsUltraChaos] = useState(false);

  // Desktop click counter for hidden folder
  const [desktopClicks, setDesktopClicks] = useState(0);
  const [showHiddenFolder, setShowHiddenFolder] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // Active CPU scroll meter tracking
  const [cpuUsage, setCpuUsage] = useState(15);

  // Screensaver and BSOD states
  const [isIdle, setIsIdle] = useState(false);
  const [showBSOD, setShowBSOD] = useState(false);
  
  // Custom right-click menu coordinates
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; visible: boolean } | null>(null);

  // Active focused window id
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>("about");

  // Keyboard capture buffers
  const [cpiBuffer, setCpiBuffer] = useState("");
  const [konamiBuffer, setKonamiBuffer] = useState<string[]>([]);

  // Open windows register state
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "about", title: "ABOUT.me", isOpen: true, isMinimized: false, isMaximized: false, accentColor: "var(--neon-green)", initialX: 50, initialY: 40, defaultWidth: "680px", defaultHeight: "520px" },
    { id: "projects", title: "PROJECTS_GALLERY.exe", isOpen: true, isMinimized: false, isMaximized: false, accentColor: "var(--neon-cyan)", initialX: 130, initialY: 100, defaultWidth: "750px", defaultHeight: "550px" },
    { id: "skills", title: "SKILLS.json", isOpen: false, isMinimized: false, isMaximized: false, accentColor: "var(--neon-yellow)", initialX: 200, initialY: 60, defaultWidth: "550px", defaultHeight: "450px" },
    { id: "resume", title: "RESUME_TELEMETRY.pdf", isOpen: false, isMinimized: false, isMaximized: false, accentColor: "var(--rythu-amber)", initialX: 180, initialY: 120, defaultWidth: "600px", defaultHeight: "500px" },
    { id: "contact", title: "CONTACT_LINK.sh", isOpen: true, isMinimized: false, isMaximized: false, accentColor: "var(--neon-magenta)", initialX: 420, initialY: 210, defaultWidth: "580px", defaultHeight: "480px" },
    { id: "chatbot", title: "YASWANTH_BOT.app", isOpen: false, isMinimized: false, isMaximized: false, accentColor: "var(--neon-cyan)", initialX: 300, initialY: 80, defaultWidth: "500px", defaultHeight: "480px" },
    { id: "terminal", title: "ROOT_CLI_SHELL.sh", isOpen: true, isMinimized: false, isMaximized: false, accentColor: "var(--neon-green)", initialX: 80, initialY: 150, defaultWidth: "640px", defaultHeight: "450px" },
    { id: "secret", title: "ENCRYPTED_ Blueprints", isOpen: false, isMinimized: false, isMaximized: false, accentColor: "var(--neon-orange)", initialX: 280, initialY: 180, defaultWidth: "500px", defaultHeight: "400px" },
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Time-based Greetings and Day/Night Theme Auto-sense with Mobile Viewport Sensing
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) {
        setGreeting("🟢 Good morning. Yaswanth shipped code while you slept.");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("🟢 Afternoon. Currently debugging or designing. Maybe both.");
      } else if (hour >= 17 && hour < 24) {
        setGreeting("🟢 Late hours. This is when the best systems get written.");
      } else {
        setGreeting("🟡 WARNING: You are inspecting this at 3 AM. You are hired.");
      }

      // Start in Dark Theme by default
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateGreeting();
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Status rotation loop
  useEffect(() => {
    const statusTimer = setInterval(() => {
      setCurrentStatusIdx((prev) => (prev + 1) % statuses.length);
    }, 6000);
    return () => clearInterval(statusTimer);
  }, [statuses.length]);

  // Keyboard capture systems (8.77 CPI, Konami, Command Palette, and Easter Eggs)
  useEffect(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      // Ignore keys if typing in interactive forms
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        if (e.key === "Escape" && isCommandPaletteOpen) {
          setIsCommandPaletteOpen(false);
        }
        return;
      }

      // Command palette trigger (/ or ⌘+K / Ctrl+K)
      if (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Easter egg word tracker
      const nextTyped = (typedBuffer + e.key.toLowerCase()).slice(-20);
      setTypedBuffer(nextTyped);

      if (nextTyped.endsWith("matrix")) {
        playSuccessSound();
        setIsIdle(true);
        setTypedBuffer("");
      } else if (nextTyped.endsWith("whoami")) {
        playSuccessSound();
        openWindow("about");
        triggerAchievement("explorer");
        setTypedBuffer("");
      } else if (nextTyped.endsWith("foundermode") || nextTyped.endsWith("founder mode")) {
        playSuccessSound();
        setTheme("gold");
        document.documentElement.setAttribute("data-theme", "gold");
        triggerAchievement("hunter");
        setTypedBuffer("");
      }

      // 1. CPI Unlock ("8.77")
      const newCpi = (cpiBuffer + e.key).slice(-4);
      setCpiBuffer(newCpi);
      if (newCpi === "8.77") {
        playSuccessSound();
        setIsScholarMode(true);
        canvasConfetti();
        // Reset after 4s
        setTimeout(() => setIsScholarMode(false), 4000);
      }

      // 2. Konami Code (↑↑↓↓←→←→ba)
      const allowedKeys = [
        "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"
      ];
      const newKonami = [...konamiBuffer, e.key].slice(-10);
      setKonamiBuffer(newKonami);
      
      const isMatch = allowedKeys.every((key, idx) => newKonami[idx] === key);
      if (isMatch) {
        playSuccessSound();
        setIsUltraChaos(true);
        canvasConfetti({ particleCount: 200, spread: 80 });
        setTimeout(() => setIsUltraChaos(false), 6000);
      }
    };

    window.addEventListener("keydown", handleGlobalKeydown);
    return () => window.removeEventListener("keydown", handleGlobalKeydown);
  }, [cpiBuffer, konamiBuffer, typedBuffer, isCommandPaletteOpen, windows]);

  // Idle Telemetry Timer Node (30s matrix screensaver, 60s BSOD)
  useEffect(() => {
    let screensaverTimer: NodeJS.Timeout;
    let bsodTimer: NodeJS.Timeout;

    const resetIdleTimers = () => {
      setIsIdle(false);
      setShowBSOD(false);
      clearTimeout(screensaverTimer);
      clearTimeout(bsodTimer);

      // Trigger Matrix rain screensaver after 30s idle
      screensaverTimer = setTimeout(() => {
        setIsIdle(true);
      }, 30000);

      // Trigger BSOD after 60s idle ONLY IF ABOUT window is open
      const aboutOpen = windows.find(w => w.id === "about")?.isOpen;
      if (aboutOpen) {
        bsodTimer = setTimeout(() => {
          setIsIdle(false);
          setShowBSOD(true);
          playBeepSound();
        }, 60000);
      }
    };

    resetIdleTimers();

    const activities = ["mousemove", "mousedown", "keydown", "wheel", "touchstart"];
    activities.forEach((act) => {
      window.addEventListener(act, resetIdleTimers);
    });

    return () => {
      clearTimeout(screensaverTimer);
      clearTimeout(bsodTimer);
      activities.forEach((act) => {
        window.removeEventListener(act, resetIdleTimers);
      });
    };
  }, [windows]);

  // Living Brain: Drifting Canvas Telemetry Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const maxParticles = 22;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize particles
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1
        });
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse coordinates for dynamic connection lines
    let mousePos = { x: -1000, y: -1000 };
    let mouseMovesCount = 0;
    const trackMouse = (e: MouseEvent) => {
      mousePos = { x: e.clientX, y: e.clientY };
      mouseMovesCount++;
    };
    window.addEventListener("mousemove", trackMouse);

    // Throttled CPU load & cooldown generator - Throttled to 1200ms to eliminate React re-render lag
    const cooldownInterval = setInterval(() => {
      setCpuUsage(prev => {
        if (mouseMovesCount > 0) {
          const addedLoad = Math.min(22, mouseMovesCount * 0.6);
          mouseMovesCount = 0;
          return Math.min(100, Math.max(15, prev + addedLoad));
        } else {
          return Math.max(15, prev - 4.5);
        }
      });
    }, 1200);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Define styles based on theme
      const nodeColor = theme === "dark" ? "rgba(0, 212, 255, 0.4)" : "rgba(163, 98, 30, 0.25)";
      const lineColor = theme === "dark" ? "rgba(0, 212, 255, 0.08)" : "rgba(163, 98, 30, 0.05)";
      const cursorColor = theme === "dark" ? "rgba(255, 0, 128, 0.35)" : "rgba(217, 0, 108, 0.2)";

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce bounds
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      // Draw connection vectors
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw vector lines to cursor coordinate
      if (mousePos.x !== -1000) {
        particles.forEach((p) => {
          const dx = p.x - mousePos.x;
          const dy = p.y - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.strokeStyle = cursorColor;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", trackMouse);
      clearInterval(cooldownInterval);
    };
  }, [theme]);

  // Handle mouse move for background holographic parallax grid
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    gridX.set((clientX - centerX) * 0.035);
    gridY.set((clientY - centerY) * 0.035);
  };

  // Start Context Menu coordinators
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true
    });
  };

  const closeContextMenu = useCallback(() => {
    if (contextMenu) {
      setContextMenu(prev => prev ? { ...prev, visible: false } : null);
    }
  }, [contextMenu]);

  useEffect(() => {
    window.addEventListener("click", closeContextMenu);
    return () => window.removeEventListener("click", closeContextMenu);
  }, [closeContextMenu]);

  // Window trigger nodes
  const openWindow = (id: string) => {
    playClickSound(0.45);
    let justOpened = false;
    setWindows(prev =>
      prev.map(w => {
        if (w.id === id) {
          if (!w.isOpen) justOpened = true;
          return { ...w, isOpen: true, isMinimized: false };
        }
        return w;
      })
    );
    setFocusedWindowId(id);
    if (justOpened) {
      incrementStat("windowsOpened");
    }
  };

  const handleExecuteCommand = (cmdId: string) => {
    if (cmdId === "chatbot") {
      openWindow("chatbot");
    } else if (cmdId === "about") {
      openWindow("about");
    } else if (cmdId === "projects") {
      openWindow("projects");
    } else if (cmdId === "skills") {
      openWindow("skills");
    } else if (cmdId === "resume") {
      openWindow("resume");
    } else if (cmdId === "contact") {
      openWindow("contact");
    } else if (cmdId === "secret") {
      if (showHiddenFolder) {
        openWindow("secret");
      } else {
        playSuccessSound();
        setShowHiddenFolder(true);
        openWindow("secret");
        triggerAchievement("hunter");
        canvasConfetti();
      }
    }
  };

  const closeWindow = (id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, isOpen: false } : w
      )
    );
    if (focusedWindowId === id) setFocusedWindowId(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      )
    );
    if (focusedWindowId === id) setFocusedWindowId(null);
  };

  const restoreWindow = (id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, isOpen: true, isMinimized: false } : w
      )
    );
    setFocusedWindowId(id);
  };

  const toggleMaximize = (id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  };

  // Switch dark/cream light mode with simulated CRT reboot strobe overlay
  const handleToggleTheme = () => {
    setIsRebooting(true);
    playBeepSound();
    
    setTimeout(() => {
      const nextTheme = theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      
      setTimeout(() => {
        setIsRebooting(false);
        playSuccessSound();
      }, 500);
    }, 600);
  };

  // Self Destruct easter egg -> BSOD trigger
  const triggerSelfDestruct = () => {
    playBeepSound();
    setIsRebooting(true);
    setTimeout(() => {
      setIsRebooting(false);
      setShowBSOD(true);
    }, 800);
  };

  // Desktop click counter for Hidden Folder reveal
  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      const nextClicks = desktopClicks + 1;
      setDesktopClicks(nextClicks);
      playClickSound(0.2);

      if (nextClicks === 5 && !showHiddenFolder) {
        playSuccessSound();
        setShowHiddenFolder(true);
        canvasConfetti();
      }
    }
  };

  // Icons list for grid
  const desktopIcons = [
    { id: "projects", label: "WORK/", emoji: "📁", color: "text-[#00D4FF]" },
    { id: "about", label: "ABOUT.me/", emoji: "📁", color: "text-[#00FF88]" },
    { id: "resume", label: "RESUME.pdf", emoji: "📄", color: "text-amber-500" },
    { id: "skills", label: "SKILLS.json", emoji: "📄", color: "text-[#FFEB00]" },
    { id: "contact", label: "CONTACT.sh", emoji: "⚙️", color: "text-[#FF0080]" },
    { id: "chatbot", label: "YASWANTH.AI", emoji: "🤖", color: "text-[#00D4FF]" },
  ];

  return (
    <div
      onContextMenu={handleContextMenu}
      onMouseMove={handleMouseMove}
      onClick={handleDesktopClick}
      className={`fixed inset-0 w-full h-full overflow-hidden select-none z-10 ${
        isUltraChaos ? "animate-pulse" : ""
      }`}
      style={{
        backgroundColor: "var(--void)"
      }}
    >
      {/* 3D Holographic Background Grid Parallax */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          x: gridX,
          y: gridY,
          backgroundImage: theme === "dark" 
            ? "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)"
            : "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Background drifting network vector canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Top Banner stats badge */}
      <div className="absolute top-4 right-4 flex flex-col items-end space-y-1 z-10 font-mono text-[10px] text-white/50 select-none text-right">
        <div className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#00FF88] transition-all duration-300">
          {statuses[currentStatusIdx]}
        </div>
        <div className="hidden sm:block">{greeting}</div>
        {isScholarMode && (
          <div className="bg-yellow-400 text-black px-2 py-0.5 font-bold animate-bounce rounded mt-1">
            ⭐ SCHOLAR_MODE UNLOCKED
          </div>
        )}
      </div>

      {/* Hero Watermark Text (Slow Floating title in backdrop) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0 select-none p-6 text-center max-w-4xl mx-auto space-y-4">
        <div className="unbounded font-extrabold text-[#00D4FF]/[0.03] text-5xl md:text-7xl tracking-widest uppercase mb-1 floating-title">
          STARBOY
        </div>
        <h2 className="unbounded font-extrabold text-base md:text-lg text-white/[0.04] uppercase tracking-wider leading-relaxed">
          Hey! My name is Veer, a 22-year-old designer born in Palamaner and now based in Andhra. Always chasing the experimental, a Starboy in orbit.
        </h2>
        <p className="font-mono text-[10px] md:text-xs text-[#FF0080]/[0.05] uppercase tracking-widest leading-relaxed font-bold max-w-xl">
          I build visuals that feel like fever dreams: sharp, unstable, never still.
        </p>
        <p className="font-mono text-[9px] md:text-[10px] text-white/[0.03] uppercase tracking-wider leading-relaxed font-medium max-w-lg">
          Quiet in life, chaotic in creation.
          <br />
          Not clean. Not safe. Always alive.
        </p>
      </div>

      {/* Draggable Desktop Icons (Placed directly on wallpaper, movable anywhere!) */}
      <div className="absolute inset-0 pointer-events-none z-10 select-none">
        {desktopIcons.map((ico, idx) => (
          <motion.div
            key={ico.id}
            drag={!isMobile}
            dragMomentum={false}
            initial={isMobile ? { x: 12 + (idx % 3) * 100, y: 80 + Math.floor(idx / 3) * 90 } : { x: 24, y: 120 + idx * 80 }}
            className="absolute p-2 rounded-lg pointer-events-auto cursor-grab active:cursor-grabbing hover:bg-white/5 border border-transparent hover:border-white/5 active:border-white/10 flex flex-col items-center justify-center text-center w-24 group"
            onDoubleClick={() => openWindow(ico.id)}
            onClick={() => {
              if (isMobile) {
                // Single tap opens window on mobile touch screens
                openWindow(ico.id);
              } else {
                playClickSound(0.25);
              }
            }}
            title="Double click to open, drag to move"
          >
            <Magnetic>
              <div className="flex flex-col items-center justify-center" data-cursor="button">
                <div className="text-3xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] transition duration-200 group-hover:scale-110">
                  {ico.emoji}
                </div>
                <span className="mt-1 text-[9px] font-mono font-bold tracking-wider text-white/70 group-hover:text-white truncate max-w-full leading-tight select-none">
                  {ico.label}
                </span>
              </div>
            </Magnetic>
          </motion.div>
        ))}

        {/* Draggable Hidden Mystery Box folder */}
        {showHiddenFolder && (
          <motion.div
            drag={!isMobile}
            dragMomentum={false}
            initial={isMobile ? { x: 12 + (desktopIcons.length % 3) * 100, y: 80 + Math.floor(desktopIcons.length / 3) * 90 } : { x: 24, y: 120 + desktopIcons.length * 80 }}
            className="absolute p-2 rounded-lg pointer-events-auto cursor-grab active:cursor-grabbing hover:bg-white/5 border border-transparent hover:border-white/5 active:border-white/10 flex flex-col items-center justify-center text-center w-24 animate-pulse"
            onDoubleClick={() => openWindow("secret")}
            onClick={() => {
              if (isMobile) {
                openWindow("secret");
              } else {
                playClickSound(0.3);
              }
            }}
            title="Double click to decrypt, drag to move"
          >
            <Magnetic>
              <div className="flex flex-col items-center justify-center animate-pulse" data-cursor="button">
                <div className="text-3xl filter drop-shadow-[0_0_12px_rgba(255,235,0,0.3)]">
                  🎁
                </div>
                <span className="mt-1 text-[9px] font-mono font-bold text-[#FFEB00] select-none uppercase tracking-wider">
                  SECRET.bin
                </span>
              </div>
            </Magnetic>
          </motion.div>
        )}
      </div>

      {/* Draggable Closable Floating Sidebar Dock (Active Task Manager) */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            drag={!isMobile}
            dragMomentum={false}
            initial={isMobile ? { x: 16, y: 310 } : { x: 860, y: 120 }}
            animate={isMobile ? { x: 16, y: 310 } : {}}
            className="absolute w-[calc(100vw-32px)] md:w-44 bg-[#111118]/90 border border-white/10 backdrop-blur-xl p-3 rounded-xl z-[99] select-none pointer-events-auto flex flex-col space-y-3 shadow-2xl"
            style={{
              boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
              borderColor: "var(--border)"
            }}
          >
            {/* Sidebar Title Bar (Drag Handle) */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 cursor-grab active:cursor-grabbing">
              <div className="flex space-x-1.5 items-center">
                <button
                  onClick={() => {
                    playClickSound(0.3);
                    setShowSidebar(false);
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:brightness-75 transition"
                  title="Close Sidebar"
                />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              <span className="font-mono text-[9px] text-white/40 tracking-widest font-semibold uppercase">
                DOCK.sys
              </span>
            </div>

            {/* Section 2: Active Tabs (Opened Programs) */}
            <div className="space-y-2 border-t border-white/5 pt-3">
              <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest">
                Active Tasks
              </div>
              <div className="space-y-1.5 font-mono text-[9px]">
                {windows.filter(w => w.isOpen).length === 0 ? (
                  <div className="text-white/30 italic text-[8px] text-center py-2">
                    No active channels.
                  </div>
                ) : (
                  windows
                    .filter((w) => w.isOpen)
                    .map((w) => {
                      const isActive = focusedWindowId === w.id;
                      return (
                        <div
                          key={w.id}
                          onClick={() => restoreWindow(w.id)}
                          className={`flex items-center justify-between px-2 py-1.5 rounded border transition-colors cursor-pointer ${
                            isActive
                              ? "bg-white/10 text-white border-[#00D4FF]"
                              : "bg-white/5 text-white/60 border-white/5 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center space-x-1.5 truncate max-w-[80%]">
                            {/* Pulse indicator */}
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                isActive ? "bg-[#00FF88] animate-pulse" : "bg-white/30"
                              }`}
                            />
                            <span className="truncate uppercase font-bold tracking-wider">
                              {w.title.replace(".exe", "").replace(".app", "").replace(".json", "").replace(".sh", "").replace(".pdf", "")}
                            </span>
                          </div>

                          {/* Quick Close Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playClickSound(0.35);
                              closeWindow(w.id);
                            }}
                            className="p-0.5 hover:bg-white/15 rounded text-white/40 hover:text-white transition"
                            title="Kill task"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })
                )}
              </div>
            </div>

            {/* Section 3: Sentient XP & Achievements progress */}
            <div className="space-y-2 border-t border-white/5 pt-3 select-none">
              <div className="flex justify-between items-center text-[8px] font-mono text-white/30 uppercase tracking-widest">
                <span>OS Experience</span>
                <span className="text-[#FFEB00] font-bold">LVL {Math.floor(xp / 100) + 1}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-mono font-bold">
                  <span className="text-white/60">SENTIENT XP</span>
                  <span className="text-[#00FF88]">{xp} XP</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00FF88] rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, xp % 100)}%` }}
                  />
                </div>
                <div className="text-[7px] text-white/40 text-center font-semibold pt-1">
                  {unlockedBadges.length} OF 4 BADGES DECRYPTED
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Windows Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none p-4 md:p-8 flex flex-col md:block overflow-y-auto md:overflow-visible">
        <AnimatePresence>
          {windows.map((win) => (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              isOpen={win.isOpen}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => toggleMaximize(win.id)}
              onFocus={() => setFocusedWindowId(win.id)}
              isFocused={focusedWindowId === win.id}
              accentColor={win.accentColor}
              initialX={win.initialX}
              initialY={win.initialY}
              defaultWidth={win.defaultWidth}
              defaultHeight={win.defaultHeight}
            >
              {/* Window body wrappers */}
              <div 
                className="w-full h-full pointer-events-auto"
                style={
                  isUltraChaos 
                    ? { transform: "rotate(2deg)", transition: "transform 1s" } 
                    : {}
                }
              >
                {win.id === "about" && (
                  <AboutWindow onTriggerContact={() => openWindow("contact")} />
                )}
                {win.id === "projects" && <ProjectsWindow />}
                {win.id === "skills" && <SkillsWindow />}
                {win.id === "resume" && <ResumeWindow />}
                {win.id === "contact" && (
                  <Terminal 
                    mode="contact" 
                    onTriggerHire={() => openWindow("contact")}
                  />
                )}
                {win.id === "chatbot" && <ChatbotWindow />}
                {win.id === "terminal" && (
                  <Terminal
                    mode="root"
                    onTriggerHire={() => openWindow("contact")}
                    onTriggerProjects={() => openWindow("projects")}
                    onTriggerSkills={() => openWindow("skills")}
                    onTriggerAbout={() => openWindow("about")}
                  />
                )}
                {win.id === "secret" && (
                  <div className="p-6 font-mono text-xs space-y-4">
                    <h2 className="text-[#FFEB00] font-extrabold text-sm border-b border-white/10 pb-1">
                      🔓 MYSTERY DECRYPTED
                    </h2>
                    <p className="leading-relaxed">
                      You clicked the desktop 5 times and unlocked the encrypted sector payload!
                    </p>
                    <div className="bg-black/50 p-3 rounded border border-white/10 text-white/80">
                      <div className="font-extrabold text-[#00FF88]">SCHOLAR_CODE unlocked successfully.</div>
                      <div className="mt-2 text-[10px] text-white/50 leading-relaxed">
                        Yaswanth once coded an automated schedule planner which kept students organized through viva reviews. He coordinates large symposia (9,000+ peers). He published his technical textbook &apos;Breaking the Code&apos; to bridge the industry gap.
                      </div>
                    </div>
                    <div className="flex justify-end select-none">
                      <button
                        onClick={() => openWindow("chatbot")}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-[#00D4FF] hover:bg-[#00D4FF]/10 transition"
                      >
                        Ask YASWANTH.AI about textbooks
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Window>
          ))}
        </AnimatePresence>
      </div>

      {/* CRT Theme Reboot Strobe Overlay */}
      {isRebooting && (
        <div className="fixed inset-0 w-full h-full bg-black z-[999999] flex flex-col justify-center items-center font-mono text-white text-xs select-none">
          <div className="w-12 h-12 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin mb-3" />
          <div className="tracking-widest uppercase font-bold text-white animate-pulse">
            REBOOTING SYSTEM SERVICES...
          </div>
        </div>
      )}

      {/* MATRIX SCREENSAVER IDLE LAYER */}
      {isIdle && (
        <div 
          onClick={() => setIsIdle(false)}
          className="fixed inset-0 w-full h-full bg-black/95 z-[9999999] cursor-pointer flex justify-center items-center font-mono text-[#00FF41] select-none"
        >
          {/* Screensaver content simulation */}
          <div className="text-center space-y-4">
            <div className="text-4xl animate-pulse select-none">📟</div>
            <div className="text-sm font-bold tracking-widest text-[#00FF41]/80 select-none animate-pulse">
              MATRIX_SCREENSAVER ACTIVE // IDLE DETECTED
            </div>
            <div className="text-[10px] text-[#00FF41]/40 leading-relaxed select-none">
              PYTHON React NEXT.JS FigMA NLP GEMINI WATSONX DOCKER 8.77 BENGALURU
              <br />
              [Click anywhere to recover operating console]
            </div>
          </div>
        </div>
      )}

      {/* FAKE BLUE SCREEN OF DEATH CRASH SCREEN */}
      {showBSOD && (
        <div
          onClick={() => setShowBSOD(false)}
          className="fixed inset-0 w-full h-full bg-[#0000AA] text-white z-[99999999] p-8 md:p-16 flex flex-col justify-between font-mono select-none cursor-pointer"
        >
          <div className="space-y-6 max-w-2xl">
            <div className="text-6xl select-none">:(</div>
            <h1 className="text-xl md:text-3xl font-extrabold tracking-wider font-mono">
              YASWANTH_IS_TOO_INTERESTING.exe
            </h1>
            <p className="text-sm md:text-base leading-relaxed text-slate-100">
              Your system stopped because you spent too long reading about this guy. Honestly, we can&apos;t blame you.
            </p>
            <div className="space-y-2 text-xs md:text-sm text-slate-300">
              <div>WHAT_TO_DO_NEXT:</div>
              <div>1. Open a direct communication link at <span className="underline font-bold text-white">yaswanthveer1233@gmail.com</span></div>
              <div>2. Connect on LinkedIn at <span className="underline font-bold text-white">linkedin.com/in/yaswanthveer-k</span></div>
              <div>3. Click anywhere to return and finalize his hiring sequence.</div>
            </div>
          </div>
          
          <div className="text-[10px] text-slate-400">
            Crash Code: EXCELLENT_DEVELOPER_FOUND // CPI: 8.77_COMPILING
          </div>
        </div>
      )}

      {/* Context Menu Right Click popup */}
      {contextMenu?.visible && (
        <div
          className="fixed bg-[#111118] border border-white/15 rounded shadow-2xl py-1 z-[999999] font-mono text-[10px] text-white select-none w-36"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          {!showSidebar && (
            <button
              onClick={() => {
                playClickSound(0.4);
                setShowSidebar(true);
              }}
              className="w-full text-left px-3 py-2 hover:bg-white/10 border-b border-white/10 text-[#00FF88] font-bold"
            >
              🟢 Restore Sidebar Dock
            </button>
          )}
          <button
            onClick={() => openWindow("projects")}
            className="w-full text-left px-3 py-2 hover:bg-white/10 border-b border-white/5"
          >
            📂 View Project files
          </button>
          <button
            onClick={() => openWindow("about")}
            className="w-full text-left px-3 py-2 hover:bg-white/10 border-b border-white/5"
          >
            👤 About Yaswanth
          </button>
          <button
            onClick={() => openWindow("contact")}
            className="w-full text-left px-3 py-2 hover:bg-white/10 border-b border-white/5"
          >
            ⚙️ Hire Mode (CONTACT.sh)
          </button>
          <button
            onClick={triggerSelfDestruct}
            className="w-full text-left px-3 py-2 hover:bg-[#FF0080]/20 text-[#FF0080] font-bold"
          >
            ☢️ Self Destruct (BSOD)
          </button>
        </div>
      )}

      {/* Bottom Taskbar bar */}
      <Taskbar
        openWindows={windows}
        activeWindowId={focusedWindowId}
        onRestoreWindow={restoreWindow}
        onToggleTheme={handleToggleTheme}
        cpuUsage={cpuUsage}
        onOpenRootTerminal={() => openWindow("terminal")}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Retro CLI Command Palette Modal Overlay */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onExecuteCommand={handleExecuteCommand}
      />

      {/* sentient Jarvis AI Orb floating assistant */}
      <AIOrb onOpenWindow={openWindow} />
    </div>
  );
};
