"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { lessonsData } from "@/data/mockData";
import { BookCheck, TrendingUp, Award, Clock, CheckCircle2, Circle, PlayCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SmartLearnDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Lessons Completed" value={23} icon="BookOpen" bg="#E8F4FF" color="#3B82F6" index={0} />
        <StatCard label="Current Level" value="Intermediate" icon="TrendingUp" bg="#E8F5EE" color="#10B981" index={1} />
        <StatCard label="Avg Quiz Score" value={67} suffix="%" delta="↑ 5% this week" deltaType="success" icon="Award" bg="#FFF4E8" color="#F59E0B" index={2} />
        <StatCard label="Time This Week" value={4.2} suffix=" hrs" icon="Clock" bg="#F3EEFF" color="#4F46E5" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Tree */}
        <div className="lg:col-span-3 bg-white rounded-[20px] p-6 shadow-sm">
          <div className="flex gap-2 mb-6 p-1 bg-slate-50 rounded-full border">
            <button className="flex-1 text-[10px] font-black uppercase bg-white shadow-sm rounded-full py-1.5 text-indigo-600">Bio</button>
            <button className="flex-1 text-[10px] font-black uppercase text-slate-400">Chem</button>
            <button className="flex-1 text-[10px] font-black uppercase text-slate-400">Phy</button>
          </div>
          
          <div className="space-y-0 relative">
            {lessonsData.biology.map((lesson, i) => (
              <div key={lesson.name} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all",
                    lesson.status === 'completed' ? "bg-emerald-500 text-white" :
                    lesson.status === 'in-progress' ? "border-2 border-indigo-500 bg-white" : "border-2 border-slate-200 bg-white"
                  )}>
                    {lesson.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                    {lesson.status === 'in-progress' && <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />}
                  </div>
                  {i < lessonsData.biology.length - 1 && (
                    <div className="w-[2px] h-10 border-l-2 border-dashed border-slate-100" />
                  )}
                </div>
                <span className={cn(
                  "text-xs font-bold pt-1 transition-colors",
                  lesson.status === 'completed' ? "text-slate-400 line-through" :
                  lesson.status === 'in-progress' ? "text-indigo-600" : "text-slate-500"
                )}>
                  {lesson.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Centre: Lesson Focus */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-[20px] p-8 shadow-xl border border-indigo-50/50 h-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest">Biology</span>
            </div>
            
            <h2 className="text-3xl font-headline font-bold text-[#1A1A2E] mb-1">Genetics</h2>
            <p className="text-slate-500 font-medium mb-8">Mendelian Laws of Inheritance</p>

            <div className="space-y-2 mb-8">
              <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Chapter Progress</span>
                <span className="text-indigo-600">60%</span>
              </div>
              <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  className="h-full bg-indigo-500 rounded-full"
                />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { title: "Introduction to Genetics", status: 'done' },
                { title: "Mendel's Experiments", status: 'done' },
                { title: "Laws of Dominance", status: 'current' },
                { title: "Dihybrid Cross", status: 'pending' },
                { title: "Chromosomal Theory", status: 'pending' }
              ].map((mod, i) => (
                <div key={i} className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl border transition-all",
                  mod.status === 'current' ? "bg-indigo-50/50 border-indigo-100 shadow-sm" : "bg-white border-transparent"
                )}>
                  {mod.status === 'done' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
                   mod.status === 'current' ? <PlayCircle className="w-5 h-5 text-indigo-500" /> :
                   <Circle className="w-5 h-5 text-slate-200" />}
                  <span className={cn(
                    "text-sm font-bold",
                    mod.status === 'current' ? "text-indigo-900" : "text-slate-600"
                  )}>{mod.title}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 py-6 rounded-2xl bg-[#5B50E8] text-white font-bold shadow-xl shadow-indigo-100">
                Continue Learning <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" className="px-8 rounded-2xl border-slate-200 text-slate-600 font-bold">
                Retry Quiz
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Recs */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#FFF4E8] border border-orange-100 rounded-[20px] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-black text-orange-900 uppercase tracking-widest">Next Priority</span>
            </div>
            <p className="text-orange-800 text-sm font-medium leading-relaxed">
              Complete Genetics before starting Human Physiology. Your quiz average is 68% — aim for 80%.
            </p>
            <Button className="w-full bg-white text-orange-600 hover:bg-orange-50 rounded-xl font-bold text-xs h-10 border border-orange-200">
              Focus on Genetics
            </Button>
          </div>

          <div className="bg-white rounded-[20px] p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-900">Chapter Score Trends</h3>
            <div className="h-32 w-full bg-slate-50 rounded-xl border-2 border-dashed border-slate-100 flex items-center justify-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Performance Graph</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Biology</span>
                <span className="text-[10px] font-black text-emerald-600">Intermediate</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Chemistry</span>
                <span className="text-[10px] font-black text-amber-600">Beginner</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Physics</span>
                <span className="text-[10px] font-black text-blue-600">Intermediate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
