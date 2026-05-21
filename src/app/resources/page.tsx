"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Download, FileText, ExternalLink } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const resources = [
  { id: "1", title: "Complete Physics Formula Sheet", subject: "Physics", format: "PDF", size: "2.4 MB", img: "physics-cover" },
  { id: "2", title: "Organic Chemistry Reagent Chart", subject: "Chemistry", format: "PDF", size: "1.8 MB", img: "chemistry-cover" },
  { id: "3", title: "NCERT Biology - Diagram Review", subject: "Biology", format: "PDF", size: "5.1 MB", img: "biology-cover" },
  { id: "4", title: "Previous Year NEET Solved Paper", subject: "All", format: "PDF", size: "8.2 MB", img: "mock-test-hero" },
]

export default function ResourcesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-headline font-bold">Resource Library</h1>
        <p className="text-muted-foreground mt-1">Access curated notes, formula sheets, and study material.</p>
      </div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search chapters, topics or subjects..." className="pl-10 h-12 rounded-xl shadow-sm bg-white" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((item) => {
          const imgData = PlaceHolderImages.find(p => p.id === item.img)
          return (
            <Card key={item.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={imgData?.imageUrl || "https://picsum.photos/seed/placeholder/400/300"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={imgData?.imageHint || "study book"}
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white/90 text-primary hover:bg-white">{item.format}</Badge>
                </div>
              </div>
              <CardHeader className="p-4">
                <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">{item.subject}</div>
                <CardTitle className="text-base font-bold leading-tight group-hover:text-primary transition-colors">{item.title}</CardTitle>
              </CardHeader>
              <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-slate-50 mt-auto">
                <span className="text-xs text-muted-foreground">{item.size}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <Card className="bg-primary/5 border-primary/10 border-dashed">
        <CardContent className="p-10 flex flex-col items-center text-center">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold font-headline">Need Custom Notes?</h3>
          <p className="text-muted-foreground max-w-md mt-2">
            Upload your handwritten notes to convert them into searchable digital PDFs with our smart processing tool.
          </p>
          <Button className="mt-6">Request Topic Notes</Button>
        </CardContent>
      </Card>
    </div>
  )
}