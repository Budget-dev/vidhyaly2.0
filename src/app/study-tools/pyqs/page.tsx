"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { History, ArrowLeft, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PYQPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center space-y-8"
      >
        <div className="bg-primary/10 p-6 rounded-full w-fit mx-auto mb-6 shadow-inner">
          <History className="w-16 h-16 text-primary" />
        </div>
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] border border-amber-100 shadow-sm">
            <Trophy className="w-3.5 h-3.5" />
            AIR Ranking Essential
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 leading-tight">
            Solved NEET PYQ Bank <br />
            <span className="text-primary">(2014-2026)</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            The foundation of every AIR 1 journey. Access every question asked in the last 12+ years of NEET, categorized by NCERT chapters and weighted by frequency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
           {[
             { title: "Biology (50%)", desc: "100% NCERT lines mapping from Botany & Zoology papers.", icon: "🧬" },
             { title: "Chemistry (25%)", desc: "Organic mechanisms and Physical numericals from past years.", icon: "🧪" },
             { title: "Physics (25%)", desc: "Mechanics and Modern Physics pattern analysis.", icon: "⚡" }
           ].map((card) => (
             <div key={card.title} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-left hover:shadow-xl transition-all group">
               <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{card.icon}</span>
               <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
               <p className="text-xs text-slate-500 leading-relaxed font-medium">{card.desc}</p>
             </div>
           ))}
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent)]" />
           <div className="relative z-10 space-y-6">
             <div className="flex items-center justify-center gap-2 text-primary">
                <Sparkles className="w-5 h-5 fill-primary" />
                <span className="text-xs font-black uppercase tracking-widest">Coming to Dashboard Next Week</span>
             </div>
             <h2 className="text-3xl font-headline font-bold">Training Our Solution Engine</h2>
             <p className="text-slate-400 max-w-md mx-auto text-sm">
               We are currently finalising the NCERT references for 2026 papers. The PYQ bank will be live on your dashboard in the next deployment.
             </p>
             <Button asChild variant="outline" className="rounded-full px-10 h-14 border-white/20 text-white hover:bg-white/10 font-bold">
               <Link href="/dashboard">Return to Preparation</Link>
             </Button>
           </div>
        </div>

        <Button asChild variant="ghost" className="rounded-full mt-10 text-slate-400 font-bold hover:text-primary transition-colors">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
