"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, History, Info, Clock, CheckCircle2 } from "lucide-react"

const testCategories = [
  {
    title: "Full Syllabus Mock",
    description: "Complete NEET pattern test with 180 questions covering all subjects.",
    duration: "200 mins",
    questions: "180",
    difficulty: "Advanced",
    completed: 12
  },
  {
    title: "Physics Sectional",
    description: "Focus purely on Physics concepts from Mechanics to Modern Physics.",
    duration: "60 mins",
    questions: "45",
    difficulty: "Medium",
    completed: 24
  },
  {
    title: "Chemistry Sectional",
    description: "In-depth testing of Organic, Inorganic, and Physical Chemistry.",
    duration: "60 mins",
    questions: "45",
    difficulty: "Medium",
    completed: 18
  },
  {
    title: "Biology Rapid Fire",
    description: "Quick 90-question set for Biology concepts and NCERT line testing.",
    duration: "45 mins",
    questions: "90",
    difficulty: "Moderate",
    completed: 45
  }
]

export default function MockTestPortal() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Mock Test Portal</h1>
          <p className="text-muted-foreground mt-1">Simulate exam conditions and improve your speed and accuracy.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full">
            <History className="w-4 h-4 mr-2" />
            Previous Results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testCategories.map((test) => (
          <Card key={test.title} className="group border-none shadow-sm hover:shadow-md transition-all overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4">
              <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-bold text-[10px] uppercase tracking-wider">
                {test.difficulty}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                {test.title}
              </CardTitle>
              <CardDescription className="max-w-xs">{test.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 py-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{test.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{test.questions} Qs</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-xs text-muted-foreground">{test.completed} tests taken so far</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <Info className="w-4 h-4" />
                  </Button>
                  <Button className="rounded-full px-6">
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-accent/5 rounded-3xl p-8 border border-accent/10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <h2 className="text-2xl font-headline font-bold text-accent">Exam Simulation Mode</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our advanced simulation environment includes camera monitoring, full-screen lock, and precise NEET-pattern marking (+4/-1) to give you the most authentic testing experience possible.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-accent bg-accent/10 px-4 py-2 rounded-full">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Live Performance Tracking
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-accent bg-accent/10 px-4 py-2 rounded-full">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                AI-Driven Difficulty Scaling
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 aspect-video bg-white rounded-2xl shadow-xl p-4 border border-accent/20 flex flex-col items-center justify-center">
             <div className="text-4xl font-headline font-bold text-primary mb-2">98.4%</div>
             <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Similarity Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  )
}