"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts"

const data = [
  { topic: "Thermodynamics", score: 45, color: "#ef4444" },
  { topic: "Ionic Equilibrium", score: 52, color: "#f97316" },
  { topic: "Rotation", score: 58, color: "#facc15" },
  { topic: "Photosynthesis", score: 62, color: "#84cc16" },
  { topic: "Ecology", score: 71, color: "#10b981" },
]

const chartConfig = {
  score: {
    label: "Accuracy %",
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))",
    },
  },
} satisfies ChartConfig

export function WeakTopicAnalytics() {
  return (
    <Card className="shadow-sm border-none bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-headline">Topic Proficiency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full mt-4">
          <ChartContainer config={chartConfig}>
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis
                dataKey="topic"
                type="category"
                axisLine={false}
                tickLine={false}
                fontSize={11}
                width={100}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
        <p className="text-[11px] text-muted-foreground mt-4 italic">
          * Accuracy percentages reflect performance in the last 10 mock test sessions.
        </p>
      </CardContent>
    </Card>
  )
}
