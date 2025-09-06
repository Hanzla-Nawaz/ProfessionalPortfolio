import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const volunteerWork = [
  {
    id: 1,
    title: "Section Leader Mentor - Stanford University",
    role: "Mentor",
    description: "Code in Place is a free, human-centered, intro-to-coding course from Stanford University aiming to offer the highest quality free coding course to many students from around the world. Section leader mentors meet multiple times a week to provide students with one-on-one help, and also provide covers for sections. This section leader mentor has successfully supported students through the first half of Stanford's flagship intro to Python course, CS106A. Section leader mentors gain interpersonal skills, practice engaging pedagogy, and demonstrate their mastery of basic Python principles.",
    image: "https://github.com/Hanzla-Nawaz/ProfessionalPortfolio/blob/main/client/public/images/stanford.svg",
    credentialUrl: "https://digitalcredential.stanford.edu/check/D06E68630B9A74AC34268A5CD909C7DE855E5202777D399588E12EBF741530C7RjNrbWpnaHNNdTBvWFpqNjNPK3dPWVg5SVJuZXVPMTU5L2MxckhtRzlGZmlWZFhx"
  },
  {
    id: 2,
    title: "Omdena Global AI Collaborations",
    role: "Machine Learning Engineer",
    description: "Collaborated on AI-for-good projects including tuberculosis prediction in Nigeria and misinformation detection in Nepal, working with international teams to solve real-world problems.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: 3,
    title: "Hackathons & Competitions",
    role: "Participant & Contributor",
    description: "Active participant in NASA Space Apps Challenge 2024 and Llama 3 Hackathon, developing innovative solutions for space data analysis and open-source chatbot systems.",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  },

];

export default function Volunteer() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="volunteer" className="section-spacing">
      <div className="container">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
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
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "animate-on-scroll",
            isVisible && "animated"
          )}
        >
          <div className="flex items-start space-x-4 mb-4">
            <div className="flex-shrink-0">
              <img
                src={work.image}
                alt={`Volunteer work: ${work.title} - ${work.role}`}
                className="w-16 h-16 rounded-lg object-cover"
                role="img"
                aria-label={`Volunteer work: ${work.title} as ${work.role}`}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {work.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {work.role}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {work.description}
              </p>
            </div>
          </div>
          
          {work.credentialUrl && (
            <div className="mt-4 pt-4 border-t border-border">
              <a
                href={work.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                View Credential
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
