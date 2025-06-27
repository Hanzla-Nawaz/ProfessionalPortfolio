import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// Helper to clean up filenames for display
function formatCertificateName(filename: string) {
  return filename
    .replace(/[-_]/g, " ")
    .replace(/\.pdf$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function Certificates() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const [certificates, setCertificates] = useState<string[]>([]);

  useEffect(() => {
    // List of all certificate PDFs in public/certificates (exact filenames)
    setCertificates([
      "CS50x Puzzle Day 2025.pdf",
      "Mckinsey.pdf",
      "NASA Space Apps Challenge.pdf",
      "R Programming- 2022-02-20.pdf",
      "Python Gamma 01_1 - 2022-07-10.pdf",
      "Cyber Security Essentials Revisit after - 2022-02-14.pdf",
      "Machine Learning - Unsupervised - 2022-07-16.pdf",
      "Probability for Emerging Pathways - 2022-07-16.pdf",
      "Python (Primer , Alpha, Beta ) - 2022-01-29.pdf",
      "Foundations of Artificial Intelligence - 2022-02-08.pdf",
      "Certified Information System Security - 2022-02-11.pdf",
      "ISO 27001, ISO 27017, ISO 27018 Lead - 2022-02-18.pdf",
      "Linux Level 1 in Urdu - 2022-01-25.pdf",
      "Machine Learning - Supervised Learning - 2022-07-14.pdf",
      "RHEL Intensive - 2022-07-16.pdf",
      "hanzla_nawaz_alp_2024_certificate_of_completion.pdf",
      "1.Professional data Science.pdf",
      "2.DataScienceProfessionalCertificateV2_Badge20230302-28-1q7ose2.pdf",
      "Databases and SQL for Data Science with Python.pdf",
      "Applied Data Science Capstone.pdf",
      "Data Visualization.pdf",
      "Data Analysis.pdf",
      "Project data science.pdf",
      "Python for datascience.pdf",
      "Data Science Metodology.pdf",
      "Tools For Data Science.pdf",
      "Introduction to Deep Learning & Neural Networks.pdf",
      "declaracio_titol_master_2022.pdf",
      "Coursera Machine Learning.pdf",
    ]);
  }, []);

  return (
    <section id="certificates" className="section-spacing bg-muted min-h-screen">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {certificates.map((filename, index) => (
            <CertificateCard key={filename} filename={filename} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificateCard({ filename, index }: { filename: string; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const displayName = formatCertificateName(filename);
  const fileUrl = `/certificates/${encodeURIComponent(filename)}`;

  return (
    <Card
      ref={ref}
      className={cn(
        "flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer animate-on-scroll",
        isVisible && "animated"
      )}
    >
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-16 h-16 mb-4 flex items-center justify-center bg-primary/10 rounded-full">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7V3h10v4M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2">
          {displayName}
        </h3>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
        >
          View Certificate
        </a>
      </CardContent>
    </Card>
  );
}
