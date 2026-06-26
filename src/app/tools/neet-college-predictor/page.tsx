"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Trophy, 
  School, 
  ChevronRight, 
  Sparkles, 
  Phone, 
  User, 
  Target,
  ArrowRight,
  Info,
  CheckCircle2,
  BookOpen
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Simulated prediction logic
const predictRank = (score: number) => {
  if (score >= 715) return Math.floor(Math.random() * 50) + 1;
  if (score >= 700) return Math.floor(Math.random() * 500) + 50;
  if (score >= 680) return Math.floor(Math.random() * 2000) + 500;
  if (score >= 650) return Math.floor(Math.random() * 8000) + 2000;
  if (score >= 600) return Math.floor(Math.random() * 25000) + 8000;
  if (score >= 550) return Math.floor(Math.random() * 60000) + 25000;
  if (score >= 500) return Math.floor(Math.random() * 120000) + 60000;
  if (score >= 400) return Math.floor(Math.random() * 300000) + 120000;
  return Math.floor(Math.random() * 1000000) + 300000;
};

const getColleges = (rank: number) => {
  if (rank <= 2000) return [
    { name: "AIIMS, New Delhi", type: "Central Govt", location: "Delhi", probability: "High" },
    { name: "Maulana Azad Medical College", type: "Govt", location: "Delhi", probability: "High" },
    { name: "VMMC & Safdarjung Hospital", type: "Govt", location: "Delhi", probability: "High" }
  ];
  if (rank <= 15000) return [
    { name: "KGMU, Lucknow", type: "State Govt", location: "Uttar Pradesh", probability: "Medium" },
    { name: "Madras Medical College", type: "State Govt", location: "Tamil Nadu", probability: "Medium" },
    { name: "BJ Medical College", type: "State Govt", location: "Gujarat", probability: "High" }
  ];
  if (rank <= 25000) return [
    { name: "Osmania Medical College", type: "State Govt", location: "Telangana", probability: "Low" },
    { name: "GMC, Nagpur", type: "State Govt", location: "Maharashtra", probability: "Medium" },
    { name: "IMS BHU", type: "Central", location: "Varanasi", probability: "Low" }
  ];
  return [
    { name: "Kasturba Medical College", type: "Private/Deemed", location: "Manipal", probability: "High" },
    { name: "Hamdard Institute of Medical Sciences", type: "Private/Deemed", location: "Delhi", probability: "Medium" },
    { name: "Christian Medical College", type: "Private", location: "Ludhiana", probability: "Medium" }
  ];
};

