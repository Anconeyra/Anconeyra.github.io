"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total <= 0) {
        setWidth(0);
        return;
      }
      const scrolled = (window.scrollY / total) * 100;
      setWidth(scrolled);
    };

    // rAF throttling for smooth updates
    let ticking = false;
    const throttled = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", throttled, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", throttled);
  }, []);

  return (
    <div
      id="scroll-progress"
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] h-1 bg-[linear-gradient(90deg,#667eea_0%,#764ba2_50%,#667eea_100%)] bg-[length:200%_100%] transition-[width] duration-100 ease-out"
      style={{ width: `${width}%` }}
    />
  );
}
