import { useState } from "react";
import { ExternalLink, Github, FileText, Upload, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "Data Science Assistant Toolkit (DSATK)",
    description: "Comprehensive Streamlit application for automated data science workflows including EDA, feature engineering, and model deployment with 50% pipeline time reduction.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "https://github.com/Hanzla-Nawaz/DSATK",
    githubUrl: "https://github.com/Hanzla-Nawaz/DSATK",
    docsUrl: "https://github.com/Hanzla-Nawaz/DSATK/blob/main/README.md",
    interactive: false,
    technologies: ["Python", "Streamlit", "Scikit-learn", "Pandas", "MLflow"],
    impact: "Automated data science workflows with comprehensive EDA and model deployment"
  },
  {
    id: 2,
    title: "SpaceX Launch Data Analysis & Prediction",
    description: "Comprehensive analysis of Falcon 9 launches with Random Forest and XGBoost models achieving 83% accuracy in predicting landing success with interactive dashboard.",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "https://github.com/Hanzla-Nawaz/SpaceX-Analysis",
    githubUrl: "https://github.com/Hanzla-Nawaz/SpaceX-Analysis",
    docsUrl: "https://github.com/Hanzla-Nawaz/SpaceX-Analysis/blob/main/README.md",
    interactive: false,
    technologies: ["Python", "Random Forest", "XGBoost", "Plotly", "Data Analysis"],
    impact: "Comprehensive analysis with ML models achieving high prediction accuracy"
  },
  {
    id: 3,
    title: "IoT Medical Security System",
    description: "Privacy-preserving healthcare IoT security solution using federated learning across 5 client sites with hybrid Transformer-CNN model achieving 92% accuracy.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "#",
    githubUrl: "#",
    docsUrl: "#",
    interactive: false,
    technologies: ["TensorFlow", "Federated Learning", "LoRA", "Differential Privacy", "MAML"],
    impact: "Privacy-preserving security solution with advanced ML techniques"
  },
  {
    id: 4,
    title: "NutriVision: AI Nutrition Analyzer",
    description: "Vision Transformer-based nutrition analysis system with 89% ingredient classification accuracy and real-time nutritional breakdowns via Gradio interface.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "#",
    githubUrl: "#",
    docsUrl: "#",
    interactive: true,
    demoType: "image",
    technologies: ["Vision Transformers", "Gradio", "REST APIs", "Computer Vision"],
    impact: "Real-time nutrition analysis with Vision Transformer technology"
  },
  {
    id: 5,
    title: "Automated Meeting Minutes Generator",
    description: "End-to-end meeting transcription and summarization using Whisper v3 and Mistral 7B with 4-bit quantization, reducing manual note-taking by 65%.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "#",
    githubUrl: "#",
    docsUrl: "#",
    interactive: true,
    demoType: "audio",
    technologies: ["Whisper v3", "Mistral 7B", "4-bit Quantization", "NLP"],
    impact: "Automated meeting transcription and summarization using state-of-the-art models"
  },
  {
    id: 6,
    title: "Advanced ML-Powered SOC Operations",
    description: "Custom SIEM integration with Transformer-CNN anomaly detection models reducing false positives by 20% for 24/7 security monitoring.",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "#",
    githubUrl: "#",
    docsUrl: "#",
    interactive: false,
    technologies: ["Wazuh", "Security Onion", "Python Analytics", "Transformer-CNN"],
    impact: "Enhanced security monitoring with ML-powered anomaly detection"
  }
];

export default function Projects() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="projects" className="section-spacing">
      <div className="container">
        <div
          ref={titleRef}
          className={cn(
            "text-left mb-12 animate-on-scroll",
            titleVisible && "animated"
          )}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore my latest AI/ML and cybersecurity projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDemo = () => {
    if (project.interactive && selectedFile) {
      // In a real implementation, this would process the file
      alert(`Analyzing ${selectedFile.name}... This is a demo implementation.`);
    }
  };

  return (
    <Card
      ref={ref}
      className={cn(
        "overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-on-scroll",
        isVisible && "animated"
      )}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies?.map((tech: string, techIndex: number) => (
            <Badge key={techIndex} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        
        {/* Impact */}
        {project.impact && (
          <div className="bg-primary/10 text-primary text-xs p-2 rounded mb-4 font-medium">
            🎯 {project.impact}
          </div>
        )}

        {/* Interactive ML Demo Widget */}
        {project.interactive && (
          <div className="bg-muted p-4 rounded-lg mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">
              Try the Demo:
            </h4>
            <div className="flex flex-col gap-2">
              <Input
                type="file"
                accept={project.demoType === "image" ? "image/*" : "audio/*"}
                onChange={handleFileUpload}
                className="text-xs"
              />
              <Button
                size="sm"
                variant="secondary"
                onClick={handleDemo}
                disabled={!selectedFile}
                className="w-full"
              >
                <Play className="mr-2 h-3 w-3" />
                {project.demoType === "image" ? "Analyze Nutrition" : "Generate Minutes"}
              </Button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Upload {project.demoType === "image" ? "a food image" : "an audio file"} to see {project.demoType === "image" ? "nutritional analysis" : "meeting minutes"}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={() => window.open(project.demoUrl, "_blank")}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Live Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => window.open(project.githubUrl, "_blank")}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => window.open(project.docsUrl, "_blank")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Documentation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
