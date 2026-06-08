
"use client";

import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { AIPulseBanner } from "@/components/dashboard/AIPulseBanner";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { SubjectHeatmap } from "@/components/dashboard/SubjectHeatmap";
import { TodaysPlan } from "@/components/dashboard/TodaysPlan";
import { ErrorPatterns } from "@/components/dashboard/ErrorPatterns";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { FeatureCards } from "@/components/dashboard/FeatureCards";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8F8FA] flex">
      <Sidebar />
      
      <main className="flex-1 ml-[260px] relative">
        <Topbar />
        
        {/* Content Area */}
        <div className="pt-24 pb-12 px-8 max-w-7xl mx-auto space-y-8">
          
          {/* Section 1: AI Pulse */}
          <AIPulseBanner />

          {/* Section 2: Metrics */}
          <MetricCards />

          {/* Section 3: Mastery & Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 h-full">
              <SubjectHeatmap />
            </div>
            <div className="lg:col-span-5 h-full">
              <TodaysPlan />
            </div>
          </div>

          {/* Section 4: Performance Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <ErrorPatterns />
            <WeeklyChart />
          </div>

          {/* Section 5: Feature Quick Access */}
          <div className="space-y-6 pt-4">
            <h2 className="text-2xl font-headline font-bold text-[#1A1A2E] px-2">Your Study Tools</h2>
            <FeatureCards />
          </div>

          {/* Accessibility Footer */}
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
