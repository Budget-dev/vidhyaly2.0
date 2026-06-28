
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowRight, Target, Zap, BrainCircuit, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center pt-12 px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center space-y-12"
      >
        {/* Header */}
        <div className="space-y-6">
          <div className="bg-primary/10 p-5 rounded-[2rem] w-fit mx-auto shadow-inner">
            <BarChart3 className="w-12 h-12 text-primary" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900">
              Personalized Performance Hub
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              We analyze thousands of data points from your practice sessions to identify exactly where you can gain the most marks.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Target className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900">Weak Area Detection</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Identify chapters where your accuracy falls below 60% compared to toppers.</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-900">Time-per-Question</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Optimize your exam speed by identifying bottlenecks in Physics numericals.</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-900">Mistake Patterns</h3>
            <p className="text-xs text-slate-500 leading-relaxed">AI detects recurring conceptual errors in Bio NCERT lines and Organic mechanisms.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent)]" />
           <div className="relative z-10 space-y-8">
             <div className="space-y-4">
               <h2 className="text-3xl font-headline font-bold">Access Your Live Dashboard</h2>
               <p className="text-slate-400 max-w-md mx-auto text-sm">
                 All your real-time analytics are processed and displayed on your primary student dashboard for high-speed preparation.
               </p>
             </div>
             
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="rounded-full px-12 h-16 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20">
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
             </div>

             <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                <Loader2 className="w-3 h-3 animate-spin" />
                Live Data Syncing Active
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
