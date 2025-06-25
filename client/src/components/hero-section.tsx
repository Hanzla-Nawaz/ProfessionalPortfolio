import { useCallback, useState, useEffect } from "react";
import { ChevronDown, Sparkles, Brain, Code } from "lucide-react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    "AI/ML Engineer",
    "Machine Learning Engineer", 
    "Data Scientist",
    "LLM Specialist"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleViewWork = useCallback(() => {
    const element = document.querySelector("#projects");
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleGetInTouch = useCallback(() => {
    const element = document.querySelector("#contact");
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToNext = useCallback(() => {
    const element = document.querySelector("#about");
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Profile Image with enhanced styling */}
          <div className="mb-8 relative">
            <div className="relative inline-block">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
                alt="Hanzla Nawaz Professional Photo"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full mx-auto shadow-2xl object-cover border-4 border-white/80 backdrop-blur-sm"
              />
              <div className="absolute -inset-1 bg-gradient-primary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="absolute top-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Name with enhanced typography */}
          <h1 className="text-responsive-2xl font-black text-gray-900 mb-6 tracking-tight animate-fade-up">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Hanzla Nawaz
            </span>
          </h1>

          {/* Dynamic role with typing effect */}
          <div className="h-16 mb-8 flex items-center justify-center">
            <p className="text-responsive-lg text-gray-600 font-medium animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <span className="inline-flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-500" />
                <span className="transition-all duration-500 ease-in-out">
                  {roles[currentRole]}
                </span>
                <Sparkles className="w-5 h-5 text-purple-500 animate-pulse-slow" />
              </span>
            </p>
          </div>

          {/* Enhanced description */}
          <p className="text-responsive-base text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <span className="font-semibold text-gray-800">Results-driven AI/ML engineer</span> with 2+ years of experience designing and deploying 
            <span className="text-blue-600 font-medium"> scalable machine learning products</span>, 
            <span className="text-purple-600 font-medium"> LLM-based applications</span>, and 
            <span className="text-indigo-600 font-medium"> robust backend systems</span>. 
            Specialized in modern AI frameworks and cutting-edge LLM technologies.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-scale-in" style={{ animationDelay: "0.6s" }}>
            <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="text-responsive-lg font-bold text-blue-600">2+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="text-responsive-lg font-bold text-purple-600">15+</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="text-responsive-lg font-bold text-indigo-600">10+</div>
              <div className="text-sm text-gray-600">Technologies</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="text-responsive-lg font-bold text-pink-600">5+</div>
              <div className="text-sm text-gray-600">Certifications</div>
            </div>
          </div>

          {/* Enhanced buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <button
              onClick={handleViewWork}
              className="btn-primary group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Code className="w-5 h-5" />
                View My Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={handleGetInTouch}
              className="btn-secondary group"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Get In Touch
              </span>
            </button>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={scrollToNext}
            className="animate-bounce hover:animate-none transition-all duration-300 p-2 rounded-full hover:bg-white/20"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
