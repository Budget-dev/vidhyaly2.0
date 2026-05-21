
"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Phone, Info } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-primary/10 p-6 rounded-full mb-8">
        <Info className="w-16 h-16 text-primary" />
      </div>
      <h1 className="text-4xl font-headline font-bold mb-4">About Vidhyaly</h1>
      <div className="max-w-2xl space-y-6">
        <p className="text-xl text-muted-foreground leading-relaxed">
          Vidhyaly is dedicated to revolutionizing NEET preparation in India. We believe every medical aspirant deserves access to the highest quality conceptual learning tools.
        </p>
        
        <div className="bg-slate-50 border border-border rounded-2xl p-8 text-left space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Founder</p>
              <h2 className="text-xl font-bold">Venkatesh Choppa</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-2">
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Contact Support</p>
              <h2 className="text-xl font-bold">+91 8466006486</h2>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <p className="text-primary font-bold">
            "We are working on each feature with more effort to ensure the best learning experience for our students."
          </p>
        </div>
      </div>
      
      <Button asChild variant="outline" className="rounded-full mt-10">
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </Button>
    </div>
  )
}
