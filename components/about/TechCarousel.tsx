"use client";

import { useEffect, useRef, useState } from "react";
import { FaAws, FaDocker, FaJava, FaNodeJs, FaPython, FaReact, FaVuejs } from "react-icons/fa";
import {
  SiFlutter,
  SiKotlin,
  SiKubernetes,
  SiSpringboot,
  SiSvelte,
  SiTypescript,
} from "react-icons/si";

const slides = [
  { Icon: FaReact, label: "React", area: "Frontend", color: "text-cyan-400" },
  { Icon: FaVuejs, label: "Vue", area: "Frontend", color: "text-emerald-500" },
  { Icon: SiSvelte, label: "Svelte", area: "Frontend", color: "text-orange-500" },
  { Icon: SiTypescript, label: "TypeScript", area: "Frontend", color: "text-blue-600" },
  { Icon: FaNodeJs, label: "Node.js", area: "Backend", color: "text-green-600" },
  { Icon: SiSpringboot, label: "Spring", area: "Backend", color: "text-green-500" },
  { Icon: FaPython, label: "Python", area: "Backend", color: "text-sky-600" },
  { Icon: FaJava, label: "Java", area: "Backend", color: "text-red-500" },
  { Icon: FaAws, label: "AWS", area: "Cloud", color: "text-amber-500" },
  { Icon: FaDocker, label: "Docker", area: "DevOps", color: "text-blue-500" },
  { Icon: SiKubernetes, label: "K8s", area: "DevOps", color: "text-blue-600" },
  { Icon: SiFlutter, label: "Flutter", area: "Móvil", color: "text-sky-500" },
  { Icon: SiKotlin, label: "Kotlin", area: "Móvil", color: "text-violet-500" },
];

export default function TechCarousel() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  function start() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % slides.length);
      }
    }, 2200);
  }

  function stop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    start();
    return () => stop();
  }, []);

  const handleDotClick = (idx: number) => {
    setActive(idx);
    start();
  };

  return (
    <div
      className="tech-carousel relative flex min-h-[360px] w-full flex-col rounded-3xl border border-[var(--border-color)] bg-gradient-to-br from-indigo-100/80 via-[var(--card-bg)] to-sky-100/70 p-6 shadow-xl shadow-indigo-500/10 sm:p-8 dark:from-indigo-500/15 dark:via-[var(--card-bg)] dark:to-sky-500/10"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      role="region"
      aria-label="Carrusel de lenguajes y tecnologías"
      aria-roledescription="carousel"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-[var(--text-secondary)] uppercase">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500" aria-hidden="true" />
          Stack
        </span>
        <span className="rounded-full bg-[var(--bg-primary)]/70 px-2.5 py-1 font-mono text-[11px] font-bold tracking-widest text-[var(--text-secondary)]">
          {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex h-60 items-center justify-center py-4" aria-live="polite">
        {slides.map((s, i) => (
          <div
            key={s.label}
            className={`carousel-slide absolute flex flex-col items-center gap-4 transition-all duration-500 ${
              i === active ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
            }`}
            aria-hidden={i !== active}
            aria-label={`${s.label} ${i + 1} de ${slides.length}`}
          >
            <s.Icon className={`h-20 w-20 drop-shadow-lg ${s.color}`} aria-hidden="true" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg font-black tracking-[0.18em] text-[var(--text-primary)] uppercase">
                {s.label}
              </span>
              <span className="font-mono text-[11px] tracking-widest text-[var(--text-secondary)] uppercase">
                {s.area}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-center gap-2 px-2 pt-4 pb-1" role="tablist" aria-label="Indicadores del carrusel">
        {slides.map((s, i) => (
          <button
            key={s.label}
            role="tab"
            aria-selected={i === active}
            aria-label={`Ir a slide ${i + 1}: ${s.label}`}
            onClick={() => handleDotClick(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleDotClick(i);
              }
            }}
            className={`h-1.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)] ${
              i === active
                ? "w-5 bg-gradient-to-r from-indigo-500 to-sky-500"
                : "w-1.5 bg-[var(--border-color)] hover:bg-[var(--text-light)]"
            }`}
          />
        ))}
      </div>

      <div className="sr-only" aria-live="polite">
        Slide {active + 1} de {slides.length}: {slides[active].label}
      </div>
    </div>
  );
}
