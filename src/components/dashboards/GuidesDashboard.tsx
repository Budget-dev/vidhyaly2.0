"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { FileText, Eye, Share2, Bookmark, Pencil, Trash2, Search, Star, ChevronRight, User, Plus, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const GuidesDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Guides Created" value={6} icon="FileText" bg="#E8F5EE" color="#10B981" index={0} />
        <StatCard label="Total Views" value={248} delta="↑ 34 this week" deltaType="success" icon="Eye" bg="#E8F4FF" color="#3B82F6" index={1} />
        <StatCard label="Guides Shared" value={4} icon="Share2" bg="#FFF4E8" color="#F59E0B" index={2} />
        <StatCard label="Saved by Others" value={12} icon="Bookmark" bg="#F3EEFF" color="#4F46E5" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[20px] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">My Guides Library</h2>
              <div className="flex gap-2">
                <button className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Recent</button>
                <button className="text-[10px] font-bold text-slate-400 px-3 py-1 rounded-full">Most Viewed</button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Complete Genetics Notes', chapter: 'Cell Biology', subject: 'Bio', views: 84, date: '3 days ago', shared: true },
                { title: 'Organic Chemistry Reactions', chapter: 'Organic Chem', subject: 'Chem', views: 123, date: '1 week ago' },
                { title: 'Optics Formula Summary', chapter: 'Optics', subject: 'Phy', views: 41, date: '5 days ago' }
              ].map((g, i) => (
                <div key={i} className="group relative bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-xl transition-all duration-300">
                  <div className={cn(
                    "absolute top-0 left-0 w-1 h-full rounded-l-2xl",
                    g.subject === 'Bio' ? "bg-emerald-400" : g.subject === 'Chem' ? "bg-amber-400" : "bg-blue-400"
                  )} />
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{g.title}</h4>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{g.chapter} · Last edited {g.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {g.shared && <span className="bg-emerald-50 text-emerald-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Shared</span>}
                      <span className="text-[10px] font-black text-slate-400 flex items-center gap-1"><Eye className="w-3 h-3" /> {g.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"><Pencil className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"><Share2 className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-red-50 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </div>
              ))}

              <button className="w-full py-12 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-indigo-500 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border-2 border-slate-100">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Create New Guide</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[20px] p-6 shadow-sm">
            <h3 className="text-xl font-headline font-bold text-[#1A1A2E] mb-1">Recommended for You</h3>
            <p className="text-xs font-medium text-slate-400 mb-6">Based on your weak chapters</p>
            
            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 mb-6 flex items-center gap-3">
              <Bot className="w-4 h-4 text-amber-600" />
              <p className="text-[10px] font-bold text-amber-800 leading-tight">These guides cover your 3 weakest chapters and were created by students who scored 650+</p>
            </div>

            <div className="space-y-4">
              {[
                { author: 'Rahul K', title: 'Hardy-Weinberg Simplified', chapter: 'Genetics', rating: 4.8 },
                { author: 'Sneha R', title: 'Thermodynamics Sign Conventions', chapter: 'Thermodynamics', rating: 4.9 }
              ].map((r, i) => (
                <div key={i} className="p-4 bg-[#FFFDF5] border border-amber-50 rounded-2xl flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-700">R</div>
                    <span className="text-[10px] font-bold text-slate-700">{r.author} <span className="text-emerald-500">· Top Scorer</span></span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{r.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{r.chapter}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-amber-500 flex items-center gap-1"><Star className="w-3 h-3 fill-amber-500" /> {r.rating}</span>
                      <button className="text-[10px] font-black text-indigo-600 uppercase hover:underline">Save</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};