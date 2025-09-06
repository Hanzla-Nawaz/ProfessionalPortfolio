import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Award, Shield, Code, Database, Brain, Server } from "lucide-react";

interface TrainingItem {
  id: number;
  title: string;
  category: "security" | "ml" | "programming" | "data";
  icon: React.ReactNode;
  status?: string;
}

const trainings: TrainingItem[] = [
  // Security & Compliance
  {
    id: 1,
    title: "CISSP (Prep Completed - Exam Scheduled December 2022)",
    category: "security",
    icon: <Shield className="w-6 h-6" />,
    status: "Exam Scheduled"
  },
  {
    id: 2,
    title: "ISO Lead Implementer & Auditor 27001, 27002, 27017, 27018",
    category: "security",
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 3,
    title: "CIS Top 20 Controls Implementation",
    category: "security",
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 4,
    title: "SIEM Hands-On Approach In Line With Various Frameworks and Standards",
    category: "security",
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 5,
    title: "Ethical Hacking & Incident Response Management",
    category: "security",
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 6,
    title: "SCADA / ICS Security Prevention & Detection",
    category: "security",
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 7,
    title: "Vulnerability Assessment In Line With Various Frameworks and Standards",
    category: "security",
    icon: <Shield className="w-6 h-6" />
  },
  
  // Machine Learning & AI
  {
    id: 8,
    title: "Machine Learning - Supervised & Unsupervised",
    category: "ml",
    icon: <Brain className="w-6 h-6" />
  },
  
  // Programming & Development
  {
    id: 9,
    title: "Programming in Python",
    category: "programming",
    icon: <Code className="w-6 h-6" />
  },
  {
    id: 10,
    title: "Programming in R",
    category: "programming",
    icon: <Code className="w-6 h-6" />
  },
  
  // Data & Infrastructure
  {
    id: 11,
    title: "Linux RHEL Intensive Boot Camp",
    category: "data",
    icon: <Server className="w-6 h-6" />
  },
  {
    id: 12,
    title: "Data Collection & Data Wrangling",
    category: "data",
    icon: <Database className="w-6 h-6" />
  },
  {
    id: 13,
    title: "Exploratory Data Analysis",
    category: "data",
    icon: <Database className="w-6 h-6" />
  }
];

const categoryColors = {
  security: "bg-red-100 text-red-800 border-red-200",
  ml: "bg-blue-100 text-blue-800 border-blue-200",
  programming: "bg-green-100 text-green-800 border-green-200",
  data: "bg-purple-100 text-purple-800 border-purple-200"
};

const categoryLabels = {
  security: "Security & Compliance",
  ml: "Machine Learning & AI",
  programming: "Programming & Development",
  data: "Data & Infrastructure"
};

export default function Trainings() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="trainings" className="section-spacing bg-background">
      <div className="container">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-12 animate-on-scroll",
            titleVisible && "animated"
          )}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Professional Education & Trainings
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive certifications and specialized training programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainings.map((training, index) => (
            <TrainingCard key={training.id} training={training} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainingCard({ training, index }: { training: TrainingItem; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "animate-on-scroll",
        isVisible && "animated"
      )}
    >
      <div className="bg-card p-6 rounded-lg shadow-card border border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {training.icon}
          </div>
          {training.status && (
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
              {training.status}
            </span>
          )}
        </div>
        
        <div className="mb-3">
          <span className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-medium border",
            categoryColors[training.category]
          )}>
            {categoryLabels[training.category]}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-3">
          {training.title}
        </h3>
      </div>
    </div>
  );
}
