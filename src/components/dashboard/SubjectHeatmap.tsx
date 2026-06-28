
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

type Subject = 'biology' | 'chemistry' | 'physics';

const INITIAL_CHAPTERS: Record<Subject, { name: string; accuracy: number; pyqHigh?: boolean }[]> = {
  biology: [
    { name: "Cell Biology", accuracy: 0, pyqHigh: true },
    { name: "Genetics", accuracy: 0, pyqHigh: true },
    { name: "Ecology", accuracy: 0, pyqHigh: true },
    { name: "Human Physiology", accuracy: 0, pyqHigh: true }
  ],
  chemistry: [
    { name: "Organic Reactions", accuracy: 0, pyqHigh: true },
    { name: "Equilibrium", accuracy: 0, pyqHigh: true },
    { name: "Thermodynamics", accuracy: 0, pyqHigh: true }
  ],
  physics: [
    { name: "Laws of Motion", accuracy: 0, pyqHigh: true },
    { name: "Optics", accuracy: 0, pyqHigh: true },
    { name: "Electrostatics", accuracy: 0, pyqHigh: true }
  ]
};

export const SubjectHeatmap = () => {
  const [activeTab, setActiveTab] = useState<Subject>('biology');

  return (
    <section className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">Chapter Mastery Map</h2>
          <p className="text-xs font-medium text-slate-400">Real-time proficiency based on practice</p>
        </div>
        
        <div className="flex gap-2 bg-slate-50 p-1 rounded-full border">
          {(['biology', 'chemistry', 'physics'] as Subject[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-1.5 rounded-full text-xs font-bold capitalize transition-all",
                activeTab === tab 
                  ? "bg-[#4F46E5] text-white shadow-md shadow-indigo-200" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-8 overflow-hidden">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-slate-400" />
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mastery data will populate after your first test</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {INITIAL_CHAPTERS[activeTab].map((chapter, idx) => (
              <div key={chapter.name} className="group opacity-40">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700">{chapter.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-300">0%</span>
                </div>
                
                <div className="relative h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-slate-200 w-0" />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
