"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dashboards
import { HomeDashboard } from "@/components/dashboards/HomeDashboard";
import { FlashcardsDashboard } from "@/components/dashboards/FlashcardsDashboard";
import { SmartLearnDashboard } from "@/components/dashboards/SmartLearnDashboard";
import { MCQsDashboard } from "@/components/dashboards/MCQsDashboard";
import { GuidesDashboard } from "@/components/dashboards/GuidesDashboard";
import { AITutorDashboard } from "@/components/dashboards/AITutorDashboard";
import { GroupStudyDashboard } from "@/components/dashboards/GroupStudyDashboard";

export default function DashboardPage() {
  const [activeTool, setActiveTool] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderContent = () => {
    switch (activeTool) {
      case 'dashboard':  return <HomeDashboard />;
      case 'flashcards': return <FlashcardsDashboard />;
      case 'smartlearn': return <SmartLearnDashboard />;
      case 'mcqs':       return <MCQsDashboard />;
      case 'guides':     return <GuidesDashboard />;
      case 'aitutor':    return <AITutorDashboard />;
      case 'groupstudy': return <GroupStudyDashboard />;
      default:           return <HomeDashboard />;
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm space-y-8"
        >
          <div className="relative mx-auto w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center">
            <Monitor className="w-12 h-12 text-primary" />
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100">
              <Smartphone className="w-6 h-6 text-slate-400" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-2xl font-headline font-bold text-slate-900">Better on Desktop</h1>
            <p className="text-slate-500 leading-relaxed font-medium">
              The Vidhyaly Dashboard contains complex analytics and interactive tools that require a larger screen for the best experience.
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Button asChild className="rounded-2xl py-7 font-bold text-base shadow-xl">
              <Link href="/">Return to Home</Link>
            </Button>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Dashboard is hidden on mobile devices
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8FA] flex">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      
      <main className="flex-1 ml-[260px] relative min-h-screen">
        <Topbar activeTool={activeTool} />
        
        <div className="pt-24 pb-12 px-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>

          <footer className="pt-12 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
              Vidhyaly AI Dashboard · Production build v2.6
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
