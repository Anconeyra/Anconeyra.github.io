"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Guards: skip on coarse pointer and reduced-motion
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let posX = 0;
    let posY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number | null = null;

    function animateCursor() {
      // rAF pos += (mouse - pos) / 9 — spec exact
      posX += (mouseX - posX) / 9;
      posY += (mouseY - posY) / 9;

      cursor!.style.left = `${mouseX}px`;
      cursor!.style.top = `${mouseY}px`;
      follower!.style.left = `${posX}px`;
      follower!.style.top = `${posY}px`;

      rafId = requestAnimationFrame(animateCursor);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(animateCursor);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Hover effect on interactive elements
    const interactiveSelector = "a, button, .skill-card, .project-card, .certification-item, input, textarea";
    const onEnter = () => {
      cursor.classList.add("hover");
      follower.classList.add("hover");
    };
    const onLeave = () => {
      cursor.classList.remove("hover");
      follower.classList.remove("hover");
    };

    // Delegate hover via mouseover/out to avoid observing dynamic elements one-by-one
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) onEnter();
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) onLeave();
    };
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        id="cursor"
        aria-hidden="true"
        className="cursor pointer-events-none fixed z-[9999] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] mix-blend-difference transition-[width,height,background] duration-300 max-[768px]:hidden"
        style={{ left: -100, top: -100 }}
      />
      <div
        ref={followerRef}
        id="cursor-follower"
        aria-hidden="true"
        className="cursor-follower pointer-events-none fixed z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--primary-color)] opacity-50 transition-all duration-150 ease-out max-[768px]:hidden"
        style={{ left: -100, top: -100 }}
      />
    </>
  );
}
