
"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  ArrowRightIcon, 
  PhoneCallIcon, 
  CheckCircle2, 
  FileText, 
  Brain, 
  CheckSquare, 
  BookOpen, 
  Sparkles, 
  Users,
  ArrowRight,
  Target,
  Trophy,
  Zap,
  Microscope
} from "lucide-react";
import { Testimonials } from "@/components/landing/Testimonials";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
	return (
		<section className="mx-auto w-full max-w-7xl overflow-hidden pt-16 flex flex-col items-center">
			<motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl px-4"
      >
				<a
					className={cn(
						"group flex w-fit items-center gap-3 rounded-full border bg-card p-1 pr-3 shadow-sm transition-all hover:bg-slate-50"
					)}
					href="#link"
				>
					<div className="rounded-full border bg-primary/10 text-primary px-2.5 py-0.5 shadow-sm">
						<p className="font-mono text-[10px] font-bold">2026</p>
					</div>
					<span className="text-xs font-medium">now enrolling for NEET 2026 batches</span>
					<div className="pl-1">
						<ArrowRightIcon className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5" />
					</div>
				</a>

				<h1 className="text-balance font-headline font-bold text-4xl text-foreground leading-tight md:text-5xl lg:text-7xl">
					Master NEET with India&apos;s Smartest Prep Platform
				</h1>

				<p className="text-muted-foreground text-sm tracking-wider sm:text-lg md:text-xl max-w-2xl">
					Personalized study paths, NCERT-based notes, and AI-driven mock tests <br className="hidden md:block" />
          to help you secure your dream medical seat.
				</p>

				<div className="flex w-fit items-center justify-center gap-4 pt-4">
					<Button variant="outline" size="lg" className="rounded-full px-8" asChild>
            <Link href="/contact">
              <PhoneCallIcon className="size-4 mr-2" />
              Free Counseling
            </Link>
					</Button>
					<Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90" asChild>
						<Link href="/tests">
              Explore Tests{" "}
              <ArrowRightIcon className="size-4 ml-2" />
            </Link>
					</Button>
				</div>
			</motion.div>
			
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mt-12 sm:mt-16 md:mt-24 w-full max-w-6xl px-4"
      >
				<div className="relative mx-auto overflow-hidden rounded-2xl border bg-background p-2 shadow-2xl ring-1 ring-border">
					<img
						alt="Vidhyaly Platform Preview"
						className="z-2 aspect-video rounded-xl w-full object-cover"
						src="https://1234567890.sirv.com/ChatGPT%20Image%20May%2021%2C%202026%2C%2012_31_25%20PM.png"
					/>
				</div>
			</motion.div>
		</section>
	);
}

