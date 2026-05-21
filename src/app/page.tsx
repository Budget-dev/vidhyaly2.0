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
  const imgData = PlaceHolderImages.find(p => p.id === "ai-tutor-visual");
  
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
          <div className="relative bg-white rounded-3xl border shadow-xl overflow-hidden h-full flex items-center justify-center p-8">
            <Image
              src={imgData?.imageUrl || "https://picsum.photos/seed/aitutor/800/600"}
              alt="AI Mentor Visualization"
              fill
              className="object-cover"
              data-ai-hint={imgData?.imageHint || "robot teacher"}
            />
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