"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  History, 
  Trophy, 
  Target, 
  Zap, 
  Filter, 
  Search, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2,
  Lock,
  Crown,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";
import Link from "next/link";

const PYQ_SUBJECTS = [
  { id: 'biology', label: 'Biology', icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50', weight: '50%' },
  { id: 'chemistry', label: 'Chemistry', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', weight: '25%' },
  { id: 'physics', label: 'Physics', icon: Target, color: 'text-blue-500', bg: 'bg-blue-50', weight: '25%' },
];

const YEARS = Array.from({ length: 13 }, (_, i) => 2026 - i);

export const PYQDashboard = () => {
  const [activeSubject, setActiveSubject] = useState('biology');
  const [searchTerm, setSearchTerm] = useState('');
  const { profile } = useUser();
  const isFree = profile?.role !== 'admin' && profile?.role !== 'super-admin' && !profile?.isPro;

  return (
    <div className="space-y-8 pb-20">
      {/* PYQ Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
            <History className="w-3.5 h-3.5" />
            Decade Mastery Hub
          </div>
          <h2 className="text-3xl font-headline font-bold text-slate-900">Solved PYQ Bank (2014-2026)</h2>
          <p className="text-sm text-slate-500 max-w-xl font-medium leading-relaxed">
            The ultimate weapon for NEET AIR. Access chapter-wise Previous Year Questions with conceptual NCERT-mapped solutions.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-3xl border shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">PYQ Progress</p>
              <p className="text-lg font-black text-slate-900">0 / 2450 Qs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Filters & Search */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border shadow-sm space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" /> Filter Repository
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <Input 
                  placeholder="Search topic (e.g. Genetics)..." 
                  className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Subject</h4>
              <div className="space-y-2">
                {PYQ_SUBJECTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSubject(s.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl border transition-all group",
                      activeSubject === s.id 
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200" 
                        : "bg-white border-slate-100 text-slate-600 hover:border-primary/20"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", s.bg)}>
                        <s.icon className={cn("w-5 h-5", s.color)} />
                      </div>
                      <span className="font-bold">{s.label}</span>
                    </div>
                    <Badge className={cn(
                      "rounded-full font-black text-[9px]",
                      activeSubject === s.id ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400"
                    )}>
                      Weight: {s.weight}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Years</h4>
              <div className="grid grid-cols-4 gap-2">
                {YEARS.map((year) => (
                  <button key={year} className="py-2 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all">
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-[2.5rem] p-6 border border-primary/10">
             <div className="flex items-start gap-4">
               <div className="bg-white p-2 rounded-xl shadow-sm">
                 <Info className="w-5 h-5 text-primary" />
               </div>
               <div>
                 <h5 className="font-bold text-slate-900 text-sm mb-1">Topper Strategy</h5>
                 <p className="text-xs text-slate-500 leading-relaxed">
                   Analysis shows that 60% of Biology questions are repeated concepts. Master the Bio PYQs first to secure 320+ marks.
                 </p>
               </div>
             </div>
          </div>
        </div>

        {/* Right: Content Canvas */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] border shadow-sm min-h-[600px] flex flex-col overflow-hidden">
            <div className="p-8 border-b flex items-center justify-between bg-slate-50/30">
               <h3 className="font-headline font-bold text-xl capitalize">{activeSubject} PYQ Repository</h3>
               <div className="flex items-center gap-2">
                 <span className="text-xs font-bold text-slate-400">Sort by:</span>
                 <select className="bg-transparent text-xs font-black uppercase tracking-widest text-primary focus:outline-none cursor-pointer">
                   <option>High Weightage</option>
                   <option>Year (Latest)</option>
                   <option>Topic A-Z</option>
                 </select>
               </div>
            </div>

            {/* Empty State / Coming Soon logic integrated for MVP */}
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
               <div className="relative">
                 <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center">
                   <History className="w-12 h-12 text-slate-200" />
                 </div>
                 <div className="absolute -bottom-1 -right-1 bg-white p-2 rounded-xl shadow-lg border border-slate-100">
                    <Crown className="w-4 h-4 text-amber-500" />
                 </div>
               </div>
               
               <div className="space-y-2">
                 <h4 className="text-2xl font-headline font-bold text-slate-900">Loading Decades of Knowledge</h4>
                 <p className="text-sm text-slate-500 max-w-sm mx-auto">
                   We are currently validating and mapping the 2014-2026 PYQ Bank with NCERT solutions.
                 </p>
               </div>

               {isFree ? (
                 <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100 max-w-sm w-full space-y-4">
                   <div className="flex items-center justify-center gap-2 text-indigo-600">
                      <Lock className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Restricted Access</span>
                   </div>
                   <p className="text-xs text-indigo-700 font-medium">
                     Detailed solutions and year-wise breakdown are exclusive to **Pro Members**.
                   </p>
                   <Button asChild className="w-full bg-indigo-600 rounded-2xl py-6 font-bold shadow-xl shadow-indigo-100">
                     <Link href="/pricing">Unlock All PYQs — ₹199</Link>
                   </Button>
                 </div>
               ) : (
                 <div className="animate-pulse flex flex-col items-center gap-4">
                   <div className="h-4 w-48 bg-slate-100 rounded-full" />
                   <div className="h-4 w-32 bg-slate-50 rounded-full" />
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">Calibrating NCERT Solutions...</p>
                 </div>
               )}
            </div>
            
            <div className="p-8 bg-slate-50/50 border-t">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { label: 'Papers Mapped', value: '13 Years' },
                   { label: 'Total Questions', value: '2,340+' },
                   { label: 'Solution Quality', value: 'NCERT Mapped' }
                 ].map((stat) => (
                   <div key={stat.label} className="text-center">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                     <p className="font-bold text-slate-900">{stat.value}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
