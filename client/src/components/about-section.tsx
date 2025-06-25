import { useState, useEffect } from "react";
import { GraduationCap, Target, MapPin, Calendar, Award, Users } from "lucide-react";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Get to Know Me
          </div>
          <h2 className="text-responsive-2xl font-black text-gray-900 mb-6 tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-responsive-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Passionate about leveraging artificial intelligence and machine learning to solve real-world problems 
            and create meaningful impact across industries and communities.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Education Card */}
          <div className={`group bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-500 ${
            isVisible ? 'animate-slide-in' : 'opacity-0'
          }`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-primary rounded-xl group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
                Education
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-primary">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Bachelor of Science in Artificial Intelligence
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Award className="w-4 h-4" />
                    Superior University
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    September 2020 – December 2024
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    Lahore, Pakistan
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">GPA</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">3.3</span>
                        <span className="text-gray-500">/4.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Focus Card */}
          <div className={`group bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-500 ${
            isVisible ? 'animate-slide-in' : 'opacity-0'
          }`} style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-accent rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
                Professional Focus
              </h3>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: "Scalable ML Products",
                  description: "Building machine learning products and LLM-based applications that scale",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  title: "LLM Pipelines",
                  description: "End-to-end LLM pipelines and vector search solutions",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  title: "Backend Systems",
                  description: "High-performance backend systems with FastAPI and modern frameworks",
                  gradient: "from-indigo-500 to-blue-500"
                },
                {
                  title: "MLOps & Deployment",
                  description: "AI system deployment and operations at enterprise scale",
                  gradient: "from-green-500 to-teal-500"
                }
              ].map((focus, index) => (
                <div 
                  key={index}
                  className="group/item p-4 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${focus.gradient} mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200`}></div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 group-hover/item:text-primary transition-colors duration-200">
                        {focus.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {focus.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: "0.4s" }}>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 border border-blue-100">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Mission & Vision
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto text-lg">
              To bridge the gap between cutting-edge AI research and practical real-world applications, 
              creating solutions that enhance human capabilities and drive positive societal impact through 
              responsible and innovative technology development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
