"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Save, Target, Send, Plus, ChevronRight, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const AITutorDashboard = () => {
  return (
    <div className="fixed inset-0 top-16 left-[260px] flex overflow-hidden bg-[#F8F8FA]">
      {/* Left Drawer */}
      <div className="w-[240px] bg-white border-r border-slate-100 flex flex-col">
        <div className="p-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Recent Chats</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2">Today</p>
              <div className="p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl">
                <p className="text-xs font-bold text-indigo-900 truncate">Mendelian Laws</p>
                <p className="text-[9px] font-bold text-indigo-400 uppercase">Genetics</p>
              </div>
              <div className="p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
                <p className="text-xs font-bold text-slate-700 truncate">Enthalpy & Entropy</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Thermo</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto p-6">
          <Button className="w-full rounded-xl bg-slate-900 text-white font-bold h-12">
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
            <Button variant="ghost" className="h-9 px-4 rounded-full text-[10px] font-black uppercase text-slate-500 hover:text-indigo-600">
              <Target className="w-3.5 h-3.5 mr-2" /> Practice MCQs
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

          <div className="flex flex-row-reverse gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shrink-0 text-[10px] font-bold text-white">AS</div>
            <div className="max-w-2xl bg-indigo-600 p-6 rounded-l-3xl rounded-br-3xl text-sm font-bold text-white shadow-xl shadow-indigo-100">
              Yes please, I always mix them up
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="max-w-2xl space-y-4">
              <div className="bg-slate-50 p-6 rounded-r-3xl rounded-bl-3xl text-sm font-medium text-slate-700 leading-relaxed">
                Perfect. Let's start with a simple way to remember: <span className="font-bold text-indigo-600">Mendel's Laws</span> are about <span className="underline decoration-indigo-200">INHERITANCE</span> — what happens when two individuals breed. <span className="font-bold text-indigo-600">Hardy-Weinberg</span> is about <span className="underline decoration-indigo-200">POPULATION</span> — what happens across generations.
                <br /><br />
                Think of it this way:
                <div className="mt-4 p-4 bg-white border border-slate-100 rounded-2xl space-y-2 font-bold text-xs">
                  <p>🧬 Mendel = Two parents → offspring ratios</p>
                  <p>🌍 Hardy-Weinberg = Entire species → gene pool</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-slate-50 bg-white">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex gap-2">
              {['Explain simpler', 'Give an example', 'Quiz me'].map(c => (
                <button key={c} className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">{c}</button>
              ))}
            </div>
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
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-700">Hardy-Weinberg Equilibrium</span>
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

        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Questions</h4>
          <div className="space-y-2">
            {[
              'What is a dihybrid cross?',
              'Explain incomplete dominance',
              'Give me 5 practice questions'
            ].map(q => (
              <button key={q} className="w-full text-left p-3 rounded-xl border border-slate-50 text-[10px] font-bold text-slate-600 hover:border-indigo-100 hover:text-indigo-600 transition-all group">
                {q} <ChevronRight className="w-3 h-3 float-right opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
