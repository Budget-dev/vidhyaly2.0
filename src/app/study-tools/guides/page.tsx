
"use client"

import { Button } from "@/components/ui/button"
import { FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GuidesPage() {
  return (
    <div className="min-h-screen py-16 px-4 flex flex-col items-center text-center">
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        <FileText className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-4xl font-headline font-bold mb-4">NEET Study Guides</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed text-center">
        Downloadable, comprehensive study notes that break down NCERT line-by-line. 
        Includes mind maps, flowcharts, and quick-revision summaries for the final weeks of preparation.
      </p>
      <div className="bg-slate-50 border border-border rounded-2xl p-8 mb-10 max-w-md w-full">
        <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">Coming Soon</span>
        <h2 className="text-lg font-bold mb-1">Finalizing NCERT Mapping</h2>
        <p className="text-sm text-muted-foreground">Curating the most precise notes India has to offer.</p>
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
