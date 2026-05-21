
"use client";

import { useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Layers, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  Bot, 
  MessageCircle, 
  Users, 
  Presentation,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  BookOpen,
  FileText,
  CheckSquare,
  Bot,
  MessageCircle,
  Users,
  Presentation,
};

type NavItem = {
  id: number;
  label: string;
  subMenus?: {
    title: string;
    items: {
      label: string;
      description: string;
      icon: string;
      href: string;
    }[];
  }[];
};

type Props = {
  navItems: NavItem[];
};

export function DropdownNavigation({ navItems }: Props) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const handleHover = (menuLabel: string | null) => {
    setOpenMenu(menuLabel);
  };

  const [isHover, setIsHover] = useState<number | null>(null);

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg shadow-sm text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">Vidhyaly</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center">
          <ul className="relative flex items-center space-x-1">
            {navItems.map((navItem) => (
              <li
                key={navItem.label}
                className="relative"
                onMouseEnter={() => handleHover(navItem.label)}
                onMouseLeave={() => handleHover(null)}
              >
                <button
                  className="text-sm py-1.5 px-4 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-muted-foreground hover:text-foreground relative z-20"
                  onMouseEnter={() => setIsHover(navItem.id)}
                  onMouseLeave={() => setIsHover(null)}
                >
                  <span className="relative z-10">{navItem.label}</span>
                  {navItem.subMenus && (
                    <ChevronDown
                      className={`h-4 w-4 group-hover:rotate-180 duration-300 transition-transform relative z-10
                        ${openMenu === navItem.label ? "rotate-180" : ""}`}
                    />
                  )}
                  {(isHover === navItem.id || openMenu === navItem.label) && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute inset-0 size-full bg-primary/10"
                      style={{ borderRadius: 99 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {openMenu === navItem.label && navItem.subMenus && (
                    <div className="w-auto absolute left-0 top-full pt-2">
                      <motion.div
                        className="bg-background border border-border p-6 shadow-xl w-max"
                        style={{ borderRadius: 16 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-fit shrink-0 flex space-x-12 overflow-hidden">
                          {navItem.subMenus.map((sub) => (
                            <div className="w-full" key={sub.title}>
                              <h3 className="mb-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                                {sub.title}
                              </h3>
                              <ul className="space-y-5">
                                {sub.items.map((item) => {
                                  const Icon = ICON_MAP[item.icon] || BookOpen;
                                  return (
                                    <li key={item.label}>
                                      <Link
                                        href={item.href}
                                        className="flex items-start space-x-4 group"
                                      >
                                        <div className="border border-border text-primary rounded-lg flex items-center justify-center size-10 shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                          <Icon className="h-5 w-5 flex-none" />
                                        </div>
                                        <div className="leading-tight w-max">
                                          <p className="text-sm font-bold text-foreground shrink-0 mb-1">
                                            {item.label}
                                          </p>
                                          <p className="text-xs text-muted-foreground shrink-0 max-w-[180px] group-hover:text-foreground transition-colors duration-300">
                                            {item.description}
                                          </p>
                                        </div>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button className="bg-primary text-white text-sm font-bold py-2 px-6 rounded-full hover:bg-primary/90 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
