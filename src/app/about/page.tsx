
"use client"

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Stethoscope, GraduationCap, Phone, User, ArrowRight, CheckCircle2, HeartPulse, Code2 } from "lucide-react";
import Link from "next/link";

interface CoreValueCard {
  image: string;
  category: string;
  title: string;
}

const pillars: CoreValueCard[] = [
  {
    image: "https://picsum.photos/seed/about1/600/800",
    category: "Precision",
    title: "100% NCERT Mapping for Biology"
  },
  {
    image: "https://picsum.photos/seed/about2/600/800",
    category: "Technology",
    title: "AI-Powered Doubt Solving 24/7"
  },
  {
    image: "https://picsum.photos/seed/about3/600/800",
    category: "Analytics",
    title: "Data-Driven Performance Dashboards"
  },
  {
    image: "https://picsum.photos/seed/about4/600/800",
    category: "Community",
    title: "Peer-to-Peer Collaborative Groups"
  },
  {
    image: "https://picsum.photos/seed/about5/600/800",
    category: "Mentorship",
    title: "Expert Guidance from Top Doctors"
  }
];

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #E8F0FF 0%, #F5F9FF 50%, #FFFFFF 100%)",
        }}
      />

      {/* Hero Section - Reduced padding */}
      <section className="relative z-10 pt-12 pb-12 px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center max-w-4xl space-y-6"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm"
          >
            <HeartPulse className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Empowering Future Doctors</span>
          </motion.div>

          {/* Title */}
          <h1 className="font-headline font-bold text-slate-900 leading-[1.1] tracking-tight text-4xl md:text-6xl lg:text-7xl">
            We are revolutionizing <br className="hidden md:block" />
            <span className="text-primary">NEET Preparation</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed">
            Vidhyaly is more than a platform; it's a dedicated mentor system designed by experts who understand exactly what it takes to succeed.
          </p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <Button size="lg" className="rounded-full px-8 bg-slate-900 hover:bg-slate-800 text-white shadow-xl h-14 text-lg font-bold" asChild>
              <Link href="/auth">
                Join 2027 Batch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-bold border-slate-200" asChild>
              <Link href="#founder">Our Story</Link>
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-row items-center gap-4 pt-4"
          >
            <div className="flex flex-row -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/student${i}/100/100`}
                  alt="Aspirant"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-500">
              Trusted by 10,000+ medical aspirants
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Pillars Carousel */}
      <section className="relative z-10 w-full py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-headline font-bold text-slate-800">The Vidhyaly Advantage</h2>
        </div>
        
        <div className="relative overflow-hidden group">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          {/* Scrolling Container */}
          <motion.div
            className="flex gap-6 px-6"
            animate={{
              x: [0, -1900],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...pillars, ...pillars].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex-shrink-0 relative w-[350px] h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-slate-100"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-2">
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{item.category}</span>
                  <h3 className="text-white text-2xl font-bold leading-tight">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="relative z-10 py-16 px-4 bg-white/50 backdrop-blur-sm border-y">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative bg-slate-200 aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://yasodha.in/assets/venkatesh-profile.png" 
                alt="Venkatesh Choppa" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border max-w-xs">
              <p className="text-slate-500 italic text-sm">
                "My mission is to ensure no student ever fails the medical entrance due to a lack of precise guidance."
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
            <div className="space-y-4">
              <span className="text-primary font-bold text-[10px] tracking-widest uppercase">Founder & Visionary</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-slate-900">Venkatesh Choppa</h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  Venkatesh Choppa is a seasoned technologist who spent two years as a Software Engineer, honing his skills in building complex systems.
                </p>
                <p>
                  Having faced the deep emotional toll of missing a NEET seat three times, Venkatesh realized that many hardworking aspirants fail not because of effort, but because of a lack of precision in their preparation.
                </p>
                <p className="font-bold text-slate-900">
                  He built Vidhyaly with one singular vision: "No more failures due to the gap between NCERT and execution."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-slate-800">Software Expert</h4>
                <p className="text-xs text-slate-500">2 Years Experience in Tech</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-slate-800">+91 8466006486</h4>
                <p className="text-xs text-slate-500">24/7 Counselor Support</p>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild className="rounded-full px-8 h-14 bg-primary hover:bg-primary/90">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t text-center">
        <p className="text-sm text-slate-400 font-medium">© 2027 Vidhyaly Education. Dedicated to your medical dream.</p>
      </footer>
    </div>
  );
}
