"use client";

import React from "react";
import { 
  Home, 
  Layers, 
  Brain, 
  ClipboardList, 
  BookOpen, 
  Bot, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
}

const navItems = [
  { id: 'dashboard',  label: 'Dashboard',     icon: Home },
  { id: 'flashcards', label: 'Flashcards',    icon: Layers },
  { id: 'smartlearn', label: 'Smart Learn',   icon: Brain },
  { id: 'mcqs',       label: 'Practice MCQs', icon: ClipboardList },
  { id: 'guides',     label: 'Study Guides',  icon: BookOpen },
  { id: 'aitutor',    label: 'AI Tutor',      icon: Bot, badge: 'NEW' },
  { id: 'groupstudy', label: 'Group Study',   icon: Users },
];

export const Sidebar = ({ activeTool, setActiveTool }: SidebarProps) => {
  return (
    <motion.aside 
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-[260px] bg-white text-slate-900 flex flex-col z-50 border-r border-slate-100 shadow-sm"
    >
      {/* Logo & Countdown */}
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <span className="text-2xl font-headline font-bold tracking-tighter">
            Vidhyaly
          </span>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5 flex items-center gap-2 w-fit">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">87 days to NEET 2027</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = activeTool === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTool(item.id)}
              className="relative group w-full text-left"
            >
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative z-10",
                isActive ? "text-white" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}>
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                <span className="text-sm font-semibold">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-[#FF3B7A] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full flex items-center">
                    {item.badge}
                  </span>
                )}
              </div>
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute inset-0 bg-[#5B50E8] rounded-xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-50 space-y-4">
        <button className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-slate-900 text-sm transition-colors w-full">
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </button>
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5B50E8] flex items-center justify-center text-xs font-bold text-white">
              N
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Arjun Sharma</p>
              <p className="text-[10px] text-slate-500">Free Tier</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
};
