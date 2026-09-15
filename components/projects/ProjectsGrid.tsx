import Image from "next/image";
import { projects } from "@/lib/data/portfolio";
import GsapReveal from "@/components/ui/GsapReveal";

const COVERS = [
  "/img/projects/greenfil.svg?v=2",
  "/img/projects/moss.svg?v=2",
  "/img/projects/evaluacion.svg?v=2",
  "/img/projects/liteconta.svg?v=2",
  "/img/projects/crm-django.svg?v=3",
  "/img/projects/inventarios.svg?v=2",
];

const TECH_STYLES = [
  "border-emerald-400/40 bg-emerald-950/50 text-emerald-300",
  "border-indigo-400/40 bg-indigo-950/50 text-indigo-300",
  "border-amber-400/40 bg-amber-950/50 text-amber-300",
  "border-violet-400/40 bg-violet-950/50 text-violet-300",
  "border-rose-400/40 bg-rose-950/50 text-rose-300",
  "border-sky-400/40 bg-sky-950/50 text-sky-300",
];

function monogram(name: string) {
  const words = name.split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function ProjectsGrid() {
  return (
    <section id="proyectos" className="bg-[var(--bg-secondary)] px-4 pt-16 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20" aria-labelledby="proyectos-heading">
      <div className="mx-auto max-w-7xl">
        <GsapReveal variant="blur" className="block w-full">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 id="proyectos-heading" className="w-full text-center text-4xl font-extrabold tracking-tight text-balance text-[var(--text-primary)] sm:text-5xl">
              Proyectos
            </h2>
            <p className="mt-4 w-full text-center leading-relaxed text-balance text-[var(--text-secondary)]">
              Una selección de mis trabajos y proyectos destacados.
            </p>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--primary-color)] to-sky-500" aria-hidden="true" />
          </div>
        </GsapReveal>

        <div className="projects-grid mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, pi) => (
            <GsapReveal key={project.name} variant="zoom" delay={(pi % 3) * 0.12} className="h-full">
              <article className="project-card group flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-500/10">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={COVERS[pi % COVERS.length]}
                    alt={`Vista previa del proyecto ${project.name}`}
                    width={800}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" aria-hidden="true" />
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" aria-hidden="true" />
                  <span className="absolute top-3 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-base font-black tracking-tight text-white shadow-lg ring-1 ring-white/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" aria-hidden="true">
                    {monogram(project.name)}
                  </span>
                  <span className={`absolute right-4 bottom-3 rounded-lg border px-2.5 py-1 font-mono text-[11px] font-bold tracking-wide uppercase backdrop-blur-sm ${TECH_STYLES[pi % TECH_STYLES.length]}`}>
                    {project.tech}
                  </span>
                </div>

                <div className="project-info flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--primary-color)]">{project.name}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{project.description}</p>

                  <div className="project-tags mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-links mt-4 flex flex-wrap gap-2 border-t border-[var(--border-color)]/70 pt-4">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-3.5 text-xs font-bold text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
                      >
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          />
                        </svg>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
