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
    id :1,
    period: "Sep 2025 - Present",
    title: "Machine Learning Engineer | Remote",
    company: "HYLY.AI",
    description: "•build scalable, production-ready AI systems improving reliability and performance.\n•	Integrated GCP Cloud Tracing across microservices, boosting debugging speed by 70% and reducing manual bug reporting by 60%.\n•	Built monitoring dashboards and automated alerting pipelines, enhancing visibility and incident response.\n•	Automated ML model evaluation and testing, ensuring continuous performance tracking and scalable deployment.\n•	Deployed and optimized LLMs and AI models, lowering system error rates by 15% and improving customer satisfaction.",
    side: "right"
  },
  {
    id: 2,
    period: "Jul 2024 - Sep 2025",
    title: "Machine Learning Engineer",
    company: "XEVEN SOLUTIONS (Pvt) Ltd. | Lahore, Pakistan",
    description: "• Built LLM-powered production services with FastAPI, OpenAI & open-source models; implemented RAG, embeddings, and vector search for domain retrieval.\n• Designed PostgreSQL and MS SQL schemas for logging, bot history, and audit; improved observability and reduced query latencies.\n• Optimized inference pipelines (QLoRA/LoRA) to reduce serving costs and improve throughput for healthcare NLP tasks.\n• Worked with product and DevOps to containerize services (Docker) and prepare Kubernetes manifests for scale.",
    side: "left"
  },
  {
    id: 3,
    period: "Nov 2023 - May 2024",
    title: "Machine Learning Engineer",
    company: "Omdena | Remote",
    description: "• Automated ETL and preprocessing for TB case forecasting; reduced manual cleaning time by ~50% and improved forecast accuracy by ~15%.\n• Built regression and classification models using scikit-learn and XGBoost; validated solutions with cross-validation and robust metrics.\n• Led efforts to detect misinformation using AI tools and embeddings, collaborating with international teams on ethical data handling.",
    side: "right"
  },
  {
    id: 4,
    period: "Jun 2022 - Jul 2023",
    title: "Data Science Intern | Remote",
    company: "iNeuron.ai",
    description:
      "• Worked on applied machine learning use cases focused on health analytics and personalized recommendations, contributing to data-driven decision support systems.\n" +
      "• Developed end-to-end ML workflows including data preprocessing, model training, evaluation, and inference, gaining hands-on experience with the full ML lifecycle.\n" +
      "• Built backend services using Python and Flask to support real-time data processing and ML inference endpoints.\n" +
      "• Implemented basic model and system monitoring using Prometheus and Grafana to track performance metrics and application health.\n" +
      "• Deployed ML-backed services on AWS, utilizing Lambda for serverless execution and S3 for data and artifact storage.\n" +
      "• Assisted in setting up CI/CD pipelines to automate testing and deployment workflows, improving development efficiency and reliability.",
    side: "left"
  },
  {
  id: 5,
  period: "Jan 2021 - Aug 2022",
  title: "Cyber Security Analyst",
  company: "Al Nafi Cloud | Markham, Ontario, Canada · Remote",
  description:
    "• IT/OT Security Strategy: Designed compliant cloud architectures (AWS/GCP) aligned with ISO 27001/27017/27018 and IEC 62443, reducing vulnerabilities by 30% through CIS v8 controls.\n" +
    "• Risk Management: Conducted OT/ICS risk assessments (NIST, IEC 62443) and penetration testing, mitigating critical threats for industrial clients in the energy and manufacturing sectors.\n" +
    "• SOC Development: Led the design of IT/OT Security Operations Centers (SOC), integrating SIEM (Wazuh), IDS/IPS, and custom use cases for threat detection.\n" +
    "• Governance Frameworks: Authored IT/OT policies, procedures, and operating models, ensuring compliance for SOC 1 Type II audits.\n" +
    "• Business Development: Prepared technical reports and supported business development with RFI & RFP responses.\n" +
    "• Tool Expertise: Deployed Wazuh (SIEM), Nessus (VA), Metasploit, and NGINX WAF to secure OT environments.",
  side: "right"
  },
  {
    id: 6,
    period: "Jan 2020 - Jan 2021",
    title: "Trainee System Administrator",
    company: "Al Nafi Cloud | Markham, Ontario, Canada · Remote",
    description:
      "• Infrastructure Management: Installed and configured RHEL, CentOS, and Ubuntu systems, resolving 50+ hardware and network issues monthly.\n" +
      "• Automation: Scripted Bash and Python utilities for log transfers, backups (Rsync), and resource monitoring (top, sar), improving operational efficiency by 40%.\n" +
      "• Security Hardening: Configured iptables firewalls, managed user permissions (ACL, chmod), and applied system patches via YUM.\n" +
      "• Network Troubleshooting: Diagnosed and resolved connectivity issues using tcpdump, Wireshark, and traceroute.",
    side: "left"
  },
  {
    id: 7,
    period: "Jun 2022 - Jul 2023",
    title: "Data Science Intern | Remote",
    company: "iNeuron.ai",
    description:
      "• Worked on applied machine learning use cases focused on health analytics and personalized recommendations, contributing to data-driven decision support systems.\n" +
      "• Developed end-to-end ML workflows including data preprocessing, model training, evaluation, and inference, gaining hands-on experience with the full ML lifecycle.\n" +
      "• Built backend services using Python and Flask to support real-time data processing and ML inference endpoints.\n" +
      "• Implemented basic model and system monitoring using Prometheus and Grafana to track performance metrics and application health.\n" +
      "• Deployed ML-backed services on AWS, utilizing Lambda for serverless execution and S3 for data and artifact storage.\n" +
      "• Assisted in setting up CI/CD pipelines to automate testing and deployment workflows, improving development efficiency and reliability.",
    side: "right"
  }

];

export default function Experience() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="experience" className="section-spacing bg-muted">
      <div className="container">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
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
      ref={ref as React.RefObject<HTMLDivElement>}
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
            <div className="text-sm text-muted-foreground whitespace-pre-line">
              {experience.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
