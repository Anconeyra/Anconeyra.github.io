import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import SkillsGrid from "@/components/skills/SkillsGrid";
import CertificationsGrid from "@/components/certifications/CertificationsGrid";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import Terminal from "@/components/terminal/Terminal";

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

        {/* Contact — #contacto (placeholder until 3.6 ContactForm) */}
        <section
          id="contacto"
          className="bg-[var(--bg-primary)] px-4 py-16"
          aria-labelledby="contacto-heading"
        >
          <div className="mx-auto max-w-6xl">
            <h2 id="contacto-heading" className="text-3xl font-bold text-[var(--text-primary)]">
              Contacto
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">¿Trabajamos juntos? — WhatsApp +51 917 394 464</p>
          </div>
        </section>
      </main>
      <Footer />
      <Terminal />
    </>
  );
}
