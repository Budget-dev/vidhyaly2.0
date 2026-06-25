
"use client";

import React from "react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  delta?: string;
  deltaType?: 'success' | 'warning' | 'danger' | 'neutral';
  icon: keyof typeof Icons;
  bg: string;
  color: string;
  index?: number;
}

export const StatCard = ({ label, value, suffix = "", delta, deltaType, icon, bg, color, index = 0 }: StatCardProps) => {
  // Safe icon lookup
  const IconComponent = (Icons as any)[icon] || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{ backgroundColor: bg }}
      className="group p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full border border-white/50"
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40" />
      
      <div className="flex flex-col gap-4 relative z-10">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
          style={{ backgroundColor: color + '20', color: color }}
        >
          <IconComponent className="w-6 h-6" />
        </div>
        
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-1">
            {typeof value === 'number' ? (
              <CountUpNumber 
                end={value} 
                suffix={suffix} 
                className="text-4xl font-headline font-bold text-[#1A1A2E]" 
              />
            ) : (
              <span className="text-4xl font-headline font-bold text-[#1A1A2E]">{value}</span>
            )}
          </div>
        </div>

        {delta && (
          <div className={cn(
            "text-xs font-black flex items-center gap-1.5",
            deltaType === 'success' ? "text-emerald-600" : 
            deltaType === 'warning' ? "text-amber-600" : 
            deltaType === 'danger' ? "text-red-600" : "text-slate-500"
          )}>
            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
              deltaType === 'success' ? "bg-emerald-500" : "bg-red-500"
            )} />
            {delta}
          </div>
        )}
      </div>
    </motion.div>
  );
};
