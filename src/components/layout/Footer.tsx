"use client";

import React from "react";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  GraduationCap, 
  Youtube,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FooterProps {
  logo?: {
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Study Resources",
    links: [
      { name: "NCERT Flashcards", href: "/study-tools/flashcards" },
      { name: "Smart Learn", href: "/study-tools/learn" },
      { name: "Mock Test Portal", href: "/tests" },
      { name: "AI Tutor", href: "/study-tools/ai-tutor" },
      { name: "Practice MCQs", href: "/study-tools/mcqs" },
    ],
  },
  {
    title: "Subjects",
    links: [
      { name: "Biology (Botany & Zoology)", href: "/subjects/biology" },
      { name: "Chemistry (Organic & Physical)", href: "/subjects/chemistry" },
      { name: "Physics (Mechanics & Modern)", href: "/subjects/physics" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Vidhyaly", href: "/about" },
      { name: "Success Stories", href: "/#testimonials" },
      { name: "Contact Support", href: "/contact" },
      { name: "Counseling Support", href: "/contact" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <Instagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <Facebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <Twitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <Youtube className="size-5" />, href: "#", label: "YouTube" },
];

const defaultLegalLinks = [
  { name: "Terms & Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Cookie Settings", href: "#" },
];

export const Footer = ({
  logo = {
    title: "Vidhyaly",
  },
  sections = defaultSections,
  description = "India's smartest NEET preparation platform. We bridge the gap between hard work and medical seats with NCERT-based precision and AI-driven insights.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2027 Vidhyaly Education. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: FooterProps) => {
  return (
    <footer className="relative bg-white/70 backdrop-blur-xl text-slate-600 pt-20 pb-12 overflow-hidden border-t border-slate-200/60 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <h2 className="text-4xl font-headline font-bold tracking-tighter bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {logo.title}
              </h2>
            </motion.div>
            
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
              {description}
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-slate-100 hover:bg-primary hover:text-white p-3 rounded-2xl transition-all text-slate-500 shadow-sm border border-slate-200/50"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Trusted by 10k+ Students
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                <Globe className="w-4 h-4 text-accent" />
                Available Across India
              </div>
            </div>
          </div>

          {/* Navigation sections */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {sections.map((section, sectionIdx) => (
              <motion.div 
                key={sectionIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIdx * 0.1 }}
                className="space-y-6"
              >
                <h3 className="text-slate-900 font-bold text-lg">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link 
                        href={link.href} 
                        className="text-slate-500 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center group font-medium"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 mr-2 text-primary">
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="mb-12 p-6 rounded-[2rem] bg-slate-50 border border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-6 group hover:shadow-lg transition-all duration-500">
           <div className="flex items-center gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                 <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Direct Counseling</p>
                 <p className="text-lg font-bold text-slate-900">+91 8466006486</p>
              </div>
           </div>
           <div className="h-12 w-[1px] bg-slate-200 hidden md:block" />
           <div className="flex items-center gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                 <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Support Email</p>
                 <p className="text-lg font-bold text-slate-900">support@vidhyaly.com</p>
              </div>
           </div>
           <Button className="rounded-full px-8 h-12 bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-200 transition-all hover:scale-105" asChild>
              <Link href="/contact">Get Help Now</Link>
           </Button>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-400"
          >
            {copyright}
          </motion.p>
          
          <ul className="flex flex-wrap justify-center gap-8">
            {legalLinks.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href} className="text-slate-400 hover:text-slate-900 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
