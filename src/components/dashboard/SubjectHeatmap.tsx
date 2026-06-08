
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { masteryData } from "@/data/mockData";
import { cn } from "@/lib/utils";

type Subject = 'biology' | 'chemistry' | 'physics';

export const SubjectHeatmap = () => {
  const [activeTab, setActiveTab] = useState<Subject>('biology');

  return (
    <section className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">Chapter Mastery Map</h2>
          <p className="text-xs font-medium text-slate-400">Tap any chapter to drill practice questions</p>
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

      <div className="flex-1 space-y-5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {masteryData[activeTab].map((chapter, idx) => {
              const color = chapter.accuracy > 80 ? '#10B981' : 
                          chapter.accuracy > 60 ? '#3B82F6' : 
                          chapter.accuracy > 40 ? '#F59E0B' : '#EF4444';
              const bgColor = chapter.accuracy > 80 ? '#D1FAE5' : 
                            chapter.accuracy > 60 ? '#DBEAFE' : 
                            chapter.accuracy > 40 ? '#FEF3C7' : '#FEE2E2';

              return (
                <div key={chapter.name} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-700">{chapter.name}</span>
                      {chapter.pyqHigh && (
                        <span className="bg-[#FF6B9C]/10 text-[#FF6B9C] text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                          HIGH PYQ
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-black" style={{ color }}>{chapter.accuracy}%</span>
                  </div>
                  
                  <div className="relative h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${chapter.accuracy}%` }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.05 }}
                      className="absolute inset-y-0 left-0 rounded-full relative overflow-hidden"
                      style={{ backgroundColor: color }}
                    >
                      {/* Shimmer sweep */}
                      <motion.div 
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12"
                      />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
