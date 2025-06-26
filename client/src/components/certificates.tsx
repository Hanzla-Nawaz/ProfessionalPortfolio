import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const certificates = [
  {
    id: 1,
    title: "IBM Data Science Professional",
    date: "March 2023",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120",
    verificationUrl: "#"
  },
  {
    id: 2,
    title: "Generative AI with LLMs",
    date: "March 2024",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120",
    verificationUrl: "#"
  },
  {
    id: 3,
    title: "McKinsey Forward Program",
    date: "2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120",
    verificationUrl: "#"
  },
  {
    id: 4,
    title: "Cybersecurity Tools & Attacks",
    date: "May 2022",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120",
    verificationUrl: "#"
  }
];

export default function Certificates() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="certificates" className="section-spacing bg-muted">
      <div className="container">
        <div
          ref={titleRef}
          className={cn(
            "text-center mb-12 animate-on-scroll",
            titleVisible && "animated"
          )}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Certificates & Training
          </h2>
          <p className="text-lg text-muted-foreground">
            Professional certifications and continuous learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard key={cert.id} certificate={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificateCard({ certificate, index }: { certificate: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Card
      ref={ref}
      className={cn(
        "text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer animate-on-scroll",
        isVisible && "animated"
      )}
      onClick={() => window.open(certificate.verificationUrl, "_blank")}
    >
      <CardContent className="p-6">
        <img
          src={certificate.image}
          alt={certificate.title}
          className="mx-auto mb-4 h-20 object-contain rounded"
        />
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          {certificate.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {certificate.date}
        </p>
      </CardContent>
    </Card>
  );
}
