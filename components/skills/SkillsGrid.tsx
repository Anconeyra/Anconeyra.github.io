import { skillCards } from "@/lib/data/portfolio";

export default function SkillsGrid() {
  return (
    <section id="habilidades" className="bg-[var(--bg-secondary)] px-4 py-16" aria-labelledby="habilidades-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="habilidades-heading" className="text-3xl font-bold text-[var(--text-primary)]">
          Habilidades
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">6 categorías — tecnologías principales</p>

        <div className="skills-grid mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCards.map((card) => (
            <div
              key={card.title}
              className="skill-card group rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="skill-icon flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-[var(--primary-color)]">
                <span className="text-sm font-bold" aria-hidden>
                  {card.title[0]}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">{card.title}</h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{card.description}</p>
              <div className="skill-tags mt-4 flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
