"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data/portfolio";

const HEADER_OFFSET = 80;

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>("#inicio");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scrolled state for shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active link via IntersectionObserver (accounts for header offset)
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveId(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -60% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(href);
    setOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all ${
        scrolled
          ? "bg-[var(--bg-primary)]/95 backdrop-blur shadow-md border-[var(--border-color)]"
          : "bg-transparent border-transparent"
      }`}
      aria-label="Navegación principal"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">
        <a
          href="#"
          className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
          aria-label="Ir al inicio"
        >
          <span className="flex h-12 w-auto shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white px-2 shadow-md ring-1 ring-black/10 dark:ring-white/20">
            <img src="/img/logo.png" alt="Nyraroot Logo" className="h-11 w-auto object-contain object-center" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)] xl:text-3xl">
            Nyraroot
          </span>
        </a>

        <button
          id="nav-toggle"
          aria-label="Abrir menú de navegación"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)] md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>

        <ul
          id="nav-menu"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-1 bg-[var(--bg-primary)] px-4 py-4 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-2 md:bg-transparent md:p-0 md:shadow-none lg:gap-4 xl:gap-6`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-link block rounded-md px-2 py-2 text-[15px] font-medium tracking-wide whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)] lg:text-base xl:px-3 xl:text-lg ${
                  activeId === link.href
                    ? "bg-[var(--primary-color)] text-white md:bg-transparent md:text-[var(--primary-color)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] md:hover:bg-transparent"
                }`}
                aria-current={activeId === link.href ? "page" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
