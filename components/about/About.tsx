import { aboutData, techGroups } from "@/lib/data/portfolio";
import TechCarousel from "./TechCarousel";
import StatsCounter from "./StatsCounter";
import GsapReveal from "@/components/ui/GsapReveal";

const HIGHLIGHTS = ["superan las expectativas del usuario", "resisten amenazas modernas"];

function renderWithHighlights(text: string) {
  const pattern = new RegExp(`(${HIGHLIGHTS.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    HIGHLIGHTS.includes(part) ? (
      <strong key={i} className="font-semibold text-[var(--primary-color)]">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function About() {
  return (
    <section id="sobre-mi" className="overflow-hidden bg-[var(--bg-primary)] px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20" aria-labelledby="sobre-mi-heading">
      <div className="mx-auto max-w-7xl">
        <GsapReveal variant="blur" className="block w-full">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 id="sobre-mi-heading" className="w-full text-center text-4xl font-extrabold tracking-tight text-balance text-[var(--text-primary)] sm:text-5xl">
              {aboutData.title}
            </h2>
            <p className="mt-4 w-full text-center leading-relaxed text-balance text-[var(--text-secondary)]">
              Datos sobre mí, mi stack y otros datos.
            </p>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--primary-color)] to-sky-500" aria-hidden="true" />
          </div>
        </GsapReveal>

        <div className="mt-10 grid items-center gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-14">
          {/* Carousel — vertically centered with air top & bottom */}
          <div className="order-2 flex justify-center lg:order-1">
            <GsapReveal delay={0.12} className="flex w-full max-w-[380px] justify-center">
              <TechCarousel />
            </GsapReveal>
          </div>

          {/* Text */}
          <GsapReveal className="order-1 lg:order-2">
          <div>
            <div className="about-header">
              <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">{aboutData.name}</h3>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-[var(--primary-color)]">
                <span className="inline-block rounded-full bg-[var(--primary-color)]/10 px-4 py-1.5">{aboutData.role}</span>
              </p>
              <div className="mt-6">
                <a
                  href={aboutData.cvHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--primary-color)] via-indigo-500 to-sky-500 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)] active:translate-y-0 active:scale-[0.98]"
                >
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Descargar o Ver CV
                </a>
              </div>
            </div>

            <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-8 text-pretty text-[var(--text-secondary)] sm:text-base sm:leading-8">
              {aboutData.paragraphs.map((p, idx) => (
                <p key={p.slice(0, 20)} className={idx === 0 ? "font-medium text-[var(--text-primary)]/90" : undefined}>
                  {renderWithHighlights(p)}
                </p>
              ))}
            </div>

            {/* Tech Stack — 4 groups */}
            <div className="tech-stack mt-10">
              <h4 className="tech-stack-title flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-[var(--text-primary)]">
                <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-indigo-500 to-sky-500" aria-hidden="true" />
                Tech Stack
              </h4>
              <div className="tech-groups mt-5 grid gap-5 sm:grid-cols-2">
                {techGroups.map((g, gi) => (
                  <div
                    key={g.title}
                    className="tech-group group flex gap-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/50 hover:shadow-md"
                  >
                    <div className="tech-group-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25">
                      {gi === 0 && (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                      )}
                      {gi === 1 && (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                          <ellipse cx="12" cy="5" rx="8" ry="3" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
                          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
                        </svg>
                      )}
                      {gi === 2 && (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                          <rect x="7" y="2" width="10" height="20" rx="2.5" />
                          <path strokeLinecap="round" d="M11 18.5h2" />
                        </svg>
                      )}
                      {gi === 3 && (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
                        </svg>
                      )}
                    </div>
                    <div className="tech-group-content min-w-0">
                      <h5 className="text-sm font-bold text-[var(--text-primary)]">{g.title}</h5>
                      <div className="tech-items mt-2 flex flex-wrap gap-1.5">
                        {g.items.map((item) => (
                          <span
                            key={item}
                            className="tech-item rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] transition-colors group-hover:border-indigo-300/60"
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

            <div className="mt-10 border-t border-[var(--border-color)]/70 pt-8">
              <StatsCounter />
            </div>
          </div>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
}
