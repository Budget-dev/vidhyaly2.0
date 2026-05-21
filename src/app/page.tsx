
"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PhoneCallIcon, CheckCircle2 } from "lucide-react";
import { Testimonials } from "@/components/landing/Testimonials";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function HeroSection() {
	return (
		<section className="mx-auto w-full max-w-7xl overflow-hidden pt-16 flex flex-col items-center">
			<div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl px-4">
				<a
					className={cn(
						"group flex w-fit items-center gap-3 rounded-full border bg-card p-1 pr-3 shadow-sm",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
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

				<h1
					className={cn(
						"text-balance font-headline font-bold text-4xl text-foreground leading-tight md:text-5xl lg:text-7xl",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out"
					)}
				>
					Master NEET with India&apos;s Smartest Prep Platform
				</h1>

				<p
					className={cn(
						"text-muted-foreground text-sm tracking-wider sm:text-lg md:text-xl max-w-2xl",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out"
					)}
				>
					Personalized study paths, NCERT-based notes, and AI-driven mock tests <br className="hidden md:block" />
          to help you secure your dream medical seat.
				</p>

				<div className="fade-in slide-in-from-bottom-10 flex w-fit animate-in items-center justify-center gap-4 fill-mode-backwards pt-4 delay-300 duration-500 ease-out">
					<Button variant="outline" size="lg" className="rounded-full px-8" asChild>
            <a href="/contact">
              <PhoneCallIcon className="size-4 mr-2" />
              Free Counseling
            </a>
					</Button>
					<Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
						Explore Tests{" "}
						<ArrowRightIcon className="size-4 ml-2" />
					</Button>
				</div>
			</div>
			
      <div className="relative mt-12 sm:mt-16 md:mt-24 w-full max-w-6xl px-4">
				<div
					className={cn(
						"relative",
						"fade-in slide-in-from-bottom-5 animate-in fill-mode-backwards delay-100 duration-1000 ease-out"
					)}
				>
					<div className="relative mx-auto overflow-hidden rounded-2xl border bg-background p-2 shadow-2xl ring-1 ring-border">
						<img
							alt="Vidhyaly Platform Preview"
							className="z-2 aspect-video rounded-xl w-full"
							src="https://1234567890.sirv.com/ChatGPT%20Image%20May%2021%2C%202026%2C%2012_31_25%20PM.png"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export function AITutorSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="flex-1 space-y-8">
          <div>
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">AI TUTOR</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight">
              Your Personal AI <br />
              <span className="text-primary">NEET Mentor</span>
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            Get instant, accurate, and easy-to-understand answers to any doubt. Our AI Tutor explains concepts, solves questions, and guides you like a top mentor would.
          </p>
          
          <div className="space-y-4">
            {[
              "Step-by-step explanations",
              "Concept breakdowns",
              "Diagrams & formula support",
              "24/7 doubt solving"
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="bg-primary/10 p-1 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-lg font-medium text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 relative w-full aspect-[4/3] max-w-xl">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-2 scale-105" />
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
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
    return (
        <section className="py-24 max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1">
                    <img 
                        className="max-w-2xl w-full rounded-3xl shadow-2xl" 
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" 
                        alt="Vidhyaly Features" 
                    />
                </div>
                <div className="flex-1 space-y-12 px-4 md:px-0">
                    {/* Performance Tracking */}
                    <div className="flex items-center gap-6 max-w-md">
                        <div className="p-6 aspect-square bg-violet-100 rounded-full shrink-0">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 18.667V24.5m4.668-8.167V24.5m4.664-12.833V24.5m2.333-21L15.578 13.587a.584.584 0 0 1-.826 0l-3.84-3.84a.583.583 0 0 0-.825 0L2.332 17.5M4.668 21v3.5m4.664-12.833V24.5" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-foreground font-headline">Precision Analytics</h3>
                            <p className="text-muted-foreground leading-relaxed">Track your accuracy across chapters with live AI-driven dashboards and performance insights.</p>
                        </div>
                    </div>

                    {/* NCERT Focus */}
                    <div className="flex items-center gap-6 max-w-md">
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
                    </div>

                    {/* Smart Reports */}
                    <div className="flex items-center gap-6 max-w-md">
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
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Home() {
  return (
    <div className="relative bg-background overflow-x-hidden">
      <HeroSection />
      
      <AITutorSection />

      <FeaturesSection />
      
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
