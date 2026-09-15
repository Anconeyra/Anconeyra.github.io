"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FaAws, FaPython, FaReact, FaShieldAlt } from "react-icons/fa";
import { heroData, socialLinks } from "@/lib/data/portfolio";
import ParticlesCanvas from "./ParticlesCanvas";
import SocialIcon from "@/components/ui/SocialIcon";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const triggerTerminal = () => {
    const btn = document.getElementById("terminal-toggle");
    if (btn) btn.click();
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      // Letter-by-letter masked reveal of the name
      const nameSplit = new SplitText(".hero-name", {
        type: "chars",
        mask: "chars",
      });
      gsap.fromTo(
        nameSplit.chars,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.045,
          delay: 0.35,
        }
      );

      // Greeting — slide + blur in before the name
      gsap.fromTo(
        ".hero-greeting",
        { y: 24, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out", delay: 0.1 }
      );

      // Rest of the content — staggered rise with premium easing
      gsap.fromTo(
        ".hero-anim",
        { y: 36, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "expo.out", stagger: 0.1, delay: 0.55 }
      );

      // Portrait — scale + rise
      gsap.fromTo(
        ".hero-portrait",
        { scale: 0.88, y: 40, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1.3, ease: "expo.out", delay: 0.4 }
      );

      // Scroll parallax — portrait drifts up slower than scroll
      gsap.to(".hero-parallax", {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Ambient glows — subtle counter-drift
      gsap.to(".hero-glow-a", {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(".hero-glow-b", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[var(--gradient-bg)] px-4 py-20 pt-28 text-[var(--text-primary)] transition-colors duration-300 sm:px-6 lg:px-8"
    >
      {/* Background Engineering Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Glows — parallax layers */}
      <div
        className="hero-glow-a pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[450px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[var(--primary-color)]/20 via-sky-500/20 to-emerald-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="hero-glow-b pointer-events-none absolute bottom-10 right-10 -z-10 h-72 w-72 rounded-full bg-[var(--primary-color)]/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Interactive Particles Layer */}
      <ParticlesCanvas />

      <div className="hero-parallax relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Tech Identity, Narrative & Hierarchy */}
        <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
          {/* Status Indicator */}
          <div className="hero-anim mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-[13px] font-semibold text-emerald-600 shadow-xs backdrop-blur-md dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{heroData.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-[4.2rem] lg:leading-[1.02]">
            <span className="hero-greeting mb-2 block text-base font-medium text-[var(--text-secondary)] sm:text-lg">
              {heroData.greeting}
            </span>
            <span className="hero-name block text-[var(--text-primary)] drop-shadow-xs">
              {heroData.name}
            </span>
          </h1>

          {/* Subtitle / Role — single line with animated gradient */}
          <p className="hero-anim mt-4 max-w-full text-[13px] font-black tracking-tight whitespace-nowrap min-[400px]:text-[15px] sm:text-xl lg:text-[1.55rem] lg:leading-[1.15]">
            <span className="animate-gradient-x bg-gradient-to-r from-[var(--primary-color)] via-sky-500 to-emerald-500 bg-[length:200%_100%] bg-clip-text text-transparent">
              {heroData.subtitle}
            </span>
          </p>

          {/* Narrative description */}
          <p className="hero-anim mx-auto mt-4 max-w-lg text-base leading-relaxed text-pretty text-[var(--text-secondary)] sm:text-lg lg:mx-0">
            {heroData.description}
          </p>

          {/* Action CTAs */}
          <div className="hero-anim mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
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
          <div className="hero-anim mt-8 flex items-center gap-3">
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

        {/* Right Column: Circular Portrait with Orbit Badges */}
        <div className="hero-portrait relative mx-auto flex w-full max-w-[440px] justify-center px-8 sm:px-10 lg:col-span-5 lg:mx-0 lg:justify-end lg:px-4">
          <div className="relative">
            {/* Halo glow */}
            <div
              className="absolute -inset-10 rounded-full bg-gradient-to-tr from-indigo-500/30 via-violet-500/20 to-sky-500/25 blur-2xl animate-pulse"
              aria-hidden="true"
            />
            {/* Dashed orbit ring with revolving dots */}
            <div
              className="absolute -inset-5 animate-[spin_40s_linear_infinite] rounded-full border-2 border-dashed border-indigo-400/40 dark:border-indigo-300/25"
              aria-hidden="true"
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 shadow-md shadow-indigo-500/50" />
              <span className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md shadow-emerald-500/50" />
            </div>

            {/* Gradient ring + circular photo */}
            <div className="relative rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 p-2 shadow-2xl shadow-indigo-500/40">
              <div className="rounded-full bg-white p-1.5 dark:bg-white/10">
                <Image
                  src="/img/tu-foto.jpg"
                  alt="Portrait of Frank Anconeyra"
                  width={360}
                  height={360}
                  priority
                  sizes="(max-width: 768px) 280px, 340px"
                  className="aspect-square w-full max-w-[280px] rounded-full bg-[var(--bg-tertiary)] object-cover object-top sm:max-w-[340px]"
                />
              </div>
            </div>

            {/* Status chip overlapping the ring */}
            <div className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-white/90 px-3.5 py-1.5 text-xs font-bold whitespace-nowrap text-emerald-600 shadow-lg shadow-emerald-500/15 backdrop-blur-md dark:bg-[var(--card-bg)]/90 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Disponible
              </span>
            </div>

            {/* Orbit Badge: React (Top Right) */}
            <div
              className="animate-float-badge absolute -top-1 right-0 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xl shadow-indigo-500/25 ring-1 ring-black/5 transition-transform select-none hover:scale-110 sm:-right-2"
              title="React"
              role="img"
              aria-label="React"
            >
              <FaReact className="h-7 w-7 text-cyan-500" aria-hidden="true" />
            </div>

            {/* Orbit Badge: Security (Left) */}
            <div
              className="animate-float-badge absolute top-[38%] -left-8 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xl shadow-indigo-500/25 ring-1 ring-black/5 transition-transform select-none hover:scale-110 [animation-delay:1s] sm:-left-10"
              title="Cybersecurity"
              role="img"
              aria-label="Cybersecurity"
            >
              <FaShieldAlt className="h-7 w-7 text-blue-600" aria-hidden="true" />
            </div>

            {/* Orbit Badge: AWS (Bottom Left) */}
            <div
              className="animate-float-badge absolute -bottom-1 -left-3 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xl shadow-indigo-500/25 ring-1 ring-black/5 transition-transform select-none hover:scale-110 [animation-delay:1.8s] sm:-left-5"
              title="AWS Cloud"
              role="img"
              aria-label="AWS Cloud"
            >
              <FaAws className="h-7 w-7 text-amber-500" aria-hidden="true" />
            </div>

            {/* Orbit Badge: Python (Bottom Right) */}
            <div
              className="animate-float-badge absolute -right-2 -bottom-3 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xl shadow-indigo-500/25 ring-1 ring-black/5 transition-transform select-none hover:scale-110 [animation-delay:2.4s] sm:-right-4"
              title="Python"
              role="img"
              aria-label="Python"
            >
              <FaPython className="h-7 w-7 text-blue-500" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}