export function AITutorSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <div>
            <span className="text-primary font-bold text-[10px] tracking-widest uppercase mb-2 block">AI TUTOR</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold leading-tight">
              Your Personal AI <br />
              <motion.span 
                animate={{ color: ["#3b82f6", "#1d4ed8", "#3b82f6"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-primary"
              >
                NEET Mentor
              </motion.span>
            </h2>
          </div>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
            Get instant, accurate, and easy-to-understand answers to any doubt. Our AI Tutor explains concepts, solves questions, and guides you like a top mentor would.
          </p>
          
          <div className="space-y-3">
            {[
              "Step-by-step explanations",
              "Concept breakdowns",
              "Diagrams & formula support",
              "24/7 doubt solving"
            ].map((feature, idx) => (
              <motion.div 
                key={feature} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="bg-primary/10 p-1 rounded-full shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-base font-medium text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-[1.2] relative w-full aspect-video max-w-2xl"
        >
          <motion.div 
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-1 scale-[1.02]" 
          />
          <div className="relative bg-white rounded-3xl border shadow-xl overflow-hidden h-full">
            <video
              src="https://1234567890.sirv.com/Firefly%20Create%20an%20ultra-premium%20cinematic%208-second%20AI%20tutoring%20interface%20animation%20based%20EXACTLY%20on%20.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function StudyToolsGrid() {
  const tools = [
    {
      title: "Flashcards",
      description: "Create and master your subjects with smart flashcards.",
      icon: FileText,
      bgColor: "bg-[#F5E6F7]",
      iconBg: "bg-[#7A6A7D]",
      href: "/study-tools/flashcards"
    },
    {
      title: "Smart Learn",
      description: "Adaptive learning system tailored to your proficiency.",
      icon: Brain,
      bgColor: "bg-[#E3F2FD]",
      iconBg: "bg-[#6B7A8A]",
      href: "/study-tools/learn"
    },
    {
      title: "Practice MCQs",
      description: "Generate practice tests from your study materials.",
      icon: CheckSquare,
      bgColor: "bg-[#FFF0E6]",
      iconBg: "bg-[#8A7B70]",
      href: "/study-tools/mcqs"
    },
    {
      title: "Study Guides",
      description: "Create and share comprehensive study guides.",
      icon: BookOpen,
      bgColor: "bg-[#E1F7E9]",
      iconBg: "bg-[#6A7D71]",
      href: "/study-tools/guides"
    },
    {
      title: "AI Tutor",
      description: "Your personal AI tutor, available 24/7.",
      icon: Sparkles,
      bgColor: "bg-[#FFF9E1]",
      iconBg: "bg-[#7D7A6A]",
      href: "/study-tools/ai-tutor",
      isNew: true
    },
    {
      title: "Group Study",
      description: "Collaborate with peers in real-time study sessions.",
      icon: Users,
      bgColor: "bg-[#F3E8FF]",
      iconBg: "bg-[#766A7D]",
      href: "/study-tools/groups"
    }
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link 
              href={tool.href}
              className={cn(
                "group relative p-8 rounded-3xl transition-all hover:scale-[1.02] duration-300 block shadow-sm hover:shadow-md h-full",
                tool.bgColor
              )}
            >
              {tool.isNew && (
                <div className="absolute top-4 right-4 bg-[#FF6B9C] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  NEW <Sparkles className="w-2.5 h-2.5" />
                </div>
              )}
              
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", tool.iconBg)}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-slate-900">{tool.title}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {tool.description}
              </p>
              
              <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 group-hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function FeaturesSection() {
    return (
        <section className="py-24 max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex-1"
                >
                    <img 
                        className="max-w-2xl w-full rounded-3xl shadow-2xl" 
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" 
                        alt="Vidhyaly Features" 
                    />
                </motion.div>
                <div className="flex-1 space-y-12 px-4 md:px-0">
                    {/* Performance Tracking */}
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-6 max-w-md"
                    >
                        <div className="p-6 aspect-square bg-violet-100 rounded-full shrink-0">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 18.667V24.5m4.668-8.167V24.5m4.664-12.833V24.5m2.333-21L15.578 13.587a.584.584 0 0 1-.826 0l-3.84-3.84a.583.583 0 0 0-.825 0L2.332 17.5M4.668 21v3.5m4.664-12.833V24.5" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-foreground font-headline">Precision Analytics</h3>
                            <p className="text-muted-foreground leading-relaxed">Track your accuracy across chapters with live AI-driven dashboards and performance insights.</p>
                        </div>
                    </motion.div>

                    {/* NCERT Focus */}
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex items-center gap-6 max-w-md"
                    >
                        <div className="p-6 aspect-square bg-emerald-100 rounded-full shrink-0">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 11.667A2.333 2.333 0 0 0 11.667 14c0 1.19-.117 2.929-.304 4.667m4.972-3.36c0 2.776 0 7.443-1.167 10.36m5.004-1.144c.14-.7.502-2.683.583-3.523M2.332 14a11.667 11.667 0 0 1 21-7m-21 11.667h.01m23.092 0c.233-2.333.152-6.246 0-7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5.832 22.75C6.415 21 6.999 17.5 6.999 14a7 7 0 0 1 .396-2.333m2.695 13.999c.245-.77.525-1.54.665-2.333m-.255-15.4A7 7 0 0 1 21 14v2.333" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-foreground font-headline">NCERT-Based Precision</h3>
                            <p className="text-muted-foreground leading-relaxed">Every note, MCQ, and lecture is strictly mapped to the latest NCERT syllabus for 100% relevance.</p>
                        </div>
                    </motion.div>

                    {/* Smart Reports */}
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex items-center gap-6 max-w-md"
                    >
                        <div className="p-6 aspect-square bg-orange-100 rounded-full shrink-0">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.668 25.666h16.333a2.333 2.333 0 0 0 2.334-2.333V8.166L17.5 2.333H7a2.333 2.333 0 0 0-2.333 2.333v4.667" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.332 2.333V7a2.334 2.334 0 0 0 2.333 2.333h4.667m-21 8.167h11.667M10.5 21l3.5-3.5-3.5-3.5" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-foreground font-headline">Smart Study Reports</h3>
                            <p className="text-muted-foreground leading-relaxed">Export personalized reports that highlight your weak areas and suggest targeted improvement paths.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export function ExamsSection() {
  const achievements = [
    { label: "NEET Aspirants", value: "10,000+" },
    { label: "Mock Tests Taken", value: "50,000+" },
    { label: "Questions Practiced", value: "1M+" },
    { label: "Success Rate", value: "85%" },
  ];

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-14 grid gap-8 text-center md:grid-cols-2 md:text-left items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-headline font-bold"
          >
            Explore Our Exams
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Specialized study paths for India&apos;s toughest competitive exams. Our platform is engineered to handle the rigorous demands of medical entrance preparation.
          </motion.p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl group"
          >
            <img
              src="https://picsum.photos/seed/exam1/1200/800"
              alt="Medical Exam Study"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">NEET UG 2026 Batch</h3>
              <p className="text-white/80 max-w-md">Comprehensive NCERT-aligned modules for Physics, Chemistry, and Biology.</p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between gap-6 rounded-3xl bg-primary p-8 text-white shadow-xl"
            >
              <div className="bg-white/20 p-3 rounded-2xl w-fit">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <p className="mb-2 text-xl font-bold">Precision Mapping</p>
                <p className="text-primary-foreground/80 text-sm">Every single question is tagged with the exact NCERT page number and difficulty level.</p>
              </div>
              <Button variant="secondary" className="w-fit rounded-full font-bold" asChild>
                <Link href="/study-tools/mcqs">Discover More</Link>
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grow rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src="https://picsum.photos/seed/exam2/600/600"
                alt="NCERT Review"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative overflow-hidden rounded-3xl bg-slate-900 text-white p-10 md:p-16 border border-white/10"
        >
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Achievements in Numbers</h2>
              <p className="text-slate-400 max-w-md">
                We measure our success through the performance of our students. Thousands of aspirants trust Vidhyaly for their NEET journey.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {achievements.map((item, idx) => (
                <div className="space-y-2 text-center" key={item.label}>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{item.label}</p>
                  <span className="text-3xl md:text-4xl font-bold text-primary block">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="pointer-events-none absolute -top-1 right-1 z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] md:block"></div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative bg-background overflow-x-hidden">
      <HeroSection />
      
      <AITutorSection />

      <StudyToolsGrid />

      <FeaturesSection />

      <ExamsSection />
      
      <div className="py-20">
        <Testimonials />
      </div>

      <footer className="border-t py-12 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-medium">© 2026 Vidhyaly Education. Dedicated to your medical dream.</p>
        </div>
      </footer>
    </div>
  );
}
