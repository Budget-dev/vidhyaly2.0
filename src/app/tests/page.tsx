
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, History, Info, Clock, CheckCircle2, Lock, Crown } from "lucide-react"
import { useUser } from "@/firebase"
import Link from "next/link"

const testCategories = [
  {
    title: "Full Syllabus Mock",
    description: "Complete NEET pattern test with 180 questions covering all subjects.",
    duration: "200 mins",
    questions: "180",
    difficulty: "Advanced",
    completed: 12,
    free: true
  },
  {
    title: "Physics Sectional",
    description: "Focus purely on Physics concepts from Mechanics to Modern Physics.",
    duration: "60 mins",
    questions: "45",
    difficulty: "Medium",
    completed: 24,
    free: false
  },
  {
    title: "Chemistry Sectional",
    description: "In-depth testing of Organic, Inorganic, and Physical Chemistry.",
    duration: "60 mins",
    questions: "45",
    difficulty: "Medium",
    completed: 18,
    free: false
  },
  {
    title: "Biology Rapid Fire",
    description: "Quick 90-question set for Biology concepts and NCERT line testing.",
    duration: "45 mins",
    questions: "90",
    difficulty: "Moderate",
    completed: 45,
    free: false
  }
]

export default function MockTestPortal() {
  const { profile } = useUser();
  const isFree = profile?.role !== 'admin' && profile?.role !== 'super-admin' && !profile?.isPro;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Mock Test Portal</h1>
          <p className="text-muted-foreground mt-1">Simulate exam conditions and improve your speed and accuracy.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full font-bold">
            <History className="w-4 h-4 mr-2" />
            Previous Results
          </Button>
        </div>
      </div>

      {isFree && (
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[2rem] flex items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-2xl shadow-sm">
              <Crown className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Unlock Full Test Series</h3>
              <p className="text-xs text-slate-500 font-medium">Free users can only attempt 1 full syllabus mock test. Get Pro for unlimited sectionals.</p>
            </div>
          </div>
          <Button asChild className="rounded-full bg-indigo-600 hover:bg-indigo-700 font-bold px-8 h-12 shadow-lg shadow-indigo-100">
            <Link href="/pricing">Go Pro — ₹199</Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testCategories.map((test) => {
          const isLocked = isFree && !test.free;
          return (
            <Card key={test.title} className={cn(
              "group border-none shadow-sm hover:shadow-md transition-all overflow-hidden relative",
              isLocked && "opacity-80"
            )}>
              <div className="absolute top-0 right-0 p-4 flex gap-2">
                {isLocked && <Badge className="bg-slate-900 text-white font-black text-[9px] uppercase"><Lock className="w-2.5 h-2.5 mr-1" /> Pro</Badge>}
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
                    {isLocked ? (
                      <Button asChild className="rounded-full px-6 bg-slate-900">
                        <Link href="/pricing">Unlock</Link>
                      </Button>
                    ) : (
                      <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 font-bold">
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  )
}
