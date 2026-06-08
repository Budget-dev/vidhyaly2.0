"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { motion, AnimatePresence } from "framer-motion";

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
