"use client"

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, ShieldCheck, Trophy, Bot, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  onPlanSelect: () => void;
  isLoading?: boolean;
}

const features = [
  { icon: Bot, text: "24/7 Unlimited AI Mentor Access" },
  { icon: Zap, text: "20,000+ NCERT-Mapped MCQs" },
  { icon: Trophy, text: "AIR Rank & College Predictor" },
  { icon: ShieldCheck, text: "Priority WhatsApp Counselor Support" },
  { icon: Sparkles, text: "Ad-Free & Distraction-Free Platform" },
];

export default function PricingSection1({ onPlanSelect, isLoading }: PricingSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 flex flex-col items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-bold text-primary mb-4">
              <Sparkles className="mr-2 h-4 w-4 fill-primary" />
              Empowering NEET 2026 Aspirants
            </div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900">
              Simple, Transparent <span className="text-primary">Pricing</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
              Invest in your medical dream today. One plan, all features, zero hidden costs.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-lg items-center gap-8 py-12 lg:max-w-none lg:grid-cols-1 justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative flex flex-col rounded-[2.5rem] bg-white p-8 shadow-2xl border border-slate-100 dark:bg-zinc-950 dark:border-zinc-800"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="mb-8 relative">
              <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">
                Recommended
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-zinc-50">Pro Aspirant</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-zinc-50">₹499</span>
                <span className="text-sm font-bold text-slate-400">/ Year</span>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Valid for the complete NEET 2026 academic cycle.
              </p>
            </div>

            <div className="space-y-4 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-zinc-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={onPlanSelect}
              disabled={isLoading}
              className="group relative w-full py-8 rounded-[1.5rem] bg-slate-900 hover:bg-slate-800 text-white font-bold text-xl shadow-xl transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Get Started Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Button>

            <p className="mt-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Secure Checkout Powered by Razorpay
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
