"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import { playClickSound, playSuccessSound } from "@/lib/sounds";

interface Message {
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

export const ChatbotWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        text: "System Online. I am YASWANTH.AI, a localized neural companion trained on Yaswanth's career telemetry. Ask me about his projects, book publications, 8.77 CPI rating, or why you should hire him right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Scroll to bottom on message
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickPrompts = [
    "Tell me about The Rythu project",
    "What are his core technical skills?",
    "How did he publish a textbook?",
    "Is he open to full-time roles?"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    playClickSound(0.4);
    
    const userMsg: Message = {
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate thinking process
    setTimeout(() => {
      const responseText = generateAIResponse(text);
      const aiMsg: Message = {
        sender: "ai",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
      playSuccessSound();
    }, 700);
  };

  // Witty response generator based on key phrases
  const generateAIResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes("rythu") || q.includes("mango")) {
      return "🥭 THE RYTHU is a premium Direct-To-Consumer mango brand. Yaswanth engineered this to cut out Indian supply-chain middlemen completely, boosting local farmer earnings by +45% while treating seasonal yields with high-end editorial visuals. Stack: React.js, Node.js, and custom Figma libraries.";
    }
    
    if (q.includes("ziro") || q.includes("career") || q.includes("placement")) {
      return "⚡ ZIRO.AI is an AI-guided Career Accelerator for engineering students. It generates customized curriculum roadmaps and adaptive practice guides, creating direct tracking channels from campuses to recruiters. Stack: Next.js, OpenAI API and customized NLP middleware.";
    }

    if (q.includes("shecodes") || q.includes("mother") || q.includes("watsonx")) {
      return "💜 SHECODES.AI was designed during IBM Watsonx hackathons. It's a 6-module life operating system built with Granite LLMs on Watsonx to assess, retrain, and transition mothers returning to tech environments after career pauses. Stack: React, Watsonx SDK, and secure Cloudant databases.";
    }

    if (q.includes("book") || q.includes("author") || q.includes("breaking")) {
      return "📕 Yes, Yaswanth is the author of 'Breaking the Code', a physical and digital guidebook written to help engineering students build robust, full-stack systems without falling into academic tutorial hell. He managed to publish this book while maintaining his 8.77 college CGPA uptime!";
    }

    if (q.includes("skill") || q.includes("stack") || q.includes("code") || q.includes("language")) {
      return "💻 System Specifications: Languages: Python (NLP/ML), JavaScript/TypeScript (React/Next.js/Framer), Java, and SQL. ML Frameworks: Scikit-learn, Pandas, watsonx, Gemini, and OpenAI. Devops: Docker, Git/Github, VMware. He specializes in making machines think, then making them look extremely good.";
    }

    if (q.includes("hire") || q.includes("job") || q.includes("opportunity") || q.includes("work") || q.includes("role")) {
      return "🟢 SYSTEM SIGNAL: HIGHLY RECOMMENDED. Yaswanth is based in Bengaluru, India and is seeking Full-Time SWE / AI-ML Engineer roles, freelance collaborations, or high-octane project builds. You can drop a message in CONTACT.sh or send a direct encrypted ping to yaswanthveer1233@gmail.com. Response time: faster than his voice bots!";
    }

    if (q.includes("cgpa") || q.includes("cpi") || q.includes("grade") || q.includes("saveetha")) {
      return "🏆 Academic Telemetry: Yaswanth graduated from Saveetha Engineering College in Chennai with a consistent 8.77 / 10.0 CPI (placing him in the top 5% of his cohort). Annoyingly consistent, we know.";
    }

    if (q.includes("voice") || q.includes("chatbot") || q.includes("armsoftech")) {
      return "🤖 As an intern at ArmsofTech.AI, Yaswanth optimized high-throughput Speech voice bots. By swapping out bloated JSON models for Google Protocol Buffers, he reduced payload data sizes by 40% and overall API latency by 30%.";
    }

    if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      return "👋 Hello! I am online. Ask me about Yaswanth's DTC mango brand (The Rythu), his edtech guides, his watsonx Granite companions, or how you can secure him for a technical role in your team.";
    }

    // Default witty response
    return "🔮 Fascinating query! While my localized nodes search for that, I can confirm that Yaswanth is a highly versatile developer who ships clean Python microservices and pixel-perfect Next.js layouts. Ping him directly at yaswanthveer1233@gmail.com to ask him yourself!";
  };

  return (
    <div className="flex flex-col h-full bg-[#050508]/90 font-mono text-xs select-text">
      {/* Scrollable messages container */}
      <div 
        ref={containerRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto window-scroll min-h-[220px]"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex items-start space-x-2 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
          >
            {/* Avatar bubble */}
            <div className={`p-1.5 rounded-lg shrink-0 ${
              msg.sender === "ai" ? "bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF]" : "bg-[#FF0080]/10 border border-[#FF0080]/30 text-[#FF0080]"
            }`}>
              {msg.sender === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            
            {/* Message balloon */}
            <div className={`p-3 rounded-lg max-w-[80%] leading-relaxed ${
              msg.sender === "ai" ? "bg-white/5 border border-white/10 text-white/90" : "bg-[#FF0080]/10 border border-[#FF0080]/20 text-white"
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div className="text-[8px] text-white/30 text-right mt-1.5 select-none">{msg.timestamp}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF]">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-white/40 animate-pulse select-none">
              YASWANTH.AI is compiling response...
            </div>
          </div>
        )}
      </div>

      {/* Floating quick prompts - select-none */}
      <div className="px-4 py-2 border-t border-white/5 bg-black/40 flex flex-wrap gap-2 select-none">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2 py-1 bg-white/5 border border-white/10 hover:border-[#00D4FF]/30 hover:bg-[#00D4FF]/5 rounded text-[10px] text-white/60 hover:text-white transition duration-200"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat prompt input */}
      <div className="p-3 border-t border-white/10 bg-black/60 flex items-center space-x-2 select-none">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(inputVal)}
          placeholder="Ask YASWANTH.AI a question..."
          className="flex-1 bg-[#111118] border border-white/10 focus:border-[#00D4FF]/30 outline-none rounded-lg px-3 py-2 text-xs text-white"
        />
        <button
          onClick={() => handleSend(inputVal)}
          className="p-2 bg-[#00D4FF]/10 hover:bg-[#00D4FF]/25 border border-[#00D4FF]/30 hover:border-[#00D4FF]/50 rounded-lg text-[#00D4FF] transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
