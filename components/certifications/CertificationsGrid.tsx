import { certifications } from "@/lib/data/portfolio";
import GsapReveal from "@/components/ui/GsapReveal";

function CertIcon({ index }: { index: number }) {
  const cls = "h-5 w-5";
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, viewBox: "0 0 24 24", "aria-hidden": true } as const;
  if (index % 5 === 1) {
    return (
      <svg className={cls} {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
      </svg>
    );
  }
  if (index % 5 === 2) {
    return (
      <svg className={cls} {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L4.5 12l3.75-3m7.5 6l3.75-3-3.75-3M13.5 3L6 21" />
      </svg>
    );
  }
  if (index % 5 === 3) {
    return (
      <svg className={cls} {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }
  return (
    <svg className={cls} {...common}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

export default function CertificationsGrid() {
  return (
    <section
      id="certificaciones"
      className="relative w-full overflow-hidden bg-[var(--bg-primary)] px-4 pt-16 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20"
      aria-labelledby="certificaciones-heading"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <GsapReveal variant="blur" className="block w-full">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 id="certificaciones-heading" className="w-full text-center text-4xl font-extrabold tracking-tight text-balance text-[var(--text-primary)] sm:text-5xl">
              Certificaciones
            </h2>
            <p className="mt-4 w-full text-center leading-relaxed text-balance text-[var(--text-secondary)]">
              15 certificaciones en 5 dominios: ciberseguridad, cloud, redes y más.
            </p>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--primary-color)] to-sky-500" aria-hidden="true" />
          </div>
        </GsapReveal>

        <div className="certifications-grid mx-auto mt-12 grid w-full min-w-0 max-w-6xl grid-cols-1 justify-center gap-6 md:grid-cols-2 lg:mt-14 lg:gap-8">
          {certifications.map((cat, ci) => {
            const isOrphan = ci === certifications.length - 1 && certifications.length % 2 === 1;
            return (
            <GsapReveal key={cat.category} variant="zoom" delay={(ci % 2) * 0.12} className={`h-full min-w-0 w-full max-w-full${isOrphan ? " md:col-span-2 md:mx-auto md:w-full md:max-w-[calc(50%-0.75rem)] lg:max-w-[calc(50%-1rem)]" : ""}`}>
              <div className="certification-category group relative flex h-full w-full min-w-0 max-w-full flex-col overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-indigo-400/40 hover:shadow-xl hover:shadow-indigo-500/10 sm:p-7">
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 transition-all duration-300 group-hover:h-1.5" aria-hidden="true" />
                <h3 className="certification-category-title flex items-center gap-3 text-base font-bold text-[var(--text-primary)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-md shadow-indigo-500/25 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-6">
                    <CertIcon index={ci} />
                  </span>
                  {cat.category}
                  <span className="ml-auto rounded-full bg-[var(--primary-color)]/10 px-3 py-1 font-mono text-xs font-bold text-[var(--primary-color)]">
                    {cat.count}
                  </span>
                </h3>
                <div className="certification-list mt-6 space-y-1">
                  {cat.items.map((item) => (
                    <div key={item.name} className="certification-item flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors hover:border-[var(--border-color)] hover:bg-[var(--bg-secondary)]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                      <div className="certification-info min-w-0">
                        <h4 className="text-sm leading-snug font-semibold text-[var(--text-primary)]">{item.name}</h4>
                        <p className="mt-1 font-mono text-xs text-[var(--text-secondary)]">
                          {item.org} · {item.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GsapReveal>
            );
          })}
        </div>

        <GsapReveal delay={0.15}>
          <div className="credly-section mt-12 flex justify-center lg:mt-14">
            <a
              href="https://www.credly.com/users/frank-anconeyra/badges"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--primary-color)] via-indigo-500 to-sky-500 px-7 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)] active:translate-y-0 active:scale-[0.98]"
            >
              Ver Certificaciones en Credly
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
