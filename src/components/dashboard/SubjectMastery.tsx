"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Microscope, Beaker, Leaf, FlaskConical } from "lucide-react"

const subjects = [
  { name: "Physics", icon: FlaskConical, mastery: 68, color: "text-blue-500" },
  { name: "Chemistry", icon: Beaker, mastery: 82, color: "text-amber-500" },
  { name: "Botany", icon: Leaf, mastery: 75, color: "text-emerald-500" },
  { name: "Zoology", icon: Microscope, mastery: 88, color: "text-rose-500" },
]

export function SubjectMastery() {
  return (
    <Card className="shadow-sm border-none bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-headline">Subject Mastery</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {subjects.map((subject) => (
          <div key={subject.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <subject.icon className={`w-4 h-4 ${subject.color}`} />
                <span className="font-medium text-sm">{subject.name}</span>
              </div>
              <span className="text-xs font-semibold text-muted-foreground">{subject.mastery}%</span>
            </div>
            <Progress value={subject.mastery} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}