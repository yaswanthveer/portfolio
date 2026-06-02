"use client";

import React, { useState } from "react";
import { Download, Briefcase, GraduationCap } from "lucide-react";
import { playClickSound, playSuccessSound } from "@/lib/sounds";

export const ResumeWindow: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportLogs, setExportLogs] = useState<string[]>([]);

  const stats = [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Built", value: "15+" },
    { label: "Users Impacted", value: "25K+" },
    { label: "Curiosity 🙄", value: "Endless" }
  ];

  const experience = [
    {
      role: "Full-Stack Developer",
      org: "Freelance",
      period: "2024 - Present",
      bullets: [
        "Building products & AI-driven solutions with Next.js and Tailwind.",
        "Transforming ideas into beautiful, scalable digital experiences through solid full-stack software architecture.",
        "Engineered AI placements dashboard and DTC agricultural gateways."
      ]
    },
    {
      role: "UI/UX Designer",
      org: "Startups Portfolio",
      period: "2023 - 2024",
      bullets: [
        "Designing highly distinctive visual environments and wireframing modern user experience flows in Figma.",
        "Pioneering brutalist-meets-editorial layout strategies, prioritizing extreme premium brand grids.",
        "Establishing component structures that increase user onboarding cycles by 35%."
      ]
    },
    {
      role: "Frontend Developer",
      org: "Web Applications Studio",
      period: "2022 - 2023",
      bullets: [
        "Building responsive, high-performance web applications with modular codebases.",
        "Crafting touch-friendly mobile layouts and springy keyframe animation structures.",
        "Ensuring sub-200ms page render latencies across dense telemetry dashboards."
      ]
    }
  ];

  const education = [
    {
      degree: "B.E. in Computer Science & Engineering",
      inst: "Saveetha Engineering College (Autonomous)",
      period: "2021 - 2025",
      details: "CGPA Rating: 8.77 / 10.0 (Top 5% of cohort). Lead algorithmic coordinate for symposiums."
    }
  ];

  const triggerExport = () => {
    if (isExporting) return;
    playClickSound(0.4);
    setIsExporting(true);
    setExportLogs([
      "Initializing secure PDF exporter...",
      "Binding layout metrics...",
    ]);

    const logSequence = [
      { delay: 300, msg: ">> LOADING: Syne & Cabinet Grotesk Fonts... OK" },
      { delay: 600, msg: ">> COMPILING: Developer stats registers (3+ Yrs)... OK" },
      { delay: 900, msg: ">> SERIALIZING: 15 parallel project logs (25k+ users)... OK" },
      { delay: 1200, msg: ">> PACKAGING: Academic credentials (8.77 CGPA)... OK" },
      { delay: 1500, msg: ">> ENCRYPTING: Secure transmission blocks... OK" },
      { delay: 1800, msg: ">> READY: File compiled to veer_resume_v8.77.pdf" }
    ];

    logSequence.forEach((step) => {
      setTimeout(() => {
        setExportLogs(prev => [...prev, step.msg]);
        playClickSound(0.2);
        
        // Final download trigger
        if (step.msg.startsWith(">> READY")) {
          setTimeout(() => {
            playSuccessSound();
            setIsExporting(false);
            
            // Generate a simple text file download mock representing the resume
            const resumeContent = `
===================================================
VEER - RESUME (YASWANTH OS v8.77)
===================================================
Email: yaswanthveer1233@gmail.com
LinkedIn: linkedin.com/in/yaswanthveer-k
Phone: +91-7013366769
Andhra Pradesh / Bengaluru, India

SUMMARY:
A 22-year-old designer born in Palamaner and now based in Andhra. Always chasing the experimental, a Starboy in orbit. I build visuals that feel like fever dreams: sharp, unstable, never still. Quiet in life, chaotic in creation. Not clean. Not safe. Always alive.

CORE STATS:
- 3+ Years Experience
- 15+ Projects Built
- 25K+ Users Impacted
- Endless Curiosity 🙄

PROFESSIONAL EXPERIENCE:
1. Full-Stack Developer - Freelance (2024 - Present)
   - Building products & AI solutions. Transforming ideas into beautiful, scalable digital experiences through UI/UX design, full-stack development, and AI-driven solutions.
2. UI/UX Designer - Startup Portfolios (2023 - 2024)
   - Designing digital experiences for startups.
3. Frontend Developer - Web Applications Studio (2022 - 2023)
   - Building responsive & performant web apps.

EDUCATION:
- B.E. Computer Science, Saveetha Engineering College (CGPA 8.77/10.0)

===================================================
Downloaded from CHAOS.EXE Portfolio.
            `;
            const blob = new Blob([resumeContent], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "veer_resume_v8.77.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 400);
        }
      }, step.delay);
    });
  };

  return (
    <div className="p-6 space-y-6 select-text">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col justify-center items-center text-center">
            <span className="text-xl lg:text-2xl font-extrabold text-[#00D4FF] unbounded">{stat.value}</span>
            <span className="text-[9px] font-mono tracking-wider text-white/50 uppercase mt-1 leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* CPI Progress bar */}
      <div className="bg-[#111118] border border-white/10 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="font-mono text-xs space-y-1">
          <div className="text-white/60">ACADEMIC_telemetry --rank=top_5%</div>
          <div className="text-white font-bold flex items-center space-x-1">
            <GraduationCap className="w-4 h-4 text-[#00FF88]" />
            <span>CGPA Rating: 8.77 / 10.0</span>
          </div>
        </div>
        <div className="font-mono text-xs w-full md:w-auto">
          <div className="text-[#00FF88] flex justify-between mb-1 text-[10px]">
            <span>LOADING_INTEGRITY</span>
            <span>87.7%</span>
          </div>
          <div className="text-lg tracking-wider text-[#00FF88] font-bold">
            ████████░░
          </div>
        </div>
      </div>

      {/* Action Download Trigger */}
      <div className="flex justify-center select-none">
        <button
          onClick={triggerExport}
          disabled={isExporting}
          className={`flex items-center space-x-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-xs font-mono uppercase tracking-widest text-white transition ${
            isExporting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Download className="w-4 h-4 text-[#00D4FF]" />
          <span>{isExporting ? "Compiling..." : "Export Resume (v8.77.txt)"}</span>
        </button>
      </div>

      {/* Export logs console */}
      {exportLogs.length > 0 && (
        <div className="bg-black/80 border border-white/15 p-4 rounded font-mono text-[10px] space-y-1 text-white/70 select-none">
          <div className="text-[#FFEB00] font-bold">&gt;&gt; COMPILING DATA Telemetry...</div>
          {exportLogs.map((log, idx) => (
            <div key={idx} className={log.startsWith(">> READY") ? "text-[#00FF88] font-bold" : ""}>
              {log}
            </div>
          ))}
          {isExporting && <div className="text-[#00D4FF] animate-pulse">Running PDF compiler...</div>}
        </div>
      )}

      {/* Experience History */}
      <div className="space-y-4">
        <h2 className="title-mono text-xs uppercase tracking-wider text-[#FF0080] font-bold border-b border-white/10 pb-1 flex items-center space-x-2 select-none">
          <Briefcase className="w-4 h-4" />
          <span>System Execution Log [Work History]</span>
        </h2>
        
        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-lg space-y-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                <h3 className="text-sm font-bold text-white leading-tight">{exp.role}</h3>
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/60 shrink-0 select-none">
                  {exp.period}
                </span>
              </div>
              <div className="text-xs font-mono text-[#00D4FF] select-none">{exp.org}</div>
              
              <ul className="list-disc pl-4 space-y-1 text-xs text-white/70">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h2 className="title-mono text-xs uppercase tracking-wider text-[#00FF88] font-bold border-b border-white/10 pb-1 flex items-center space-x-2 select-none">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Node Compile [Education]</span>
        </h2>
        
        {education.map((edu, idx) => (
          <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-lg space-y-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <h3 className="text-sm font-bold text-white leading-tight">{edu.degree}</h3>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/60 shrink-0 select-none">
                {edu.period}
              </span>
            </div>
            <div className="text-xs font-mono text-[#00D4FF] select-none">{edu.inst}</div>
            <p className="text-xs text-white/70">{edu.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
