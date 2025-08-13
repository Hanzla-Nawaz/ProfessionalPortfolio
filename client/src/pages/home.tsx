import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Projects from "@/components/projects";
import Certificates from "@/components/certificates";
import Trainings from "@/components/trainings";
import Publications from "@/components/publications";
import Volunteer from "@/components/volunteer";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Certificates />
        <Trainings />
        <Publications />
        <Volunteer />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
