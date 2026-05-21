"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCw, AlertCircle } from "lucide-react"

const revisionItems = [
  { topic: "Optics Formulas", category: "Physics", difficulty: "High", lastReview: "2 days ago" },
  { topic: "Organic Reagents", category: "Chemistry", difficulty: "Medium", lastReview: "3 days ago" },
  { topic: "Genetics Laws", category: "Biology", difficulty: "Low", lastReview: "5 days ago" },
]

export function RevisionModule() {
  return (
    <Card className="shadow-sm border-none bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-headline">Smart Revision</CardTitle>
        <CardDescription>Topics due for review based on spaced repetition.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {revisionItems.map((item) => (
            <div key={item.topic} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <h4 className="text-sm font-bold">{item.topic}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground uppercase">{item.category}</span>
                  <Badge variant={item.difficulty === 'High' ? 'destructive' : item.difficulty === 'Medium' ? 'default' : 'secondary'} className="text-[9px] h-4 px-1.5 leading-none">
                    {item.difficulty}
                  </Badge>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 text-primary">
                <RotateCw className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button className="w-full mt-2" variant="outline">
            <AlertCircle className="w-4 h-4 mr-2" />
            Start Session
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}