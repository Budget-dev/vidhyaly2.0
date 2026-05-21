import type {Metadata} from 'next';
import './globals.css';
import { DropdownNavigation } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: 'Vidhyaly - Master NEET with Precision',
  description: 'India\'s smartest NEET preparation platform. Curated notes, AI-powered mock tests, and personalized analytics for medical aspirants.',
};

const navItems = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Study tools",
    subMenus: [
      {
        title: "Students",
        items: [
          { label: "Flashcards", description: "Master concepts with active recall", icon: "Layers", href: "/study-tools/flashcards" },
          { label: "Learn", description: "Structured video lectures and content", icon: "BookOpen", href: "/study-tools/learn" },
          { label: "Study Guides", description: "Comprehensive notes for all chapters", icon: "FileText", href: "/study-tools/guides" },
          { label: "Practice MCQs", description: "Chapter-wise multiple choice questions", icon: "CheckSquare", href: "/study-tools/mcqs" },
          { label: "AI Tutor", description: "24/7 personalized learning assistance", icon: "Bot", href: "/study-tools/ai-tutor" },
          { label: "Expert solutions", description: "Detailed answers by subject experts", icon: "MessageCircle", href: "/study-tools/solutions" },
          { label: "Study groups", description: "Collaborate with fellow aspirants", icon: "Users", href: "/study-tools/groups" },
        ],
      },
      {
        title: "Teachers",
        items: [
          { label: "Live Teacher", description: "Connect with educators in real-time", icon: "Presentation", href: "/study-tools/live-teacher" },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Subjects",
    subMenus: [
      {
        title: "NEET Preparation",
        items: [
          { label: "Biology", description: "Deep dive into Botany and Zoology", icon: "Leaf", href: "/subjects/biology" },
          { label: "Chemistry", description: "Organic, Inorganic & Physical", icon: "FlaskConical", href: "/subjects/chemistry" },
          { label: "Physics", description: "Mechanics to Modern Physics", icon: "Zap", href: "/subjects/physics" },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "About Us",
    href: "/about",
  },
  {
    id: 5,
    label: "Contact Us",
    href: "/contact",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background min-h-screen">
        <DropdownNavigation navItems={navItems} />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
