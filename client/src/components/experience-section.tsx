import { useState, useEffect } from "react";
import { Building, Calendar, MapPin, Award, TrendingUp } from "lucide-react";
import { experienceData } from "@/lib/data";

export default function ExperienceSection() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-20 lg:py-32 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Career Journey
          </div>
          <h2 className="text-responsive-2xl font-black text-gray-900 mb-6 tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>
          <p className="text-responsive-base text-gray-600 max-w-2xl mx-auto">
            Building AI solutions that make a difference across diverse industries and challenging projects
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-purple-400 to-gray-300 rounded-full"></div>
          
          <div className="space-y-12 lg:space-y-16">
            {experienceData.map((experience, index) => {
              const isVisible = visibleItems.has(index);
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  data-index={index}
                  className={`experience-card relative ${
                    isVisible ? 'animate-slide-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Mobile/Small screens layout */}
                  <div className="lg:hidden relative pl-8 border-l-2 border-primary">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 top-2"></div>
                    <ExperienceCard experience={experience} index={index} />
                  </div>

                  {/* Large screens timeline layout */}
                  <div className="hidden lg:block">
                    <div className={`flex items-center ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                      <div className={`w-1/2 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                        <ExperienceCard experience={experience} index={index} />
                      </div>
                      
                      {/* Timeline node */}
                      <div className="relative flex items-center justify-center">
                        <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-125 transition-transform duration-300">
                          <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                      </div>
                      
                      <div className="w-1/2"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience, index }: { experience: any; index: number }) {
  return (
    <div className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-500">
      {/* Company Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200 mb-2">
            {experience.title}
          </h3>
          <div className="flex items-center gap-2 text-primary font-semibold mb-2">
            <Building className="w-4 h-4" />
            {experience.company}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {experience.period}
            </div>
            {experience.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </div>
            )}
          </div>
        </div>
        
        {index === 0 && (
          <div className="mt-4 sm:mt-0 sm:ml-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <Award className="w-3 h-3" />
              Current
            </span>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="space-y-3">
        {experience.achievements.map((achievement: string, achievementIndex: number) => (
          <div 
            key={achievementIndex}
            className="flex items-start gap-3 group/achievement"
          >
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/achievement:scale-125 transition-transform duration-200"></div>
            <p className="text-gray-600 leading-relaxed group-hover/achievement:text-gray-800 transition-colors duration-200">
              {achievement}
            </p>
          </div>
        ))}
      </div>

      {/* Skills/Technologies used */}
      {experience.technologies && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech: string, techIndex: number) => (
              <span 
                key={techIndex}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-primary hover:text-white transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
