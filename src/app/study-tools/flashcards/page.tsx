
"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Dna, 
  Atom, 
  FlaskConical, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Sparkles,
  Zap,
  Target,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Types for navigation
type SubjectId = "biology" | "chemistry" | "physics";

interface Chapter {
  id: string;
  title: string;
}

interface Unit {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface Branch {
  id: string;
  label: string;
  units: Unit[];
}

interface Subject {
  id: SubjectId;
  title: string;
  icon: any;
  color: string;
  bgColor: string;
  description: string;
  branches: Branch[];
}

// Data Structure
const flashcardData: Record<SubjectId, Subject> = {
  biology: {
    id: "biology",
    title: "Biology",
    icon: Dna,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    description: "Master 100% NCERT-based Botany & Zoology concepts.",
    branches: [
      {
        id: "class-11",
        label: "Class 11",
        units: [
          {
            id: "b11-u1",
            title: "Diversity in the Living World",
            chapters: [
              { id: "c1", title: "The Living World" },
              { id: "c2", title: "Biological Classification" },
              { id: "c3", title: "Plant Kingdom" },
              { id: "c4", title: "Animal Kingdom" }
            ]
          },
          {
            id: "b11-u2",
            title: "Structural Organization in Plants and Animals",
            chapters: [
              { id: "c5", title: "Morphology of Flowering Plants" },
              { id: "c6", title: "Anatomy of Flowering Plants" },
              { id: "c7", title: "Structural Organization in Animals" }
            ]
          },
          {
            id: "b11-u3",
            title: "Cell: Structure and Functions",
            chapters: [
              { id: "c8", title: "Cell: The Unit of Life" },
              { id: "c9", title: "Biomolecules" },
              { id: "c10", title: "Cell Cycle and Cell Division" }
            ]
          },
          {
            id: "b11-u4",
            title: "Plant Physiology",
            chapters: [
              { id: "c11", title: "Photosynthesis in Higher Plants" },
              { id: "c12", title: "Respiration in Plants" },
              { id: "c13", title: "Plant Growth and Development" }
            ]
          },
          {
            id: "b11-u5",
            title: "Human Physiology",
            chapters: [
              { id: "c14", title: "Breathing and Exchange of Gases" },
              { id: "c15", title: "Body Fluids and Circulation" },
              { id: "c16", title: "Excretory Products and Their Elimination" },
              { id: "c17", title: "Locomotion and Movement" },
              { id: "c18", title: "Neural Control and Coordination" },
              { id: "c19", title: "Chemical Coordination and Integration" }
            ]
          }
        ]
      },
      {
        id: "class-12",
        label: "Class 12",
        units: [
          {
            id: "b12-u1",
            title: "Reproduction",
            chapters: [
              { id: "c20", title: "Sexual Reproduction in Flowering Plants" },
              { id: "c21", title: "Human Reproduction" },
              { id: "c22", title: "Reproductive Health" }
            ]
          },
          {
            id: "b12-u2",
            title: "Genetics and Evolution",
            chapters: [
              { id: "c23", title: "Principles of Inheritance and Variation" },
              { id: "c24", title: "Molecular Basis of Inheritance" },
              { id: "c25", title: "Evolution" }
            ]
          },
          {
            id: "b12-u3",
            title: "Biology in Human Welfare",
            chapters: [
              { id: "c26", title: "Human Health and Disease" },
              { id: "c27", title: "Microbes in Human Welfare" }
            ]
          },
          {
            id: "b12-u4",
            title: "Biotechnology",
            chapters: [
              { id: "c28", title: "Biotechnology: Principles and Processes" },
              { id: "c29", title: "Biotechnology and its Applications" }
            ]
          },
          {
            id: "b12-u5",
            title: "Ecology",
            chapters: [
              { id: "c30", title: "Organisms and Populations" },
              { id: "c31", title: "Ecosystem" },
              { id: "c32", title: "Biodiversity and Conservation" }
            ]
          }
        ]
      }
    ]
  },
  chemistry: {
    id: "chemistry",
    title: "Chemistry",
    icon: FlaskConical,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    description: "Master Physical, Organic, and Inorganic reagents & mechanisms.",
    branches: [
      {
        id: "physical",
        label: "Physical Chemistry",
        units: [
          {
            id: "c-ph-u1",
            title: "States and Energetics",
            chapters: [
              { id: "cp1", title: "Thermodynamics" },
              { id: "cp2", title: "Chemical Equilibrium" },
              { id: "cp3", title: "Ionic Equilibrium" }
            ]
          },
          {
            id: "c-ph-u2",
            title: "Solutions & Electrochemistry",
            chapters: [
              { id: "cp4", title: "Solutions" },
              { id: "cp5", title: "Electrochemistry" },
              { id: "cp6", title: "Chemical Kinetics" }
            ]
          }
        ]
      },
      {
        id: "organic",
        label: "Organic Chemistry",
        units: [
          {
            id: "c-or-u1",
            title: "Functional Groups I",
            chapters: [
              { id: "co1", title: "Haloalkanes and Haloarenes" },
              { id: "co2", title: "Alcohols, Phenols and Ethers" }
            ]
          },
          {
            id: "c-or-u2",
            title: "Functional Groups II",
            chapters: [
              { id: "co3", title: "Aldehydes, Ketones and Carboxylic Acids" },
              { id: "co4", title: "Amines" }
            ]
          }
        ]
      },
      {
        id: "inorganic",
        label: "Inorganic Chemistry",
        units: [
          {
            id: "c-in-u1",
            title: "P-Block Elements",
            chapters: [
              { id: "ci1", title: "Group 13 to 18 Elements" }
            ]
          },
          {
            id: "c-in-u2",
            title: "Transition Elements",
            chapters: [
              { id: "ci2", title: "d and f Block Elements" },
              { id: "ci3", title: "Coordination Compounds" }
            ]
          }
        ]
      }
    ]
  },
  physics: {
    id: "physics",
    title: "Physics",
    icon: Atom,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    description: "Simplifying Mechanics, Optics, and Modern Physics for NEET.",
    branches: [
      {
        id: "class-11",
        label: "Class 11",
        units: [
          {
            id: "p11-u1",
            title: "Mechanics I",
            chapters: [
              { id: "px1", title: "Units and Measurements" },
              { id: "px2", title: "Motion in a Straight Line" },
              { id: "px3", title: "Motion in a Plane" }
            ]
          },
          {
            id: "p11-u2",
            title: "Mechanics II",
            chapters: [
              { id: "px4", title: "Laws of Motion" },
              { id: "px5", title: "Work, Energy and Power" }
            ]
          }
        ]
      },
      {
        id: "class-12",
        label: "Class 12",
        units: [
          {
            id: "p12-u1",
            title: "Electrodynamics",
            chapters: [
              { id: "px6", title: "Electric Charges and Fields" },
              { id: "px7", title: "Current Electricity" }
            ]
          },
          {
            id: "p12-u2",
            title: "Optics & Modern Physics",
            chapters: [
              { id: "px8", title: "Ray Optics" },
              { id: "px9", title: "Wave Optics" },
              { id: "px10", title: "Dual Nature of Radiation" }
            ]
          }
        ]
      }
    ]
  }
};

export default function FlashcardsPage() {
  const [step, setStep] = useState<"subject" | "branch" | "unit" | "chapter">("subject");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const handleBack = () => {
    if (step === "chapter") {
      setStep("unit");
      setSelectedUnit(null);
    } else if (step === "unit") {
      setStep("branch");
      setSelectedBranch(null);
    } else if (step === "branch") {
      setStep("subject");
      setSelectedSubject(null);
    }
  };

  const renderSubjectSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {(Object.values(flashcardData)).map((subject, idx) => (
        <motion.div
          key={subject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => {
            setSelectedSubject(subject);
            setStep("branch");
          }}
          className="group cursor-pointer"
        >
          <div className="bg-white rounded-[2.5rem] p-10 h-full border border-slate-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col items-center text-center">
            <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", subject.bgColor)}>
              <subject.icon className={cn("w-10 h-10", subject.color)} />
            </div>
            <h3 className="text-3xl font-headline font-bold text-slate-900 mb-4">{subject.title}</h3>
            <p className="text-slate-500 leading-relaxed mb-8">{subject.description}</p>
            <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all">
              Explore Decks <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderBranchSelection = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
      {selectedSubject?.branches.map((branch, idx) => (
        <motion.div
          key={branch.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => {
            setSelectedBranch(branch);
            setStep("unit");
          }}
          className="cursor-pointer"
        >
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", selectedSubject.bgColor)}>
                <BookOpen className={cn("w-6 h-6", selectedSubject.color)} />
              </div>
              <span className="text-xl font-bold text-slate-800">{branch.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderUnitSelection = () => (
    <div className="max-w-4xl mx-auto px-4 space-y-4">
      {selectedBranch?.units.map((unit, idx) => (
        <motion.div
          key={unit.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => {
            setSelectedUnit(unit);
            setStep("chapter");
          }}
          className="cursor-pointer"
        >
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:translate-x-2 transition-all flex items-center justify-between group">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit {idx + 1}</p>
              <h4 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors">{unit.title}</h4>
              <p className="text-xs text-slate-500">{unit.chapters.length} chapters mapped</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderChapterSelection = () => (
    <div className="max-w-4xl mx-auto px-4 space-y-4">
      <div className="bg-primary/5 rounded-2xl p-6 mb-8 border border-primary/10 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900">Unit: {selectedUnit?.title}</h4>
          <p className="text-xs text-slate-500">Pick a chapter to start your active recall session.</p>
        </div>
      </div>
      {selectedUnit?.chapters.map((chapter, idx) => (
        <motion.div
          key={chapter.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <Link href={`/study-tools/flashcards/session?chapter=${chapter.id}`} className="block group">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm group-hover:shadow-lg group-hover:border-primary/30 transition-all flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all text-xs font-black">
                  {idx + 1}
                </div>
                <span className="font-bold text-slate-700 group-hover:text-slate-900">{chapter.title}</span>
              </div>
              <Button size="sm" className="rounded-full bg-slate-900 group-hover:bg-primary text-[10px] font-black uppercase tracking-widest px-4 h-8 transition-colors">
                Start Deck
              </Button>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/30 pb-32">
      {/* Dynamic Header */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {step !== "subject" && (
                <button 
                  onClick={handleBack}
                  className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to {step === "branch" ? "Subjects" : step === "unit" ? "Class Selection" : "Units"}
                </button>
              )}
              
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-primary/30" />
                <span className="text-primary font-bold text-[10px] tracking-[0.3em] uppercase">
                  {step === "subject" ? "Active Recall" : selectedSubject?.title}
                </span>
                <span className="h-px w-8 bg-primary/30" />
              </div>

              <h1 className="text-4xl md:text-6xl font-headline font-bold">
                {step === "subject" && "NEET Flashcards"}
                {step === "branch" && `Select ${selectedSubject?.id === "chemistry" ? "Branch" : "Year"}`}
                {step === "unit" && `${selectedBranch?.label} Units`}
                {step === "chapter" && "Pick Chapter"}
              </h1>

              <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
                {step === "subject" && "High-yield revision cards optimized for memory retention. Select a subject to begin."}
                {step === "branch" && `Choose your target curriculum for ${selectedSubject?.title} preparation.`}
                {step === "unit" && `Comprehensive unit-wise mapping for ${selectedSubject?.title} ${selectedBranch?.label}.`}
                {step === "chapter" && `Final step: select a specific chapter to start your practice session.`}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Main Navigation Canvas */}
      <section className="relative z-10">
        <AnimatePresence mode="wait">
          {step === "subject" && <div key="subjects">{renderSubjectSelection()}</div>}
          {step === "branch" && <div key="branches">{renderBranchSelection()}</div>}
          {step === "unit" && <div key="units">{renderUnitSelection()}</div>}
          {step === "chapter" && <div key="chapters">{renderChapterSelection()}</div>}
        </AnimatePresence>
      </section>

      {/* Floating Info Section */}
      <AnimatePresence>
        {step === "subject" && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-4 mt-20"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-[3rem] p-12 border shadow-sm">
              <div className="space-y-8">
                <h2 className="text-3xl font-headline font-bold">Why Flashcards?</h2>
                <div className="space-y-6">
                  {[
                    { icon: Layers, title: "Spaced Repetition", text: "Algorithm-based review cycles to ensure long-term retention." },
                    { icon: Zap, title: "NCERT Mapping", text: "Every card is verified against the latest NTA syllabus lines." },
                    { icon: Target, title: "High Yield", text: "Focus on diagrams, cycles, and equations that repeat in PYQs." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit text-primary">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-[2.5rem] p-8 text-center space-y-6 border border-slate-100">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Daily Mastery Goal</h3>
                <p className="text-sm text-slate-500">Practice just 20 cards daily to master Biology Class 11 in under 3 months.</p>
                <Button className="w-full rounded-2xl py-6 font-bold bg-slate-900 hover:bg-slate-800">Set My Goal</Button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
