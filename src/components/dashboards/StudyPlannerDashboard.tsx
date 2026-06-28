
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Target, 
  Zap, 
  AlertCircle,
  TrendingUp,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DAILY_SCHEDULE = [
  { 
    day: "Day 1 (Today)", 
    subject: "Biology", 
    chapter: "Cell: The Unit of Life", 
    weightage: "High", 
    tasks: ["Read NCERT Page 125-140", "Solve 45 MCQs", "Review Cell Organelles Diagram"],
    isCurrent: true 
  },
  { 
    day: "Day 2", 
    subject: "Chemistry", 
    chapter: "Some Basic Concepts of Chemistry", 
    weightage: "Medium", 
    tasks: ["Mole Concept Formulas", "Solve 30 PYQs", "Stoichiometry Calculations"] 
  },
  { 
    day: "Day 3", 
    subject: "Physics", 
    chapter: "Units and Measurements", 
    weightage: "Medium", 
    tasks: ["Dimensional Analysis", "Significant Figures Practice", "Error Analysis"] 
  },
  { 
    day: "Day 4", 
    subject: "Biology", 
    chapter: "Biological Classification", 
    weightage: "High", 
    tasks: ["Monera & Protista NCERT Lines", "Fungi Characteristics Chart", "Solve 50 MCQs"] 
  },
  { 
    day: "Day 5", 
    subject: "Chemistry", 
    chapter: "Structure of Atom", 
    weightage: "High", 
    tasks: ["Quantum Numbers Practice", "Bohr's Model Formulas", "NCERT Back Exercises"] 
  },
  { 
    day: "Day 6", 
    subject: "Physics", 
    chapter: "Motion in a Straight Line", 
    weightage: "Medium", 
    tasks: ["Equation of Motion Derivations", "Graph Based Problems", "Relative Velocity"] 
  },
  { 
    day: "Day 7", 
    subject: "Mixed", 
    chapter: "Weekly Revision & Mock Test 1", 
    weightage: "Critical", 
    tasks: ["Review Wrong MCQs from Day 1-6", "Attempt 180 Qs Mock Test", "Analyze Weak Topics"] 
  }
];

