
"use client";

import { useState, useEffect } from "react";
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
  Leaf,
  FlaskConical,
  Zap,
  Menu,
  User,
  Settings,
  ArrowRight,
  LayoutDashboard,
  LogOut,
  Bell,
  Rocket,
  ArrowRightIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
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
import { NotificationBell } from "@/components/notifications/NotificationBell";

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

  const { user, profile } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Hide Navbar on dashboard and admin routes to prevent overlap
  const isAppRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');

  if (isAppRoute) return null;

  const handleHover = (menuLabel: string | null) => {
    setOpenMenu(menuLabel);
  };

  const handleSignOut = async () => {
    await signOut(auth!);
    router.push("/");
  };

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col">
      <nav className="w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <span className="font-headline font-bold text-2xl tracking-tighter bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
              Vidhyaly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
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
                      className="text-[13px] font-bold py-1.5 px-3 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-slate-500 hover:text-slate-900 relative z-20"
                      onMouseEnter={() => setIsHover(navItem.id)}
                      onMouseLeave={() => setIsHover(null)}
                    >
                      <span className="relative z-10">{navItem.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 group-hover:rotate-180 duration-300 transition-transform relative z-10",
                          openMenu === navItem.label && "rotate-180"
                        )}
                      />
                      {(isHover === navItem.id || openMenu === navItem.label) && (
                        <motion.div
                          layoutId="hover-bg"
                          className="absolute inset-0 size-full bg-slate-100/80"
                          style={{ borderRadius: 99 }}
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={navItem.href || "#"}
                      className="text-[13px] font-bold py-1.5 px-3 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-slate-500 hover:text-slate-900 relative z-20"
                      onMouseEnter={() => setIsHover(navItem.id)}
                      onMouseLeave={() => setIsHover(null)}
                    >
                      <span className="relative z-10">{navItem.label}</span>
                      {(isHover === navItem.id) && (
                        <motion.div
                          layoutId="hover-bg"
                          className="absolute inset-0 size-full bg-slate-100/80"
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
                                <h3 className="mb-4 text-[10px] font-black uppercase tracking-widest text-primary/60">
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
                                            <p className="text-sm font-bold text-slate-800 shrink-0 mb-1 group-hover/item:text-primary transition-colors">
                                              {item.label}
                                            </p>
                                            <p className="text-[11px] text-slate-400 shrink-0 max-w-[180px] group-hover/item:text-slate-600 transition-colors duration-300">
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
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {user ? (
              <>
                <NotificationBell />
                <div className="h-6 w-px bg-slate-100 mx-1" />
                <Button asChild variant="ghost" className="rounded-full px-4 font-black text-xs uppercase tracking-tight hover:bg-primary/5 transition-all text-slate-700">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-primary" />
                    Dashboard
                  </Link>
                </Button>
                <div className="h-6 w-px bg-slate-100 mx-1" />
                <Link href="/profile" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 relative group">
                  <User className="w-5 h-5" />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    My Profile
                  </div>
                </Link>
                <Button onClick={handleSignOut} variant="ghost" size="icon" className="rounded-full text-slate-300 hover:text-destructive">
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="rounded-full px-5 font-black text-xs uppercase tracking-widest hover:bg-primary/5 transition-all text-slate-600">
                  <Link href="/auth">Login</Link>
                </Button>
                <Button asChild className="rounded-full px-6 font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all bg-slate-900">
                  <Link href="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            {user && <NotificationBell />}
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
                  {user && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 text-slate-700 transition-colors border"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm font-bold">Profile</span>
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-primary/5 text-primary transition-colors border border-primary/10"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="text-sm font-bold">Dashboard</span>
                      </Link>
                    </div>
                  )}

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
                  {!user ? (
                    <div className="flex flex-col gap-2">
                      <Button asChild variant="outline" className="w-full rounded-xl font-bold py-6">
                        <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                      </Button>
                      <Button asChild className="w-full rounded-xl font-bold py-6 bg-slate-900 text-white">
                        <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>Start Free Prep</Link>
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} variant="ghost" className="w-full text-destructive font-bold">
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
