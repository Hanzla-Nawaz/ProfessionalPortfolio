import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const volunteerWork = [
  {
    id: 1,
    title: "Omdena Global AI Collaborations",
    role: "Machine Learning Engineer",
    description: "Collaborated on AI-for-good projects including tuberculosis prediction in Nigeria and misinformation detection in Nepal, working with international teams to solve real-world problems.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: 2,
    title: "Hackathons & Competitions",
    role: "Participant & Contributor",
    description: "Active participant in NASA Space Apps Challenge 2024 and Llama 3 Hackathon, developing innovative solutions for space data analysis and open-source chatbot systems.",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  }
];

export default function Volunteer() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="volunteer" className="section-spacing">
      <div className="container">
        <div
          ref={titleRef}
          className={cn(
            "text-center mb-12 animate-on-scroll",
            titleVisible && "animated"
          )}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Volunteer & Community
          </h2>
          <p className="text-lg text-muted-foreground">
            Contributing to open source and community initiatives
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {volunteerWork.map((work, index) => (
            <VolunteerCard key={work.id} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VolunteerCard({ work, index }: { work: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <Card>
      <CardContent>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "flex items-start space-x-4 animate-on-scroll",
            isVisible && "animated"
          )}
        >
          <div className="flex-shrink-0">
            <img
              src={work.image}
              alt={`Volunteer work: ${work.title} - ${work.role}`}
              className="w-16 h-16 rounded-lg object-cover"
              role="img"
              aria-label={`Volunteer work: ${work.title} as ${work.role}`}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {work.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              {work.role}
            </p>
            <p className="text-muted-foreground text-sm">
              {work.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
