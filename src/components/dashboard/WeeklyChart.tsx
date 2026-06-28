
"use client";

import React from "react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { BarChart3 } from "lucide-react";

const INITIAL_PERFORMANCE = [
  { day: "Mon", biology: 0, chemistry: 0, physics: 0 },
  { day: "Tue", biology: 0, chemistry: 0, physics: 0 },
  { day: "Wed", biology: 0, chemistry: 0, physics: 0 },
  { day: "Thu", biology: 0, chemistry: 0, physics: 0 },
  { day: "Fri", biology: 0, chemistry: 0, physics: 0 },
  { day: "Sat", biology: 0, chemistry: 0, physics: 0 },
  { day: "Sun", biology: 0, chemistry: 0, physics: 0 }
];

export const WeeklyChart = () => {
  return (
    <section className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">Accuracy This Week</h2>
          <p className="text-xs font-medium text-slate-400">Consistency tracking</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bio</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chem</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phy</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px] mt-4 relative">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-slate-300 gap-2">
           <BarChart3 className="w-8 h-8 opacity-20" />
           <p className="text-[10px] font-black uppercase tracking-widest">No activity data yet</p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={INITIAL_PERFORMANCE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }} 
              dy={10}
            />
            <YAxis 
              domain={[0, 100]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
              tickFormatter={(val) => `${val}%`}
            />
            <Area 
              type="monotone" 
              dataKey="biology" 
              stroke="#E2E8F0" 
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6 opacity-30">
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Bio Avg</span>
          <span className="text-lg font-headline font-bold text-slate-900">0%</span>
        </div>
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Chem Avg</span>
          <span className="text-lg font-headline font-bold text-slate-900">0%</span>
        </div>
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Phy Avg</span>
          <span className="text-lg font-headline font-bold text-slate-900">0%</span>
        </div>
      </div>
    </section>
  );
};
