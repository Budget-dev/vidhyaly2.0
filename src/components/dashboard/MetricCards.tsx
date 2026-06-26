
"use client";

import React from "react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { cn } from "@/lib/utils";

const metrics = [
  {
    id: 1,
    label: "Current Accuracy",
    value: 0,
    suffix: "%",
    delta: "Start practicing",
    deltaType: "neutral",
    icon: "Target",
    bg: "#F3EEFF",
    color: "#4F46E5"
  },
  {
    id: 2,
    label: "Study Streak",
    value: 0,
    delta: "No active streak",
    deltaType: "warning",
    icon: "Flame",
    bg: "#FFF4E8",
    color: "#F59E0B"
  },
  {
    id: 3,
    label: "Mastery Level",
    value: 0,
    suffix: "%",
    delta: "Take a mock test",
    deltaType: "neutral",
    icon: "TrendingUp",
    bg: "#E8F4FF",
    color: "#3B82F6"
  },
  {
    id: 4,
    label: "Tasks Due",
    value: 0,
    delta: "Queue empty",
    deltaType: "success",
    icon: "Bell",
    bg: "#E8F5EE",
    color: "#10B981"
  }
];

export const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, idx) => {
        const IconComponent = (Icons as any)[m.icon];
        return (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (idx * 0.1) }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{ backgroundColor: m.bg }}
            className="group p-6 rounded-[20px] shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Glossy inner border effect */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40" />
            
            <div className="flex flex-col gap-4 relative z-10">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: m.color + '20', color: m.color }}
              >
                <IconComponent className="w-6 h-6" />
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                  {m.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <CountUpNumber 
                    end={m.value} 
                    suffix={m.suffix} 
                    className="text-3xl font-headline font-bold text-[#1A1A2E]" 
                  />
                </div>
              </div>

              <div className={cn(
                "text-[10px] font-bold flex items-center gap-1",
                m.deltaType === 'success' ? "text-emerald-600" : 
                m.deltaType === 'warning' ? "text-amber-600" : 
                m.deltaType === 'neutral' ? "text-slate-400" : "text-red-600"
              )}>
                {m.delta}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
