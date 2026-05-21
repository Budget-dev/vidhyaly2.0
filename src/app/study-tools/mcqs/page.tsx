
"use client"

import { Button } from "@/components/ui/button"
import { CheckSquare, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function McqsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-primary/10 p-6 rounded-full mb-8">
        <CheckSquare className="w-16 h-16 text-primary" />
      </div>
      <h1 className="text-4xl font-headline font-bold mb-4">Practice MCQs</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
        Test your knowledge with 20,000+ chapter-wise multiple-choice questions. 
        Real-time feedback and detailed step-by-step explanations for every incorrect answer.
      </p>
      <div className="bg-slate-50 border border-border rounded-2xl p-6 mb-10 max-w-md w-full">
        <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">Coming Soon</span>
        <h2 className="text-lg font-bold mb-1">Expanding Question Bank</h2>
        <p className="text-sm text-muted-foreground">Building the most rigorous MCQ platform for NEET.</p>
      </div>
      <Button asChild variant="outline" className="rounded-full">
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </Button>
    </div>
  )
}
