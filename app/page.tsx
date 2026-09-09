import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import SkillsGrid from "@/components/skills/SkillsGrid";
import CertificationsGrid from "@/components/certifications/CertificationsGrid";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import Terminal from "@/components/terminal/Terminal";
import ContactForm from "@/components/contact/ContactForm";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <SkillsGrid />
        <CertificationsGrid />
        <ProjectsGrid />
        <ContactForm />
      </main>
      <Footer />
      <Terminal />
    </>
  );
}
