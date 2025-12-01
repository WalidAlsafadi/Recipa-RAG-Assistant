// lib/constants.ts
import { BookOpen, Database, Sparkles } from "lucide-react";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const GITHUB_URL = "https://github.com/WalidAlsafadi/recipa-rag-assistant";

export const NAV_SECTIONS = [
  { name: "Home", id: "hero" },
  { name: "Architecture", id: "how-it-works" },
  { name: "Ask RecipaAI", id: "qa-section" },
  { name: "Team", id: "team" },
];

export const SUGGESTED_QUESTIONS = [
  "What is a cheap meal for a family of 4?",
  "How do I make lentils taste good?",
  "Give me a recipe using only eggs and flour.",
];

export const ARCHITECTURE_STEPS = [
  {
    icon: BookOpen,
    title: "Ingestion Engine",
    text: "Cookbook PDF is parsed and chunked into semantic segments for deep context understanding.",
  },
  {
    icon: Database,
    title: "Vector Retrieval",
    text: "High-dimensional vector search identifies contextually relevant segments from the knowledge base.",
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    text: "LLM synthesizes retrieved data into structured, actionable, and formatted recipes.",
  },
];

export const TEAM_MEMBERS = [
  {
    name: "Walid Alsafadi",
    role: "AI Backend Engineer",
    image: "/walid.jpg",
    linkedin: "https://www.linkedin.com/in/walidalsafadi",
    github: "https://github.com/walidalsafadi",
    email: "mailto:walid.k.alsafadi@gmail.com",
  },
  {
    name: "Fares Alnamla",
    role: "Web Deployment",
    image: "/fares.jpg",
    linkedin: "https://www.linkedin.com/in/faresalnamla",
    github: "https://github.com/FaresAlnamla",
    email: "mailto:faresalnam@gmail.com",
  },
  {
    name: "Ahmed Alyazuri",
    role: "Frontend Developer",
    image: "/ahmed.jpg",
    linkedin: "https://www.linkedin.com/in/ahmed-alyazuri",
    github: "https://github.com/AhmedAl-Yazuri",
    email: "mailto:ahmedalyazuri@gmail.com",
  },
];