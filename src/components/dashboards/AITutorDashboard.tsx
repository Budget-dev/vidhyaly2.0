
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Target, Send, Plus, Sparkles, Crown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/firebase";
import Link from "next/link";

export const AITutorDashboard = () => {
  const { profile } = useUser();
  const isFree = profile?.role !== 'admin' && profile?.role !== 'super-admin' && !profile?.isPro;
  const creditsRemaining = isFree ? 10 : 'Unlimited';

  return (
    <div className="fixed inset-0 top-16 left-[260px] flex overflow-hidden bg-[#F8F8FA]">
      {/* Left Drawer */}
      <div className="w-[240px] bg-white border-r border-slate-100 flex flex-col">
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Recent Chats</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 opacity-30">
             <MessageSquare className="w-8 h-8 text-slate-300" />
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">No recent sessions</p>
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
          <Button className="w-full rounded-xl bg-slate-900 text-white font-bold h-12">
            <Plus className="w-4 h-4 mr-2" /> New Session
          </Button>
        </div>
      </div>

      {/* Centre Canvas */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-indigo-500 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-100 animate-bounce">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-slate-900">How can I assist your prep?</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">Ask me about complex NCERT diagrams, solve physics numericals, or request a motivation boost. I am your 24/7 NEET friend.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
               <Sparkles className="w-3 h-3" /> Powered by Genkit AI
            </div>
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-slate-50 bg-white">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask VidhyaMithra anything..."
                className="w-full pl-6 pr-14 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
            {isFree && <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">Every session uses 1 credit in Free Mode</p>}
          </div>
        </div>
      </div>

      {/* Right Context */}
      <div className="w-[280px] bg-white border-l border-slate-100 p-8 space-y-8">
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Focus Chapter</h3>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-center italic">
             <p className="text-[10px] text-slate-400 font-bold">Select a topic to start analysis</p>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 space-y-3">
          <p className="text-[10px] font-bold text-primary uppercase">Readiness Level</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-primary">0%</span>
          </div>
          <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
