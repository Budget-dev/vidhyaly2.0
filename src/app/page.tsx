
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PhoneCallIcon, BookOpen, Beaker, Leaf, PenTool, BarChart3, Clock, Trophy } from "lucide-react";
import { DropdownNavigation } from "@/components/layout/Navbar";

const navItems = [
  {
    id: 1,
    label: "Courses",
    subMenus: [
      {
        title: "Subject Mastery",
        items: [
          { label: "Physics", description: "Master Mechanics to Modern Physics", icon: Beaker },
          { label: "Chemistry", description: "Inorganic, Organic & Physical Chemistry", icon: BookOpen },
          { label: "Biology", description: "Complete NCERT Zoology & Botany", icon: Leaf },
        ],
      },
      {
        title: "Test Series",
        items: [
          { label: "Full Mock Tests", description: "NEET Exam Pattern Simulation", icon: PenTool },
          { label: "Sectional Drills", description: "Topic-wise accuracy boosters", icon: Clock },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Resources",
    subMenus: [
      {
        title: "Study Material",
        items: [
          { label: "NCERT Notes", description: "Hand-crafted NCERT summaries", icon: BookOpen },
          { label: "Formula Sheets", description: "Quick revision cheatsheets", icon: PenTool },
        ],
      },
      {
        title: "Analytics",
        items: [
          { label: "Rank Predictor", description: "Predict AIR based on mocks", icon: Trophy },
          { label: "Performance Tracker", description: "Identify your weak topics", icon: BarChart3 },
        ],
      },
    ],
  },
  { id: 3, label: "Counseling", link: "#" },
  { id: 4, label: "About Us", link: "#" },
];

export function HeroSection() {
	return (
		<section className="mx-auto w-full max-w-7xl overflow-hidden pt-32 pb-20">
			<div className="relative z-10 flex flex-col items-center text-center gap-6 px-4">
				<a
					className={cn(
						"group flex w-fit items-center gap-3 rounded-full border bg-card p-1 pr-3 shadow-sm",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
					)}
					href="#link"
				>
					<div className="rounded-full border bg-primary/10 text-primary px-2.5 py-0.5 shadow-sm">
						<p className="font-mono text-[10px] font-bold">2025</p>
					</div>

					<span className="text-xs font-medium">now enrolling for NEET 2025 batches</span>

					<div className="pl-1">
						<ArrowRightIcon className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5" />
					</div>
				</a>

				<h1
					className={cn(
						"text-balance font-headline font-bold text-4xl text-foreground leading-tight md:text-5xl lg:text-7xl max-w-4xl",
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
					<Button variant="outline" size="lg" className="rounded-full px-8">
						<PhoneCallIcon className="size-4 mr-2" />{" "}
						Free Counseling
					</Button>
					<Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
						Explore Tests{" "}
						<ArrowRightIcon className="size-4 ml-2" />
					</Button>
				</div>
			</div>
			
      <div className="relative mt-12 sm:mt-16 md:mt-24 px-4 max-w-6xl mx-auto">
				<div
					className={cn(
						"relative",
						"fade-in slide-in-from-bottom-5 animate-in fill-mode-backwards delay-100 duration-1000 ease-out"
					)}
				>
					<div className="relative mx-auto overflow-hidden rounded-2xl border bg-background p-2 shadow-2xl ring-1 ring-border">
						<img
							alt="Vidhyaly Platform Preview"
							className="z-2 aspect-video rounded-xl"
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
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <DropdownNavigation navItems={navItems} />

      <HeroSection />

      <footer className="border-t py-12 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-medium">© 2025 Vidhyaly Education. Dedicated to your medical dream.</p>
        </div>
      </footer>
    </main>
  );
}
