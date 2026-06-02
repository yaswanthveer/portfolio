"use client";

import React, { useState } from "react";
import { projectsData, Project } from "@/lib/projectsData";
import { ArrowLeft, Code } from "lucide-react";
import { playClickSound } from "@/lib/sounds";
import { useXPSystem } from "@/components/effects/XPSystem";

export const ProjectsWindow: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const xpSystem = useXPSystem();

  const handleProjectSelect = (project: Project) => {
    playClickSound(0.4);
    setSelectedProject(project);
    xpSystem.incrementStat("projectsViewed");
  };

  const handleBack = () => {
    playClickSound(0.3);
    setSelectedProject(null);
  };

  // Immersive Case Study View
  if (selectedProject) {
    const proj = selectedProject;
    return (
      <div className="flex flex-col h-full bg-black/70 text-white select-text">
        {/* Case Study Header Bar */}
        <div className="sticky top-0 bg-black/80 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>&gt; Back to List</span>
          </button>
          
          <div className="text-center font-mono text-[10px] hidden md:block text-white/50">
            SYSTEM_EXEC: {proj.file} | ACCENT: {proj.accentHex}
          </div>

          {proj.url ? (
            <a
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound(0.3)}
              className="flex items-center space-x-1 text-xs font-mono text-[#00FF88] font-bold hover:underline"
            >
              <span>launch_live ↗</span>
            </a>
          ) : (
            <span className="text-xs font-mono text-white/40">INTERNAL_ONLY</span>
          )}
        </div>

        {/* Case study body */}
        <div className="p-6 space-y-8 window-scroll overflow-y-auto max-w-4xl mx-auto pb-12">
          {/* File Spec logs */}
          <div className="bg-black/50 border border-white/10 p-4 rounded font-mono text-xs space-y-1">
            <div className="text-white/40">&gt;&gt; CAT SPEC_SHEET</div>
            <div><span className="text-[#00D4FF]">FILE:</span> {proj.file}</div>
            <div><span className="text-[#00D4FF]">TYPE:</span> {proj.type}</div>
            <div><span className="text-[#00D4FF]">STACK:</span> {proj.stack.join(" | ")}</div>
            <div><span className="text-[#00D4FF]">STATUS:</span> <span className="text-[#00FF88]">{proj.status}</span></div>
            {proj.url && (
              <div><span className="text-[#00D4FF]">URL:</span> <a href={proj.url} className="text-[#00FF88] underline" target="_blank" rel="noreferrer">{proj.url}</a></div>
            )}
          </div>

          {/* Heading title */}
          <div className="space-y-2">
            <h1
              className="hero-text text-4xl font-extrabold"
              style={{ color: proj.accentHex, textShadow: `0 0 20px ${proj.accentHex}30` }}
            >
              {proj.title}
            </h1>
            <p className="text-white/90 text-base leading-relaxed font-semibold">
              {proj.description}
            </p>
          </div>

          {/* Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proj.metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 p-4 rounded-lg text-center flex flex-col justify-center space-y-1 hover:bg-white/10 transition"
                style={{ borderColor: `${proj.accentHex}40` }}
              >
                <div
                  className="text-3xl font-extrabold unbounded"
                  style={{ color: proj.accentHex, textShadow: `0 0 10px ${proj.accentHex}40` }}
                >
                  {metric.value}
                </div>
                <div className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Key mock device representation */}
          <div
            className="w-full aspect-[16/9] border p-4 rounded-xl flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black to-slate-900 group"
            style={{ borderColor: `${proj.accentHex}50` }}
          >
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
            
            {/* Simulated Desktop Window Inside Showcase */}
            <div
              className="w-[90%] h-[85%] rounded border flex flex-col bg-[#111118] overflow-hidden"
              style={{
                borderColor: `${proj.accentHex}30`,
                boxShadow: `0 0 30px ${proj.accentHex}20`
              }}
            >
              <div className="bg-white/5 px-2 py-1.5 border-b border-white/10 flex items-center justify-between text-[8px] font-mono text-white/40">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                </div>
                <span>SIMULATED_SCREEN.exe</span>
                <span>[1280x720]</span>
              </div>
              <div className="flex-1 p-3 flex flex-col justify-between font-mono text-[10px] text-white/60">
                <div>
                  <span className="text-[#00FF88]">&gt;_ launch --mode=premium</span>
                  <div className="mt-1 text-white text-[11px] font-bold">
                    {proj.title} Deployed Instance
                  </div>
                </div>
                
                {/* Floating Metrics Tag in Sim Screen */}
                <div className="flex justify-between items-end border-t border-white/5 pt-2">
                  <div className="text-[8px]">
                    STATUS: ACTIVE_NODE
                    <br />
                    SECURE_UPLINK: ENCRYPTED
                  </div>
                  <div
                    className="px-2 py-1 text-[8px] rounded uppercase font-bold text-black"
                    style={{ backgroundColor: proj.accentHex }}
                  >
                    {proj.stack[0]} Shipped
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual Emojis Floating */}
            <div className="absolute top-6 right-8 text-4xl opacity-30 select-none animate-pulse">
              {proj.emoji}
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
            <div className="space-y-3">
              <h2 className="title-mono text-xs uppercase text-[#FF0080] tracking-wider font-bold border-b border-white/10 pb-1">
                &gt; The Challenge
              </h2>
              <p className="text-white/80">{proj.problem}</p>
            </div>
            <div className="space-y-3">
              <h2 className="title-mono text-xs uppercase text-[#00FF88] tracking-wider font-bold border-b border-white/10 pb-1">
                &gt; Technical Resolution
              </h2>
              <p className="text-white/80">{proj.solution}</p>
            </div>
          </div>

          {/* Highlights & details */}
          <div className="space-y-4">
            <h2 className="title-mono text-xs uppercase text-[#00D4FF] tracking-wider font-bold border-b border-white/10 pb-1 flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Core Architectural Highlights</span>
            </h2>
            <ul className="space-y-2 text-xs font-mono text-white/70">
              {proj.details?.map((detail, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#00FF88] mt-0.5 shrink-0">✓</span>
                  <span>{detail}</span>
                </li>
              )) || (
                <li className="flex items-start space-x-2">
                  <span className="text-[#00FF88] mt-0.5 shrink-0">✓</span>
                  <span>{proj.impactText}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Showcase Grid View
  return (
    <div className="p-6 space-y-6">
      {/* Search/Catalog specs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="title-mono text-sm uppercase text-[#00FF88] font-bold">
            &gt; ls ./projects/
          </h1>
          <p className="text-white/50 text-xs mt-1">
            Double click or click cards to decrypt and launch complete case study telemetry.
          </p>
        </div>
        <div className="text-xs font-mono text-white/40">
          Uptime Status: 8 Deployed Systems Shipped
        </div>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        {projectsData.map((project) => (
          <div
            key={project.id}
            data-cursor="project"
            onClick={() => handleProjectSelect(project)}
            className="group relative border bg-[#111118]/80 border-white/10 hover:border-white/20 p-5 rounded-xl cursor-pointer overflow-hidden transition-all duration-200 shadow-md flex flex-col justify-between"
            style={{
              "--hover-accent": project.accentHex,
            } as React.CSSProperties}
          >
            {/* Top corner color indicator */}
            <div
              className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition group-hover:opacity-25"
              style={{ backgroundColor: project.accentHex }}
            />

            <div className="space-y-3 z-10">
              <div className="flex justify-between items-center">
                {/* Tech stack badge */}
                <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[9px] font-mono text-white/60 tracking-wider">
                  {project.stack.slice(0, 3).join(" | ")}
                </span>
                
                {/* Visual emoji */}
                <span className="text-xl shrink-0 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                  {project.emoji}
                </span>
              </div>

              {/* Title & Glitch hover effect */}
              <h2 className="text-lg font-extrabold text-white group-hover:text-[var(--hover-accent)] transition-colors duration-200 flex items-center space-x-1 leading-snug">
                <span className="glitch-hover truncate">{project.title}</span>
              </h2>

              <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Project Specs */}
            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono z-10 text-white/40">
              <span>{project.file}</span>
              <span className="text-[#00FF88] group-hover:underline flex items-center space-x-1">
                <span>CAT EXEC_LOG &gt;</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
