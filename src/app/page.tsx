
"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  ArrowRightIcon, 
  Sparkles, 
  ArrowRight,
  Target,
  Zap,
  ArrowUp,
  Plus,
  BrainCircuit,
  FlaskConical,
  Leaf,
  Search,
  Users,
  Play,
  Info,
  Layers,
  Bot,
  FileText,
  Mic,
  CheckSquare,
  Rocket
} from "lucide-react";
import { Testimonials } from "@/components/landing/Testimonials";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/firebase";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className={cn(
        "relative flex min-h-[700px] md:min-h-[800px] flex-col items-center justify-center overflow-hidden bg-slate-50 w-full z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: isMobile ? "8rem" : "12rem" }}
          whileInView={{ opacity: 1, width: isMobile ? "12rem" : "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-primary/30 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-slate-50 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-slate-50  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: isMobile ? "8rem" : "12rem" }}
          whileInView={{ opacity: 1, width: isMobile ? "12rem" : "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-primary/30 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-slate-50  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-slate-50 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-50 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-primary opacity-10 blur-3xl"></div>
        <motion.div
          initial={{ width: isMobile ? "4rem" : "8rem" }}
          whileInView={{ width: isMobile ? "8rem" : "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-blue-100 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: isMobile ? "6rem" : "15rem" }}
          whileInView={{ width: isMobile ? "12rem" : "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-blue-200 "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-50 "></div>
      </div>

      <div className="relative z-50 flex -translate-y-64 md:translate-y-[-20rem] flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

export function DemoWalkaround() {
  const { user } = useUser();
  const features = [
    {
      title: "Vidhyamithra AI",
      description: "Talk to your AI mentor anytime. It helps with doubts, motivation, and study strategy.",
      icon: Bot,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Active Flashcards",
      description: "Master Biology and Chemistry with spaced-repetition cards mapped to NCERT.",
      icon: Layers,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      title: "Mock Test Simulation",
      description: "Real NEET-pattern tests with AI scaling difficulty to match your level.",
      icon: Target,
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
    {
      title: "Mastery Analytics",
      description: "Topic-wise accuracy tracking to help you identify and kill your weaknesses.",
      icon: BrainCircuit,
      color: "text-amber-500",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="space-y-6 py-4">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-2xl border-4 border-white">
        <video 
          src="https://1234567890.sirv.com/Firefly%20Create%20an%20ultra-premium%20cinematic%208-second%20AI%20tutoring%20interface%20animation%20based%20EXACTLY%20on%20.mp4"
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
          <Badge className="w-fit mb-2 bg-primary text-white font-bold">LIVE PLATFORM TOUR</Badge>
          <h3 className="text-white font-headline font-bold text-xl">The Future of NEET Prep is Here</h3>
        </div>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Info className="w-4 h-4" /> Platform Walkthrough
            </h4>
            <p className="text-slate-600 leading-relaxed font-medium">
              Vidhyaly is engineered specifically for India's toughest medical entrance. Every feature is designed to bridge the gap between hard work and a top rank.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {features.map((f, i) => (
              <motion.div 
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-shadow"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", f.bg)}>
                  <f.icon className={cn("w-6 h-6", f.color)} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">{f.title}</h5>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
            <h4 className="font-bold text-lg">{user ? "Continue your preparation" : "Ready to start your journey?"}</h4>
            <p className="text-slate-400 text-sm">
              {user ? "Your personalized dashboard is waiting with updated NCERT modules." : "Join the 2027 Batch today and get access to all features immediately."}
            </p>
            <Button className="w-full rounded-xl py-6 font-bold bg-primary hover:bg-primary/90" asChild>
              <Link href={user ? "/dashboard" : "/auth"}>
                {user ? "Go to Dashboard" : "Create Free Account"} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export function HeroSection() {
  const { user } = useUser();
	return (
		<section className="mx-auto w-full overflow-hidden flex flex-col items-center">
      <LampContainer>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl px-4"
        >
          <Link
            className={cn(
              "group flex w-fit items-center gap-3 rounded-full border border-white/80 bg-white/40 backdrop-blur-2xl p-1.5 pr-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-all hover:bg-white/60 hover:border-white border-white/20"
            )}
            href={user ? "/dashboard" : "/auth"}
          >
            <div className="rounded-full border border-primary/20 bg-primary/20 text-primary px-3 py-1 shadow-sm">
              <p className="font-mono text-[10px] font-black">2027</p>
            </div>
            <span className="text-[11px] font-bold text-slate-900 tracking-tight">now enrolling for NEET 2027 batches</span>
            <div className="pl-1">
              <ArrowRightIcon className="size-3.5 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5 text-primary" />
            </div>
          </Link>

          <h1 className="text-balance font-headline font-bold text-4xl text-slate-900 leading-tight md:text-5xl lg:text-7xl">
            Master NEET with India&apos;s Smartest Prep Platform
          </h1>

          <p className="text-slate-500 text-sm tracking-wider sm:text-lg md:text-xl max-w-2xl">
            Personalized study paths, NCERT-based notes, and AI-driven mock tests <br className="hidden md:block" />
            to help you secure your dream medical seat.
          </p>

          <div className="flex w-fit items-center justify-center gap-4 pt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="rounded-full px-8 bg-white text-slate-900 border-slate-200 hover:bg-slate-50">
                  <Play className="size-4 mr-2 text-primary fill-primary/10" />
                  See Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-slate-50 rounded-[2.5rem]">
                <div className="p-8">
                  <DialogHeader className="mb-4">
                    <DialogTitle className="text-3xl font-headline font-bold text-slate-900">Platform Experience</DialogTitle>
                  </DialogHeader>
                  <DemoWalkaround />
                </div>
              </DialogContent>
            </Dialog>
            <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white" asChild>
              <Link href={user ? "/dashboard" : "/auth"}>
                {user ? "Go to Dashboard" : "Get Started"}{" "}
                <ArrowRightIcon className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </LampContainer>
			
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative -mt-48 md:-mt-64 z-20 w-full max-w-6xl px-4 pb-20"
      >
				<div className="relative mx-auto overflow-hidden rounded-2xl border bg-background p-2 shadow-2xl ring-1 ring-border">
					<img
						alt="Vidhyaly Platform Preview - NEET Dashboard"
						className="z-2 aspect-video rounded-xl w-full object-cover"
						src="https://vennky.sirv.com/ChatGPT%20Image%20May%2021%2C%202026%2C%2012_31_25%20PM.png"
            data-ai-hint="neet platform"
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
          className="flex-[1.4] relative w-full aspect-video max-w-4xl"
        >
          <motion.div 
            animate={{ rotate: [-1, 1, -1], scale: [1, 1.02, 1] }}
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

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CommandButton({ icon, label, isActive, onClick }: { icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
        isActive
          ? "bg-primary/5 border-primary/20 shadow-sm"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className={`${isActive ? "text-primary" : "text-gray-500"}`}>
        {icon}
      </div>
      <span
        className={`text-sm font-bold ${
          isActive ? "text-primary" : "text-gray-700"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}

export function AITutorDemo() {
  const [inputValue, setInputValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false);
  const [reasonEnabled, setReasonEnabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);
  const [activeCommandCategory, setActiveCommandCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandSuggestions = {
    biology: [
      "Explain the structure of Mitochondria in detail",
      "What are the main stages of Meiosis?",
      "Describe the process of Double Fertilization",
      "How does the human heart function?",
      "Explain the Central Dogma of Molecular Biology",
    ],
    chemistry: [
      "Explain Hybridization in Carbon compounds",
      "Difference between SN1 and SN2 reactions",
      "What are Periodic trends in Atomic Radius?",
      "Explain the Haber Process mechanism",
      "Solve: Calculate the molality of 10% w/w NaOH",
    ],
    physics: [
      "Explain the Work-Energy Theorem",
      "Derive the equations of motion for uniform acceleration",
      "How does a p-n junction diode work?",
      "Explain the laws of Thermodynamics",
      "Principle of Wheatstone Bridge",
    ],
  };

  const handleUploadFile = () => {
    setShowUploadAnimation(true);
    setTimeout(() => {
      const newFile = `NCERT_Chapter_Notes.pdf`;
      setUploadedFiles((prev) => [...prev, newFile]);
      setShowUploadAnimation(false);
    }, 1500);
  };

  const handleCommandSelect = (command: string) => {
    setInputValue(command);
    setActiveCommandCategory(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setInputValue("");
    }
  };

  return (
    <section id="ai-demo" className="py-20 bg-slate-50/50 scroll-mt-20">
      <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
        <div className="mb-8 w-24 h-24 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 200 200"
            width="100%"
            height="100%"
            className="w-full h-full"
          >
            <g clipPath="url(#cs_clip_1_ellipse-12)">
              <mask
                id="cs_mask_1_ellipse-12"
                style={{ maskType: "alpha" }}
                width="200"
                height="200"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M100 150c27.614 0 50-22.386 50-50s-22.386-50-50-50-50 22.386-50 50 22.386 50 50 50zm0 50c55.228 0 100-44.772 100-100S155.228 0 100 0 0 44.772 0 100s44.772 100 100 100z"
                  clipRule="evenodd"
                ></path>
              </mask>
              <g mask="url(#cs_mask_1_ellipse-12)">
                <path fill="#fff" d="M200 0H0v200h200V0z"></path>
                <path
                  fill="#3b82f6"
                  fillOpacity="0.33"
                  d="M200 0H0v200h200V0z"
                ></path>
                <g
                  filter="url(#filter0_f_844_2811)"
                  className="animate-pulse"
                >
                  <path fill="#3b82f6" d="M110 32H18v68h92V32z"></path>
                  <path fill="#1d4ed8" d="M188-24H15v98h173v-98z"></path>
                  <path fill="#60a5fa" d="M175 70H5v156h170V70z"></path>
                  <path fill="#93c5fd" d="M230 51H100v103h130V51z"></path>
                </g>
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_844_2811"
                width="385"
                height="410"
                x="-75"
                y="-104"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  result="effect1_foregroundBlur_844_2811"
                  stdDeviation="40"
                ></feGaussianBlur>
              </filter>
              <clipPath id="cs_clip_1_ellipse-12">
                <path fill="#fff" d="M0 0H200V200H0z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl font-headline font-bold text-slate-900 mb-2">
              How can I assist your NEET prep today?
            </h2>
            <p className="text-muted-foreground max-w-md">
              Ask any doubt or select a subject to see popular topics.
            </p>
          </motion.div>
        </div>

        <div className="w-full bg-white border border-border rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="p-6">
            <input
              ref={inputRef}
              type="text"
              placeholder="Explain the mechanism of enzyme action..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full text-slate-800 text-lg outline-none placeholder:text-muted-foreground bg-transparent"
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-slate-50 py-1.5 px-3 rounded-full border border-slate-200"
                  >
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-slate-700">{file}</span>
                    <button
                      onClick={() =>
                        setUploadedFiles((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <Plus className="w-3.5 h-3.5 rotate-45" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchEnabled(!searchEnabled)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
                  searchEnabled ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
                )}
              >
                <Search className="w-3.5 h-3.5" />
                <span>NCERT Search</span>
              </button>
              <button
                onClick={() => setDeepResearchEnabled(!deepResearchEnabled)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
                  deepResearchEnabled ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
                )}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Deep Research</span>
              </button>
              <button
                onClick={() => setReasonEnabled(!reasonEnabled)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
                  reasonEnabled ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
                )}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Solve & Reason</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-full transition-all",
                  inputValue.trim() ? "bg-primary text-white shadow-lg" : "bg-slate-100 text-slate-400"
                )}
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="px-6 py-3 border-t border-slate-50 bg-slate-50/50">
            <button
              onClick={handleUploadFile}
              className="flex items-center gap-2 text-slate-500 text-xs font-bold hover:text-primary transition-colors"
            >
              {showUploadAnimation ? (
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-primary rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>Upload Question / Note</span>
            </button>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-6">
          <CommandButton
            icon={<Leaf className="w-6 h-6" />}
            label="Biology"
            isActive={activeCommandCategory === "biology"}
            onClick={() => setActiveCommandCategory(activeCommandCategory === "biology" ? null : "biology")}
          />
          <CommandButton
            icon={<FlaskConical className="w-6 h-6" />}
            label="Chemistry"
            isActive={activeCommandCategory === "chemistry"}
            onClick={() => setActiveCommandCategory(activeCommandCategory === "chemistry" ? null : "chemistry")}
          />
          <CommandButton
            icon={<Zap className="w-6 h-6" />}
            label="Physics"
            isActive={activeCommandCategory === "physics"}
            onClick={() => setActiveCommandCategory(activeCommandCategory === "physics" ? null : "physics")}
          />
        </div>

        <AnimatePresence>
          {activeCommandCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full mt-6 overflow-hidden"
            >
              <div className="bg-white rounded-3xl border border-border shadow-lg overflow-hidden">
                <div className="p-4 border-b border-slate-50 bg-slate-50/30">
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">
                    {activeCommandCategory} Suggestions
                  </h3>
                </div>
                <ul className="divide-y divide-slate-50">
                  {commandSuggestions[activeCommandCategory as keyof typeof commandSuggestions].map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleCommandSelect(suggestion)}
                      className="p-4 hover:bg-primary/5 cursor-pointer transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">
                        {suggestion}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export function StudyToolsGrid() {
  const tools = [
    {
      title: "Flashcards",
      description: "Create and master your subjects with smart flashcards.",
      icon: Layers,
      bgColor: "bg-[#F3E6F7]",
      iconBg: "bg-[#7A6A7D]",
      href: "/study-tools/flashcards"
    },
    {
      title: "Smart Learn",
      description: "Adaptive learning system tailored to your proficiency.",
      icon: BrainCircuit,
      bgColor: "bg-[#E3F2FD]",
      iconBg: "bg-[#6B7A8A]",
      href: "/study-tools/learn"
    },
    {
      title: "Rank Predictor",
      description: "AI-driven estimation of your NEET rank and colleges.",
      icon: Target,
      bgColor: "bg-[#FFF0E6]",
      iconBg: "bg-[#8A7B70]",
      href: "/tools/neet-rank-predictor",
      isNew: true
    },
    {
      title: "Study Guides",
      description: "Create and share comprehensive study guides.",
      icon: FileText,
      bgColor: "bg-[#E1F7E9]",
      iconBg: "bg-[#6A7D71]",
      href: "/study-tools/guides"
    },
    {
      title: "AI Tutor",
      description: "Your personal AI tutor, available 24/7.",
      icon: Bot,
      bgColor: "bg-[#FFF9E1]",
      iconBg: "bg-[#7D7A6A]",
      href: "/ai-friend/vidhyamithra"
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
    <section className="pt-12 pb-24 max-w-7xl mx-auto px-4 relative z-0">
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
        <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 relative z-0 border-t border-slate-100">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 relative h-[300px] md:h-[400px] w-full flex items-center justify-center mb-12 md:mb-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-xl aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10"
                    >
                        <img 
                            src="https://1234567890.sirv.com/ChatGPT%20Image%20May%2021%2C%202026%2C%2004_17_11%20PM.png" 
                            alt="Precision Analytics Dashboard for NEET Aspirants" 
                            className="w-full h-full object-cover"
                            data-ai-hint="analytics dashboard"
                        />
                    </motion.div>
                </div>
                <div className="flex-1 space-y-12">
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-6"
                    >
                        <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center shrink-0">
                            <Zap className="w-8 h-8 text-[#16A34A]" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-foreground font-headline">NCERT-Based Precision</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">Every note, MCQ, and lecture is strictly mapped to the latest NCERT syllabus for 100% relevance.</p>
                        </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex items-center gap-6"
                    >
                        <div className="w-16 h-16 bg-[#FFEDD5] rounded-full flex items-center justify-center shrink-0">
                            <FileText className="w-8 h-8 text-[#EA580C]" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-foreground font-headline">Smart Study Reports</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">Export personalized reports that highlight your weak areas and suggest targeted improvement paths.</p>
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
              src="https://1234567890.sirv.com/ChatGPT%20Image%20May%2021%2C%202026%2C%2004_10_56%20PM.png"
              alt="Medical Aspirants Studying for NEET UG"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              data-ai-hint="medical students"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">NEET UG 2027 Batch</h3>
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
                <Link href="/auth">Discover More</Link>
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grow rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src="https://1234567890.sirv.com/ChatGPT%20Image%20May%2021%2C%202026%2C%2004_15_48%20PM.png"
                alt="NCERT Review Session"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                data-ai-hint="studying textbook"
              />
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative overflow-hidden rounded-[3rem] bg-white p-10 md:p-16 border border-slate-100 shadow-xl shadow-slate-200/50"
        >
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-slate-900 leading-tight">Our Achievements <br className="hidden md:block" /> in Numbers</h2>
              <p className="text-slate-500 max-w-md font-medium">
                We measure our success through the performance of our students. Thousands of aspirants trust Vidhyaly for their NEET journey.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {achievements.map((item, idx) => (
                <div className="space-y-2 text-center md:text-left" key={item.label}>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</p>
                  <span className="text-3xl md:text-5xl font-bold text-primary block tracking-tight">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pointer-events-none absolute -top-1 right-1 z-0 h-full w-full bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] opacity-100 [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] md:block"></div>
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

      <AITutorDemo />

      <StudyToolsGrid />

      <FeaturesSection />

      <ExamsSection />
      
      <div className="py-20">
        <Testimonials />
      </div>
    </div>
  );
}