export const StudyPlannerDashboard = () => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (dayIndex: number, taskIndex: number) => {
    const key = `${dayIndex}-${taskIndex}`;
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Planner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            AI Dynamic Schedule
          </div>
          <h2 className="text-3xl font-headline font-bold text-slate-900">Your NEET 2027 Roadmap</h2>
          <p className="text-sm text-slate-500 max-w-md font-medium">
            Based on 87 days remaining. We've optimized your syllabus coverage for maximum retention.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-[2rem] border shadow-sm flex items-center gap-6 min-w-[320px]">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
              <span>Syllabus Coverage</span>
              <span className="text-indigo-600">4%</span>
            </div>
            <Progress value={4} className="h-2" />
            <p className="text-[10px] font-bold text-slate-400">4 of 97 chapters mastered</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Timeline */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
            <div className="p-8 border-b bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-headline font-bold text-xl">The 87-Day Sprint</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <Calendar className="w-4 h-4" />
                Oct 24 - Jan 20
              </div>
            </div>
            
            <div className="p-4 md:p-8 space-y-8">
              {DAILY_SCHEDULE.map((item, idx) => (
                <div key={idx} className={cn(
                  "relative pl-10 md:pl-12 pb-8 border-l-2 last:pb-0",
                  item.isCurrent ? "border-indigo-500" : "border-slate-100"
                )}>
                  {/* Dot */}
                  <div className={cn(
                    "absolute left-[-11px] top-0 w-5 h-5 rounded-full border-4 bg-white z-10",
                    item.isCurrent ? "border-indigo-500" : "border-slate-200"
                  )} />

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={cn(
                      "p-6 rounded-3xl border transition-all",
                      item.isCurrent 
                        ? "bg-white border-indigo-100 shadow-xl shadow-indigo-50 ring-1 ring-indigo-50" 
                        : "bg-slate-50/50 border-slate-50 opacity-60 grayscale-[0.5]"
                    )}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{item.day}</span>
                          <Badge className={cn(
                            "rounded-full text-[8px] font-black uppercase tracking-widest",
                            item.weightage === 'High' ? "bg-rose-50 text-rose-600" : 
                            item.weightage === 'Critical' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                          )}>
                            {item.weightage} Weightage
                          </Badge>
                        </div>
                        <h4 className="text-xl font-headline font-bold text-slate-900">{item.chapter}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn(
                            "text-[10px] font-bold uppercase",
                            item.subject === 'Biology' ? "text-emerald-500" :
                            item.subject === 'Chemistry' ? "text-amber-500" :
                            item.subject === 'Physics' ? "text-blue-500" : "text-indigo-500"
                          )}>
                            {item.subject}
                          </span>
                        </div>
                      </div>
                      
                      {item.isCurrent && (
                        <div className="flex items-center gap-3 bg-indigo-50 p-2 rounded-2xl border border-indigo-100">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                            <Clock className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase leading-none">Est. Effort</p>
                            <p className="text-sm font-black text-indigo-600">4-5 Hours</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {item.tasks.map((task, tIdx) => {
                        const isDone = completedTasks[`${idx}-${tIdx}`];
                        return (
                          <div 
                            key={tIdx} 
                            onClick={() => item.isCurrent && toggleTask(idx, tIdx)}
                            className={cn(
                              "flex items-center gap-4 p-3 rounded-2xl border transition-all cursor-pointer",
                              isDone ? "bg-emerald-50 border-emerald-100" : "bg-white border-slate-100 hover:border-indigo-100"
                            )}
                          >
                            <div className={cn(
                              "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                              isDone ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-200 text-transparent"
                            )}>
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className={cn(
                              "text-sm font-bold transition-all",
                              isDone ? "text-emerald-700 line-through opacity-60" : "text-slate-600"
                            )}>
                              {task}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {item.isCurrent && (
                      <div className="mt-8 flex gap-3">
                        <Button className="flex-1 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold py-6 shadow-lg shadow-indigo-100">
                          Start Practice MCQs
                        </Button>
                        <Button variant="outline" className="flex-1 rounded-2xl font-bold py-6">
                          Open NCERT Notes
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
            
            <div className="p-8 bg-slate-50/50 border-t text-center">
               <Button variant="ghost" className="font-bold text-slate-400 hover:text-indigo-600">
                 Load Full 87-Day Calendar <ChevronRight className="ml-2 w-4 h-4" />
               </Button>
            </div>
          </div>
        </div>

        {/* Right: Insights */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Target className="w-32 h-32" />
            </div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-headline font-bold">Planner Strategy</h3>
              <div className="space-y-4">
                 {[
                   { icon: Brain, title: "Subject Rotation", desc: "Prevents mental fatigue by switching subjects every 24h." },
                   { icon: Zap, title: "High Yield First", desc: "Prioritizes chapters with >8% weightage in last 5 years." },
                   { icon: AlertCircle, title: "Buffer Days", desc: "Every 7th day is for backlog clearing and mocks." }
                 ].map((s, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="bg-white/10 p-2 rounded-xl h-fit">
                        <s.icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm">{s.title}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <Button className="w-full rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-6">
                Recalibrate My Plan
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border shadow-sm space-y-6">
             <h3 className="font-bold text-slate-900">Weekly Target</h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                 <span>Chapters Covered</span>
                 <span className="text-slate-900">0 / 6</span>
               </div>
               <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                 <div className="h-full w-0 bg-indigo-500" />
               </div>
             </div>
             
             <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-amber-800 leading-relaxed">
                  TIP: Don't spend more than 4 hours on a single chapter today. Stick to the timeline to avoid syllabus backlog.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
