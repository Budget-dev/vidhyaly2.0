
"use client"

import { Button } from "@/components/ui/button"
import { Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GroupsPage() {
  return (
    <div className="min-h-screen py-16 px-4 flex flex-col items-center text-center">
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        <Users className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-4xl font-headline font-bold mb-4">Study Groups</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed text-center">
        Collaborate with fellow aspirants across India. Share notes, participate in 
        live quiz challenges, and stay motivated through peer-to-peer learning communities.
      </p>
      <div className="bg-slate-50 border border-border rounded-2xl p-8 mb-10 max-w-md w-full">
        <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">Coming Soon</span>
        <h2 className="text-lg font-bold mb-1">Community Platform Scaling</h2>
        <p className="text-sm text-muted-foreground">Building safe and productive digital study rooms.</p>
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
