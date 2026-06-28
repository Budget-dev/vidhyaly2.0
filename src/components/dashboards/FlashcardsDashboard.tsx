
"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { AIInsightPanel } from "@/components/ui/AIInsightPanel";
import { Layers, CheckCircle, Bell, Flame, Plus, ChevronRight, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/firebase";
import Link from "next/link";

export const FlashcardsDashboard = () => {
  const { profile } = useUser();
  const isFree = profile?.role !== 'admin' && profile?.role !== 'super-admin' && !profile?.isPro;

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Decks" value={0} icon="Layers" bg="#F3EEFF" color="#4F46E5" index={0} />
        <StatCard label="Cards Mastered" value={0} delta="Start reviewing" deltaType="neutral" icon="CheckCircle" bg="#E8F5EE" color="#10B981" index={1} />
        <StatCard label="Due Today" value={0} delta="Queue clear" deltaType="success" icon="Bell" bg="#FFF4E8" color="#F59E0B" index={2} />
        <StatCard label="Recall Streak" value={0} suffix=" days" icon="Flame" bg="#E8F4FF" color="#3B82F6" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Deck Library */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[20px] p-6 shadow-sm min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-headline font-bold text-[#1A1A2E]">Deck Library</h2>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200">
                <Layers className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-700">No active decks found</p>
                <p className="text-xs text-slate-400 max-w-[240px]">Create your first custom deck or explore NCERT chapters to start mastering concepts.</p>
              </div>
              <Button asChild className="rounded-xl bg-[#5B50E8] hover:bg-indigo-700 font-bold px-8">
                <Link href="/study-tools/flashcards"><Plus className="w-4 h-4 mr-2" /> Create My First Deck</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Queue */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[20px] p-8 shadow-sm flex flex-col items-center text-center h-full justify-center">
            <h2 className="text-xl font-headline font-bold text-[#1A1A2E] mb-2">Review Today</h2>
            <div className="relative mb-6">
              <span className="text-6xl font-black text-slate-200">0</span>
            </div>
            
            {isFree && (
              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 mb-8 space-y-4 w-full">
                <Crown className="w-10 h-10 text-indigo-500 mx-auto" />
                <p className="text-xs font-bold text-indigo-900">Unlock Unlimited Recall</p>
                <p className="text-[10px] text-indigo-700">Free users can only review 10 cards per chapter. Don't let limits slow your revision.</p>
                <Button asChild className="w-full bg-indigo-600 rounded-xl font-bold h-10 text-xs">
                  <Link href="/pricing">Upgrade Now</Link>
                </Button>
              </div>
            )}

            {!isFree && (
              <p className="text-xs text-slate-400 font-medium italic">You are all caught up with your cards for today!</p>
            )}
          </div>
        </div>
      </div>

      <AIInsightPanel 
        message="VidhyaMithra is ready to analyze your memory retention patterns once you start your first spaced-repetition deck."
        title="Ready to Assist:"
        actions={[
          { label: "How it works", onClick: () => {} }
        ]}
      />
    </div>
  );
};
