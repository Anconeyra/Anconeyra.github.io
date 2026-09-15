"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { experiences } from "@/lib/data/portfolio";
import GsapReveal from "@/components/ui/GsapReveal";
import type { IconType } from "react-icons";
import { FaChartLine, FaDatabase, FaDocker, FaHeadset, FaReact } from "react-icons/fa";
import {
  SiAndroid,
  SiAngular,
  SiAstro,
  SiDjango,
  SiDotnet,
  SiFlask,
  SiKotlin,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiPostgresql,
  SiRedux,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import Image from "next/image";

const COMPANY_LOGOS: Record<string, string> = {
  "Grupo Roberts": "/img/experience/roberts-icono.png",
  "Peru Intercorp Corporation": "/img/experience/intercorp-light.png",
  "Consejeros y Corredores de Seguros": "/img/experience/consejeros.png",
  "Grupo Moss": "/img/experience/moss.png",
};

const TAG_ICONS: Record<string, IconType> = {
  Astro: SiAstro,
  NestJS: SiNestjs,
  PostgreSQL: SiPostgresql,
  Docker: FaDocker,
  Kotlin: SiKotlin,
  Android: SiAndroid,
  "C#": TbBrandCSharp,
  Angular: SiAngular,
  "SQL Server": FaDatabase,
  "ASP.NET": SiDotnet,
  React: FaReact,
  Flask: SiFlask,
  MongoDB: SiMongodb,
  Django: SiDjango,
  MySQL: SiMysql,
  Redux: SiRedux,
  "Soporte técnico": FaHeadset,
  "Mejora continua": FaChartLine,
};

const TAG_COLORS: Record<string, string> = {
  Astro: "text-orange-500",
  NestJS: "text-rose-600",
  PostgreSQL: "text-sky-600",
  Docker: "text-sky-500",
  Kotlin: "text-violet-500",
  Android: "text-green-500",
  "C#": "text-green-600",
  Angular: "text-red-600",
  "ASP.NET": "text-violet-600",
  React: "text-cyan-400",
  MongoDB: "text-green-600",
  Django: "text-emerald-700",
  MySQL: "text-cyan-700",
  Redux: "text-violet-500",
  "Soporte técnico": "text-sky-500",
  "Mejora continua": "text-emerald-500",
};

function monogram(name: string) {
  const words = name.split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export default function ExperienceCarousel() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);
  const total = experiences.length;

  const start = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % total);
      }
    }, 6000);
  }, [total]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  const goTo = (idx: number) => {
    setActive((idx + total) % total);
    start();
  };

  const exp = experiences[active];

  return (
    <section
      id="experiencia"
      className="relative overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)]/40 to-[var(--bg-primary)] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      aria-labelledby="experiencia-heading"
    >
      <div className="relative mx-auto w-full min-w-0 max-w-7xl">
        <GsapReveal variant="blur" className="block w-full">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2
              id="experiencia-heading"
              className="w-full text-center text-4xl font-extrabold tracking-tight text-balance text-[var(--text-primary)] sm:text-5xl"
            >
              Experiencia
            </h2>
            <p className="mt-4 w-full text-center leading-relaxed text-balance text-[var(--text-secondary)]">
              Mi recorrido profesional en {total} experiencias.
            </p>
            <div
              className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[var(--primary-color)] to-sky-500"
              aria-hidden="true"
            />
          </div>
        </GsapReveal>

        <GsapReveal variant="blur" className="block w-full">
          <div
            className="experience-grid relative mx-auto mt-12 w-full min-w-0 max-w-4xl lg:mt-14"
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
            }}
            role="region"
            aria-label="Carrusel de experiencia laboral"
            aria-roledescription="carousel"
          >
            <div
              className="relative flex min-h-[380px] flex-col overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-7 shadow-2xl shadow-indigo-500/10 sm:min-h-[340px] sm:p-9"
              aria-live="polite"
            >
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--primary-color)] via-indigo-400 to-sky-400"
                aria-hidden="true"
              />

              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-[var(--text-secondary)] uppercase">
                  <span
                    className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500"
                    aria-hidden="true"
                  />
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(active - 1)}
                    aria-label="Experiencia anterior"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] transition-all hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(active + 1)}
                    aria-label="Experiencia siguiente"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] transition-all hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              </div>

              <div key={active} className="mt-6 flex flex-1 flex-col">
                <div className="flex min-w-0 items-center gap-5">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-md shadow-indigo-500/20 ring-1 ring-[var(--border-color)]">
                    {COMPANY_LOGOS[exp.company] ? (
                      <Image
                        src={COMPANY_LOGOS[exp.company]}
                        alt={`Logo de ${exp.company}`}
                        width={56}
                        height={56}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span
                        className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-base font-black text-white"
                        aria-hidden="true"
                      >
                        {monogram(exp.company)}
                      </span>
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-2xl">
                      {exp.company}
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-[var(--primary-color)]">{exp.role}</p>
                    <a
                      href={exp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-1.5 inline-flex items-center gap-1 text-sm font-bold text-[var(--text-secondary)] transition-colors hover:text-[var(--primary-color)]"
                    >
                      Ir a la página
                      <svg
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>

                <p className="mt-3 font-mono text-xs tracking-wide text-[var(--text-secondary)]">
                  {exp.period}
                  {exp.meta ? ` · ${exp.meta}` : ""}
                </p>

                <p className="mt-4 leading-relaxed text-pretty text-[var(--text-secondary)]">{exp.description}</p>

                {exp.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => {
                      const TagIcon = TAG_ICONS[tag];
                      const tagColor = TAG_COLORS[tag] ?? "";
                      return (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-tertiary)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-secondary)]"
                        >
                          {TagIcon && (
                            <TagIcon className={`h-4 w-4 shrink-0 ${tagColor}`} aria-hidden="true" />
                          )}
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Indicadores del carrusel">
                {experiences.map((e, i) => (
                  <button
                    key={`${e.company}-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Ir a experiencia ${i + 1}: ${e.company}`}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)] ${
                      i === active
                        ? "w-6 bg-gradient-to-r from-indigo-500 to-sky-500"
                        : "w-1.5 bg-[var(--border-color)] hover:bg-[var(--text-light)]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="sr-only" aria-live="polite">
              Experiencia {active + 1} de {total}: {exp.company}, {exp.role}
            </div>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
