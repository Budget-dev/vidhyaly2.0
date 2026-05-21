"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall } from "lucide-react";
import Image from "next/image";

export default function Home() {
	return (
		<main className="relative min-h-screen bg-background overflow-hidden">
			{/* Shades */}
			<div
				aria-hidden="true"
				className="absolute inset-0 size-full overflow-hidden pointer-events-none"
			>
				<div
					className={cn(
						"absolute inset-0 isolate -z-10",
						"bg-[radial-gradient(20%_80%_at_20%_0%,hsla(var(--foreground),0.05),transparent)]"
					)}
				/>
			</div>

			<section className="mx-auto w-full max-w-5xl overflow-hidden pt-16 px-4">
				<div className="relative z-10 flex max-w-2xl flex-col gap-5">
					<a
						className={cn(
							"group flex w-fit items-center gap-3 rounded-sm border bg-card p-1 shadow-sm",
							"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
						)}
						href="#link"
					>
						<div className="rounded border bg-card px-1.5 py-0.5 shadow-sm">
							<p className="font-mono text-[10px] font-bold">NOW</p>
						</div>

						<span className="text-xs">accepting new client projects</span>
						<span className="block h-5 border-l" />

						<div className="pr-1">
							<ArrowRight className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5" />
						</div>
					</a>

					<h1
						className={cn(
							"text-balance font-headline font-bold text-4xl text-foreground leading-tight md:text-5xl lg:text-6xl",
							"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out"
						)}
					>
						Building Digital Experiences That Drive Growth
					</h1>

					<p
						className={cn(
							"text-muted-foreground text-sm tracking-wider sm:text-lg md:text-xl",
							"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out"
						)}
					>
						We help brands scale faster through design, development <br className="hidden md:block" /> and
						strategic execution.
					</p>

					<div className="fade-in slide-in-from-bottom-10 flex w-fit animate-in items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
						<Button variant="outline" className="rounded-full">
							<PhoneCall className="size-4 mr-2" />{" "}
							Book a Call
						</Button>
						<Button className="rounded-full">
							Get started{" "}
							<ArrowRight className="size-4 ml-2" />
						</Button>
					</div>
				</div>

				<div className="relative mt-8 md:mt-20">
					<div
						className={cn(
							"absolute -inset-x-20 inset-y-0 -translate-y-1/3 scale-125 rounded-full",
							"bg-[radial-gradient(ellipse_at_center,hsla(var(--foreground),0.03),transparent,transparent)]",
							"blur-[50px] pointer-events-none"
						)}
					/>
					<div
						className={cn(
							"relative mt-8 overflow-hidden px-2 pb-20",
							"fade-in slide-in-from-bottom-5 animate-in fill-mode-backwards delay-100 duration-1000 ease-out"
						)}
					>
						<div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border bg-background p-2 shadow-2xl ring-1 ring-border">
							<Image
								alt="app screen light"
								className="z-2 aspect-video rounded-lg border dark:hidden"
								height={1080}
								src="https://storage.efferd.com/screen/dashboard-light.webp"
								width={1920}
								priority
							/>
							<Image
								alt="app screen dark"
								className="hidden aspect-video rounded-lg bg-background dark:block border"
								height={1080}
								src="https://storage.efferd.com/screen/dashboard-dark.webp"
								width={1920}
								priority
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
