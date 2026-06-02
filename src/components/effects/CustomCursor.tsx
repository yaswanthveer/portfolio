"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [cursorMode, setCursorMode] = useState<"normal" | "button" | "project" | "image">("normal");
  const [hoverLabel, setHoverLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // High-performance hardware-accelerated spring motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 450, damping: 28 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide native cursor
    document.documentElement.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    let lastTarget: HTMLElement | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target === lastTarget) return;
      lastTarget = target;

      // 1. Check project card hover
      const isProjectCard = target.closest('[data-cursor="project"]');
      // 2. Check image hover
      const isImage = target.closest('[data-cursor="image"]') || target.tagName === "IMG";
      // 3. Check button/interactive hover
      const isButton = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[data-cursor="button"]') ||
        target.style.cursor === "pointer";

      if (isProjectCard) {
        setCursorMode("project");
        setHoverLabel("VIEW");
      } else if (isImage) {
        setCursorMode("image");
        setHoverLabel("EXPLORE");
      } else if (isButton) {
        setCursorMode("button");
        setHoverLabel("OPEN");
      } else {
        setCursorMode("normal");
        setHoverLabel("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
      {/* 1. Core Glow Dot */}
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-[var(--neon-cyan)] fixed top-0 left-0 -mt-1.25 -ml-1.25 mix-blend-screen shadow-[0_0_10px_var(--neon-cyan)]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* 2. Trailing Reactive Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 mix-blend-screen flex items-center justify-center font-mono pointer-events-none select-none"
        style={{
          x: trailX,
          y: trailY,
          width: 0,
          height: 0,
        }}
      >
        <motion.div
          className="rounded-full border flex items-center justify-center font-mono text-[8px] font-bold text-center tracking-widest pointer-events-none select-none absolute shrink-0"
          animate={{
            width: cursorMode === "normal" ? 22 : 90,
            height: cursorMode === "normal" ? 22 : 90,
            backgroundColor: 
              cursorMode === "project" 
                ? "rgba(0, 212, 255, 0.08)" 
                : cursorMode === "image" 
                ? "rgba(255, 0, 128, 0.08)" 
                : cursorMode === "button"
                ? "rgba(0, 255, 136, 0.06)"
                : "rgba(0, 0, 0, 0)",
            borderColor: 
              cursorMode === "project" 
                ? "var(--neon-cyan)" 
                : cursorMode === "image" 
                ? "var(--neon-magenta)" 
                : cursorMode === "button"
                ? "var(--neon-green)"
                : "var(--neon-cyan)",
            boxShadow: 
              cursorMode === "normal"
                ? "none"
                : cursorMode === "project"
                ? "0 0 15px rgba(0, 212, 255, 0.2)"
                : cursorMode === "image"
                ? "0 0 15px rgba(255, 0, 128, 0.2)"
                : "0 0 15px rgba(0, 255, 136, 0.2)",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 24,
          }}
        >
          {cursorMode !== "normal" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`font-extrabold uppercase select-none tracking-widest text-[7px] ${
                cursorMode === "project" 
                  ? "text-[#00D4FF]" 
                  : cursorMode === "image" 
                  ? "text-[#FF0080]" 
                  : "text-[#00FF88]"
              }`}
            >
              {hoverLabel}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
