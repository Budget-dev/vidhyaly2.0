
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, Target, CheckCircle2, Sparkles, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function PlannerLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center pt-12 px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center space-y-12"
      >
        {/* Header */}
        <div className="space-y-6">
          <div className="bg-indigo-100 p-5 rounded-[2rem] w-fit mx-auto shadow-inner">
            <Calendar className="w-12 h-12 text-indigo-600" />
          </div>
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100">
               <Sparkles className="w-3 h-3" />
               AI-Powered Scheduling
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 leading-tight">
              Your 87-Day NCERT <br />
              <span className="text-indigo-600">Success Roadmap</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Never miss a chapter again. Our AI planner breaks down the massive NEET syllabus into manageable daily sprints tailored to the 2027 exam date.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-start gap-4 text-left">
              <div className="bg-emerald-50 p-3 rounded-2xl">
                 <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                 <h4 className="font-bold text-slate-900 mb-1">Subject Rotation</h4>
                 <p className="text-xs text-slate-500">Alternates Biology, Physics, and Chemistry daily to keep your brain fresh and prevent burnout.</p>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-start gap-4 text-left">
              <div className="bg-rose-50 p-3 rounded-2xl">
                 <Target className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                 <h4 className="font-bold text-slate-900 mb-1">High-Weightage First</h4>
                 <p className="text-xs text-slate-500">Prioritizes chapters like Genetics and Human Physiology that carry the maximum marks in NEET.</p>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]" />
           <div className="relative z-10 space-y-6">
             <h2 className="text-3xl font-headline font-bold">Start Your Personalized Sprint</h2>
             <p className="text-indigo-100 max-w-md mx-auto text-sm leading-relaxed">
               Access your interactive timetable and start marking chapters as mastered today.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button asChild size="lg" className="rounded-2xl px-12 h-16 bg-white text-indigo-600 hover:bg-slate-50 font-bold text-lg shadow-xl">
                  <Link href="/dashboard">
                    Open AI Planner
                    <LayoutDashboard className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
             </div>
           </div>
        </div>

        <div className="flex items-center justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> 4-5 Hrs Daily Effort</div>
           <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 97 Chapters Covered</div>
        </div>
      </motion.div>
    </div>
  );
}
