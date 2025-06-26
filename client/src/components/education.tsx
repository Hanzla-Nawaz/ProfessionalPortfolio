import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

interface EducationItem {
  id: number;
  period: string;
  degree: string;
  institution: string;
  description: string;
  side: "left" | "right";
}

const education: EducationItem[] = [
  {
    id: 1,
    period: "2020 - 2024",
    degree: "Bachelor of Science in Artificial Intelligence",
    institution: "Superior University | Lahore, Pakistan",
    description: "GPA: 3.3/4.0 - Comprehensive study of AI, machine learning, deep learning, and data science with hands-on project experience.",
    side: "left"
  }
];

export default function Education() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="education" className="section-spacing bg-muted">
      <div className="container">
        <div
          ref={titleRef}
          className={cn(
            "text-center mb-12 animate-on-scroll",
            titleVisible && "animated"
          )}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Education
          </h2>
          <p className="text-lg text-muted-foreground">
            My academic background and qualifications
          </p>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-px top-0 bottom-0 w-0.5 bg-primary"></div>
          {/* Timeline items */}
          <div className="space-y-12">
            {education.map((edu, index) => (
              <TimelineItem key={edu.id} education={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ education, index }: { education: EducationItem; index: number }) {
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
            education.side === "right" && "lg:col-start-2 lg:pl-8",
            education.side === "left" && "lg:text-right lg:pr-8"
          )}
        >
          <div className="bg-card p-6 rounded-lg shadow-card border border-border hover:shadow-lg transition-shadow duration-300">
            <div className="text-sm text-primary font-medium mb-1">
              {education.period}
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {education.degree}
            </h3>
            <p className="text-muted-foreground mb-3">
              {education.institution}
            </p>
            <p className="text-sm text-muted-foreground">
              {education.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 