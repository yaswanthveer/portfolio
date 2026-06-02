"use client";

import React, { useState, useEffect, useRef } from "react";
import { playClickSound, playSuccessSound, playBeepSound } from "@/lib/sounds";

interface TerminalProps {
  mode: "contact" | "root";
  onTriggerHire?: () => void;
  onTriggerProjects?: () => void;
  onTriggerSkills?: () => void;
  onTriggerAbout?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({
  mode,
  onTriggerHire,
  onTriggerProjects,
  onTriggerSkills,
  onTriggerAbout,
}) => {
  const [history, setHistory] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState("");
  
  // Contact flow states
  const [contactStep, setContactStep] = useState(0); // 0: Name, 1: Email, 2: Message, 3: Completed
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal output on mount
  useEffect(() => {
    if (mode === "contact") {
      setHistory([
        "YASWANTH.EXE — SECURE COMMS CHANNEL v8.77",
        "=========================================",
        "Initializing secure contact socket...",
        "Established. Ready to transmit encrypted payload.",
        "",
        "Please enter your Name:"
      ]);
    } else {
      setHistory([
        "YASWANTH OS ROOT v8.77 — TERMINAL ACCESS",
        "Type 'help' to view available system scripts.",
        "System uptime: 15+ Parallel Projects Shipped",
        "",
        "root@yaswanth:~$"
      ]);
    }
  }, [mode]);

  // Autoscroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    // Play subtle sound on typing
    playClickSound(0.2);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = inputVal.trim();
      setInputVal("");
      
      if (mode === "contact") {
        handleContactSubmit(command);
      } else {
        handleCommandSubmit(command);
      }
    }
  };

  // Contact form state machine
  const handleContactSubmit = (val: string) => {
    if (contactStep === 3) return; // already completed

    if (val === "" && contactStep < 2) {
      playBeepSound();
      setHistory(prev => [...prev, `> Please enter a valid value.`, `Please enter your ${contactStep === 0 ? "Name" : "Email"}:`]);
      return;
    }

    if (contactStep === 0) {
      setHistory(prev => [
        ...prev,
        `> ${val}`,
        "",
        `Hi ${val}! What is your Email Address?`
      ]);
      setContactStep(1);
    } else if (contactStep === 1) {
      // Basic email check
      if (!val.includes("@") || !val.includes(".")) {
        playBeepSound();
        setHistory(prev => [...prev, `> ${val}`, `[ERROR] Invalid email formatting. Try again.`, "", "Please enter your Email:"]);
        return;
      }
      setHistory(prev => [
        ...prev,
        `> ${val}`,
        "",
        "Type your message for Yaswanth:"
      ]);
      setContactStep(2);
    } else if (contactStep === 2) {
      const finalMsg = val || "Hello Yaswanth, let's connect!";
      setHistory(prev => [
        ...prev,
        `> ${finalMsg}`,
        "",
        "Compiling payload...",
        "[READY] Package configured for secure uplink."
      ]);
      setIsSubmitting(true);
      
      // Simulate encryption/sending
      setTimeout(() => {
        setIsSubmitting(false);
        setContactStep(3);
        playSuccessSound();
        setHistory(prev => [
          ...prev,
          "Connecting to smtp://yaswanthveer1233@gmail.com...",
          "Uplink successful. Packets sent ✓",
          "",
          "=========================================",
          "[OK] MESSAGE DELIVERED.",
          "Yaswanth will respond faster than his chatbots.",
          "=========================================",
          "",
          "Quick channels:",
          "  📧 Email:    yaswanthveer1233@gmail.com",
          "  💼 LinkedIn: linkedin.com/in/yaswanthveer-k",
          "  📞 Phone:    +91-7013366769",
          "",
          "Transmission complete. Socket idle."
        ]);
      }, 1500);
    }
  };

  // Commands interpreter for root shell
  const handleCommandSubmit = (cmd: string) => {
    const trimmed = cmd.toLowerCase().trim();
    if (!trimmed) {
      setHistory(prev => [...prev, "root@yaswanth:~$" ]);
      return;
    }

    setHistory(prev => [...prev, `root@yaswanth:~$ ${cmd}`]);

    let response: string[] = [];

    switch (trimmed) {
      case "help":
        response = [
          "Available shell commands:",
          "  whoami       - Display personal bio details",
          "  projects     - List all deployed application systems",
          "  skills       - Expand core skill tree visualization",
          "  hire         - Invoke contact form uplink",
          "  secret       - Unlock encrypted digital asset",
          "  clear        - Flush terminal buffer logs"
        ];
        break;
      case "whoami":
        response = [
          "----------------------------------------------",
          "KANDUKURI YASWANTH VEER | CS Engineer & Author",
          "----------------------------------------------",
          "  Location:     Bengaluru, India",
          "  CGPA:         8.77/10.0 (Saveetha University)",
          "  Speciality:   Empathic AI, UI/UX systems",
          "  Core Philosophy:",
          "    'I break code. Then I make it beautiful.'",
          "",
          "Type 'hire' to establish a direct voice/comms link."
        ];
        if (onTriggerAbout) {
          setTimeout(() => onTriggerAbout(), 300);
        }
        break;
      case "projects":
        response = [
          "Deployed Executables on Desktop:",
          "  1. [RYTHU.exe]       - Premium e-commerce DTC for Indian farmers",
          "  2. [ZIRO.app]        - AI placement prep engine for graduates",
          "  3. [BTC.exe]         - 'Breaking the Code' platform & book",
          "  4. [SHECODES.app]    - IBM Watsonx life assistant for mothers",
          "  5. [CHATBOT.py]      - 30% optimized NLP voice chat system",
          "  6. [GENTRAV.ai]      - Gemini itinerary dynamic travel optimizer",
          "  7. [PREDICTOR.ml]    - sleep & diet ML classification boundaries",
          "  8. [BLUECOLLAR.db]   - Commission-free job board for neighborhood workers"
        ];
        if (onTriggerProjects) {
          setTimeout(() => onTriggerProjects(), 300);
        }
        break;
      case "skills":
        response = [
          "Languages:     Python 🐍 | JavaScript/TS ⚡ | Java ☕ | SQL",
          "AI/ML Engine:  NLP | Granite | Watsonx | Gemini | Scikit-Learn",
          "Design system: Figma | Framer | Editorial grid alignment",
          "DevOps nodes:  Docker | Git | REST APIs | Shell scripts",
          "Vibe profile:  'I make machines think, then make them look good.'"
        ];
        if (onTriggerSkills) {
          setTimeout(() => onTriggerSkills(), 300);
        }
        break;
      case "hire":
        response = [
          "Opening COMMS_CHANNEL in CONTACT.sh...",
          "Establishing connection to secure mailbox..."
        ];
        if (onTriggerHire) {
          setTimeout(() => onTriggerHire(), 400);
        }
        break;
      case "secret":
        response = [
          "🔓 UNLOCKED SYSTEM EASTER EGG",
          "----------------------------------------------",
          "Yaswanth Veer once designed an automatic academic scheduler",
          "that survived multiple viva rooms under extreme scrutiny.",
          "CPI status: 8.77",
          "Vibe: SENTIENT & DANGEROUS",
          "",
          "Tip: Try typing '8.77' anywhere on your keyboard on the desktop."
        ];
        break;
      case "clear":
        setHistory(["root@yaswanth:~$"]);
        return;
      default:
        playBeepSound();
        response = [
          `bash: command not found: ${cmd}`,
          "Type 'help' to inspect authorized system executables."
        ];
    }

    setHistory(prev => [...prev, ...response, ""]);
  };

  return (
    <div
      onClick={focusInput}
      className="w-full h-full p-4 font-mono text-sm leading-relaxed overflow-y-auto window-scroll cursor-text select-text"
      ref={containerRef}
      style={{ backgroundColor: "rgba(5, 5, 8, 0.95)" }}
    >
      <div className="flex flex-col space-y-1">
        {history.map((line, index) => {
          let styleClass = "text-[#F0F0FF]/80";
          if (line.startsWith(">")) {
            styleClass = "text-white font-bold";
          } else if (line.startsWith("[ERROR]")) {
            styleClass = "text-[#FF0080]";
          } else if (line.startsWith("[OK]") || line.includes("successful") || line.includes("Sent")) {
            styleClass = "text-[#00FF88] font-bold";
          } else if (line.startsWith("root@yaswanth")) {
            styleClass = "text-[#00D4FF] font-semibold";
          } else if (line.includes("AVAILABLE") || line.includes("established") || line.includes("Established")) {
            styleClass = "text-[#39FF14]";
          }
          
          return (
            <div key={index} className={`${styleClass} whitespace-pre-wrap`}>
              {line}
            </div>
          );
        })}

        {/* Input line */}
        {contactStep !== 3 && !isSubmitting && (
          <div className="flex items-center text-white pt-1">
            <span className={mode === "contact" ? "text-yellow-400 mr-2" : "text-[#00D4FF] mr-2"}>
              {mode === "contact" ? "❯" : "root@yaswanth:~$"}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none caret-[#00FF88] text-white p-0 font-mono text-sm select-text"
              autoFocus
              disabled={isSubmitting}
            />
          </div>
        )}

        {isSubmitting && (
          <div className="text-yellow-400 text-xs animate-pulse pt-2">
            📡 Packaging data streams... Encrypting packets... Connecting...
          </div>
        )}
      </div>
    </div>
  );
};
