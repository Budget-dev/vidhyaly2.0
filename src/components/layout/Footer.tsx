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
  Globe
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FooterProps {
  logo?: {
    src: React.ReactNode;
    alt: string;
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
    src: <GraduationCap className="size-6" />,
    alt: "Vidhyaly Logo",
    title: "Vidhyaly",
  },
  sections = defaultSections,
  description = "India's smartest NEET preparation platform. We bridge the gap between hard work and medical seats with NCERT-based precision and AI-driven insights.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 Vidhyaly Education. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: FooterProps) => {
  return (
    <footer className="relative bg-slate-900 text-slate-200 pt-24 pb-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

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
              <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
                {logo.src}
              </div>
              <h2 className="text-3xl font-headline font-bold text-white tracking-tight">{logo.title}</h2>
            </motion.div>
            
            <p className="text-slate-400 text-base leading-relaxed max-w-sm font-medium">
              {description}
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="bg-white/5 hover:bg-primary hover:text-white p-3 rounded-full transition-all text-slate-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Trusted by 10k+ Students
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
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
                <h3 className="text-white font-bold text-lg">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link 
                        href={link.href} 
                        className="text-slate-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center group font-medium"
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

        {/* Bottom bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500"
          >
            {copyright}
          </motion.p>
          
          <ul className="flex flex-wrap justify-center gap-8">
            {legalLinks.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href} className="text-slate-500 hover:text-white transition-colors">
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