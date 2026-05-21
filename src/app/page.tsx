
"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PhoneCallIcon } from "lucide-react";
import { DropdownNavigation } from "@/components/layout/Navbar";
import { Testimonials } from "@/components/landing/Testimonials";

const navItems = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Study tools",
    subMenus: [
      {
        title: "Students",
        items: [
          { label: "Flashcards", description: "Master concepts with active recall", icon: "Layers", href: "/study-tools/flashcards" },
          { label: "Learn", description: "Structured video lectures and content", icon: "BookOpen", href: "/study-tools/learn" },
          { label: "Study Guides", description: "Comprehensive notes for all chapters", icon: "FileText", href: "/study-tools/guides" },
          { label: "Practice MCQs", description: "Chapter-wise multiple choice questions", icon: "CheckSquare", href: "/study-tools/mcqs" },
          { label: "AI Tutor", description: "24/7 personalized learning assistance", icon: "Bot", href: "/study-tools/ai-tutor" },
          { label: "Expert solutions", description: "Detailed answers by subject experts", icon: "MessageCircle", href: "/study-tools/solutions" },
          { label: "Study groups", description: "Collaborate with fellow aspirants", icon: "Users", href: "/study-tools/groups" },
        ],
      },
      {
        title: "Teachers",
        items: [
          { label: "Live Teacher", description: "Connect with educators in real-time", icon: "Presentation", href: "/study-tools/live-teacher" },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Subjects",
    subMenus: [
      {
        title: "NEET Preparation",
        items: [
          { label: "Biology", description: "Deep dive into Botany and Zoology", icon: "Leaf", href: "/subjects/biology" },
          { label: "Chemistry", description: "Organic, Inorganic & Physical", icon: "FlaskConical", href: "/subjects/chemistry" },
          { label: "Physics", description: "Mechanics to Modern Physics", icon: "Zap", href: "/subjects/physics" },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "About Us",
    href: "/about",
  },
  {
    id: 5,
    label: "Contact Us",
    href: "/contact",
  },
];

export function HeroSection() {
	return (
		<section className="mx-auto w-full max-w-7xl overflow-hidden pt-32 px-4 flex flex-col items-center">
			<div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl">
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
			
      <div className="relative mt-12 sm:mt-16 md:mt-24 w-full max-w-6xl">
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

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden pt-16">
      <DropdownNavigation navItems={navItems} />

      <HeroSection />
      
      <div className="py-20">
        <Testimonials />
      </div>

      <footer className="border-t py-12 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-medium">© 2026 Vidhyaly Education. Dedicated to your medical dream.</p>
        </div>
      </footer>
    </main>
  );
}
