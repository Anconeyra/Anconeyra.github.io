import { aboutData, techGroups } from "@/lib/data/portfolio";
import TechCarousel from "./TechCarousel";
import StatsCounter from "./StatsCounter";

export default function About() {
  return (
    <section id="sobre-mi" className="bg-[var(--bg-primary)] px-4 py-16" aria-labelledby="sobre-mi-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="sobre-mi-heading" className="text-3xl font-bold text-[var(--text-primary)]">
          {aboutData.title}
        </h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Carousel */}
          <div className="order-2 lg:order-1">
            <TechCarousel />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="about-header">
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">{aboutData.name}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{aboutData.role}</p>
              <a
                href={aboutData.cvHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[var(--primary-color)] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[var(--primary-dark)]"
              >
                Descargar o Ver CV
              </a>
            </div>

            <div className="mt-6 space-y-4 text-[var(--text-secondary)]">
              {aboutData.paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>

            {/* Tech Stack — 4 groups */}
            <div className="tech-stack mt-8">
              <h4 className="tech-stack-title text-base font-semibold text-[var(--text-primary)]">Tech Stack</h4>
              <div className="tech-groups mt-4 grid gap-4 sm:grid-cols-2">
                {techGroups.map((g) => (
                  <div
                    key={g.title}
                    className="tech-group flex gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4"
                  >
                    <div className="tech-group-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-[var(--primary-color)]">
                      <span className="text-xs font-bold">{g.title[0]}</span>
                    </div>
                    <div className="tech-group-content">
                      <h5 className="text-sm font-semibold text-[var(--text-primary)]">{g.title}</h5>
                      <div className="tech-items mt-1 flex flex-wrap gap-1.5">
                        {g.items.map((item) => (
                          <span
                            key={item}
                            className="tech-item rounded-full bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <StatsCounter />
          </div>
        </div>
      </div>
    </section>
  );
}
