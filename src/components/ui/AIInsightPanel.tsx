"use client";

import React from "react";
import { Bot, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AIInsightPanelProps {
  message: string;
  actions?: { label: string; primary?: boolean; onClick?: () => void }[];
  title?: string;
}

export const AIInsightPanel = ({ message, actions, title = "VidhyaMithra noticed:" }: AIInsightPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#FFFBE8] border border-amber-100 rounded-[20px] p-6 shadow-sm flex items-start gap-4"
    >
      <div className="bg-amber-500 p-3 rounded-2xl shadow-lg shadow-amber-500/20">
        <Bot className="w-6 h-6 text-white" />
      </div>
      
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-900 uppercase tracking-widest">{title}</span>
          <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
        </div>
        <p className="text-amber-800/80 font-medium leading-relaxed text-sm">
          {message}
        </p>
        
        {actions && (
          <div className="flex items-center gap-3 pt-2">
            {actions.map((action, idx) => (
              <Button
                key={idx}
                variant={action.primary ? "default" : "ghost"}
                className={action.primary 
                  ? "bg-amber-500 hover:bg-amber-600 text-white rounded-full text-xs font-bold h-8 px-4" 
                  : "text-amber-700 hover:bg-amber-100 rounded-full text-xs font-bold h-8 px-4"
                }
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
