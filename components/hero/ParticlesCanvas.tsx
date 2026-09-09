"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  density: number;
  color: string;
};

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 150,
  });

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const maybeCtx = el.getContext("2d");
    if (!maybeCtx) return;
    const canvasEl: HTMLCanvasElement = el;
    const ctxEl: CanvasRenderingContext2D = maybeCtx;

    // Guards: reduced-motion and coarse pointer — disable animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    let ticking = false;
    let paused = false;

    function setCanvasSize() {
      dpr = window.devicePixelRatio || 1;
      // Use hero section dimensions; fallback to window
      const hero = canvasEl.parentElement;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        width = rect.width || window.innerWidth;
        height = rect.height || window.innerHeight;
      } else {
        width = window.innerWidth;
        height = window.innerHeight;
      }
      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      ctxEl.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      const count = Math.floor((width * height) / 9000);
      const arr: Particle[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          density: Math.random() * 30 + 1,
          color: `rgba(${Math.random() > 0.5 ? "99, 102, 241" : "14, 165, 233"}, ${Math.random() * 0.4 + 0.3})`,
        });
      }
      particlesRef.current = arr;
    }

    function drawAndUpdate() {
      if (paused) return;
      ctxEl.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      for (const p of particles) {
        // Move
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x > width || p.x < 0) p.speedX *= -1;
        if (p.y > height || p.y < 0) p.speedY *= -1;

        // Repulsion 150px
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx !== null && my !== null) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            p.x -= (dx / dist) * force * p.density * 0.15;
            p.y -= (dy / dist) * force * p.density * 0.15;
          }
        }

        ctxEl.fillStyle = p.color;
        ctxEl.beginPath();
        ctxEl.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctxEl.fill();
      }

      // Grid-spatial connections
      const thresholdSq = (width / 7) * (height / 7);
      const cellSize = Math.sqrt(thresholdSq);
      const grid = new Map<string, number[]>();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const key = `${Math.floor(p.x / cellSize)},${Math.floor(p.y / cellSize)}`;
        const list = grid.get(key);
        if (list) list.push(i);
        else grid.set(key, [i]);
      }
      for (let a = 0; a < particles.length; a++) {
        const p = particles[a];
        const cx = Math.floor(p.x / cellSize);
        const cy = Math.floor(p.y / cellSize);
        for (let gx = -1; gx <= 1; gx++) {
          for (let gy = -1; gy <= 1; gy++) {
            const neighbors = grid.get(`${cx + gx},${cy + gy}`);
            if (!neighbors) continue;
            for (const b of neighbors) {
              if (b <= a) continue;
              const q = particles[b];
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const dist = dx * dx + dy * dy;
              if (dist < thresholdSq) {
                const opacity = (1 - dist / 20000) * 0.2;
                ctxEl.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                ctxEl.lineWidth = 1;
                ctxEl.beginPath();
                ctxEl.moveTo(p.x, p.y);
                ctxEl.lineTo(q.x, q.y);
                ctxEl.stroke();
              }
            }
          }
        }
      }
    }

    function loop() {
      drawAndUpdate();
      rafRef.current = requestAnimationFrame(loop);
    }

    // Initial setup
    setCanvasSize();
    createParticles();
    loop();

    // Mousemove — only when inside hero
    const handleMouseMove = (e: MouseEvent) => {
      const hero = canvasEl.parentElement;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom && e.clientX >= rect.left && e.clientX <= rect.right) {
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      } else {
        mouseRef.current.x = null;
        mouseRef.current.y = null;
      }
    };
    const handleMouseOut = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseout", handleMouseOut);

    // ResizeObserver — observe hero container for size changes
    const ro = new ResizeObserver(() => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setCanvasSize();
        createParticles();
        ticking = false;
      });
    });
    if (canvasEl.parentElement) ro.observe(canvasEl.parentElement);

    // Debounced window resize fallback
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        createParticles();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    // Visibility guard — pause when hero off-screen
    const heroEl = canvasEl.parentElement;
    let io: IntersectionObserver | null = null;
    if (heroEl) {
      io = new IntersectionObserver(
        (entries) => {
          paused = !entries[0].isIntersecting;
          if (!paused && rafRef.current === null) loop();
        },
        { threshold: 0 }
      );
      io.observe(heroEl);
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (io && heroEl) io.unobserve(heroEl);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      id="particles-canvas"
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
