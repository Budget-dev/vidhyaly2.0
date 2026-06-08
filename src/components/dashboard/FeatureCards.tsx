
"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  Brain, 
  ClipboardList, 
  BookOpen, 
  Bot, 
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Flashcards",
    desc: "Create and master your subjects with smart flashcards.",
    stat: "42 cards due for review · 3 decks active",
    icon: Layers,
    bg: "bg-[#F3EEFF]",
    iconBg: "bg-slate-900",
    href: "/study-tools/flashcards"
  },
  {
    title: "Smart Learn",
    desc: "Adaptive learning system tailored to your proficiency.",
    stat: "Chapter 3 of 14 — Genetics · 60% complete",
    icon: Brain,
    bg: "bg-[#E8F4FF]",
    iconBg: "bg-slate-900",
    href: "/study-tools/learn"
  },
  {
    title: "Practice MCQs",
    desc: "Generate practice tests from your study materials.",
    stat: "Last session: 14/20 correct in Genetics",
    icon: ClipboardList,
    bg: "bg-[#FFF4E8]",
    iconBg: "bg-slate-900",
    href: "/study-tools/mcqs"
  },
  {
    title: "Study Guides",
    desc: "Create and share comprehensive study guides.",
    stat: "4 guides created · 2 shared with group",
    icon: BookOpen,
    bg: "bg-[#E8F5EE]",
    iconBg: "bg-slate-900",
    href: "/study-tools/guides"
  },
  {
    title: "AI Tutor",
    desc: "Your personal AI tutor, available 24/7.",
    stat: "Last topic: Cell Division · 2 hours ago",
    icon: Bot,
    bg: "bg-[#FFFBE8]",
    iconBg: "bg-slate-900",
    href: "/ai-friend/vidhyamithra",
    isNew: true
  },
  {
    title: "Group Study",
    desc: "Collaborate with peers in real-time study sessions.",
    stat: "3 members active now · Goal: 68% complete",
    icon: Users,
    bg: "bg-[#F0EEFF]",
    iconBg: "bg-slate-900",
    href: "/study-tools/groups"
  }
];

export const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((f, idx) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 + (idx * 0.08) }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={cn(
            "group relative p-8 rounded-[20px] shadow-sm hover:shadow-xl transition-all duration-300 h-full border-l-[3px] border-transparent hover:border-[#4F46E5]",
            f.bg
          )}
        >
          {f.isNew && (
            <div className="absolute top-6 right-6 bg-[#FF6B9C] text-white text-[8px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
              NEW <Sparkles className="w-2.5 h-2.5" />
            </div>
          )}
          
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110 group-hover:-rotate-3", f.iconBg)}>
            <f.icon className="w-7 h-7 text-white" />
          </div>
          
          <h3 className="text-2xl font-headline font-bold mb-3 text-[#1A1A2E]">{f.title}</h3>
          <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">
            {f.desc}
          </p>

          <div className="bg-white/40 p-3 rounded-xl border border-white/50 mb-8">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{f.stat}</p>
          </div>
          
          <Link href={f.href} className="inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-[#4F46E5] transition-all">
            {f.title === 'Flashcards' ? 'Review Now' : f.title === 'Smart Learn' ? 'Continue' : f.title === 'Practice MCQs' ? 'Start Session' : f.title === 'Study Guides' ? 'Open Library' : f.title === 'AI Tutor' ? 'Ask Now' : 'Join Session'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
