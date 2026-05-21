
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
  GraduationCap,
  Leaf,
  FlaskConical,
  Zap,
  Menu,
  X,
  Phone,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  BookOpen,
  FileText,
  CheckSquare,
  Bot,
  MessageCircle,
  Users,
  Presentation,
  Leaf,
  FlaskConical,
  Zap
};

type NavItem = {
  id: number;
  label: string;
  href?: string;
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
  const [isHover, setIsHover] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleHover = (menuLabel: string | null) => {
    setOpenMenu(menuLabel);
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <span className="font-headline font-bold text-2xl tracking-tighter bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
            Vidhyaly
          </span>
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
                {navItem.subMenus ? (
                  <button
                    className="text-sm py-1.5 px-4 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-muted-foreground hover:text-foreground relative z-20"
                    onMouseEnter={() => setIsHover(navItem.id)}
                    onMouseLeave={() => setIsHover(null)}
                  >
                    <span className="relative z-10">{navItem.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 group-hover:rotate-180 duration-300 transition-transform relative z-10",
                        openMenu === navItem.label && "rotate-180"
                      )}
                    />
                    {(isHover === navItem.id || openMenu === navItem.label) && (
                      <motion.div
                        layoutId="hover-bg"
                        className="absolute inset-0 size-full bg-primary/10"
                        style={{ borderRadius: 99 }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={navItem.href || "#"}
                    className="text-sm py-1.5 px-4 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-muted-foreground hover:text-foreground relative z-20"
                    onMouseEnter={() => setIsHover(navItem.id)}
                    onMouseLeave={() => setIsHover(null)}
                  >
                    <span className="relative z-10">{navItem.label}</span>
                    {(isHover === navItem.id) && (
                      <motion.div
                        layoutId="hover-bg"
                        className="absolute inset-0 size-full bg-primary/10"
                        style={{ borderRadius: 99 }}
                      />
                    )}
                  </Link>
                )}

                <AnimatePresence>
                  {openMenu === navItem.label && navItem.subMenus && (
                    <div className="w-auto absolute left-0 top-full pt-2">
                      <motion.div
                        className="bg-white border border-border p-6 shadow-2xl w-max rounded-2xl"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <div className="w-fit shrink-0 flex space-x-12 overflow-hidden">
                          {navItem.subMenus.map((sub) => (
                            <div className="w-full" key={sub.title}>
                              <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-primary/60">
                                {sub.title}
                              </h3>
                              <ul className="space-y-5">
                                {sub.items.map((item) => {
                                  const Icon = ICON_MAP[item.icon] || BookOpen;
                                  return (
                                    <li key={item.label}>
                                      <Link
                                        href={item.href}
                                        className="flex items-start space-x-4 group/item"
                                      >
                                        <div className="border border-border text-primary rounded-lg flex items-center justify-center size-10 shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300 shadow-sm">
                                          <Icon className="h-5 w-5 flex-none" />
                                        </div>
                                        <div className="leading-tight w-max">
                                          <p className="text-sm font-bold text-foreground shrink-0 mb-1 group-hover/item:text-primary transition-colors">
                                            {item.label}
                                          </p>
                                          <p className="text-xs text-muted-foreground shrink-0 max-w-[180px] group-hover/item:text-foreground/80 transition-colors duration-300">
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

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="ghost" className="rounded-full px-6 font-bold hover:bg-primary/5 transition-all">
            <Link href="/auth">Login</Link>
          </Button>
          <Button asChild className="rounded-full px-6 font-bold shadow-md hover:shadow-lg transition-all">
            <Link href="/auth">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[400px] p-0 flex flex-col">
              <SheetHeader className="p-6 border-b text-left">
                <SheetTitle className="flex items-center">
                  <span className="font-headline font-bold text-2xl tracking-tighter bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Vidhyaly
                  </span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {navItems.map((navItem) => (
                  <div key={navItem.id}>
                    {navItem.subMenus ? (
                      <Collapsible className="w-full">
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group">
                          <span className="font-bold text-slate-700">{navItem.label}</span>
                          <ChevronDown className="w-4 h-4 text-slate-400 group-data-[state=open]:rotate-180 transition-transform" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-4 pt-2 space-y-4 pb-4">
                          {navItem.subMenus.map((sub) => (
                            <div key={sub.title} className="space-y-3">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                                {sub.title}
                              </p>
                              {sub.items.map((item) => {
                                const Icon = ICON_MAP[item.icon] || BookOpen;
                                return (
                                  <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 group"
                                  >
                                    <div className="p-2 rounded-lg border bg-white shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-bold text-slate-700">{item.label}</p>
                                      <p className="text-[10px] text-slate-400">{item.description}</p>
                                    </div>
                                    <ArrowRight className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </Link>
                                );
                              })}
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        href={navItem.href || "#"}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-bold text-slate-700">{navItem.label}</span>
                        <ArrowRight className="w-4 h-4 text-slate-300" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Footer (Contact) */}
              <div className="p-6 bg-slate-50 border-t space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Support</p>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full border shadow-sm">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">Venkatesh Choppa</p>
                      <p className="text-xs text-slate-500">+91 8466006486</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button asChild variant="outline" className="w-full rounded-xl font-bold py-6">
                    <Link href="/auth">Login</Link>
                  </Button>
                  <Button asChild className="w-full rounded-xl font-bold py-6">
                    <Link href="/auth">Start Free Prep</Link>
                  </Button>
                </div>
                <p className="text-[10px] text-center text-slate-400 font-medium italic">
                  "Working with more efforts for your dream seat."
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
