
"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { FileText, Eye, Share2, Bookmark, Plus, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const GuidesDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Guides Created" value={0} icon="FileText" bg="#E8F5EE" color="#10B981" index={0} />
        <StatCard label="Total Views" value={0} delta="No views yet" deltaType="neutral" icon="Eye" bg="#E8F4FF" color="#3B82F6" index={1} />
        <StatCard label="Guides Shared" value={0} icon="Share2" bg="#FFF4E8" color="#F59E0B" index={2} />
        <StatCard label="Saved by Others" value={0} icon="Bookmark" bg="#F3EEFF" color="#4F46E5" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[20px] p-6 shadow-sm min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">My Guides Library</h2>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-700">Your library is empty</p>
                <p className="text-xs text-slate-400 max-w-[240px]">Convert your notes into high-precision NCERT study guides with our AI processing tool.</p>
              </div>
              <button className="w-full max-w-xs py-10 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-indigo-500 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border-2 border-slate-100">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Create New Guide</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[20px] p-6 shadow-sm h-full flex flex-col">
            <h3 className="text-xl font-headline font-bold text-[#1A1A2E] mb-1">Recommended for You</h3>
            <p className="text-xs font-medium text-slate-400 mb-6">Top rated by community</p>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 space-y-4">
               <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                  <Bot className="w-6 h-6" />
               </div>
               <div className="space-y-2">
                 <p className="text-sm font-bold text-slate-700">Waiting for activity</p>
                 <p className="text-xs text-slate-400 leading-relaxed">VidhyaMithra will recommend peer-created guides once your weak chapters are identified.</p>
               </div>
               <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
                 <Sparkles className="w-3 h-3" /> AI Personalized
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
