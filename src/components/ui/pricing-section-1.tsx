"use client"

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, ShieldCheck, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  onPlanSelect: (plan: string, price: number) => void;
  isLoading?: boolean;
}

const plans = [
  {
    name: "Free",
    price: 0,
    interval: "",
    description: "Basic access for new aspirants",
    features: [
      "10 MCQs per NCERT Unit",
      "10 Flashcards per Chapter",
      "10 AI Tutor Credits",
      "1 Full Mock Test",
      "No Study Group access"
    ],
    buttonText: "Current Plan",
    variant: "outline",
    icon: Zap,
    color: "slate"
  },
  {
    name: "Pro Monthly",
    price: 199,
    interval: "/ Month",
    description: "Complete preparation for serious students",
    features: [
      "Unlimited MCQs (20k+ Bank)",
      "Unlimited NCERT Flashcards",
      "Unlimited AI Tutor Access",
      "Unlimited Mock Tests",
      "Study Group Membership"
    ],
    buttonText: "Upgrade to Pro",
    variant: "primary",
    popular: true,
    icon: Star,
    color: "blue"
  }
];

export default function PricingSection1({ onPlanSelect, isLoading }: PricingSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 flex flex-col items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-bold text-primary mb-4">
              <Sparkles className="mr-2 h-4 w-4 fill-primary" />
              NEET 2027 Batch Plans
            </div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900">
              Choose Your <span className="text-primary">Success Path</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
              Start for free or unlock the full power of Vidhyaly for just ₹199.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className={cn(
                "relative flex flex-col rounded-[2.5rem] bg-white p-8 border transition-all duration-500 hover:shadow-2xl",
                plan.popular ? "border-primary/50 shadow-xl scale-[1.02] z-10" : "border-slate-100 shadow-sm hover:-translate-y-2"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner",
                  plan.color === 'blue' ? "bg-blue-50 text-blue-600" : 
                  "bg-slate-50 text-slate-600"
                )}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-sm font-medium text-slate-400 mt-1">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tight text-slate-900">₹{plan.price}</span>
                  <span className="text-sm font-bold text-slate-400">{plan.interval}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => onPlanSelect(plan.name, plan.price)}
                disabled={isLoading || plan.price === 0}
                variant={plan.variant === 'outline' ? 'outline' : 'default'}
                className={cn(
                  "group w-full py-7 rounded-[1.5rem] font-bold text-lg transition-all active:scale-[0.98] shadow-lg",
                  plan.variant === 'primary' ? "bg-primary hover:bg-primary/90 text-white" : ""
                )}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    {plan.buttonText}
                    {plan.price > 0 && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                  </div>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
        
        <p className="mt-12 text-center text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" /> Secure Razorpay Checkout
        </p>
      </div>
    </section>
  );
}
