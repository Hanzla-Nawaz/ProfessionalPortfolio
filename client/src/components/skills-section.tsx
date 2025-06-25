import { useState, useEffect } from "react";
import { Code, Database, Brain, Cpu, Monitor, Zap } from "lucide-react";
import { skillsData } from "@/lib/data";

const categoryIcons = {
  "Programming Languages": Code,
  "Machine Learning": Brain,
  "Data Science": Database,
  "Web Development": Monitor,
  "Cloud & DevOps": Cpu,
  "Tools & Frameworks": Zap,
};

export default function SkillsSection() {
  const [visibleSkills, setVisibleSkills] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSkills(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillCards = document.querySelectorAll('.skill-category-card');
    skillCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20 lg:py-32 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            Technical Expertise
          </div>
          <h2 className="text-responsive-2xl font-black text-gray-900 mb-6 tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-responsive-base text-gray-600 max-w-2xl mx-auto">
            Technologies and frameworks I use to build scalable AI solutions and modern applications
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillsData.map((category, index) => {
            const IconComponent = categoryIcons[category.category as keyof typeof categoryIcons] || Code;
            const isVisible = visibleSkills.has(index);
            
            return (
              <div 
                key={index} 
                data-index={index}
                className={`skill-category-card group bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-500 ${
                  isVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-primary rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
                    {category.category}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className={`skill-card px-4 py-3 text-sm font-medium rounded-xl border ${skill.color} transition-all duration-300 hover:shadow-md cursor-default`}
                      style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{skill.name}</span>
                        <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skill Count */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{category.skills.length} technologies</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full ${
                            i < 4 ? 'bg-yellow-400' : 'bg-gray-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Professional Summary */}
        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: "0.8s" }}>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Proficiency</h3>
            <p className="text-gray-600 leading-relaxed">
              Specialized in building end-to-end AI/ML solutions with modern frameworks. 
              Experienced in deploying scalable applications using cloud technologies and DevOps practices. 
              Continuously learning and adapting to emerging technologies in the AI space.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
