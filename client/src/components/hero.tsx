import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { smoothScrollTo, downloadResume } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function Hero() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

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
            <h2 className="text-xl lg:text-2xl font-semibold text-muted-foreground mb-6">
              AI/ML Engineer | Machine Learning Engineer | Data Scientist
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Results-driven AI/ML engineer with 2+ years of experience designing and deploying 
              scalable machine learning products, LLM-based applications, and robust backend systems. 
              Specialized in PyTorch, TensorFlow, and MLOps tools with expertise in modern AI 
              frameworks and cybersecurity.
            </p>
            
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
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800"
              alt="Hanzla Nawaz - AI/ML Engineer"
              className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
