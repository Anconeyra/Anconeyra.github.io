"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  { icon: "⚛️", label: "React" },
  { icon: "V", label: "Vue" },
  { icon: "⚡", label: "Svelte" },
  { icon: "⬢", label: "Node.js" },
  { icon: "🍃", label: "Spring" },
  { icon: "🐍", label: "Python" },
  { icon: "☕", label: "Java" },
  { icon: "☁️", label: "AWS" },
  { icon: "🐳", label: "Docker" },
  { icon: "☸️", label: "K8s" },
  { icon: "📱", label: "Flutter" },
  { icon: "🤖", label: "Kotlin" },
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
    }, 2000);
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
      className="tech-carousel relative mx-auto flex w-full max-w-[320px] flex-col items-center overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-lg"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      role="region"
      aria-label="Carrusel de tecnologías"
      aria-roledescription="carousel"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10" />

      <div className="relative flex h-32 w-full items-center justify-center" aria-live="polite">
        {slides.map((s, i) => (
          <div
            key={s.label}
            className={`carousel-slide absolute flex flex-col items-center gap-2 transition-all duration-500 ${
              i === active ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
            }`}
            aria-hidden={i !== active}
            aria-label={`${s.label} ${i + 1} de ${slides.length}`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-2xl" aria-hidden>
              {s.icon}
            </span>
            <span className="text-sm font-semibold text-[var(--text-primary)]">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-1.5" role="tablist" aria-label="Indicadores del carrusel">
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
            className={`dot h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--primary-color)] ${
              i === active ? "w-6 bg-[var(--primary-color)]" : "w-2 bg-[var(--border-color)] hover:bg-[var(--text-light)]"
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
