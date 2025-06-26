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
      { name: "LangChain", level: 85 },
      { name: "OpenAI GPT", level: 90 }
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
      { name: "GraphQL", level: 75 }
    ]
  },
  {
    id: 3,
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "text-purple-600 dark:text-purple-400",
    skills: [
      { name: "AWS", level: 85 },
      { name: "GCP", level: 80 },
      { name: "Docker", level: 90 },
      { name: "MLflow", level: 85 },
      { name: "CI/CD", level: 80 },
      { name: "Kubernetes", level: 70 }
    ]
  },
  {
    id: 4,
    title: "Data & Analytics",
    icon: BarChart3,
    color: "text-orange-600 dark:text-orange-400",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Pandas", level: 95 },
      { name: "NumPy", level: 95 },
      { name: "Plotly", level: 85 },
      { name: "Vector DBs", level: 80 }
    ]
  },
  {
    id: 5,
    title: "Cybersecurity",
    icon: Shield,
    color: "text-red-600 dark:text-red-400",
    skills: [
      { name: "ISO 27001", level: 90 },
      { name: "IEC 62443", level: 85 },
      { name: "SIEM", level: 85 },
      { name: "Penetration Testing", level: 80 },
      { name: "Risk Assessment", level: 90 },
      { name: "SOC Operations", level: 85 }
    ]
  },
  {
    id: 6,
    title: "Computer Vision",
    icon: Cpu,
    color: "text-indigo-600 dark:text-indigo-400",
    skills: [
      { name: "Vision Transformers", level: 85 },
      { name: "OpenCV", level: 90 },
      { name: "YOLO", level: 80 },
      { name: "Image Processing", level: 90 },
      { name: "Object Detection", level: 85 },
      { name: "OCR", level: 75 }
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