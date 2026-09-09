# Proposal: nextjs-vercel-migration

## Intent

Migrate `anconeyra.github.io` (846 HTML + 2276 CSS + 931 JS, GitHub Pages) to Next.js 15 App Router + TS + Tailwind SSG on Vercel. Preserve SEO parity, 6 sections + interactions; fix 542 KB logo, unpurged CSS, untyped DATA.

## Scope

### In Scope
- `app/layout.tsx`+`page.tsx` (6 anchors) + decomposition (Navbar, Hero, ParticlesCanvas, CustomCursor, Terminal, TechCarousel, Skills/Certs/Projects, ContactForm, ThemeToggle, ScrollProgress)
- `data/portfolio.ts` typed DATA; `next/image` + `next/font` Poppins; `public/` optimized assets
- Tailwind + `globals.css` with `data-theme` dark mode
- SEO parity: `metadata` (openGraph/twitter/canonical), JSON-LD Person, `sitemap.ts`/`robots.ts`/`opengraph-image.tsx`
- Vercel Git import on `vercel.app` free subdomain (HTTPS, edge, previews)

### Out of Scope
- Custom domain purchase (optional deferred)
- CMS/blog, `proyectos/[slug]`, DB/backend, email API (WhatsApp `wa.me` client-only)

## Capabilities

### New Capabilities
- `portfolio`: sections, anchor routing, typed content
- `ui-interactions`: theme, particles, cursor, terminal, carousel, scroll UX
- `seo`: OG/Twitter/JSON-LD, sitemap/robots/og-image, canonical, es_PE
- `deployment`: Vercel SSG, GitHub integration, domain strategy

### Modified Capabilities
- None — `openspec/specs/` empty; baseline specs.

## Approach

SSG `force-static` + RSC. Server Components default; `"use client"` islands for theme/cursor/particles/terminal/carousel/contact/scroll. Tailwind `darkMode: ['class','[data-theme="dark"]']` + `beforeInteractive` inline script + `suppressHydrationWarning`. Rejected: Pages Router (legacy), SSR/ISR (cost, no benefit), CSS Modules/CSS-in-JS (no purge/runtime).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | Removed | → `app/layout.tsx`+`page.tsx` |
| `css/styles.css` | Migrated | → `tailwind.config.ts`+`globals.css` |
| `js/main.js` | Decomposed | → `components/**`+`data/portfolio.ts` |
| `img/*` | Optimized | → `public/` via `next/image` |
| Scaffold | New | `next.config.ts`, `tsconfig.json`, `app/*` |
| Hosting | Modified | Pages → Vercel (repo kept) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| SEO regression | High | Parity checklist + LH SEO ≥95 + crawl |
| URL fragmentation | Med | Preview first → canonical+301 after cutover |
| Theme FOUC/hydration | Med | Inline script + mount guard |
| Visual drift | Med | Visual diff + retain keyframes + reduced-motion |
| Zero tests | High | Vitest/Playwright smoke + `next build` gate |
| Bundle creep | Low | Dynamic terminal, lazy-load, gate particles |

## Rollback Plan

Tag `archive/static-2026-09-09`. Re-enable Pages (Settings → `main` root) <2 min. Revert DNS/301; keep Vercel preview. Per `openspec/config.yaml`.

## Dependencies

- Vercel + GitHub; Node 20, Next 15, TS 5, Tailwind; no secrets

## Success Criteria

- [ ] `next build` + Vercel `vercel.app` preview succeeds
- [ ] SEO parity: OG/Twitter/JSON-LD Person (`es_PE`), canonical, sitemap/robots/og-image
- [ ] 6 sections + 8 interactions (theme no-FOUC, particles, cursor, terminal, carousel, counters, scroll, WhatsApp) verified
- [ ] Lighthouse SEO ≥95 Perf ≥90 A11y ≥95; logo 542 KB→~15 KB
