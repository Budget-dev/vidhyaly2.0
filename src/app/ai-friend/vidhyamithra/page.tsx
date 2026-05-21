"use client"

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, MessageCircle, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function VidhyamithraPage() {
  return (
    <div className="relative w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary/5 p-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-headline font-bold text-slate-900 leading-none mb-1">Vidhyamithra</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Always Online</p>
              </div>
            </div>
          </div>
          <Button asChild variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-primary">
            <Link href="/"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 min-h-[400px] flex flex-col justify-center text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              AI Study Companion
            </div>
            <h2 className="text-3xl font-headline font-bold text-slate-800">Hello! I'm your Vidhyamithra.</h2>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
              Think of me as your dedicated study friend. I'm here to help you navigate through NEET prep, organize your schedule, and stay motivated.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left">
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Try asking</p>
              <p className="text-sm font-medium text-slate-700">"Help me plan my Biology revision for this week."</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left">
              <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">Try asking</p>
              <p className="text-sm font-medium text-slate-700">"Explain the core concept of Thermodynamics simply."</p>
            </div>
          </div>

          <div className="relative pt-4">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-20 flex items-center justify-center">
               <div className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                 <MessageCircle className="w-4 h-4" />
                 Coming Soon to NEET 2026 Batch
               </div>
            </div>
            <div className="flex items-center gap-3 p-2 border rounded-full bg-slate-50 opacity-50 select-none">
              <div className="flex-1 px-4 text-sm text-slate-400 text-left">Type your message...</div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                <Send className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Powered by Vidhyaly Intelligence
          </p>
        </div>
      </motion.div>

      <div className="mt-8">
        <Button asChild variant="link" className="text-slate-400 hover:text-primary transition-colors">
          <Link href="/">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
