import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { smoothScrollTo, downloadResume } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { FaLinkedin, FaGithub, FaKaggle, FaTwitter } from "react-icons/fa";
import { useState, useEffect } from "react";

const roles = [
  "AI Engineer",
  "Machine Learning Engineer", 
  "Data Scientist",
  "LLM Engineer",
  "Generative AI Expert"
];

export default function Hero() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    const typeText = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (!isDeleting) {
        if (currentText.length < currentRole.length) {
          setTimeout(() => {
            setCurrentText(currentRole.slice(0, currentText.length + 1));
          }, typingSpeed);
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      } else {
        if (currentText.length > 0) {
          setTimeout(() => {
            setCurrentText(currentText.slice(0, -1));
          }, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <section id="about" className="section-spacing pt-20 lg:pt-32">
      <div className="container">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div
            ref={leftRef}
            className={cn(
              "animate-on-scroll",
              leftVisible && "animated"
            )}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
              HANZLA <span className="gradient-text">NAWAZ</span>
            </h1>
            <h2 className="text-xl lg:text-2xl font-semibold text-muted-foreground mb-6 min-h-[2.5rem]">
              {currentText}
              <span className="animate-pulse">|</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Results-driven AI Engineer with 2+ years of experience designing, developing, and deploying scalable machine learning products and LLM applications. Proficient in Python, FastAPI, and MLOps to accelerate product delivery. Effective technical leader skilled in cross-functional collaboration to transform business requirements into AI solutions. Specialized in PyTorch, TensorFlow, and modern AI frameworks with expertise in cybersecurity and computer vision.
            </p>
            {/* Social Links Row */}
            <div className="flex gap-4 mb-8">
              <a href="https://www.linkedin.com/in/hanzlawatto" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-2xl" title="LinkedIn"><FaLinkedin /></a>
              <a href="https://github.com/Hanzla-Nawaz" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-2xl" title="GitHub"><FaGithub /></a>
              <a href="https://www.kaggle.com/hanzlanawaz" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-2xl" title="Kaggle"><FaKaggle /></a>
              <a href="https://x.com/HanzlaWatto" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 text-2xl" title="X (Twitter)"><FaTwitter /></a>
            </div>
            
            {/* Key Expertise Areas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-muted/50 rounded-lg border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">AI/ML</div>
                <div className="text-sm text-muted-foreground">Engineering</div>
                <div className="text-xs text-muted-foreground">PyTorch, TensorFlow, LLMs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Security</div>
                <div className="text-sm text-muted-foreground">Operations</div>
                <div className="text-xs text-muted-foreground">ISO 27001, SIEM, SOC</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Research</div>
                <div className="text-sm text-muted-foreground">Innovation</div>
                <div className="text-xs text-muted-foreground">Global collaborations</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={downloadResume}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                onClick={() => smoothScrollTo("projects")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            ref={rightRef}
            className={cn(
              "mt-12 lg:mt-0 flex justify-center animate-on-scroll",
              rightVisible && "animated"
            )}
          >
            <img
              src="/images/profile.jpg"
              alt="Hanzla Nawaz - AI/ML Engineer"
              className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover shadow-2xl border-4 border-background mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
