import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Projects from "@/components/projects";
import Publications from "@/components/publications";
import Certificates from "@/components/certificates";
import Volunteer from "@/components/volunteer";
import Blog from "@/components/blog";
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
        <Publications />
        <Certificates />
        <Volunteer />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