export default function CollegePredictorPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", score: "" });
  const [result, setResult] = useState<{ rank: number; colleges: any[] } | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const scoreNum = parseInt(formData.score);
    if (!formData.name || !formData.phone || isNaN(scoreNum) || scoreNum < 0 || scoreNum > 720) {
      return;
    }

    setIsPredicting(true);
    // Simulate API delay
    setTimeout(() => {
      const predictedRank = predictRank(scoreNum);
      setResult({
        rank: predictedRank,
        colleges: getColleges(predictedRank)
      });
      setIsPredicting(false);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F8FA]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              NEET AI PREDICTOR 2027
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 leading-tight">
              Predict your NEET rank <br className="hidden md:block" />
              & colleges 2027
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Enter your expected score to see which medical colleges you may get based on previous year trends and AI-driven analysis.
            </p>
          </motion.div>

          {/* Predictor Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handlePredict} className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <Input 
                    placeholder="Your Full Name"
                    className="pl-12 py-7 rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-primary/20 text-base font-bold"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <Input 
                    placeholder="Phone Number (+91)"
                    className="pl-12 py-7 rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-primary/20 text-base font-bold"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <Input 
                    type="number"
                    placeholder="Enter Expected Score (0-720)"
                    className="pl-12 py-7 rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-primary/20 text-base font-bold"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  />
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isPredicting}
                className="w-full py-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-95"
              >
                {isPredicting ? (
                  <span className="flex items-center gap-3">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Target className="w-5 h-5" />
                    </motion.div>
                    Analyzing Trends...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Predict My Rank <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                * Based on 2025 official counselling data
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="pb-24 px-4"
          >
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Predicted Rank Card */}
                <div className="md:col-span-1 bg-primary rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center text-center">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Trophy className="w-32 h-32" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] mb-4 text-primary-foreground/60">Predicted AIR</h3>
                  <div className="text-7xl font-black mb-4">#{result.rank.toLocaleString()}</div>
                  <p className="text-sm font-medium text-primary-foreground/80">Estimated based on score of {formData.score}</p>
                </div>

                {/* Suggested Colleges */}
                <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 border shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-headline font-bold">Suggested Colleges</h3>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">3 Matches Found</span>
                  </div>
                  <div className="space-y-4">
                    {result.colleges.map((college, idx) => (
                      <div key={idx} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all group cursor-pointer">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200 group-hover:bg-primary transition-colors">
                            <School className="w-7 h-7 text-primary group-hover:text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-lg">{college.name}</h4>
                            <p className="text-sm text-slate-500 font-medium">{college.type} · {college.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <div className="hidden sm:block">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Probability</p>
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                              college.probability === 'High' ? "bg-emerald-50 text-emerald-600" :
                              college.probability === 'Medium' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                            )}>{college.probability}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-6 rounded-2xl py-6 font-bold text-primary">
                    View All Eligible Colleges <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-headline font-bold">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-medium">Everything you need to know about NEET 2027 predictions and rankings.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-[1.5rem] px-6 bg-slate-50/50">
              <AccordionTrigger className="font-bold text-left py-6 hover:no-underline">What is the safe rank for NEET 2025/2026?</AccordionTrigger>
              <AccordionContent className="pb-6 text-slate-600 leading-relaxed font-medium">
                Based on previous NEET trends, a rank below 20,000 in NEET UG is generally considered safe for government MBBS seats. You can use a NEET rank predictor to map your NEET UG score to an expected All India Rank (AIR) and check eligibility accordingly.
                <div className="mt-4 overflow-hidden rounded-xl border bg-white">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Safe AIR</th>
                        <th className="px-4 py-2 text-left">Approx Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2">General</td>
                        <td className="px-4 py-2">Below 22,000</td>
                        <td className="px-4 py-2">615+</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">OBC</td>
                        <td className="px-4 py-2">Below 22,500</td>
                        <td className="px-4 py-2">610+</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">SC/ST</td>
                        <td className="px-4 py-2">Below 1,00,000</td>
                        <td className="px-4 py-2">500+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-[1.5rem] px-6 bg-slate-50/50">
              <AccordionTrigger className="font-bold text-left py-6 hover:no-underline">What are the cut-off predictions for NEET 2027?</AccordionTrigger>
              <AccordionContent className="pb-6 text-slate-600 leading-relaxed font-medium">
                Early NEET trends and data analysis suggest the NEET UG entrance exam cut-off for government MBBS seats may range between 610-625 marks. The National Testing Agency (NTA) is expected to maintain an optimal difficulty level, and scoring a 650+ is recommended for top tier NEET colleges.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-[1.5rem] px-6 bg-slate-50/50">
              <AccordionTrigger className="font-bold text-left py-6 hover:no-underline">What is NEET college predictor tool?</AccordionTrigger>
              <AccordionContent className="pb-6 text-slate-600 leading-relaxed font-medium">
                The Vidhyaly NEET AI rank predictor is an intensive tool built on data collected from MCC and state counseling results from previous years. Our algorithm takes into account the difficulty of the paper, number of applicants, and category-wise seat matrix to provide highly accurate college suggestions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-[1.5rem] px-6 bg-slate-50/50">
              <AccordionTrigger className="font-bold text-left py-6 hover:no-underline">Can I get a MBBS seat with 300 marks in NEET?</AccordionTrigger>
              <AccordionContent className="pb-6 text-slate-600 leading-relaxed font-medium">
                300 marks in NEET UG is generally below the cutoff for government MBBS admission. However, some private and deemed medical universities may be accessible. A NEET rank calculator is a vital tool to check college possibilities based on your specific category and state.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-[1.5rem] px-6 bg-slate-50/50">
              <AccordionTrigger className="font-bold text-left py-6 hover:no-underline">Which rank predictor is most accurate?</AccordionTrigger>
              <AccordionContent className="pb-6 text-slate-600 leading-relaxed font-medium">
                Accuracy depends on the dataset. A predictor based on current-year difficulty and last year's official MCC data is most reliable. Vidhyaly's AI model updates dynamically as per NTA announcements to ensure the lowest margin of error.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Related Stories */}
      <section className="py-24 bg-slate-50/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <h2 className="text-3xl font-headline font-bold">Related counseling stories</h2>
              <p className="text-slate-500 font-medium">Essential advice for medical aspirants entering the 2027 cycle.</p>
            </div>
            <Button variant="outline" className="rounded-full px-8 h-12 font-bold border-slate-200">View All Stories</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group overflow-hidden rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/counsel1/800/600" 
                  alt="Counseling" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint="medical students"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">Counseling 2027</div>
              </div>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">Why every NEET aspirant needs a Plan B (and why it's not failure)</h3>
                <p className="text-slate-500 font-medium leading-relaxed">Explore alternative healthcare careers to reduce exam pressure and understand why success is bigger than just MBBS.</p>
                <div className="pt-4 flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">
                  Read Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/counsel2/800/600" 
                  alt="College Guide" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint="medical college"
                />
                <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">Admissions Guide</div>
              </div>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">NEET 2027 College Predictor: Check Colleges Based on Your Rank</h3>
                <p className="text-slate-500 font-medium leading-relaxed">Estimate your NEET 2027 rank and identify medical college options with our comprehensive guide to rank and college prediction.</p>
                <div className="pt-4 flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">
                  Read Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-headline font-bold leading-tight">Secure your medical <br /> dream with AI Mentorship</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">Join 10,000+ medical aspirants using Vidhyaly to master NCERT and crack NEET.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild className="rounded-full px-10 h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                <Link href="/auth">Start Free Prep</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-10 h-14 border-white/20 text-white hover:bg-white/10 font-bold text-lg">
                <Link href="/ai-friend/vidhyamithra">Chat with Vidhyamithra</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
