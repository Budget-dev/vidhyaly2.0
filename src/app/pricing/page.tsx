"use client"

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, ShieldCheck, Zap, Bot, Trophy, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const premiumFeatures = [
  { title: "Unlimited AI Mentor Access", description: "Talk to Vidhyamithra 24/7 for doubts and motivation.", icon: Bot },
  { title: "20,000+ NCERT MCQs", description: "Full access to our chapter-wise practice question bank.", icon: Zap },
  { title: "AIR Rank Predictor", description: "Get real-time rank predictions based on your performance.", icon: Trophy },
  { title: "NCERT-Mapped Study Guides", description: "High-yield notes and summaries for every chapter.", icon: Sparkles },
  { title: "Priority Support", description: "Direct access to expert counselors via WhatsApp.", icon: ShieldCheck },
  { title: "Ad-Free Platform", description: "Zero distractions on your path to a medical seat.", icon: Shield },
];

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    // In a real production app, you would first call your backend to create an order
    // const response = await fetch('/api/create-order', { method: 'POST' });
    // const order = await response.json();

    const options = {
      key: "rzp_test_placeholder", // Replace with your actual Razorpay Key ID
      amount: 49900, // Amount in paise (499.00 INR)
      currency: "INR",
      name: "Vidhyaly Education",
      description: "NEET Pro Aspirant Plan - 1 Year",
      image: "https://vidhyaly.com/logo.svg",
      handler: function (response: any) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        window.location.href = "/dashboard";
      },
      prefill: {
        name: "Aspirant User",
        email: "user@example.com",
        contact: "+919876543210",
      },
      notes: {
        address: "Vidhyaly Education, India",
      },
      theme: {
        color: "#4F46E5",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Your NEET Journey
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 leading-tight">
            Unlock Your Full <br className="hidden md:block" />
            <span className="text-primary">Medical Potential</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Join thousands of successful aspirants. Get the precision tools and AI mentorship you need to crack NEET 2026.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-xl bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-100 relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-slate-900">Pro Aspirant</h3>
                  <p className="text-sm font-medium text-slate-400">Everything you need to master NEET</p>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  Best Value
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900">₹499</span>
                <span className="text-slate-400 font-bold">/ year</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {premiumFeatures.map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-primary/10 p-2 rounded-xl h-fit shrink-0">
                      <f.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-800 leading-none">{f.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-tight">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6">
                <Button 
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full py-8 rounded-[1.5rem] bg-slate-900 hover:bg-slate-800 text-white font-bold text-xl shadow-xl transition-all group/btn"
                >
                  {loading ? "Processing..." : "Get Started Now"}
                  <ArrowRight className="ml-2 w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-[0.2em]">
                  Secure Payment via Razorpay
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-12">
          <p className="text-sm text-slate-400 font-medium">
            Have questions? <Link href="/contact" className="text-primary hover:underline font-bold">Talk to a counselor</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
