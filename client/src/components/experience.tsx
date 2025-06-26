import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

interface ExperienceItem {
  id: number;
  period: string;
  title: string;
  company: string;
  description: string;
  side: "left" | "right";
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    period: "April 2025 - Present",
    title: "AI Engineer",
    company: "Xeven Solutions | Lahore, Pakistan",
    description: "Building LLM-powered applications using OpenAI APIs, implementing RAG pipelines with 30% accuracy improvement, and achieving 99.8% system uptime.",
    side: "left"
  },
  {
    id: 2,
    period: "Nov 2023 - Oct 2024",
    title: "Machine Learning Engineer",
    company: "Omdena | Remote",
    description: "Automated TB case data preprocessing (50% effort reduction), developed predictive models with 15% accuracy improvement for public health interventions.",
    side: "right"
  },
  {
    id: 3,
    period: "Jan 2021 - Aug 2022",
    title: "Cybersecurity Analyst",
    company: "Ghanimah Labs | Lahore, Pakistan",
    description: "Led ISO 27001 implementations, designed secure OT/IT architectures, and reduced vulnerabilities by 40% through comprehensive risk assessments.",
    side: "left"
  }
];

export default function Experience() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="experience" className="section-spacing bg-muted">
      <div className="container">
        <div
          ref={titleRef}
          className={cn(
            "text-center mb-12 animate-on-scroll",
            titleVisible && "animated"
          )}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            My professional journey in AI, ML, and cybersecurity roles.
          </p>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-px top-0 bottom-0 w-0.5 bg-primary"></div>
          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <TimelineItem key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ experience, index }: { experience: ExperienceItem; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "relative animate-on-scroll",
        isVisible && "animated"
      )}
    >
      <div className="flex items-center lg:justify-center">
        <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-3 h-3 bg-primary rounded-full border-4 border-background"></div>
      </div>
      <div className="ml-12 lg:ml-0 lg:grid lg:grid-cols-2 lg:gap-8">
        <div
          className={cn(
            experience.side === "right" && "lg:col-start-2 lg:pl-8",
            experience.side === "left" && "lg:text-right lg:pr-8"
          )}
        >
          <div className="bg-card p-6 rounded-lg shadow-card border border-border hover:shadow-lg transition-shadow duration-300">
            <div className="text-sm text-primary font-medium mb-1">
              {experience.period}
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {experience.title}
            </h3>
            <p className="text-muted-foreground mb-3">
              {experience.company}
            </p>
            <p className="text-sm text-muted-foreground">
              {experience.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
