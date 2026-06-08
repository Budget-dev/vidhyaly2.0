"use client";

import React from "react";
import { motion } from "framer-motion";
import { AIPulseBanner } from "@/components/dashboard/AIPulseBanner";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { SubjectHeatmap } from "@/components/dashboard/SubjectHeatmap";
import { TodaysPlan } from "@/components/dashboard/TodaysPlan";
import { ErrorPatterns } from "@/components/dashboard/ErrorPatterns";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { FeatureCards } from "@/components/dashboard/FeatureCards";

export const HomeDashboard = () => {
  return (
    <div className="space-y-8">
      <AIPulseBanner />
      <MetricCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7">
          <SubjectHeatmap />
        </div>
        <div className="lg:col-span-5">
          <TodaysPlan />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <ErrorPatterns />
        <WeeklyChart />
      </div>

      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-headline font-bold text-[#1A1A2E] px-2">Your Study Tools</h2>
        <FeatureCards />
      </div>
    </div>
  );
};
