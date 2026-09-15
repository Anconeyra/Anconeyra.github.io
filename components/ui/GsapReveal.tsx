"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureRegistered() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

type RevealVariant = "up" | "down" | "left" | "right" | "zoom" | "blur";

interface GsapRevealProps {
  children: ReactNode;
  /** Seconds to wait before the animation starts */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Direction/effect preset. Default "up" keeps old behavior. */
  variant?: RevealVariant;
  /** Custom vertical offset (px). Overrides variant's y. */
  y?: number;
  /** Custom horizontal offset (px). Overrides variant's x. */
  x?: number;
  /** Custom scale. Overrides variant's scale. */
  scale?: number;
  /** Stagger direct children when > 0 (pass to use on a wrapper element). */
  stagger?: number;
  /** ScrollTrigger start position, e.g. "top 88%". */
  start?: string;
  /** Replay when leaving/re-entering viewport. Default true (plays once). */
  once?: boolean;
  className?: string;
}

const PREMIUM_EASE = "expo.out";

const VARIANT_FROM: Record<RevealVariant, gsap.TweenVars> = {
  up: { y: 56, opacity: 0 },
  down: { y: -56, opacity: 0 },
  left: { x: -64, opacity: 0 },
  right: { x: 64, opacity: 0 },
  zoom: { y: 24, scale: 0.88, opacity: 0 },
  blur: { y: 24, opacity: 0, filter: "blur(10px)" },
};

export default function GsapReveal({
  children,
  delay = 0,
  duration = 1,
  variant = "up",
  y,
  x,
  scale,
  stagger = 0,
  start = "top 88%",
  once = true,
  className = "",
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureRegistered();

    const from: gsap.TweenVars = {
      ...VARIANT_FROM[variant],
      ...(y !== undefined ? { y } : {}),
      ...(x !== undefined ? { x } : {}),
      ...(scale !== undefined ? { scale } : {}),
    };

    const to: gsap.TweenVars = {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration,
      delay,
      ease: PREMIUM_EASE,
      clearProps: "filter",
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
    };

    const targets = stagger > 0 ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, from, stagger > 0 ? { ...to, stagger } : to);
    }, el);

    return () => ctx.revert();
  }, [delay, duration, variant, y, x, scale, stagger, start, once]);

  return (
    <div ref={ref} className={`min-w-0 ${className}`}>
      {children}
    </div>
  );
}