
"use client";

import React, { useState } from "react";
import { Check, ArrowRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { dailyTasks } from "@/data/mockData";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { cn } from "@/lib/utils";

export const TodaysPlan = () => {
  const [tasks, setTasks] = useState(dailyTasks);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <section className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">Today&apos;s Plan</h2>
          <p className="text-xs font-medium text-slate-400">AI-generated for you</p>
        </div>
        <ProgressRing percentage={progress} size={48} color="#4F46E5" />
      </div>

      <div className="space-y-4 flex-1">
        {tasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + (idx * 0.1) }}
            className={cn(
              "group p-4 rounded-2xl border transition-all duration-300",
              task.completed ? "bg-slate-50 border-slate-100" : "bg-white border-slate-50 shadow-sm hover:shadow-md"
            )}
          >
            <div className="flex items-start gap-4">
              <button 
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200",
                  task.completed ? "bg-[#10B981] border-[#10B981]" : "border-slate-200 hover:border-[#4F46E5]"
                )}
              >
                <AnimatePresence>
                  {task.completed && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-sm font-bold transition-all duration-300",
                    task.completed ? "text-slate-400 line-through" : "text-slate-900"
                  )}>
                    {task.title}
                  </span>
                  <span className={cn(
                    "text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter",
                    task.priority === 'URGENT' ? "bg-red-100 text-red-600" :
                    task.priority === 'HIGH' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                  )}>
                    {task.priority}
                  </span>
                </div>
                <p className={cn(
                  "text-[10px] font-medium leading-relaxed transition-all duration-300",
                  task.completed ? "text-slate-300" : "text-slate-500"
                )}>
                  {task.subtitle}
                </p>
                
                {!task.completed && (
                  <button className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[#4F46E5] hover:gap-2 transition-all">
                    {task.priority === 'HIGH' ? 'Review' : task.priority === 'MEDIUM' ? 'Open' : 'Start Now'} 
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">~75 min total today</span>
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {completedCount}/{tasks.length} Done
        </div>
      </div>
    </section>
  );
};
