
"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export const ErrorPatterns = () => {
  return (
    <section className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col items-center justify-center text-center min-h-[300px]">
      <div className="mb-6">
        <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">Mistake Patterns</h2>
        <p className="text-xs font-medium text-slate-400">AI-detected this month</p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4 py-8"
      >
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
           <BrainCircuit className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-400">No patterns detected yet</p>
          <p className="text-xs text-slate-400 max-w-[200px]">Complete more MCQ sessions to allow VidhyaMithra to analyze your common mistakes.</p>
        </div>
      </motion.div>
    </section>
  );
};
