
"use client"

import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  Dna, 
  Atom, 
  FlaskConical, 
  ArrowRight, 
  Sparkles, 
  Brain, 
  Zap,
  Target
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const subjects = [
  {
    title: "Biology",
    description: "Master concepts from Botany and Zoology with high-yield revision cards.",
    icon: Dna,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    href: "/subjects/biology"
  },
  {
    title: "Physics",
    description: "Understand fundamental physical principles and formulas for NEET.",
    icon: Atom,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    href: "/subjects/physics"
  },
  {
    title: "Chemistry",
    description: "Explore Organic, Inorganic, and Physical Chemistry modules.",
    icon: FlaskConical,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    href: "/subjects/chemistry"
  }
]

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen bg-slate-50/30 pb-20">
      {/* Header Section */}
      <section className="pt-20 pb-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-primary/30" />
            <span className="text-primary font-bold text-[10px] tracking-[0.3em] uppercase">Active Recall</span>
            <span className="h-px w-8 bg-primary/30" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6">
            NEET <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Flashcards</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            High-yield revision cards optimized for memory retention. Select a subject to begin your master session.
          </p>
        </motion.div>
      </section>

      {/* Subject Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subjects.map((subject, idx) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="bg-white rounded-[2rem] p-8 h-full border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-2xl font-bold text-slate-900">{subject.title}</h3>
                  <div className={`p-3 rounded-2xl ${subject.bgColor} transition-transform group-hover:scale-110 duration-300`}>
                    <subject.icon className={`w-6 h-6 ${subject.color}`} />
                  </div>
                </div>
                
                <p className="text-slate-500 text-lg leading-relaxed mb-12 flex-grow">
                  {subject.description}
                </p>
                
                <div className="flex justify-end mt-auto">
                  <Button 
                    asChild
                    size="icon" 
                    className="rounded-xl w-12 h-12 bg-primary group-hover:bg-primary/90 transition-all duration-300 group-hover:translate-x-1"
                  >
                    <Link href={subject.href}>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Verification Badge */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-slate-200 text-xs font-medium text-slate-500 shadow-sm">
            All materials are aligned with current NCERT & NTA syllabus guidelines.
          </div>
        </div>
      </section>

      {/* Motivation & Science Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-headline font-bold">Why Flashcards Work?</h2>
            
            <div className="space-y-6">
              {[
                {
                  icon: Brain,
                  title: "Active Recall",
                  text: "Instead of passive reading, flashcards force your brain to retrieve info, strengthening neural pathways."
                },
                {
                  icon: Zap,
                  title: "Spaced Repetition",
                  text: "Our algorithm shows you difficult cards more often, ensuring you never forget a concept."
                },
                {
                  icon: Target,
                  title: "High-Yield Focus",
                  text: "Every card is curated from previous year papers and NCERT's most important lines."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 bg-white p-2 rounded-lg shadow-sm border border-slate-100 h-fit">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-accent p-1 rounded-[2.5rem] shadow-2xl">
            <div className="bg-white rounded-[2.4rem] p-10 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-20 h-20 text-primary" />
              </div>
              
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                "The distance between your dreams and reality is called discipline."
              </h3>
              
              <p className="text-slate-500 text-sm">
                Start with just 20 cards a day. Consistency is the key to unlocking your dream medical seat.
              </p>
              
              <Button asChild className="rounded-full px-8 bg-primary hover:bg-primary/90">
                <Link href="/study-tools/ai-tutor">
                  Ask AI for Study Tips <Sparkles className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Back Navigation */}
      <div className="flex justify-center mt-12">
        <Button asChild variant="ghost" className="rounded-full text-muted-foreground hover:text-primary">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
