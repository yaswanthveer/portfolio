"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useDragControls, useMotionValue, animate } from "framer-motion";
import { Minimize2, Square, X } from "lucide-react";
import { playClickSound } from "@/lib/sounds";

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  isFocused: boolean;
  accentColor: string;
  initialX: number;
  initialY: number;
  defaultWidth?: string;
  defaultHeight?: string;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  isOpen,
  isMinimized,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isFocused,
  accentColor,
  initialX,
  initialY,
  defaultWidth = "650px",
  defaultHeight = "500px",
  children,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const windowSize = { width: defaultWidth, height: defaultHeight };
  const [isMobile, setIsMobile] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // High-fidelity GPU-accelerated motion coordinates
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
  const lastPosition = useRef({ x: initialX, y: initialY });

  // Detect mobile width to stack windows and disable drag
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update layout coordinates smoothly based on window states without React render-lag
  useEffect(() => {
    if (isMobile) {
      x.set(0);
      y.set(0);
    } else if (isMaximized) {
      animate(x, 0, { type: "spring", stiffness: 350, damping: 28 });
      animate(y, 0, { type: "spring", stiffness: 350, damping: 28 });
    } else if (isMinimized) {
      animate(y, 400, { type: "spring", stiffness: 350, damping: 28 });
    } else {
      animate(x, lastPosition.current.x, { type: "spring", stiffness: 350, damping: 28 });
      animate(y, lastPosition.current.y, { type: "spring", stiffness: 350, damping: 28 });
    }
  }, [isMaximized, isMinimized, isMobile, x, y]);

  if (!isOpen) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    onFocus();
    if (isFocused && !isShaking) {
      setIsShaking(true);
      playClickSound(0.15); // soft feedback click sound
      setTimeout(() => setIsShaking(false), 450);
    }
    // Start drag only if we are on a desktop environment
    if (!isMobile && !isMaximized) {
      dragControls.start(e);
    }
  };

  const handleAction = (callback: () => void) => {
    playClickSound(0.3);
    callback();
  };

  const handleWindowClick = () => {
    onFocus();
  };

  // Draggable Window component structure
  return (
    <motion.div
      ref={windowRef}
      drag={!isMobile && !isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.05}
      onDragEnd={() => {
        lastPosition.current = { x: x.get(), y: y.get() };
      }}
      initial={isMobile ? { opacity: 0 } : { x: initialX, y: initialY, scale: 0.8, opacity: 0, filter: "blur(20px)" }}
      animate={
        isMinimized
          ? { scale: 0.8, opacity: 0, pointerEvents: "none" }
          : isMaximized
          ? { width: "100%", height: "calc(100vh - 52px)", scale: 1, opacity: 1, zIndex: isFocused ? 50 : 30 }
          : isMobile
          ? { opacity: isFocused ? 1 : 0, pointerEvents: isFocused ? "auto" : "none", zIndex: isFocused ? 50 : 30 }
          : {
              width: windowSize.width,
              height: windowSize.height,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              zIndex: isFocused ? 50 : 30,
              rotate: isShaking ? [0, -1.2, 1.2, -0.8, 0.8, -0.4, 0.4, 0] : 0,
            }
      }
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 24,
        rotate: {
          type: "keyframes",
          duration: 0.45,
          ease: "easeInOut",
        }
      }}
      // Breathing pulse on passive focused state, scale: 1 -> 1.003
      whileHover={!isMobile && !isMaximized ? { scale: 1.002 } : {}}
      onClick={handleWindowClick}
      className={`window absolute flex flex-col transition-shadow duration-300 pointer-events-auto ${
        isFocused ? "window-glow-active window-focused" : ""
      } ${isMobile ? "relative !top-0 !left-0 mb-4" : ""}`}
      style={{
        x,
        y,
        "--active-glow-color": accentColor,
        borderWidth: "1px",
        height: isMaximized ? "calc(100vh - 52px)" : isMobile ? "auto" : windowSize.height,
        maxHeight: isMobile ? "90vh" : "none",
      } as unknown as React.CSSProperties}
    >
      {/* Title bar - drag handle */}
      <div
        onPointerDown={handlePointerDown}
        className={`flex items-center justify-between px-4 py-2 select-none cursor-grab active:cursor-grabbing ${
          isFocused ? "window-header-active" : "window-header"
        }`}
        style={{ touchAction: "none" }}
      >
        {/* Left: Traffic Lights */}
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction(onClose);
            }}
            className="w-6 h-6 -mx-1.5 flex items-center justify-center outline-none select-none group relative pointer-events-auto"
            title="Close"
          >
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] group-hover:brightness-75 transition flex items-center justify-center">
              <X className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 text-black font-extrabold" />
            </div>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction(onMinimize);
            }}
            className="w-6 h-6 -mx-1.5 flex items-center justify-center outline-none select-none group relative pointer-events-auto"
            title="Minimize"
          >
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] group-hover:brightness-75 transition flex items-center justify-center">
              <Minimize2 className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 text-black font-extrabold" />
            </div>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction(onMaximize);
            }}
            className="w-6 h-6 -mx-1.5 flex items-center justify-center outline-none select-none group relative pointer-events-auto"
            title="Maximize"
          >
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] group-hover:brightness-75 transition flex items-center justify-center">
              <Square className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 text-black font-extrabold" />
            </div>
          </button>
        </div>

        {/* Center: File Title */}
        <div className="title-mono text-xs tracking-wider uppercase font-semibold text-center absolute left-1/2 transform -translate-x-1/2 pointer-events-none truncate max-w-[50%]">
          {title}
        </div>

        {/* Right: Dummy buttons/indicators */}
        <div className="flex items-center space-x-1 text-[10px] opacity-40 font-mono select-none">
          <span>{id.toUpperCase()}.EXE</span>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="flex-1 overflow-auto window-scroll window-content relative">
        {children}
      </div>
    </motion.div>
  );
};
