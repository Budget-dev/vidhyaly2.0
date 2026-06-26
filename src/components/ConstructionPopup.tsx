"use client"

import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HardHat, AlertTriangle, Phone, Globe, ArrowRight, Calendar } from "lucide-react";

export function ConstructionPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("vidhyaly_construction_notified_v2");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("vidhyaly_construction_notified_v2", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-sm bg-white rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Under Construction Notice</DialogTitle>
          <DialogDescription>
            The Vidhyaly platform is currently being developed and features are not yet functional.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-amber-500 p-6 flex flex-col items-center text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <AlertTriangle className="w-48 h-48 absolute -bottom-8 -right-8 rotate-12" />
          </div>
          
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md mb-3 relative z-10">
            <HardHat className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-headline font-bold relative z-10">System Under Build</h2>
          <p className="text-amber-50 text-[10px] mt-1 font-bold relative z-10 uppercase tracking-widest">Development Phase 2.0</p>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-3 text-center">
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              We are building the future of NEET prep. Features are currently non-functional as we calibrate our NCERT AI models.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              <Calendar className="w-3 h-3" />
              Official Launch: Nov 2026
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border text-primary shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Support</p>
                <p className="text-xs font-bold text-slate-700">+91 8466006486</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleDismiss} 
            className="w-full rounded-xl py-6 font-bold text-sm bg-slate-900 hover:bg-black text-white shadow-xl"
          >
            Enter Preview Mode
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
