"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { SubjectHeatmap } from "@/components/dashboard/SubjectHeatmap";
import { Target, PieChart, Calendar, Zap, ClipboardList, Clock, Trophy, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const MCQsDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Attempted" value={1247} icon="Target" bg="#FFF4E8" color="#F59E0B" index={0} />
        <StatCard label="Overall Accuracy" value={61} suffix="%" delta="↑ 3% this month" deltaType="success" icon="PieChart" bg="#E8F5EE" color="#10B981" index={1} />
        <StatCard label="This Week" value={89} suffix=" Qs" icon="Calendar" bg="#E8F4FF" color="#3B82F6" index={2} />
        <StatCard label="Best Streak" value={23} delta="in Physics · Optics" icon="Zap" bg="#F3EEFF" color="#4F46E5" index={3} />
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
          <div className="bg-white rounded-[20px] p-8 shadow-xl border border-orange-50 h-full flex flex-col">
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
                  <span className="text-lg font-black text-indigo-600">45</span>
                </div>
                <Slider defaultValue={[45]} max={180} step={5} className="py-4" />
              </div>
            </div>

            <Button className="w-full py-8 mt-8 rounded-2xl bg-[#5B50E8] text-white text-lg font-bold shadow-2xl shadow-indigo-100 hover:bg-indigo-700">
              Start Session <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-[20px] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Recent Sessions</h3>
          <div className="space-y-4">
            {[
              { date: 'Oct 24', score: '14/20', accuracy: 70, subject: 'Bio' },
              { date: 'Oct 23', score: '32/45', accuracy: 71, subject: 'Phy' },
              { date: 'Oct 21', score: '8/10', accuracy: 80, subject: 'Chem' }
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-white transition-all cursor-pointer border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[10px] font-black shadow-sm">{s.subject}</div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">{s.score}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">{s.date}</p>
                  </div>
                </div>
                <span className={cn(
                  "text-xs font-black",
                  s.accuracy >= 80 ? "text-emerald-500" : "text-amber-500"
                )}>{s.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Recent Wrong Answers</h3>
          <div className="space-y-4">
            {[
              { q: 'The link reaction of respiration occurs in...', chapter: 'Cellular Respiration' },
              { q: 'In a dihybrid cross, the F2 ratio is...', chapter: 'Genetics' }
            ].map((err, i) => (
              <div key={i} className="space-y-2">
                <p className="text-[10px] font-medium text-slate-600 line-clamp-1">{err.q}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full uppercase">{err.chapter}</span>
                  <button className="text-[8px] font-black text-indigo-600 uppercase hover:underline">Practice Similar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Achievements</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { l: '1k Qs', p: 100, i: '🏆' },
              { l: 'Bio Master', p: 80, i: '🎯' },
              { l: 'Speed Demon', p: 78, i: '⚡' },
              { l: 'Optics Pro', p: 65, i: '💎' }
            ].map(a => (
              <div key={a.l} className="flex flex-col items-center p-3 rounded-xl bg-slate-50/50">
                <ProgressRing percentage={a.p} size={40} color={a.p === 100 ? '#10B981' : '#4F46E5'} />
                <p className="text-[8px] font-black text-slate-500 uppercase mt-2 tracking-tighter">{a.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
