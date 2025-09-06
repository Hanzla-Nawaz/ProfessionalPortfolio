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
    title: "Diabetes Prediction — BRFSS 2015 Health Indicators",
    description: "Advanced healthcare ML project predicting diabetes using 253K+ health records with Neural Networks, XGBoost, and ensemble methods. Achieved 87.4% accuracy using 22 health indicators including BMI, blood pressure, and lifestyle factors.",
    image: "https://hospitalsmagazine.com/wp-content/uploads/2024/03/diabetes-.jpg",
    demoUrl: "https://www.kaggle.com/code/hanzlanawaz/diabetes-health-prediction-using-anns",
    githubUrl: "https://www.kaggle.com/code/hanzlanawaz/diabetes-health-prediction-using-anns",
    docsUrl: "https://www.kaggle.com/code/hanzlanawaz/diabetes-health-prediction-using-anns",
    interactive: true,
    demoType: "kaggle",
    technologies: ["Python", "Keras", "XGBoost", "Scikit-learn", "Pandas", "Neural Networks", "Healthcare ML"],
    impact: "Healthcare ML solution with 87.4% diabetes prediction accuracy using 253K+ health records"
  },
  {
    id: 2,
    title: "Lung X-Ray Classification — EfficientNetB4",
    description: "Computer vision breakthrough in medical imaging using transfer learning with EfficientNetB4. Achieved 94.1% accuracy classifying chest X-rays into Normal, Viral Pneumonia, and Lung Opacity with advanced preprocessing and data augmentation.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "https://www.kaggle.com/code/hanzlanawaz/lung-disease-efficientnetb4-accuracy-94",
    githubUrl: "https://www.kaggle.com/code/hanzlanawaz/lung-disease-efficientnetb4-accuracy-94",
    docsUrl: "https://www.kaggle.com/code/hanzlanawaz/lung-disease-efficientnetb4-accuracy-94",
    interactive: true,
    demoType: "kaggle",
    technologies: ["TensorFlow", "EfficientNetB4", "Computer Vision", "Medical Imaging", "CLAHE", "Transfer Learning"],
    impact: "Medical imaging AI achieving 94.1% accuracy in lung disease classification using advanced CV techniques"
  },
  {
    id: 3,
    title: "Breast Cancer Classification — Wisconsin Diagnostic Dataset",
    description: "Medical diagnostics breakthrough using machine learning to classify breast tumors as malignant or benign. Achieved 99.12% accuracy with SVM and XGBoost models using 30 diagnostic features from the Wisconsin dataset.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "https://www.kaggle.com/code/hanzlanawaz/99-breast-cancer-prediction-using-xgboost",
    githubUrl: "https://www.kaggle.com/code/hanzlanawaz/99-breast-cancer-prediction-using-xgboost",
    docsUrl: "https://www.kaggle.com/code/hanzlanawaz/99-breast-cancer-prediction-using-xgboost",
    interactive: true,
    demoType: "kaggle",
    technologies: ["Python", "SVM", "XGBoost", "Random Forest", "Decision Trees", "Scikit-learn", "Medical Diagnostics"],
    impact: "Medical diagnostics AI achieving 99.12% accuracy in breast cancer classification using ensemble ML methods"
  },
  {
    id: 4,
    title: "Melanoma Cancer Prediction — Dermoscopic Image Classification",
    description: "Computer vision breakthrough in dermatology using EfficientNetB0 for skin lesion classification. Achieved 92.3% accuracy in detecting malignant vs benign melanoma from dermoscopic images with advanced data augmentation and transfer learning.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "https://colab.research.google.com/drive/1RvmyZhmD-hT9NpZ8u8bEoyWp28yl0iR0?usp=sharing",
    githubUrl: "https://colab.research.google.com/drive/1RvmyZhmD-hT9NpZ8u8bEoyWp28yl0iR0?usp=sharing",
    docsUrl: "https://colab.research.google.com/drive/1RvmyZhmD-hT9NpZ8u8bEoyWp28yl0iR0?usp=sharing",
    interactive: true,
    demoType: "colab",
    technologies: ["TensorFlow", "EfficientNetB0", "Computer Vision", "Medical Imaging", "Transfer Learning", "Data Augmentation"],
    impact: "Dermatology AI achieving 92.3% accuracy in melanoma detection using advanced computer vision techniques"
  },


  {
    id: 5,
    title: "Inventory Management System",
    description: "Full-stack inventory management solution with real-time tracking, automated reordering, and analytics dashboard. Features include barcode scanning, supplier management, and predictive inventory optimization using ML.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "https://github.com/Hanzla-Nawaz/Inventory-System",
    githubUrl: "https://github.com/Hanzla-Nawaz/Inventory-System",
    docsUrl: "https://github.com/Hanzla-Nawaz/Inventory-System/blob/main/README.md",
    interactive: false,
    technologies: ["React", "Node.js", "PostgreSQL", "Barcode API", "ML Prediction", "Real-time Updates"],
    impact: "Comprehensive inventory management with ML-powered optimization and real-time tracking"
  },
  {
    id: 6,
    title: "Misinformation Detection System",
    description: "AI-powered misinformation detection platform using NLP and deep learning to identify fake news and misleading content. Achieved 91% accuracy in detecting misinformation across multiple languages and content types.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "https://github.com/Hanzla-Nawaz/Misinfo-Detection",
    githubUrl: "https://github.com/Hanzla-Nawaz/Misinfo-Detection",
    docsUrl: "https://github.com/Hanzla-Nawaz/Misinfo-Detection/blob/main/README.md",
    interactive: true,
    demoType: "text",
    technologies: ["Python", "NLP", "BERT", "Deep Learning", "FastAPI", "Multi-language Support"],
    impact: "AI misinformation detection achieving 91% accuracy across multiple languages and content types"
  },
  {
    id: 7,
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
    id: 8,
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
    id: 9,
    title: "Automated Meeting Minutes Generator",
    description: "End-to-end meeting transcription and summarization using Whisper v3 and Mistral 7B with 4-bit quantization, reducing manual note-taking by 65%.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "https://medium.com/@hanzlanawaz/meeting-minutes-reimagined-automating-documentation-with-whisper-mistral-and-open-source-ai-5201910367af",
    githubUrl: "#",
    docsUrl: "#",
    interactive: true,
    demoType: "audio",
    technologies: ["Whisper v3", "Mistral 7B", "4-bit Quantization", "NLP"],
    impact: "Automated meeting transcription and summarization using state-of-the-art models"
  },
  {
    id: 10,
    title: "TaskMaker AI — Intelligent Task Completion",
    description: "A LangGraph-powered AI assistant that helps you complete tasks with automatic success criteria evaluation and feedback loops. Built with modern AI technologies and deployed for seamless user experience.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "https://huggingface.co/spaces/NawazHanzla/taskmaker-ai",
    githubUrl: "https://huggingface.co/spaces/NawazHanzla/taskmaker-ai",
    docsUrl: "https://huggingface.co/spaces/NawazHanzla/taskmaker-ai",
    interactive: true,
    demoType: "huggingface",
    technologies: ["LangGraph", "AI Assistant", "Task Automation", "Evaluation Systems", "Feedback Loops"],
    impact: "Intelligent task completion with automatic evaluation and feedback systems"
  },
  {
    id: 11,
    title: "NutriVision AI — Food Analysis System",
    description: "An AI-powered system that analyzes food images to provide detailed nutritional information using state-of-the-art computer vision and nutritional APIs.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    demoUrl: "https://huggingface.co/spaces/NawazHanzla/NutriVision-AI",
    githubUrl: "https://huggingface.co/spaces/NawazHanzla/NutriVision-AI",
    docsUrl: "https://huggingface.co/spaces/NawazHanzla/NutriVision-AI",
    interactive: true,
    demoType: "huggingface",
    technologies: ["Computer Vision", "Food Recognition", "Nutritional Analysis", "API Integration", "Image Processing"],
    impact: "AI-powered food analysis providing detailed nutritional information from images"
  },
];

export default function Projects() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="projects" className="section-spacing">
      <div className="container">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
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
      ref={ref as React.RefObject<HTMLDivElement>}
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
              {project.demoType === "huggingface" ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => window.open(project.demoUrl, "_blank")}
                  className="w-full"
                >
                  <Play className="mr-2 h-3 w-3" />
                  Launch App
                </Button>
              ) : (
                <>
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
                </>
              )}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {project.demoType === "huggingface" 
                ? "Click to launch the interactive Hugging Face app" 
                : `Upload ${project.demoType === "image" ? "a food image" : "an audio file"} to see ${project.demoType === "image" ? "nutritional analysis" : "meeting minutes"}`
              }
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
