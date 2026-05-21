'use client';

import { useState } from "react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    quote: "I never expected AIR 1, but Vidhyaly's consistent guidance and mock tests kept me motivated. Vidhyaly helped me stay on track throughout my journey when my scores fluctuated.",
    author: "Mahesh Kumar",
    role: "AIR 1 - NEET Aspirant",
    avatar: "https://picsum.photos/seed/mahesh1/200/200",
  },
  {
    id: 2,
    quote: "Vidhyaly's focus on NCERT-based practice was the key. Their curated notes and thorough question bank ensured I didn't deviate from the core requirements of NEET. Vidhyaly helps me a lot with precision.",
    author: "Rachit Sinha Chaudhuri",
    role: "AIR 16 - NEET Aspirant",
    avatar: "https://picsum.photos/seed/rachit/200/200",
  },
  {
    id: 3,
    quote: "Studying in Hindi medium, I feared competitive exams. But learning from Vidhyaly's mock scores without attaching self-worth to them changed everything. Vidhyaly helped me a lot in building my confidence.",
    author: "Mahesh Kumar",
    role: "AIR 1 - NEET Topper",
    avatar: "https://picsum.photos/seed/mahesh2/200/200",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote)
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)

    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote)
      setDisplayedRole(testimonials[index].role)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  return (
    <div className="flex flex-col items-center gap-10 py-16 bg-slate-50/50">
      <div className="relative px-8 max-w-4xl mx-auto">
        <span className="absolute -left-2 -top-6 text-7xl font-serif text-primary/[0.1] select-none pointer-events-none">
          &ldquo;
        </span>

        <p
          className={cn(
            "text-xl md:text-2xl font-light text-foreground text-center max-w-2xl leading-relaxed transition-all duration-400 ease-out italic",
            isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 blur-0 scale-100",
          )}
        >
          {displayedQuote}
        </p>

        <span className="absolute -right-2 -bottom-8 text-7xl font-serif text-primary/[0.1] select-none pointer-events-none">
          &rdquo;
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 mt-2">
        <p
          className={cn(
            "text-[10px] text-muted-foreground tracking-[0.3em] uppercase font-bold transition-all duration-500 ease-out",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
          )}
        >
          {displayedRole}
        </p>

        <div className="flex items-center justify-center gap-3">
          {testimonials.map((testimonial, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showName = isActive || isHovered

            return (
              <button
                key={testimonial.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative flex items-center gap-0 rounded-full cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive ? "bg-primary shadow-lg" : "bg-transparent hover:bg-primary/5",
                  showName ? "pr-4 pl-2 py-1.5" : "p-0.5",
                )}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className={cn(
                      "w-10 h-10 rounded-full object-cover border-2",
                      "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isActive ? "border-white/40" : "border-transparent",
                      !isActive && "hover:scale-110",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    showName ? "grid-cols-[1fr] opacity-100 ml-2" : "grid-cols-[0fr] opacity-0 ml-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        "text-sm font-bold whitespace-nowrap block",
                        "transition-colors duration-300",
                        isActive ? "text-white" : "text-foreground",
                      )}
                    >
                      {testimonial.author}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
