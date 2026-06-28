
"use client";

import React from "react";
import { Target, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ProgressRing } from "@/components/ui/ProgressRing";

export const TodaysPlan = () => {
  return (
    <section className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">Today's Plan</h2>
          <p className="text-xs font-medium text-slate-400">AI-generated for you</p>
        </div>
        <ProgressRing percentage={0} size={48} color="#4F46E5" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary/30">
          <Target className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-900">Your queue is empty</p>
          <p className="text-xs text-slate-400 leading-relaxed max-w-[200px] mx-auto">
            Choose a subject or chapter to begin your daily preparation and get task recommendations.
          </p>
        </div>
        <button className="flex items-center gap-2 text-xs font-black text-[#4F46E5] uppercase tracking-widest hover:gap-3 transition-all">
          Explore Subjects <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-6 pt-6 border-t flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">0 min logged today</span>
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          0/0 Done
        </div>
      </div>
    </section>
  );
};
