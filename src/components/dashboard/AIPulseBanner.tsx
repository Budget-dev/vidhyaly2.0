
"use client";

import React, { useState, useEffect } from "react";
import { Bot, Sparkles, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const AIPulseBanner = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "You are 64% ready for NEET. Your Biology (Genetics) accuracy dropped 18% this week. Spend 45 min on Mendelian Genetics today — it appeared in 8 of the last 10 NEET papers. Your Chemistry is strong ✓";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 15);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative overflow-hidden rounded-[2rem] bg-[#FFFBE8] p-8 shadow-sm border border-amber-100"
    >
      {/* Background Glow */}
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-amber-400/10 rounded-full blur-[80px]" />
      
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-start gap-6 max-w-2xl">
          <div className="relative">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 relative z-10">
              <Bot className="w-9 h-9 text-white" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-amber-400 rounded-2xl blur-lg"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-headline font-bold text-amber-900">VidhyaMithra&apos;s Daily Verdict</h2>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <p className="text-amber-800/80 font-medium leading-relaxed min-h-[3rem]">
              {displayText}
              <span className="inline-block w-1.5 h-4 bg-amber-500 ml-1 animate-pulse" />
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button className="rounded-full bg-[#1A1A2E] hover:bg-black text-white px-6 font-bold shadow-xl">
            <Zap className="w-4 h-4 mr-2 text-amber-400 fill-amber-400" />
            Study Genetics Now
          </Button>
          <Button variant="outline" className="rounded-full border-amber-200 bg-white/50 text-amber-900 font-bold hover:bg-white">
            Review Due Flashcards
          </Button>
          <Button variant="ghost" className="rounded-full text-amber-900 font-bold hover:bg-amber-100">
            See Full Analysis
          </Button>
        </div>
      </div>
    </motion.section>
  );
};
