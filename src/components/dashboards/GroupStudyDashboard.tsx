"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { groupMembers } from "@/data/mockData";
import { Users, Target, Video, Trophy, Hand, Plus, Play, ChevronRight, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const GroupStudyDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Group Members" value={6} icon="Users" bg="#F0EEFF" color="#4F46E5" index={0} />
        <StatCard label="Weekly Goal" value={68} suffix="%" icon="Target" bg="#E8F5EE" color="#10B981" index={1} />
        <StatCard label="Sessions This Week" value={4} icon="Video" bg="#E8F4FF" color="#3B82F6" index={2} />
        <StatCard label="Your Group Rank" value="#2" icon="Trophy" bg="#FFF4E8" color="#F59E0B" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Members */}
        <div className="lg:col-span-3 bg-white rounded-[20px] p-6 shadow-sm flex flex-col">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Who&apos;s Studying Today</h2>
          <div className="space-y-6 flex-1">
            {groupMembers.map((m, i) => (
              <div key={m.name} className={cn(
                "flex items-center justify-between group",
                m.isUser && "bg-indigo-50/50 -mx-6 px-6 py-3 border-y border-indigo-100/50"
              )}>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white relative",
                    i % 3 === 0 ? "bg-emerald-400" : i % 3 === 1 ? "bg-indigo-400" : "bg-amber-400"
                  )}>
                    {m.name.charAt(0)}
                    {m.active && <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{m.name} {m.isUser && "(You)"}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{m.active ? `${m.questions} Qs today` : 'Offline'}</p>
                  </div>
                </div>
                {!m.isUser && m.active && <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600"><Hand className="w-4 h-4" /></button>}
              </div>
            ))}
          </div>
          <button className="mt-8 text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
            <Plus className="w-3.5 h-3.5" /> Invite Member
          </button>
        </div>

        {/* Room */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-[20px] p-8 shadow-xl border-2 border-emerald-100 relative overflow-hidden h-full flex flex-col justify-center text-center">
            <div className="absolute top-4 right-4 flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Live Now</span>
            </div>
            
            <div className="mb-8">
              <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-headline font-bold text-[#1A1A2E] mb-2">Genetics — Mock Drill</h2>
              <p className="text-slate-500 font-medium">Started by Priya M · 14:32 elapsed</p>
            </div>

            <div className="flex items-center justify-center -space-x-3 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-xs font-bold">P</div>
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black">+2</div>
            </div>

            <Button className="mx-auto px-12 py-7 rounded-2xl bg-emerald-500 text-white font-bold text-lg shadow-2xl shadow-emerald-100 hover:bg-emerald-600">
              Join Session <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="lg:col-span-3 bg-white rounded-[20px] p-6 shadow-sm space-y-8">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Weekly Rankings</h3>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Resets every Monday</p>
          </div>
          
          <div className="space-y-4">
            {groupMembers.sort((a,b) => b.points - a.points).map((m, i) => (
              <div key={m.name} className={cn(
                "flex items-center justify-between p-3 rounded-xl transition-all",
                m.isUser ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-slate-50/50"
              )}>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black opacity-50 w-4">#{i+1}</span>
                  <span className="text-xs font-bold">{m.name}</span>
                </div>
                <span className="text-xs font-black">{m.points} <span className="text-[8px] opacity-60">pts</span></span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-50 space-y-4">
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <p className="text-[9px] font-black text-amber-800 uppercase tracking-widest mb-1">Vidhyaly All-India</p>
              <p className="text-sm font-black text-amber-900">Top 34% Percentile</p>
            </div>
            <p className="text-[8px] font-bold text-slate-400 text-center leading-relaxed">Based on activity data of 2.3L+ students nationwide.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
