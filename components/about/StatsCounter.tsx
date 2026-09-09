"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data/portfolio";

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Defer to next tick to satisfy react-hooks/set-state-in-effect
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }
    let raf: number;
    let start: number | null = null;
    const duration = 1200;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return value;
}

function StatItem({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const count = useCountUp(value, visible);

  return (
    <div ref={ref} className="stat flex flex-col items-center">
      <span className="stat-number text-3xl font-bold text-[var(--primary-color)]" aria-live="polite">
        {count}+
      </span>
      <span className="stat-label text-sm text-[var(--text-secondary)]">{label}</span>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <div className="about-stats mt-8 grid grid-cols-3 gap-4">
      {stats.map((s) => (
        <StatItem key={s.label} value={s.value} label={s.label} />
      ))}
    </div>
  );
}
