
"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { SubjectHeatmap } from "@/components/dashboard/SubjectHeatmap";
import { Target, PieChart, Calendar, Zap, ClipboardList, Clock, Trophy, ChevronRight, AlertCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";
import Link from "next/link";

export const MCQsDashboard = () => {
  const { profile } = useUser();
  const isFree = profile?.role !== 'admin' && profile?.role !== 'super-admin' && !profile?.isPro;

  return (
    <div className="space-y-8">
      {isFree && (
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-xl">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900">Free Tier Limit</p>
              <p className="text-xs text-amber-700">You can only practice 10 questions per unit on the free plan.</p>
            </div>
          </div>
          <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 rounded-full font-bold">
            <Link href="/pricing">Unlock All Questions</Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Attempted" value={0} icon="Target" bg="#FFF4E8" color="#F59E0B" index={0} />
        <StatCard label="Overall Accuracy" value={0} suffix="%" delta="Start practicing" deltaType="neutral" icon="PieChart" bg="#E8F5EE" color="#10B981" index={1} />
        <StatCard label="This Week" value={0} suffix=" Qs" icon="Calendar" bg="#E8F4FF" color="#3B82F6" index={2} />
        <StatCard label="Best Streak" value={0} delta="No active streak" deltaType="neutral" icon="Zap" bg="#F3EEFF" color="#4F46E5" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-white rounded-[20px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">Chapter Drill Matrix</h2>
              <p className="text-xs font-medium text-slate-400">Select chapters to customize your session</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="pyq-mode" />
              <Label htmlFor="pyq-mode" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Show PYQ Freq</Label>
            </div>
          </div>
          <SubjectHeatmap />
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white rounded-[20px] p-8 shadow-xl border border-orange-50 h-full flex flex-col relative overflow-hidden">
            {isFree && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                  <Crown className="w-3 h-3" /> Basic
                </div>
              </div>
            )}
            
            <h2 className="text-xl font-headline font-bold text-[#1A1A2E] mb-6">Start Practice Session</h2>
            
            <div className="space-y-8 flex-1">
              <div>
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">1. Choose Subject</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['Biology', 'Chemistry', 'Physics', 'Mixed'].map(s => (
                    <button key={s} className={cn(
                      "py-3 rounded-xl border text-xs font-bold transition-all",
                      s === 'Biology' ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100" : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50"
                    )}>{s}</button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">2. Difficulty Level</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: 'Easy', i: '📗' },
                    { l: 'Medium', i: '📘' },
                    { l: 'Hard', i: '📙' },
                    { l: 'Mixed', i: '📕' }
                  ].map(d => (
                    <button key={d.l} className="p-3 rounded-xl border border-slate-100 bg-white text-left hover:border-indigo-200 hover:shadow-md transition-all">
                      <span className="text-lg block mb-1">{d.i}</span>
                      <span className="text-[10px] font-bold text-slate-700">{d.l}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">3. Question Count</Label>
                  <span className="text-lg font-black text-indigo-600">{isFree ? '10' : '45'}</span>
                </div>
                <Slider 
                  defaultValue={[isFree ? 10 : 45]} 
                  max={isFree ? 10 : 180} 
                  disabled={isFree}
                  step={5} 
                  className="py-4" 
                />
                {isFree && <p className="text-[10px] text-amber-600 font-bold mt-2">Upgrade to set more than 10 questions</p>}
              </div>
            </div>

            <Button className="w-full py-8 mt-8 rounded-2xl bg-[#5B50E8] text-white text-lg font-bold shadow-2xl shadow-indigo-100 hover:bg-indigo-700">
              Start Session <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
