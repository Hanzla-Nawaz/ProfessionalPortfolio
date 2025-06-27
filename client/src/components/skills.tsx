import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Database, 
  Shield, 
  Code, 
  Cloud, 
  Cpu,
  BarChart3,
  GitBranch
} from "lucide-react";

const skillCategories = [
  {
    id: 1,
    title: "AI & Machine Learning",
    icon: Brain,
    color: "text-blue-600 dark:text-blue-400",
    skills: [
      { name: "PyTorch", level: 95 },
      { name: "TensorFlow", level: 90 },
      { name: "Scikit-learn", level: 95 },
      { name: "Hugging Face", level: 90 },
      { name: "LangChain / RAG", level: 90 },
      { name: "OpenAI GPT / LLMs", level: 90 },
      { name: "LoRA / BitsAndBytes", level: 85 },
      { name: "Whisper", level: 85 },
      { name: "Vision Transformers (ViT)", level: 85 },
      { name: "MLOps", level: 85 }
    ]
  },
  {
    id: 2,
    title: "Backend & APIs",
    icon: Code,
    color: "text-green-600 dark:text-green-400",
    skills: [
      { name: "Python", level: 95 },
      { name: "FastAPI", level: 90 },
      { name: "Flask", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "SQL / NoSQL", level: 85 },
      { name: "HTML/CSS", level: 80 }
    ]
  },
  {
    id: 3,
    title: "Cloud, Data & DevOps",
    icon: Cloud,
    color: "text-purple-600 dark:text-purple-400",
    skills: [
      { name: "AWS / GCP", level: 85 },
      { name: "Docker", level: 90 },
      { name: "CI/CD", level: 85 },
      { name: "MLflow", level: 85 },
      { name: "PostgreSQL / MS SQL", level: 90 },
      { name: "Pinecone / Qdrant", level: 85 },
      { name: "MongoDB", level: 80 }
    ]
  },
  {
    id: 4,
    title: "Data Science & Analytics",
    icon: BarChart3,
    color: "text-orange-600 dark:text-orange-400",
    skills: [
      { name: "Pandas", level: 95 },
      { name: "NumPy", level: 95 },
      { name: "Plotly", level: 85 },
      { name: "Data Visualization", level: 85 },
      { name: "Feature Engineering", level: 85 }
    ]
  },
  {
    id: 5,
    title: "Cybersecurity & Operations",
    icon: Shield,
    color: "text-red-600 dark:text-red-400",
    skills: [
      { name: "ISO 27001 / 27017 / 27018", level: 90 },
      { name: "IEC 62443", level: 85 },
      { name: "SIEM / SOC", level: 85 },
      { name: "Penetration Testing", level: 80 },
      { name: "Risk Assessment", level: 90 },
      { name: "Incident Response", level: 85 },
      { name: "Vulnerability Assessment", level: 85 }
    ]
  },
  {
    id: 6,
    title: "Tools & Soft Skills",
    icon: GitBranch,
    color: "text-indigo-600 dark:text-indigo-400",
    skills: [
      { name: "Git", level: 90 },
      { name: "MLflow", level: 85 },
      { name: "Gradio", level: 80 },
      { name: "Metasploit / Nessus", level: 75 },
      { name: "Leadership & Collaboration", level: 90 },
      { name: "Problem Solving", level: 90 },
      { name: "Technical Writing", level: 85 }
    ]
  }
];

export default function Skills() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="skills" className="section-spacing bg-muted/30">
      <div className="container">
        <div
          ref={titleRef}
          className={cn(
            "text-center mb-12 animate-on-scroll",
            titleVisible && "animated"
          )}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Technical Expertise
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive skill set across AI, cybersecurity, and software engineering
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category, index }: { category: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = category.icon;

  return (
    <Card
      ref={ref}
      className={cn(
        "h-full hover:shadow-lg transition-all duration-300 animate-on-scroll",
        isVisible && "animated"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Icon className={cn("h-6 w-6 mr-3", category.color)} />
          <h3 className="text-lg font-semibold text-card-foreground">
            {category.title}
          </h3>
        </div>
        <div className="space-y-3">
          {category.skills.map((skill: any, skillIndex: number) => (
            <div key={skillIndex}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-muted-foreground">
                  {skill.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${skillIndex * 100}ms`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}