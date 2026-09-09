import Image from "next/image";
import { projects } from "@/lib/data/portfolio";

export default function ProjectsGrid() {
  return (
    <section id="proyectos" className="bg-[var(--bg-secondary)] px-4 py-16" aria-labelledby="proyectos-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="proyectos-heading" className="text-3xl font-bold text-[var(--text-primary)]">
          Proyectos
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">6 proyectos — datos desde lib/data/portfolio.ts</p>

        <div className="projects-grid mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="project-card group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="project-image relative h-44 overflow-hidden bg-gradient-to-br from-[var(--primary-color)]/20 to-[var(--secondary-color)]/20">
                {/* Placeholder using next/image — gradient + icon fallback */}
                <Image
                  src="/img/logo.png"
                  alt=""
                  width={400}
                  height={220}
                  className="h-full w-full object-contain opacity-10 p-8"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/80 text-2xl shadow" aria-hidden>
                    {project.icon}
                  </span>
                </div>
              </div>

              <div className="project-info flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">{project.name}</h3>
                <p className="mt-1 text-xs font-medium text-[var(--primary-color)]">{project.tech}</p>
                <p className="mt-2 flex-1 text-sm text-[var(--text-secondary)]">{project.description}</p>

                <div className="project-tags mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-links mt-4 flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:bg-[var(--bg-tertiary)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
