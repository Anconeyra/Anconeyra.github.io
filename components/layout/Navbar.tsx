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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2" aria-label="Ir al inicio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="Nyraroot Logo" className="h-8 w-8 object-contain" />
          <span className="text-lg font-bold text-[var(--text-primary)]">Nyraroot</span>
        </a>

        <button
          id="nav-toggle"
          aria-label="Abrir menú de navegación"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] md:hidden"
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
          } absolute left-0 right-0 top-full flex-col gap-1 bg-[var(--bg-primary)] px-4 py-4 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-6 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-link block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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
