
"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { BookOpen, TrendingUp, Award, Clock, Circle, PlayCircle, ChevronRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INITIAL_CURRICULUM = [
  { name: "Cell Structure & Function", status: "not-started" },
  { name: "Biomolecules", status: "not-started" },
  { name: "Genetics", status: "not-started" },
  { name: "Human Physiology", status: "not-started" },
  { name: "Plant Physiology", status: "not-started" },
  { name: "Ecology", status: "not-started" },
  { name: "Evolution", status: "not-started" },
  { name: "Biotechnology", status: "not-started" }
];

export const SmartLearnDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Lessons Completed" value={0} icon="BookOpen" bg="#E8F4FF" color="#3B82F6" index={0} />
        <StatCard label="Current Level" value="Beginner" icon="TrendingUp" bg="#E8F5EE" color="#10B981" index={1} />
        <StatCard label="Avg Quiz Score" value={0} suffix="%" delta="Take your first quiz" deltaType="neutral" icon="Award" bg="#FFF4E8" color="#F59E0B" index={2} />
        <StatCard label="Time This Week" value={0} suffix=" hrs" icon="Clock" bg="#F3EEFF" color="#4F46E5" index={3} />
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
            {INITIAL_CURRICULUM.map((lesson, i) => (
              <div key={lesson.name} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all border-2 border-slate-200 bg-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                  </div>
                  {i < INITIAL_CURRICULUM.length - 1 && (
                    <div className="w-[2px] h-10 border-l-2 border-dashed border-slate-100" />
                  )}
                </div>
                <span className="text-xs font-bold pt-1 text-slate-400 transition-colors">
                  {lesson.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Centre: Lesson Focus */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-[20px] p-8 shadow-xl border border-indigo-50/50 h-full flex flex-col items-center justify-center text-center">
            <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
               <GraduationCap className="w-10 h-10 text-indigo-500" />
            </div>
            <h2 className="text-3xl font-headline font-bold text-[#1A1A2E] mb-2">Ready to Learn?</h2>
            <p className="text-slate-500 font-medium mb-8 max-w-sm">Start your adaptive learning path. Vidhyaly will tailor the difficulty of concepts based on your performance.</p>

            <Button className="px-12 py-7 rounded-2xl bg-[#5B50E8] text-white font-bold text-lg shadow-2xl shadow-indigo-100 hover:bg-indigo-700">
              Begin Curriculum <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Right: Recs */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-50 border border-slate-100 rounded-[20px] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Next Priority</span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
              Your first priority will appear here after your first diagnostic session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
