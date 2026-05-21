
"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-primary/10 p-6 rounded-full mb-8">
        <Phone className="w-16 h-16 text-primary" />
      </div>
      <h1 className="text-4xl font-headline font-bold mb-4">Contact Us</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
        Have questions about your NEET preparation? Our expert counselors are here to help you 24/7.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-slate-50 border border-border rounded-2xl p-6 flex flex-col items-center gap-3">
          <div className="bg-white p-3 rounded-full border shadow-sm">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-bold">Call/WhatsApp</h3>
          <p className="text-lg font-bold">+91 8466006486</p>
          <p className="text-xs text-muted-foreground">Venkatesh Choppa (Support Executive)</p>
        </div>

        <div className="bg-slate-50 border border-border rounded-2xl p-6 flex flex-col items-center gap-3">
          <div className="bg-white p-3 rounded-full border shadow-sm">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-bold">Email Support</h3>
          <p className="text-lg font-bold">support@vidhyaly.com</p>
          <p className="text-xs text-muted-foreground">Response within 2 hours</p>
        </div>
      </div>

      <div className="mt-12 bg-primary/5 border border-primary/10 rounded-2xl p-6 max-w-md">
        <p className="text-sm font-bold text-primary italic">
          "We are working on each feature with more efforts every single day to bring you the best counseling experience."
        </p>
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
