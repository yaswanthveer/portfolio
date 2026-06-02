"use client";

import React, { useState, useEffect } from "react";
import { playClickSound } from "@/lib/sounds";
import { Terminal, Braces, Sparkles } from "lucide-react";

export const SkillsWindow: React.FC = () => {
  const [viewMode, setViewMode] = useState<"json" | "meters">("json");
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    languages: true,
    AI_ML: true,
    design: false,
    devops: false
  });
  
  // State for triggering progress bar sweeps
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    if (viewMode === "meters") {
      setBarsAnimated(false);
      const timer = setTimeout(() => setBarsAnimated(true), 100);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);

  const toggleNode = (node: string) => {
    playClickSound(0.25);
    setExpandedNodes(prev => ({
      ...prev,
      [node]: !prev[node]
    }));
  };

  const handleToggleView = (mode: "json" | "meters") => {
    playClickSound(0.3);
    setViewMode(mode);
  };

  const skillsData = {
    languages: {
      mastered: ["Python 🐍", "JavaScript ⚡", "Java ☕"],
      comfortable: ["SQL", "MySQL", "PostgreSQL"],
      dangerous_in: ["Flutter", "Shell"]
    },
    AI_ML: {
      frameworks: ["Scikit-learn", "Pandas", "NumPy"],
      speciality: ["NLP", "LLMs", "GenAI", "Prompt Engineering"],
      APIs: ["Gemini API", "OpenAI API", "IBM watsonx"],
      vibes: "I make machines think, then make them look good"
    },
    design: {
      tools: ["Figma ✦", "Framer", "Power BI"],
      style: "Brutalist meets Editorial meets Barely Holding It Together"
    },
    devops: ["Docker", "Git", "GitHub", "Postman", "VMware"]
  };

  const progressSkills = [
    { name: "Python (NLP & ML backend)", value: 92, color: "var(--neon-green)" },
    { name: "JavaScript / React / Next.js", value: 90, color: "var(--neon-cyan)" },
    { name: "Figma (UI/UX wireframes & design specs)", value: 95, color: "var(--neon-magenta)" },
    { name: "Granite LLMs & IBM Watsonx integrations", value: 88, color: "var(--neon-orange)" },
    { name: "SQL & Relational Datastores", value: 82, color: "var(--neon-yellow)" },
    { name: "Docker containers & DevOps Pipelines", value: 80, color: "var(--neon-cyan)" }
  ];

  return (
    <div className="p-6 h-full flex flex-col justify-between select-text font-mono text-sm leading-relaxed">
      {/* Header bar and toggle keys */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 select-none">
        <div>
          <span className="text-[#00FF88] font-bold text-xs uppercase">&gt; SKILLS.json</span>
          <p className="text-[10px] text-white/40 mt-1">Configure viewing telemetry node</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => handleToggleView("json")}
            className={`px-3 py-1 text-xs rounded-md flex items-center space-x-1.5 transition ${
              viewMode === "json" ? "bg-white/10 text-white border border-white/15" : "text-white/40 hover:text-white"
            }`}
          >
            <Braces className="w-3.5 h-3.5" />
            <span>Interactive JSON</span>
          </button>
          <button
            onClick={() => handleToggleView("meters")}
            className={`px-3 py-1 text-xs rounded-md flex items-center space-x-1.5 transition ${
              viewMode === "meters" ? "bg-white/10 text-white border border-white/15" : "text-white/40 hover:text-white"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Neon Meters</span>
          </button>
        </div>
      </div>

      {/* Main Core View Area */}
      <div className="flex-1 overflow-auto bg-black/60 border border-white/10 rounded-lg p-4 window-scroll min-h-[250px]">
        {/* VIEW 01: JSON Syntax Tree */}
        {viewMode === "json" && (
          <div className="space-y-2 select-text font-mono text-xs md:text-sm">
            <div className="text-white/50">{`{`}</div>
            
            {/* LANGUAGES Node */}
            <div className="pl-4">
              <span 
                onClick={() => toggleNode("languages")}
                className="text-[#FF0080] font-bold hover:underline cursor-pointer select-none"
              >
                &quot;languages&quot;
              </span>
              : <span className="text-white/40">{expandedNodes.languages ? "{" : "{...}"}</span>
              
              {expandedNodes.languages && (
                <div className="pl-4 border-l border-white/5 ml-2 mt-1 space-y-1">
                  <div>
                    <span className="text-[#00D4FF] font-semibold">&quot;mastered&quot;</span>: [
                    <span className="text-[#00FF88]">{skillsData.languages.mastered.map(v => `"${v}"`).join(", ")}</span>
                    ],
                  </div>
                  <div>
                    <span className="text-[#00D4FF] font-semibold">&quot;comfortable&quot;</span>: [
                    <span className="text-[#00FF88]">{skillsData.languages.comfortable.map(v => `"${v}"`).join(", ")}</span>
                    ],
                  </div>
                  <div>
                    <span className="text-[#00D4FF] font-semibold">&quot;dangerous_in&quot;</span>: [
                    <span className="text-[#00FF88]">{skillsData.languages.dangerous_in.map(v => `"${v}"`).join(", ")}</span>
                    ]
                  </div>
                </div>
              )}
              {expandedNodes.languages && <div className="pl-0 text-white/40">{`},`}</div>}
            </div>

            {/* AI/ML Node */}
            <div className="pl-4 mt-2">
              <span 
                onClick={() => toggleNode("AI_ML")}
                className="text-[#FF0080] font-bold hover:underline cursor-pointer select-none"
              >
                &quot;AI_ML&quot;
              </span>
              : <span className="text-white/40">{expandedNodes.AI_ML ? "{" : "{...}"}</span>
              
              {expandedNodes.AI_ML && (
                <div className="pl-4 border-l border-white/5 ml-2 mt-1 space-y-1">
                  <div>
                    <span className="text-[#00D4FF] font-semibold">&quot;frameworks&quot;</span>: [
                    <span className="text-[#00FF88]">{skillsData.AI_ML.frameworks.map(v => `"${v}"`).join(", ")}</span>
                    ],
                  </div>
                  <div>
                    <span className="text-[#00D4FF] font-semibold">&quot;speciality&quot;</span>: [
                    <span className="text-[#00FF88]">{skillsData.AI_ML.speciality.map(v => `"${v}"`).join(", ")}</span>
                    ],
                  </div>
                  <div>
                    <span className="text-[#00D4FF] font-semibold">&quot;APIs&quot;</span>: [
                    <span className="text-[#00FF88]">{skillsData.AI_ML.APIs.map(v => `"${v}"`).join(", ")}</span>
                    ],
                  </div>
                  <div className="flex flex-wrap">
                    <span className="text-[#00D4FF] font-semibold">&quot;vibes&quot;</span>: 
                    <span className="text-[#FFEB00] ml-1">&quot;{skillsData.AI_ML.vibes}&quot;</span>
                  </div>
                </div>
              )}
              {expandedNodes.AI_ML && <div className="pl-0 text-white/40">{`},`}</div>}
            </div>

            {/* DESIGN Node */}
            <div className="pl-4 mt-2">
              <span 
                onClick={() => toggleNode("design")}
                className="text-[#FF0080] font-bold hover:underline cursor-pointer select-none"
              >
                &quot;design&quot;
              </span>
              : <span className="text-white/40">{expandedNodes.design ? "{" : "{...}"}</span>
              
              {expandedNodes.design && (
                <div className="pl-4 border-l border-white/5 ml-2 mt-1 space-y-1">
                  <div>
                    <span className="text-[#00D4FF] font-semibold">&quot;tools&quot;</span>: [
                    <span className="text-[#00FF88]">{skillsData.design.tools.map(v => `"${v}"`).join(", ")}</span>
                    ],
                  </div>
                  <div className="flex flex-wrap">
                    <span className="text-[#00D4FF] font-semibold">&quot;style&quot;</span>: 
                    <span className="text-[#FFEB00] ml-1">&quot;{skillsData.design.style}&quot;</span>
                  </div>
                </div>
              )}
              {expandedNodes.design && <div className="pl-0 text-white/40">{`},`}</div>}
            </div>

            {/* DEVOPS Node */}
            <div className="pl-4 mt-2">
              <span 
                onClick={() => toggleNode("devops")}
                className="text-[#FF0080] font-bold hover:underline cursor-pointer select-none"
              >
                &quot;devops&quot;
              </span>
              : <span className="text-white/40">{expandedNodes.devops ? "[" : "[...]"}</span>
              
              {expandedNodes.devops && (
                <div className="pl-4 border-l border-white/5 ml-2 mt-1">
                  <span className="text-[#00FF88]">{skillsData.devops.map(v => `"${v}"`).join(", ")}</span>
                </div>
              )}
              {expandedNodes.devops && <div className="pl-0 text-white/40">{`]`}</div>}
            </div>

            <div className="text-white/50">{`}`}</div>
          </div>
        )}

        {/* VIEW 02: Neon Glowing Progress Meters */}
        {viewMode === "meters" && (
          <div className="space-y-5">
            <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1 border-b border-white/5 pb-2">
              Executing visual skill metrics... Loading levels.
            </div>
            
            <div className="space-y-4">
              {progressSkills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white/80">{skill.name}</span>
                    <span style={{ color: skill.color }}>{skill.value}%</span>
                  </div>
                  
                  {/* Progress track */}
                  <div className="w-full h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out absolute left-0 top-0"
                      style={{
                        width: barsAnimated ? `${skill.value}%` : "0%",
                        backgroundColor: skill.color,
                        boxShadow: `0 0 10px ${skill.color}`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ambient message footer */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center space-x-2 text-[10px] text-white/50">
        <Sparkles className="w-3.5 h-3.5 text-[#00FF88]" />
        <span>Vibe Check: Yaswanth builds beautiful neural platforms with modern type guidelines.</span>
      </div>
    </div>
  );
};
