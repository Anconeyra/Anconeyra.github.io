import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        {/* Hero — #inicio */}
        <section
          id="inicio"
          className="flex min-h-[70vh] items-center justify-center bg-[var(--gradient-bg)] px-4 py-24 pt-20"
        >
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
              <span className="block text-lg font-normal text-[var(--text-secondary)]">¡Hola! Soy</span>
              Frank Anconeyra
            </h1>
            <p className="mt-2 text-lg text-[var(--text-secondary)]">Full-Stack Developer | Cybersecurity Analyst</p>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
              Ingeniero de sistemas resilientes e inteligentes que conectan personas, dispositivos y datos de forma segura y escalable.
            </p>
          </div>
        </section>

        {/* About — #sobre-mi */}
        <section
          id="sobre-mi"
          className="bg-[var(--bg-primary)] px-4 py-16"
          aria-labelledby="sobre-mi-heading"
        >
          <div className="mx-auto max-w-6xl">
            <h2 id="sobre-mi-heading" className="text-3xl font-bold text-[var(--text-primary)]">
              Sobre Mí
            </h2>
            <p className="mt-4 max-w-3xl text-[var(--text-secondary)]">
              Soy un desarrollador Full-Stack y analista de ciberseguridad con experiencia en la creación de aplicaciones web, móviles y
              sistemas seguros.
            </p>
            {/* Placeholder for TechCarousel + StatsCounter (14/15/5) — wired in PR3 */}
            <div className="mt-6 flex gap-6 text-sm text-[var(--text-light)]">
              <span>14 Repositorios</span>
              <span>15 Certificaciones</span>
              <span>5 Dominios</span>
            </div>
          </div>
        </section>

        {/* Skills — #habilidades */}
        <section
          id="habilidades"
          className="bg-[var(--bg-secondary)] px-4 py-16"
          aria-labelledby="habilidades-heading"
        >
          <div className="mx-auto max-w-6xl">
            <h2 id="habilidades-heading" className="text-3xl font-bold text-[var(--text-primary)]">
              Habilidades
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">6 categorías — datos desde lib/data/portfolio.ts</p>
            {/* Placeholder for SkillsGrid — wired in PR3 */}
          </div>
        </section>

        {/* Certifications — #certificaciones */}
        <section
          id="certificaciones"
          className="bg-[var(--bg-primary)] px-4 py-16"
          aria-labelledby="certificaciones-heading"
        >
          <div className="mx-auto max-w-6xl">
            <h2 id="certificaciones-heading" className="text-3xl font-bold text-[var(--text-primary)]">
              Certificaciones
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">Más de 15 certificaciones profesionales — 5 categorías</p>
            {/* Placeholder for CertificationsGrid — wired in PR3 */}
          </div>
        </section>

        {/* Projects — #proyectos */}
        <section
          id="proyectos"
          className="bg-[var(--bg-secondary)] px-4 py-16"
          aria-labelledby="proyectos-heading"
        >
          <div className="mx-auto max-w-6xl">
            <h2 id="proyectos-heading" className="text-3xl font-bold text-[var(--text-primary)]">
              Proyectos
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">6 proyectos — datos desde lib/data/portfolio.ts</p>
            {/* Placeholder for ProjectsGrid — wired in PR3 */}
          </div>
        </section>

        {/* Contact — #contacto */}
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
            {/* Placeholder for ContactForm (wa.me + encodeURIComponent) — wired in PR3 */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
