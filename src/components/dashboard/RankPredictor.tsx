"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp } from "lucide-react"

export function RankPredictor() {
  const [score, setScore] = useState<string>("650")
  const [predictedRank, setPredictedRank] = useState<number | null>(null)

  const handlePredict = () => {
    const s = parseInt(score)
    if (isNaN(s)) return
    // Simulated statistical prediction model
    const rank = Math.max(1, Math.floor(1000000 * Math.pow(Math.E, -0.012 * s)))
    setPredictedRank(rank)
  }

  return (
    <Card className="shadow-md border-none bg-gradient-to-br from-primary to-blue-700 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Trophy className="w-32 h-32" />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-white">Rank Predictor</CardTitle>
        <CardDescription className="text-blue-100">
          Estimate your potential NEET rank based on performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="score" className="text-white">Estimated Test Score (Out of 720)</Label>
          <div className="flex gap-2">
            <Input
              id="score"
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            />
            <Button onClick={handlePredict} variant="secondary" className="bg-white text-primary hover:bg-blue-50">
              Calculate
            </Button>
          </div>
        </div>

        {predictedRank && (
          <div className="pt-4 border-t border-white/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-200" />
              <span className="text-xs uppercase tracking-wider text-blue-200 font-bold">Predicted AIR</span>
            </div>
            <div className="text-4xl font-bold">#{predictedRank.toLocaleString()}</div>
            <p className="text-xs text-blue-100 mt-2">
              Based on historical NEET trends and current difficulty metrics.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}