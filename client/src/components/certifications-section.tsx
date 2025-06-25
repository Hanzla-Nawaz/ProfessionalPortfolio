import { ExternalLink } from "lucide-react";
import { certificationsData, hackathonsData } from "@/lib/data";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Certifications & Training</h2>
          <p className="text-lg text-gray-600">Professional development and continuous learning</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsData.map((cert, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="text-center">
                <div className={`w-16 h-16 ${cert.bgColor} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{cert.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{cert.issuer} • {cert.date}</p>
                {cert.verificationUrl ? (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify Certificate
                  </a>
                ) : (
                  <div className="inline-block bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
                    Certificate Available
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Hackathons & Competitions</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {hackathonsData.map((hackathon, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className={`w-16 h-16 ${hackathon.bgColor} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{hackathon.badge}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{hackathon.title}</h4>
                <p className="text-gray-600">{hackathon.year} • {hackathon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
