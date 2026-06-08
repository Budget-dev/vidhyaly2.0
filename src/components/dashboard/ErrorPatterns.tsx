
"use client";

import React from "react";
import { motion } from "framer-motion";
import { errorPatterns } from "@/data/mockData";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const ErrorPatterns = () => {
  return (
    <section className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">Mistake Patterns</h2>
        <p className="text-xs font-medium text-slate-400">AI-detected this month</p>
      </div>

      <div className="space-y-4">
        {errorPatterns.map((error, idx) => (
          <motion.div
            key={error.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + (idx * 0.1) }}
            className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                "w-2.5 h-2.5 rounded-full mt-1.5 shrink-0",
                error.subject === 'biology' ? "bg-emerald-500" :
                error.subject === 'chemistry' ? "bg-amber-500" : "bg-blue-500"
              )} />
              
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors">
                  {error.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {error.description}
                </p>
                
                <div className="flex items-center gap-3 pt-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {error.count}
                  </span>
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {error.chapter} chapter
                  </span>
                  <button className="ml-auto flex items-center gap-1 text-[10px] font-black text-[#4F46E5] hover:gap-2 transition-all">
                    Fix this now <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
