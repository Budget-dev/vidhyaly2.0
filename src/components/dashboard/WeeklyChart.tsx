
"use client";

import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { motion } from "framer-motion";
import { weeklyPerformance } from "@/data/mockData";

export const WeeklyChart = () => {
  return (
    <section className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">Accuracy This Week</h2>
          <p className="text-xs font-medium text-slate-400">Biology vs Chemistry vs Physics</p>
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

      <div className="flex-1 w-full min-h-[250px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorChem" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPhy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                padding: '12px'
              }}
              labelStyle={{ fontWeight: 800, marginBottom: '4px', fontSize: '12px' }}
              itemStyle={{ fontSize: '10px', fontWeight: 700, padding: '2px 0' }}
            />
            <Area 
              type="monotone" 
              dataKey="biology" 
              stroke="#10B981" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorBio)" 
              animationDuration={1500}
            />
            <Area 
              type="monotone" 
              dataKey="chemistry" 
              stroke="#F59E0B" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorChem)" 
              animationDuration={1500}
            />
            <Area 
              type="monotone" 
              dataKey="physics" 
              stroke="#3B82F6" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorPhy)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 flex flex-col items-center">
          <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-1">Bio Avg</span>
          <span className="text-lg font-headline font-bold text-emerald-900">74%</span>
        </div>
        <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 flex flex-col items-center">
          <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest mb-1">Chem Avg</span>
          <span className="text-lg font-headline font-bold text-amber-900">53%</span>
        </div>
        <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100 flex flex-col items-center">
          <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1">Phy Avg</span>
          <span className="text-lg font-headline font-bold text-blue-900">62%</span>
        </div>
      </div>
    </section>
  );
};
