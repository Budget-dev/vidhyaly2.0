
"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { Users, Target, Video, Trophy, Lock, Crown, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <StatCard label="Group Members" value={0} icon="Users" bg="#F0EEFF" color="#4F46E5" index={0} />
        <StatCard label="Weekly Goal" value={0} suffix="%" icon="Target" bg="#E8F5EE" color="#10B981" index={1} />
        <StatCard label="Sessions Attended" value={0} icon="Video" bg="#E8F4FF" color="#3B82F6" index={2} />
        <StatCard label="Your Global Rank" value="--" icon="Trophy" bg="#FFF4E8" color="#F59E0B" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Search */}
        <div className="lg:col-span-4 bg-white rounded-[20px] p-6 shadow-sm flex flex-col">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Find Study Partners</h2>
          <div className="relative mb-6">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
             <input type="text" placeholder="Search by name or UID..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-12">
             <Users className="w-10 h-10 text-slate-200" />
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connect with serious aspirants to stay accountable.</p>
          </div>
        </div>

        {/* Room */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[20px] p-12 shadow-xl border border-slate-50 relative overflow-hidden h-full flex flex-col justify-center text-center items-center">
            <div className="mb-8">
              <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-12 h-12 text-indigo-500" />
              </div>
              <h2 className="text-3xl font-headline font-bold text-[#1A1A2E] mb-2">No Active Sessions</h2>
              <p className="text-slate-500 font-medium max-w-md">Start your own live session to invite others to study specific chapters together.</p>
            </div>
            <Button className="px-12 py-7 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-2xl shadow-indigo-100 hover:bg-indigo-700">
              Create Study Room <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
