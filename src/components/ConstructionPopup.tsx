"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HardHat, AlertTriangle, Phone, Globe, ArrowRight } from "lucide-react";

export function ConstructionPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen and dismissed the popup
    const hasSeenPopup = localStorage.getItem("vidhyaly_construction_notified");
    if (!hasSeenPopup) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("vidhyaly_construction_notified", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md bg-white rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
        <div className="bg-amber-500 p-8 flex flex-col items-center text-white text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <AlertTriangle className="w-64 h-64 absolute -bottom-10 -right-10 rotate-12" />
          </div>
          
          <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md mb-4 relative z-10">
            <HardHat className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-headline font-bold relative z-10">Building Vidhyaly</h2>
          <p className="text-amber-50 text-sm mt-2 font-medium relative z-10 uppercase tracking-widest">NEET 2026 Platform</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <p className="text-slate-600 leading-relaxed font-medium text-center">
              We are currently building this project. Most features are currently in development and <span className="text-slate-900 font-bold">nothing is functional</span> at the moment.
            </p>
            <p className="text-slate-500 text-sm text-center">
              Please wait for the official update. We are working hard to bring you the best counseling experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border text-primary">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Support</p>
                <p className="text-sm font-bold text-slate-700">+91 8466006486</p>
              </div>
            </div>
            
            <a 
              href="https://budgetdev.in" 
              target="_blank" 
              className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl text-white hover:bg-slate-800 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Official Site</p>
                  <p className="text-sm font-bold">budgetdev.in</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          <Button 
            onClick={handleDismiss} 
            className="w-full rounded-2xl py-7 font-bold text-base bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-100"
          >
            I Understand, Let me Explore
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
