import Image from "next/image";
import { heroData, socialLinks } from "@/lib/data/portfolio";
import ParticlesCanvas from "./ParticlesCanvas";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-[var(--gradient-bg)] px-4 py-24 pt-24"
    >
      <ParticlesCanvas />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        {/* Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)] shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden />
            {heroData.badge}
          </div>

          <h1 className="text-4xl font-bold leading-tight text-[var(--text-primary)] sm:text-5xl">
            <span className="block text-lg font-normal text-[var(--text-secondary)]">{heroData.greeting}</span>
            {heroData.name}
          </h1>
          <p className="mt-2 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-lg font-semibold text-transparent">
            {heroData.subtitle}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)] lg:mx-0">{heroData.description}</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href={heroData.ctaPrimary.href}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary-color)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--primary-dark)] hover:shadow-lg"
            >
              {heroData.ctaPrimary.label}
            </a>
            <a
              href={heroData.ctaSecondary.href}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-tertiary)]"
            >
              {heroData.ctaSecondary.label}
            </a>
          </div>

          <div className="mt-6 flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] transition hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]"
              >
                <span className="text-xs font-bold">{s.label[0]}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative mx-auto flex max-w-[380px] justify-center lg:mx-0 lg:justify-end">
          <div className="relative">
            {/* Gradient bg pulse */}
            <div className="absolute inset-0 -z-10 scale-110 rounded-3xl bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] opacity-20 blur-2xl animate-pulse" />
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-2 shadow-xl backdrop-blur">
              <Image
                src="/img/tu-foto.jpg"
                alt="Frank Anconeyra"
                width={380}
                height={380}
                priority
                sizes="(max-width: 768px) 300px, 380px"
                className="h-[340px] w-[340px] rounded-2xl object-cover sm:h-[380px] sm:w-[380px]"
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--card-bg)] shadow-md text-[var(--primary-color)] animate-floatBadge">
              <span className="text-sm font-bold">R</span>
            </div>
            <div className="absolute -bottom-2 -left-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--card-bg)] shadow-md text-emerald-500 animate-floatBadge [animation-delay:0.5s]">
              <span className="text-sm font-bold">Py</span>
            </div>
            <div className="absolute top-1/2 -right-4 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-[var(--card-bg)] shadow-md text-amber-500 animate-floatBadge [animation-delay:1s]">
              <span className="text-xs font-bold">AWS</span>
            </div>
            <div className="absolute top-1/2 -left-4 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-[var(--card-bg)] shadow-md text-[var(--secondary-color)] animate-floatBadge [animation-delay:1.5s]">
              <span className="text-xs">🛡️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
