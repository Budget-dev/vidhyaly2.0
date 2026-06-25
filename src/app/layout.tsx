
import type { Metadata } from 'next';
import './globals.css';
import { DropdownNavigation } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://vidhyaly.com'),
  title: {
    default: 'Vidhyaly - Master NEET 2026 with NCERT-Based Precision',
    template: '%s | Vidhyaly NEET Prep'
  },
  description: 'India\'s smartest NEET preparation platform. Access 20,000+ NCERT-mapped MCQs, AI-powered doubt solving (Vidhyamithra), and personalized analytics for medical aspirants.',
  keywords: ['NEET 2026 Preparation', 'Best NEET Online Coaching', 'NCERT Biology NEET', 'NEET Mock Tests', 'Vidhyamithra AI'],
  authors: [{ name: 'Venkatesh Choppa' }],
  creator: 'Vidhyaly Education',
  publisher: 'Vidhyaly Education',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vidhyaly.com',
    siteName: 'Vidhyaly',
    title: 'Vidhyaly - India\'s Smartest NEET Prep Platform',
    description: 'Master NEET with NCERT-based precision and AI mentorship. Join 10,000+ medical aspirants.',
    images: [
      {
        url: 'https://1234567890.sirv.com/ChatGPT%20Image%20May%2021%2C%202026%2C%2012_31_25%20PM.png',
        width: 1200,
        height: 630,
        alt: 'Vidhyaly NEET Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vidhyaly - Crack NEET 2026',
    description: 'The future of NEET preparation is here. NCERT precision meets AI mentorship.',
    images: ['https://1234567890.sirv.com/ChatGPT%20Image%20May%2021%2C%202026%2C%2012_31_25%20PM.png'],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3'/><path d='M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4'/><circle cx='20' cy='10' r='2'/></svg>",
  },
  alternates: {
    canonical: 'https://vidhyaly.com',
  },
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
          { label: "Rank Predictor", description: "Predict your NEET rank and colleges", icon: "Target", href: "/tools/neet-rank-predictor" },
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
    label: "AI Friend",
    subMenus: [
      {
        title: "Companion",
        items: [
          { label: "Vidhyamithra", description: "Your personalized AI study friend", icon: "Bot", href: "/ai-friend/vidhyamithra" },
        ],
      },
    ],
  },
  {
    id: 4,
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
    id: 5,
    label: "About Us",
    href: "/about",
  },
  {
    id: 6,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Vidhyaly",
              "url": "https://vidhyaly.com",
              "logo": "https://vidhyaly.com/logo.svg",
              "sameAs": [
                "https://facebook.com/vidhyaly",
                "https://twitter.com/vidhyaly",
                "https://instagram.com/vidhyaly",
                "https://youtube.com/vidhyaly"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-8466006486",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body className="font-body antialiased bg-background min-h-screen flex flex-col">
        <DropdownNavigation navItems={navItems} />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
