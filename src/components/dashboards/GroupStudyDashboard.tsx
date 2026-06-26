
"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { groupMembers } from "@/data/mockData";
import { Users, Target, Video, Trophy, Hand, Plus, Play, ChevronRight, Pin, Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";
import Link from "next/link";

export const GroupStudyDashboard = () => {
  const { profile } = useUser();
  const isFree = profile?.role !== 'admin' && profile?.role !== 'super-admin' && !profile?.isPro;

  return (
    <div className="space-y-8 relative">
      {isFree && (
        <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[6px] flex items-center justify-center rounded-[2rem]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md bg-white p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-10 h-10 text-indigo-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-slate-900">Study Groups are Premium</h2>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Collaborate with 10k+ fellow aspirants, participate in live challenges, and compete on the leaderboard.
              </p>
            </div>
            <div className="pt-4 flex flex-col gap-3">
              <Button asChild className="rounded-2xl py-7 font-bold text-base bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95">
                <Link href="/pricing">Unlock Groups — ₹199/mo</Link>
              </Button>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                <Crown className="w-3 h-3" /> Exclusive for Pro Members
              </p>
            </div>
          </motion.div>
        </div>
      )}

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
              </div>
            ))}
          </div>
        </div>

        {/* Room */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-[20px] p-8 shadow-xl border-2 border-emerald-100 relative overflow-hidden h-full flex flex-col justify-center text-center">
            <div className="mb-8">
              <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-headline font-bold text-[#1A1A2E] mb-2">Genetics — Mock Drill</h2>
              <p className="text-slate-500 font-medium">Started by Priya M · 14:32 elapsed</p>
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
        </div>
      </div>
    </div>
  );
};
