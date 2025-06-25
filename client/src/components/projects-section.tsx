import { useState, useCallback, useMemo } from "react";
import { ExternalLink, Github, Filter, Star, Calendar, Zap } from "lucide-react";
import { Link } from "wouter";
import { projectsData } from "@/lib/data";

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(projectsData.flatMap(p => p.technologies.map(t => t.name)))];
    return cats.slice(0, 6); // Limit to prevent overflow
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "All") return projectsData;
    return projectsData.filter(project => 
      project.technologies.some(tech => tech.name === selectedFilter)
    );
  }, [selectedFilter]);

  const handleFilterChange = useCallback((filter: string) => {
    setSelectedFilter(filter);
  }, []);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Featured Work
          </div>
          <h2 className="text-responsive-2xl font-black text-gray-900 mb-6 tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-responsive-base text-gray-600 max-w-2xl mx-auto">
            AI and machine learning solutions that drive real-world impact across various industries
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-slide-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 p-1 bg-white rounded-xl shadow-sm border border-gray-200">
            <Filter className="w-4 h-4 text-gray-400 ml-3" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedFilter === category
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className="project-card group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl transition-all duration-500"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4 text-gray-700" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <Link 
                        href={project.demoUrl} 
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4 text-gray-700" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">2024</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${tech.color} skill-card`}
                    >
                      {tech.name}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 group/btn bg-gray-900 hover:bg-gray-800 text-white text-center py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
                      GitHub
                    </a>
                  )}
                  {project.demoUrl && (
                    project.demoUrl.startsWith('/') ? (
                      <Link 
                        href={project.demoUrl} 
                        className="flex-1 group/btn border-2 border-primary text-primary hover:bg-primary hover:text-white text-center py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                      >
                        <Zap className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                        Live Demo
                      </Link>
                    ) : (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group/btn border-2 border-primary text-primary hover:bg-primary hover:text-white text-center py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                        Live Demo
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
