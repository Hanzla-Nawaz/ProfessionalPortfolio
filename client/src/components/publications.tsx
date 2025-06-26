import { ExternalLink, Calendar, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const publications = [
  // Note: This section can be updated when you have published research papers
  // For now, we'll focus on your project contributions and professional work
];

const achievements = [
  {
    id: 1,
    title: "NASA Space Apps Challenge 2024",
    type: "Hackathon Winner",
    description: "Developed innovative space data analysis solution recognized for technical excellence and practical applicability.",
    badge: "Winner"
  },
  {
    id: 2,
    title: "Meta Hacker Cup 2024",
    type: "Programming Competition",
    description: "Advanced to regional finals demonstrating strong algorithmic problem-solving skills.",
    badge: "Finalist"
  },
  {
    id: 3,
    title: "Omdena AI for Good Projects",
    type: "Global Collaboration",
    description: "Led successful AI initiatives addressing real-world challenges in healthcare and misinformation detection.",
    badge: "Lead Contributor"
  }
];

export default function Publications() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="publications" className="section-spacing">
      <div className="container">
        <div
          ref={titleRef}
          className={cn(
            "text-center mb-12 animate-on-scroll",
            titleVisible && "animated"
          )}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Professional Achievements
          </h2>
          <p className="text-lg text-muted-foreground">
            Recognition and notable contributions in AI/ML and cybersecurity
          </p>
        </div>

        {/* Publications Section */}
        {publications.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-8">Publications</h3>
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <PublicationCard key={pub.id} publication={pub} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Achievements Section */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-8">Notable Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PublicationCard({ publication, index }: { publication: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Card
      ref={ref}
      className={cn(
        "hover:shadow-lg transition-all duration-300 animate-on-scroll",
        isVisible && "animated"
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-card-foreground mb-2 leading-tight">
              {publication.title}
            </h4>
            <p className="text-muted-foreground text-sm mb-2">
              {publication.authors}
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-primary font-medium">{publication.venue}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{publication.year}</span>
              <Badge variant={publication.status === "Published" ? "default" : "secondary"}>
                {publication.status}
              </Badge>
              {publication.impact && (
                <Badge variant="outline" className="text-xs">
                  {publication.impact}
                </Badge>
              )}
            </div>
          </div>
          {publication.citations > 0 && (
            <div className="text-center ml-4">
              <div className="text-lg font-bold text-primary">{publication.citations}</div>
              <div className="text-xs text-muted-foreground">Citations</div>
            </div>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {publication.abstract}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {publication.keywords.map((keyword: string, keyIndex: number) => (
            <Badge key={keyIndex} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(publication.url, "_blank")}
        >
          <ExternalLink className="mr-2 h-3 w-3" />
          Read Paper
        </Button>
      </CardContent>
    </Card>
  );
}

function AchievementCard({ achievement, index }: { achievement: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Card
      ref={ref}
      className={cn(
        "text-center hover:shadow-lg hover:scale-105 transition-all duration-300 animate-on-scroll",
        isVisible && "animated"
      )}
    >
      <CardContent className="p-6">
        <Award className="h-8 w-8 text-primary mx-auto mb-4" />
        <Badge className="mb-3" variant="secondary">
          {achievement.badge}
        </Badge>
        <h4 className="text-lg font-semibold text-card-foreground mb-2">
          {achievement.title}
        </h4>
        <p className="text-sm text-muted-foreground mb-3">
          {achievement.type}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {achievement.description}
        </p>
      </CardContent>
    </Card>
  );
}