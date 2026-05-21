import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PhoneCallIcon, GraduationCapIcon } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
	return (
		<section className="mx-auto w-full max-w-5xl overflow-hidden pt-16 pb-20">
			<div className="relative z-10 flex max-w-2xl flex-col gap-5 px-4">
				<a
					className={cn(
						"group flex w-fit items-center gap-3 rounded-sm border bg-card p-1 shadow-sm",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
					)}
					href="/tests"
				>
					<div className="rounded border bg-card px-1.5 py-0.5 shadow-sm">
						<p className="font-mono text-[10px] font-bold">2025</p>
					</div>

					<span className="text-xs">now enrolling for NEET 2025 batches</span>
					<span className="block h-5 border-l" />

					<div className="pr-1">
						<ArrowRightIcon className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5" />
					</div>
				</a>

				<h1
					className={cn(
						"text-balance font-headline font-bold text-4xl text-foreground leading-tight md:text-5xl lg:text-6xl",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out"
					)}
				>
					Master NEET with India's Smartest Prep Platform
				</h1>

				<p
					className={cn(
						"text-muted-foreground text-sm tracking-wider sm:text-lg md:text-xl",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out"
					)}
				>
					Personalized study paths, NCERT-based notes, and AI-driven mock tests <br className="hidden md:block" />
          to help you secure your dream medical seat.
				</p>

				<div className="fade-in slide-in-from-bottom-10 flex w-fit animate-in items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
					<Button variant="outline" className="rounded-full">
						<PhoneCallIcon className="size-4 mr-2" />{" "}
						Free Counseling
					</Button>
					<Button className="rounded-full">
						Explore Tests{" "}
						<ArrowRightIcon className="size-4 ml-2" />
					</Button>
				</div>
			</div>
			<div className="relative mt-8 sm:mt-12 md:mt-20 px-2">
				<div
					className={cn(
						"relative overflow-hidden",
						"fade-in slide-in-from-bottom-5 animate-in fill-mode-backwards delay-100 duration-1000 ease-out"
					)}
				>
					<div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border bg-background p-2 shadow-2xl ring-1 ring-border">
						<Image
							alt="Vidhyaly Platform Preview"
							className="z-2 aspect-video rounded-lg border"
							height={1080}
							src="https://1234567890.sirv.com/ChatGPT%20Image%20May%2021%2C%202026%2C%2012_31_25%20PM.png"
							width={1920}
              priority
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
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <GraduationCapIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary">Vidhyaly</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="/tests" className="text-sm font-medium hover:text-primary transition-colors">Mock Tests</a>
            <a href="/resources" className="text-sm font-medium hover:text-primary transition-colors">Resources</a>
            <Button size="sm" className="rounded-full">Get Started</Button>
          </div>
        </div>
      </nav>

      <HeroSection />

      <footer className="border-t py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">© 2025 Vidhyaly Education. Dedicated to your medical dream.</p>
        </div>
      </footer>
    </main>
  );
}
