"use client";

import Image from "next/image";
import { heroData, socialLinks } from "@/lib/data/portfolio";
import ParticlesCanvas from "./ParticlesCanvas";

function SocialIcon({ label }: { label: string }) {
  const lower = label.toLowerCase();
  if (lower.includes("github")) {
    return (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    );
  }
  if (lower.includes("linkedin")) {
    return (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }
  // Default / Email
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

export default function Hero() {
  const triggerTerminal = () => {
    const btn = document.getElementById("terminal-toggle");
    if (btn) btn.click();
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[var(--gradient-bg)] px-4 py-20 pt-28 text-[var(--text-primary)] transition-colors duration-300 sm:px-6 lg:px-8"
    >
      {/* Background Engineering Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Glows */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[450px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[var(--primary-color)]/20 via-sky-500/20 to-emerald-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 -z-10 h-72 w-72 rounded-full bg-[var(--primary-color)]/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Interactive Particles Layer */}
      <ParticlesCanvas />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Tech Identity, Narrative & Hierarchy */}
        <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
          {/* Status Indicator */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-[13px] font-semibold text-emerald-600 shadow-xs backdrop-blur-md dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{heroData.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-[4.2rem] lg:leading-[1.02]">
            <span className="mb-2 block text-base font-medium text-[var(--text-secondary)] sm:text-lg">
              {heroData.greeting}
            </span>
            <span className="block text-[var(--text-primary)] drop-shadow-xs">
              {heroData.name}
            </span>
          </h1>

          {/* Subtitle / Role — single line */}
          <p className="mt-4 max-w-full text-[15px] font-black tracking-tight whitespace-nowrap sm:text-xl lg:text-[1.7rem] lg:leading-[1.15]">
            <span className="bg-gradient-to-r from-[var(--primary-color)] via-sky-500 to-emerald-500 bg-clip-text text-transparent">
              {heroData.subtitle}
            </span>
          </p>

          {/* Narrative description */}
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-pretty text-[var(--text-secondary)] sm:text-lg lg:mx-0">
            {heroData.description}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
            <a
              href={heroData.ctaPrimary.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--primary-color)] via-indigo-500 to-sky-500 px-6 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)] active:translate-y-0 active:scale-[0.98]"
            >
              <span>{heroData.ctaPrimary.label}</span>
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            <a
              href={heroData.ctaSecondary.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] px-6 text-sm font-semibold text-[var(--text-primary)] shadow-md backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)] active:translate-y-0 active:scale-[0.98]"
            >
              <svg className="h-4 w-4 text-[var(--primary-color)] transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span>{heroData.ctaSecondary.label}</span>
            </a>

            <button
              type="button"
              onClick={triggerTerminal}
              title="Abrir terminal interactiva"
              aria-label="Abrir terminal interactiva"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 font-mono text-sm font-bold text-emerald-600 shadow-md backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:translate-y-0 active:scale-[0.98] dark:text-emerald-400"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/20 font-bold text-emerald-500 transition-colors group-hover:bg-emerald-500/30 group-hover:animate-pulse">&gt;_</span>
              <span>Terminal</span>
            </button>
          </div>

          {/* Social Profiles with Clean Vector Accents */}
          <div className="mt-8 flex items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
              Redes:
            </span>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                title={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]/90 text-[var(--text-secondary)] shadow-xs backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:shadow-md"
              >
                <SocialIcon label={s.label} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Portrait & Animated Stack Badges */}
        <div className="relative mx-auto flex w-full max-w-[420px] justify-center px-4 lg:col-span-5 lg:mx-0 lg:justify-end lg:px-0">
          <div className="relative w-full max-w-[360px] sm:max-w-[380px]">
            {/* Ambient Multi-Layer Radial Glow */}
            <div
              className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-tr from-[var(--primary-color)]/30 via-sky-500/20 to-emerald-500/25 blur-2xl animate-pulse"
              aria-hidden="true"
            />

            {/* Elegant Portrait Frame */}
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)]/60 p-2.5 shadow-2xl backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--border-color)]/60 bg-[var(--bg-tertiary)]">
                <Image
                  src="/img/tu-foto.jpg"
                  alt="Portrait of Frank Anconeyra"
                  width={380}
                  height={380}
                  priority
                  sizes="(max-width: 768px) 320px, 380px"
                  className="h-[360px] w-full object-cover object-top sm:h-[400px]"
                />
              </div>
            </div>

            {/* Floating Tech Badge 1: React 19 (Top Right) */}
            <div
              className="animate-float-badge absolute -top-4 -right-2 z-20 flex items-center gap-2 rounded-2xl border border-cyan-500/40 bg-[var(--card-bg)] px-3.5 py-2.5 whitespace-nowrap text-cyan-500 shadow-2xl shadow-cyan-500/15 ring-1 ring-black/5 transition-transform select-none hover:scale-105 sm:-right-3 dark:ring-white/10"
              title="React 19"
            >
              <svg className="h-5 w-5" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
                <circle cx="0" cy="0" r="2.05" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </svg>
              <span className="font-mono text-xs font-bold text-[var(--text-primary)]">React 19</span>
            </div>

            {/* Floating Tech Badge 2: Python (Bottom Left) */}
            <div
              className="animate-float-badge absolute -bottom-4 -left-2 z-20 flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-[var(--card-bg)] px-3.5 py-2.5 whitespace-nowrap shadow-2xl shadow-amber-500/15 ring-1 ring-black/5 transition-transform select-none hover:scale-105 [animation-delay:1s] sm:-left-3 dark:ring-white/10"
              title="Python & Backend"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11.914 2C6.845 2 7.159 4.195 7.159 4.195l.006 2.274h4.814v.682H5.2c-2.484 0-4.2 1.488-4.2 4.318 0 2.83 1.543 4.25 3.714 4.25h1.229v-1.773c0-2.023 1.745-3.69 3.8-3.69h4.747c1.727 0 3.12-1.42 3.12-3.17V4.204S17.917 2 11.914 2zm-1.89 1.409a.864.864 0 110 1.728.864.864 0 010-1.728z"
                  fill="#38BDF8"
                />
                <path
                  d="M12.086 22c5.069 0 4.755-2.195 4.755-2.195l-.006-2.274H12.02v-.682h6.78c2.484 0 4.2-1.488 4.2-4.318 0-2.83-1.544-4.25-3.714-4.25h-1.23v1.773c0 2.023-1.745 3.69-3.8 3.69H9.51c-1.728 0-3.12 1.42-3.12 3.17v2.85S6.083 22 12.086 22zm1.89-1.409a.864.864 0 110-1.728.864.864 0 010 1.728z"
                  fill="#FACC15"
                />
              </svg>
              <span className="font-mono text-xs font-bold text-[var(--text-primary)]">Python</span>
            </div>

            {/* Floating Tech Badge 3: Cloud & AWS (Upper Right, off the face) */}
            <div
              className="animate-float-badge absolute top-[24%] -right-2 z-20 flex items-center gap-2 rounded-2xl border border-sky-500/40 bg-[var(--card-bg)] px-3.5 py-2 whitespace-nowrap text-sky-500 shadow-2xl shadow-sky-500/15 ring-1 ring-black/5 transition-transform select-none hover:scale-105 [animation-delay:1.8s] sm:-right-3 dark:ring-white/10"
              title="Cloud & AWS"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                />
              </svg>
              <span className="font-mono text-xs font-bold text-[var(--text-primary)]">AWS Cloud</span>
            </div>

            {/* Floating Tech Badge 4: Cybersecurity (Left, off the face) */}
            <div
              className="animate-float-badge absolute top-[60%] -left-2 z-20 flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-[var(--card-bg)] px-3.5 py-2 whitespace-nowrap text-emerald-500 shadow-2xl shadow-emerald-500/15 ring-1 ring-black/5 transition-transform select-none hover:scale-105 [animation-delay:2.4s] sm:-left-3 dark:ring-white/10"
              title="Cybersecurity & OWASP"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <span className="font-mono text-xs font-bold text-[var(--text-primary)]">SecOps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
