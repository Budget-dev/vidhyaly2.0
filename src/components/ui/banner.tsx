"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerProps {
  show: boolean;
  onHide: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "primary" | "accent";
  closable?: boolean;
  showShade?: boolean;
}

export function Banner({
  show,
  onHide,
  title,
  description,
  icon,
  action,
  variant = "default",
  closable = true,
  showShade = false,
}: BannerProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={cn(
            "relative z-50 w-full overflow-hidden border-b py-3 px-4",
            variant === "default" && "bg-white border-slate-100",
            variant === "primary" && "bg-primary/5 border-primary/10",
            variant === "accent" && "bg-amber-50 border-amber-100",
          )}
        >
          {showShade && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
          )}

          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              {icon && (
                <div className={cn(
                  "p-2 rounded-xl shrink-0",
                  variant === "default" && "bg-slate-100 text-slate-500",
                  variant === "primary" && "bg-primary/20 text-primary",
                  variant === "accent" && "bg-amber-100 text-amber-600",
                )}>
                  {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-bold text-sm text-slate-900">{title}</span>
                {description && (
                  <>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500">{description}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {action}
              {closable && (
                <button
                  onClick={onHide}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
