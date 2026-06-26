
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Save, Target, Send, Plus, ChevronRight, MessageSquare, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";
import Link from "next/link";

export const AITutorDashboard = () => {
  const { profile } = useUser();
  const isFree = profile?.role !== 'admin' && profile?.role !== 'super-admin' && !profile?.isPro;
  const creditsRemaining = isFree ? 2 : 'Unlimited';

  return (
    <div className="fixed inset-0 top-16 left-[260px] flex overflow-hidden bg-[#F8F8FA]">
      {/* Left Drawer */}
      <div className="w-[240px] bg-white border-r border-slate-100 flex flex-col">
        <div className="p-6 flex-1">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Recent Chats</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2">Today</p>
              <div className="p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl">
                <p className="text-xs font-bold text-indigo-900 truncate">Mendelian Laws</p>
                <p className="text-[9px] font-bold text-indigo-400 uppercase">Genetics</p>
              </div>
            </div>
          </div>
        </div>

        {isFree && (
          <div className="p-4 mx-4 mb-4 bg-amber-50 rounded-2xl border border-amber-100 text-center space-y-3">
             <Crown className="w-5 h-5 text-amber-500 mx-auto" />
             <p className="text-[10px] font-bold text-amber-900 uppercase tracking-widest">Free Credits: {creditsRemaining}/10</p>
             <p className="text-[9px] text-amber-700 leading-tight">Upgrade to Pro for unlimited conceptual doubt solving.</p>
             <Button asChild className="w-full bg-amber-600 rounded-xl h-8 text-[10px] font-black">
               <Link href="/pricing">Get Pro</Link>
             </Button>
          </div>
        )}

        <div className="p-6 border-t bg-slate-50/50">
          <Button className="w-full rounded-xl bg-slate-900 text-white font-bold h-12" disabled={isFree && creditsRemaining === 0}>
            <Plus className="w-4 h-4 mr-2" /> New Chat
          </Button>
        </div>
      </div>

      {/* Centre Canvas */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Context Bar */}
        <div className="h-14 border-b border-slate-50 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-900">Genetics — Mendelian Laws</h2>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-full uppercase tracking-tighter">Biology &gt; Genetics</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="h-9 px-4 rounded-full text-[10px] font-black uppercase text-slate-500 hover:text-indigo-600">
              <Save className="w-3.5 h-3.5 mr-2" /> Save Notes
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-12 space-y-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="max-w-2xl space-y-4">
              <div className="bg-slate-50 p-6 rounded-r-3xl rounded-bl-3xl text-sm font-medium text-slate-700 leading-relaxed">
                Hi Arjun! I noticed you got 6 Genetics questions wrong this week. I think there's a specific confusion happening. Want me to teach you the difference between Mendel's Laws and Hardy-Weinberg equilibrium?
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-slate-50 bg-white">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder={isFree && creditsRemaining === 0 ? "Credits exhausted — upgrade to continue" : "Ask VidhyaMithra anything..."}
                disabled={isFree && creditsRemaining === 0}
                className="w-full pl-6 pr-14 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all disabled:opacity-50"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50" disabled={isFree && creditsRemaining === 0}>
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
            {isFree && <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">Every query uses 1 credit in Free Mode</p>}
          </div>
        </div>
      </div>

      {/* Right Context */}
      <div className="w-[280px] bg-white border-l border-slate-100 p-8 space-y-8">
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">This Session</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-700">Mendelian Inheritance</span>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 space-y-3">
          <p className="text-[10px] font-bold text-red-900 uppercase">Genetics Mastery</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-red-600">38%</span>
            <span className="text-[8px] font-black bg-red-100 text-red-600 px-2 py-0.5 rounded-full">WEAKEST</span>
          </div>
          <div className="h-1 w-full bg-red-200/50 rounded-full overflow-hidden">
            <div className="h-full w-[38%] bg-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
