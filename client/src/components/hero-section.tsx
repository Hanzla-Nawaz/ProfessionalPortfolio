export default function HeroSection() {
  const handleViewWork = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetInTouch = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
              alt="Hanzla Nawaz Professional Photo"
              className="w-32 h-32 rounded-full mx-auto shadow-lg object-cover"
            />
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 animate-fade-up">
            Hanzla Nawaz
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            AI/ML Engineer | Machine Learning Engineer | Data Scientist
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Results-driven AI/ML engineer with 2+ years of experience designing and deploying scalable machine learning products, 
            LLM-based applications, and robust backend systems. Specialized in modern AI frameworks and LLM technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <button
              onClick={handleViewWork}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:transform hover:scale-105"
            >
              View My Work
            </button>
            <button
              onClick={handleGetInTouch}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
