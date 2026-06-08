"use client";

import React from "react";
import { Bell, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  activeTool: string;
}

const TOOL_TITLES: Record<string, string> = {
  dashboard: "Good morning, Arjun 👋",
  flashcards: "Flashcards",
  smartlearn: "Smart Learn",
  mcqs: "Practice MCQs",
  guides: "Study Guides",
  aitutor: "AI Tutor — VidhyaMithra",
  groupstudy: "Group Study",
};

export const Topbar = ({ activeTool }: TopbarProps) => {
  return (
    <motion.header 
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-[260px] right-0 h-16 bg-white/80 backdrop-blur-md border-b z-40 px-8 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-headline font-bold text-[#1A1A2E]">
          {TOOL_TITLES[activeTool]}
        </h1>
        <div className="h-4 w-px bg-slate-200" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          NEET 2026 — <span className="text-amber-500">87 days to go</span>
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border">
          <span className="text-lg">🔥</span>
          <span className="text-sm font-bold text-slate-700">14 day streak</span>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="group flex items-center gap-2 px-6 py-2 rounded-full border-2 border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white transition-all duration-300 shadow-sm"
        >
          <Sparkles className="w-4 h-4 group-hover:animate-spin" />
          <span className="text-sm font-bold">Ask VidhyaMithra...</span>
        </motion.button>

        <div className="relative">
          <button className="w-10 h-10 rounded-full bg-slate-50 border flex items-center justify-center hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5 text-slate-500" />
          </button>
          <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </div>
      </div>
    </motion.header>
  );
};
