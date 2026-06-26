
"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { AIInsightPanel } from "@/components/ui/AIInsightPanel";
import { flashcardDecks } from "@/data/mockData";
import { Search, Layers, CheckCircle, Bell, Flame, Play, Plus, ChevronRight, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";
import Link from "next/link";

export const FlashcardsDashboard = () => {
  const { profile } = useUser();
  const isFree = profile?.role !== 'admin' && profile?.role !== 'super-admin' && !profile?.isPro;

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Decks" value={8} icon="Layers" bg="#F3EEFF" color="#4F46E5" index={0} />
        <StatCard label="Cards Mastered" value={124} delta="↑ 18 this week" deltaType="success" icon="CheckCircle" bg="#E8F5EE" color="#10B981" index={1} />
        <StatCard label="Due Today" value={42} delta="3 decks overdue" deltaType="danger" icon="Bell" bg="#FFF4E8" color="#F59E0B" index={2} />
        <StatCard label="Recall Streak" value={9} suffix=" days" icon="Flame" bg="#E8F4FF" color="#3B82F6" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Deck Library */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[20px] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">Deck Library</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search decks..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 w-48 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              {flashcardDecks.map((deck, idx) => (
                <motion.div 
                  key={deck.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.05) }}
                  className="group flex flex-col p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2.5 h-2.5 rounded-full",
                        deck.subject === 'biology' ? "bg-emerald-500" : 
                        deck.subject === 'chemistry' ? "bg-amber-500" : "bg-blue-500"
                      )} />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{deck.label}</h4>
                          {isFree && <span className="bg-amber-100 text-amber-600 text-[8px] font-black px-1.5 py-0.5 rounded">LOCKED (10 Cards)</span>}
                        </div>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{deck.chapter}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-slate-700">{deck.mastery}%</span>
                      <div className="hidden group-hover:flex items-center gap-2">
                        <Button className="h-8 px-3 text-[10px] font-bold bg-[#5B50E8] rounded-full">
                          <Play className="w-3 h-3 mr-1 fill-white" /> Start Review
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${deck.mastery}%` }}
                      className={cn(
                        "h-full rounded-full",
                        deck.subject === 'biology' ? "bg-emerald-500" : 
                        deck.subject === 'chemistry' ? "bg-amber-500" : "bg-blue-500"
                      )}
                    />
                  </div>
                </motion.div>
              ))}
              
              <button className="w-full p-6 border-2 border-dashed border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-500 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all flex flex-col items-center justify-center gap-2 group">
                <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold">Create New Deck</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Queue */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[20px] p-8 shadow-sm flex flex-col items-center text-center">
            <h2 className="text-xl font-headline font-bold text-[#1A1A2E] mb-2">Review Today</h2>
            <div className="relative mb-6">
              <span className="text-6xl font-black text-slate-900">{isFree ? '10' : '42'}</span>
              <div className="absolute -top-2 -right-4 bg-amber-100 text-amber-600 text-[10px] font-black px-2 py-0.5 rounded-full">DAILY CAP</div>
            </div>
            
            {isFree && (
              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 mb-8 space-y-4">
                <Crown className="w-10 h-10 text-indigo-500 mx-auto" />
                <p className="text-xs font-bold text-indigo-900">Unlock Unlimited Recall</p>
                <p className="text-[10px] text-indigo-700">Free users can only review 10 cards per chapter. Don't let limits slow your revision.</p>
                <Button asChild className="w-full bg-indigo-600 rounded-xl font-bold h-10 text-xs">
                  <Link href="/pricing">Upgrade Now</Link>
                </Button>
              </div>
            )}

            {!isFree && (
              <Button className="w-full py-6 rounded-2xl bg-[#5B50E8] text-white font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                Review All Cards <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <AIInsightPanel 
        message={isFree ? "Vidhyamithra can analyze your mistake patterns, but you need Pro to see the results." : "Your Organic Reactions deck has 28 cards you consistently rate Hard. Want me to create 10 simpler explanation cards?"}
        actions={isFree ? [
          { label: "Upgrade to See Insights", primary: true, onClick: () => window.location.href = '/pricing' }
        ] : [
          { label: "Yes, generate cards", primary: true },
          { label: "Show me which ones" }
        ]}
      />
    </div>
  );
};
