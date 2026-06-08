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
  const IconComponent = Icons[icon] as React.ElementType;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{ backgroundColor: bg }}
      className="group p-6 rounded-[20px] shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full"
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40" />
      
      <div className="flex flex-col gap-4 relative z-10">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ backgroundColor: color + '20', color: color }}
        >
          <IconComponent className="w-6 h-6" />
        </div>
        
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-1">
            {typeof value === 'number' ? (
              <CountUpNumber 
                end={value} 
                suffix={suffix} 
                className="text-3xl font-headline font-bold text-[#1A1A2E]" 
              />
            ) : (
              <span className="text-3xl font-headline font-bold text-[#1A1A2E]">{value}</span>
            )}
          </div>
        </div>

        {delta && (
          <div className={cn(
            "text-xs font-bold flex items-center gap-1",
            deltaType === 'success' ? "text-emerald-600" : 
            deltaType === 'warning' ? "text-amber-600" : 
            deltaType === 'danger' ? "text-red-600" : "text-slate-500"
          )}>
            {delta}
          </div>
        )}
      </div>
    </motion.div>
  );
};
