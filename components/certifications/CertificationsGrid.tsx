import { certifications } from "@/lib/data/portfolio";

export default function CertificationsGrid() {
  return (
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

        <div className="certifications-grid mt-8 grid gap-6 md:grid-cols-2">
          {certifications.map((cat) => (
            <div
              key={cat.category}
              className="certification-category rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm"
            >
              <h3 className="certification-category-title flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-[var(--primary-color)] text-xs">
                  {cat.category[0]}
                </span>
                {cat.category}
                <span className="ml-auto rounded-full bg-[var(--primary-color)] px-2.5 py-0.5 text-xs font-bold text-white">
                  {cat.count}
                </span>
              </h3>
              <div className="certification-list mt-4 space-y-3">
                {cat.items.map((item) => (
                  <div key={item.name} className="certification-item flex gap-3">
                    <div className="certification-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-[var(--primary-color)]">
                      <span className="text-xs">🏅</span>
                    </div>
                    <div className="certification-info">
                      <h4 className="text-sm font-medium text-[var(--text-primary)]">{item.name}</h4>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {item.org} • {item.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="credly-section mt-8 flex justify-center">
          <a
            href="https://www.credly.com/users/frank-anconeyra/badges"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-credly inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
          >
            Ver Certificaciones en Credly
          </a>
        </div>
      </div>
    </section>
  );
}
