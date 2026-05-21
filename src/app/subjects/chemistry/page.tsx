
"use client"

import { Button } from "@/components/ui/button"
import { FlaskConical, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ChemistryPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-primary/10 p-6 rounded-full mb-8">
        <FlaskConical className="w-16 h-16 text-primary" />
      </div>
      <h1 className="text-4xl font-headline font-bold mb-4">NEET Chemistry</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
        From Organic mechanisms to Inorganic trends and Physical formulas. We are curating the most precise chemistry material.
      </p>
      <div className="bg-slate-50 border border-border rounded-2xl p-6 mb-10 max-w-md w-full">
        <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">Coming Soon</span>
        <h2 className="text-lg font-bold mb-1">We are working on this feature with more efforts</h2>
        <p className="text-sm text-muted-foreground">Molecular visualization tools are in development.</p>
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
