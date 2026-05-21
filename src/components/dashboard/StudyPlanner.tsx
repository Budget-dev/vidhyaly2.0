"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Target } from "lucide-react"

const todayGoals = [
  { id: "1", task: "Atomic Structure Revision", category: "Chemistry", time: "09:00 AM", status: "completed" },
  { id: "2", task: "90 Questions MCQ - Physics", category: "Physics", time: "11:30 AM", status: "pending" },
  { id: "3", task: "Plant Physiology Lecture", category: "Botany", time: "02:00 PM", status: "pending" },
  { id: "4", task: "Animal Kingdom Note Review", category: "Zoology", time: "04:30 PM", status: "pending" },
]

export function StudyPlanner() {
  return (
    <Card className="shadow-sm border-none bg-white h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-headline">Today&apos;s Plan</CardTitle>
          <Badge variant="outline" className="font-medium text-accent border-accent/20 bg-accent/5">
            4 Tasks Left
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todayGoals.map((goal) => (
            <div key={goal.id} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:bg-slate-50 transition-colors">
              <Checkbox id={goal.id} className="mt-1" defaultChecked={goal.status === "completed"} />
              <div className="flex-1 space-y-1">
                <label htmlFor={goal.id} className={`text-sm font-medium block leading-none ${goal.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                  {goal.task}
                </label>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {goal.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {goal.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="pt-2">
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-accent">Daily Target</span>
              </div>
              <div className="w-full bg-accent/20 rounded-full h-1.5 mb-2">
                <div className="bg-accent h-1.5 rounded-full w-1/4"></div>
              </div>
              <p className="text-[11px] text-accent/80 font-medium">1 of 4 core modules mastered today</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}