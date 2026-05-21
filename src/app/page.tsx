"use client"

import { RankPredictor } from "@/components/dashboard/RankPredictor"
import { SubjectMastery } from "@/components/dashboard/SubjectMastery"
import { StudyPlanner } from "@/components/dashboard/StudyPlanner"
import { WeakTopicAnalytics } from "@/components/dashboard/WeakTopicAnalytics"
import { RevisionModule } from "@/components/dashboard/RevisionModule"
import { Button } from "@/components/ui/button"
import { Plus, Bell } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Welcome back, Scholar</h1>
          <p className="text-muted-foreground mt-1">Your NEET journey is 68% complete. Keep the momentum!</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
          <Button className="rounded-full shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            New Test
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Section */}
        <div className="lg:col-span-8">
          <RankPredictor />
        </div>
        <div className="lg:col-span-4">
          <SubjectMastery />
        </div>

        {/* Middle Section */}
        <div className="lg:col-span-5 h-full">
          <StudyPlanner />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <WeakTopicAnalytics />
          <RevisionModule />
        </div>
      </div>
    </div>
  )
}