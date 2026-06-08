export const metrics = [
  {
    id: 1,
    label: "Estimated NEET Score",
    value: 487,
    delta: "↑ 23 pts from last mock",
    deltaType: "success",
    icon: "Target",
    bg: "#F3EEFF",
    color: "#4F46E5"
  },
  {
    id: 2,
    label: "Day Study Streak",
    value: 14,
    delta: "🏆 Personal best!",
    deltaType: "warning",
    icon: "Flame",
    bg: "#FFF4E8",
    color: "#F59E0B"
  },
  {
    id: 3,
    label: "This Week Accuracy",
    value: 61,
    suffix: "%",
    delta: "↓ 4% vs last week",
    deltaType: "danger",
    icon: "TrendingUp",
    bg: "#E8F4FF",
    color: "#3B82F6"
  },
  {
    id: 4,
    label: "Cards Due for Review",
    value: 18,
    delta: "3 chapters overdue",
    deltaType: "warning",
    icon: "Bell",
    bg: "#E8F5EE",
    color: "#10B981"
  }
];

export const masteryData = {
  biology: [
    { name: "Cell Biology", accuracy: 84, pyqHigh: true },
    { name: "Genetics", accuracy: 38, pyqHigh: true },
    { name: "Ecology", accuracy: 71, pyqHigh: true },
    { name: "Human Physiology", accuracy: 65, pyqHigh: true },
    { name: "Plant Physiology", accuracy: 52, pyqHigh: false },
    { name: "Biotechnology", accuracy: 45, pyqHigh: true },
    { name: "Evolution", accuracy: 78, pyqHigh: false },
    { name: "Biomolecules", accuracy: 41, pyqHigh: true }
  ],
  chemistry: [
    { name: "Organic Reactions", accuracy: 55, pyqHigh: true },
    { name: "Equilibrium", accuracy: 43, pyqHigh: true },
    { name: "Electrochemistry", accuracy: 67, pyqHigh: true },
    { name: "Thermodynamics", accuracy: 38, pyqHigh: true },
    { name: "Coordination Compounds", accuracy: 72, pyqHigh: false },
    { name: "Aldehydes & Ketones", accuracy: 49, pyqHigh: true }
  ],
  physics: [
    { name: "Laws of Motion", accuracy: 81, pyqHigh: true },
    { name: "Optics", accuracy: 58, pyqHigh: true },
    { name: "Electrostatics", accuracy: 44, pyqHigh: true },
    { name: "Thermodynamics", accuracy: 37, pyqHigh: true },
    { name: "Modern Physics", accuracy: 69, pyqHigh: true },
    { name: "Waves", accuracy: 55, pyqHigh: false }
  ]
};

export const dailyTasks = [
  {
    id: 1,
    title: "Practice 20 MCQs — Mendelian Genetics",
    subtitle: "Your weakest chapter · Appeared in 8/10 NEET papers · 30 min",
    priority: "URGENT",
    completed: false
  },
  {
    id: 2,
    title: "Review 18 flashcards due today",
    subtitle: "Spaced repetition queue overdue · 20 min",
    priority: "HIGH",
    completed: false
  },
  {
    id: 3,
    title: "Read Study Guide — Thermodynamics ΔH",
    subtitle: "Fixes your ΔH sign mistake pattern · 25 min",
    priority: "MEDIUM",
    completed: false
  }
];

export const errorPatterns = [
  {
    id: 1,
    title: "Genetics ratio confusion",
    description: "You mix Mendelian ratios with Hardy-Weinberg allele frequencies in numerical problems",
    count: "11 wrong",
    chapter: "Genetics",
    subject: "biology"
  },
  {
    id: 2,
    title: "Thermodynamics sign reversal",
    description: "You reverse ΔH sign for exothermic reactions in calculation-based questions",
    count: "7 wrong",
    chapter: "Thermodynamics",
    subject: "chemistry"
  },
  {
    id: 3,
    title: "Optics speed issue",
    description: "Correct answers but 38% slower than average. Speed drills needed here",
    count: "Time bottleneck",
    chapter: "Optics",
    subject: "physics"
  }
];

export const weeklyPerformance = [
  { day: "Mon", biology: 72, chemistry: 48, physics: 60 },
  { day: "Tue", biology: 68, chemistry: 52, physics: 63 },
  { day: "Wed", biology: 75, chemistry: 50, physics: 58 },
  { day: "Thu", biology: 71, chemistry: 55, physics: 65 },
  { day: "Fri", biology: 80, chemistry: 53, physics: 67 },
  { day: "Sat", biology: 77, chemistry: 58, physics: 62 },
  { day: "Sun", biology: 78, chemistry: 54, physics: 61 }
];

export const flashcardDecks = [
  { id: 1, subject: 'biology', label: 'Genetics', chapter: 'Molecular Basis', totalCards: 84, mastery: 62 },
  { id: 2, subject: 'biology', label: 'Cell Biology', chapter: 'Cell Cycle', totalCards: 56, mastery: 81 },
  { id: 3, subject: 'chemistry', label: 'Organic Reactions', chapter: 'Hydrocarbons', totalCards: 94, mastery: 48 },
  { id: 4, subject: 'chemistry', label: 'Thermodynamics', chapter: 'Enthalpy', totalCards: 67, mastery: 35 },
  { id: 5, subject: 'physics', label: 'Optics', chapter: 'Ray Optics', totalCards: 72, mastery: 55 },
  { id: 6, subject: 'physics', label: 'Laws of Motion', chapter: 'Newtonian Mech', totalCards: 45, mastery: 79 },
  { id: 7, subject: 'biology', label: 'Ecology', chapter: 'Populations', totalCards: 38, mastery: 71 },
  { id: 8, subject: 'chemistry', label: 'Equilibrium', chapter: 'Ionic Eq', totalCards: 55, mastery: 44 }
];

export const lessonsData = {
  biology: [
    { name: "Cell Structure & Function", status: "completed" },
    { name: "Biomolecules", status: "completed" },
    { name: "Genetics", status: "in-progress" },
    { name: "Human Physiology", status: "not-started" },
    { name: "Plant Physiology", status: "not-started" },
    { name: "Ecology", status: "not-started" },
    { name: "Evolution", status: "not-started" },
    { name: "Biotechnology", status: "not-started" }
  ]
};

export const groupMembers = [
  { name: 'Arjun S', questions: 47, points: 340, active: true, isUser: true },
  { name: 'Priya M', questions: 34, points: 298, active: true },
  { name: 'Rahul K', questions: 22, points: 251, active: true },
  { name: 'Sneha R', questions: 18, points: 187, active: true },
  { name: 'Dev P', questions: 0, points: 134, active: false },
  { name: 'Ananya S', questions: 0, points: 89, active: false }
];
