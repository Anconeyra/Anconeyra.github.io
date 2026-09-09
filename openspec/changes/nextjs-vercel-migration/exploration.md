# Exploration: nextjs-vercel-migration

> Change: `nextjs-vercel-migration` | Date: 2026-09-09 | Mode: openspec | Project: Anconeyra.github.io

## Current State

**Stack**: Pure static — `index.html` (846 lines), `css/styles.css` (2,276 lines), `js/main.js` (931 lines). No `package.json`, no build, no bundler, no tests, no linter. Deployed via GitHub Pages at `https://anconeyra.github.io` (repo `Anconeyra/Anconeyra.github.io`).

**Content model**: Single-page portfolio with anchor navigation (`#inicio`, `#sobre-mi`, `#habilidades`, `#certificaciones`, `#proyectos`, `#contacto`). No routes, no CMS, no SSR data fetching. All content hard-coded in HTML or in `js/main.js` `DATA` object (skills/projects/certifications as single source of truth).

**Sections & interactive features** (inventory from HTML + CSS + JS):

| Feature | Implementation | Notes |
|---|---|---|
| **Navbar** | Fixed, glassmorphism, scroll `scrolled` class, mobile hamburger, active-link on scroll (Intersection + offset), smooth-scroll with 80px offset | 6 links, logo.png + text |
| **Hero** | Gradient `667eea→764ba2`, greeting, name, subtitle, description, 2 CTAs, social links, photo `tu-foto.jpg` (61 KB) with bg pulse + 4 floating badges (React/Python/AWS/shield) | Particles canvas `id=particles-canvas` full-bleed, DPR-aware |
| **About** | Two-col grid: tech carousel (12 slides, auto 2s, dots hover-pause) + text (bio, Tech Stack 4 groups Frontend/Backend/Mobile/Cloud, 3 stats counters 14/15/5) | Stats animated via IntersectionObserver |
| **Skills** | 6 cards (Frontend/Backend/Mobile/Cloud/DB/Cybersecurity) with icon + tags | Glassmorphism, hover lift |
| **Certifications** | 5 categories (Cybersecurity 5, AWS 3, Networking 2, Python 2, Enterprise 1) + Credly CTA (gradientFlow + pulse) | Static list, no verification links per item |
| **Projects** | 6 cards (Greenfil, MOSS, Evaluación, LiteConta-SUNAT, CRM Django, Inventarios) — placeholder icon, tags, GitHub links | 2-column on desktop, 6 external repo links |
| **Contact** | `contact-form` (name/email/message) → builds `wa.me/+51917394464?text=...` URL + `window.open`, then inline feedback | WhatsApp number hard-coded, client-only, no backend |
| **Footer** | Dark bg, copyright 2026, social links | |
| **Theme toggle** | `data-theme` on `<html>` (light/dark CSS variables), FOUC-prevention inline script, `localStorage.theme` + `prefers-color-scheme` listener, button `#theme-toggle` (moon/sun) | Must survive SSR → hydration mismatch risk |
| **Custom cursor** | `#cursor` + `#cursor-follower`, rAF smoothing (pos += (mouse-pos)/9), hover expansion, disabled on `pointer:coarse` / `prefers-reduced-motion` / ≤768px | Client-only, high interaction |
| **Particles** | Canvas with grid-spatial connection, `width*height/9000` particles, mouse repulsion radius 150, rAF, DPR scaling, debounced resize | ~80–150 particles on 1920×1080; needs `useEffect` + cleanup |
| **Terminal easter-egg** | Modal `#terminal-modal` at z 10000, trigger `#terminal-toggle` + ESC close, 10 commands (help/about/skills/projects/certifications/contact/social/whoami/date/clear/cls/exit), history, tab autocomplete, DATA-driven output | Data lives in JS constant; innerHTML used for output |
| **Scroll UX** | Progress bar `#scroll-progress` (width = scrollY / (scrollHeight-clientHeight) *100), scroll-to-top `#scroll-to-top` (>500px), parallax `translateY(scrolled*0.1 + index*0.05)`, IntersectionObserver `animate-on-scroll` with delay-1..4 | Multiple scroll listeners (throttled via rAF in parallax/particles) |
| **SEO** | `<meta description>` ES, OG profile (title/description/type/profile/url/image/site_name/locale es_PE), Twitter summary, `application/ld+json` Person (name, alternateName Nyraroot, jobTitle, url, image, email, address Arequipa PE, sameAs github/linkedin, knowsAbout 4 domains) | Canonical implicit; og:url and json-ld image `tu-foto.jpg`; locale `es_PE` |
| **Assets** | `img/logo.png` 542 KB (unoptimized), `img/tu-foto.jpg` 61 KB, Google Fonts Poppins 300–800, Font Awesome 6.4.0 CDN | No `next/image`, no self-hosted fonts yet |
| **CSS** | Variables for light/dark themes, glassmorphism, shadows, gradients, animations (shimmer, pulse, float, fadeIn, gradientShift, blink), component-scoped + responsive 968px/768px breakpoints | Monolithic file; cursor:none globally |

**Quality baseline**: No test runner, no CI, 2 git commits, README generic. Responsive + a11y-aware intent but not verified (no axe/Lighthouse audit artifact). Performance risk: 542 KB logo unoptimized, 2276 lines CSS unpurged, particles O(n) with grid optimization already present.

---

### Affected Areas

- `index.html` (846 lines) — **fully replaced** by App Router file-system routing (`app/layout.tsx`, `app/page.tsx`). SEO tags move to `metadata` export.
- `css/styles.css` (2276 lines) — **migrated** to Tailwind + global CSS + component-scoped styles. 400+ CSS variables become Tailwind config / CSS variables.
- `js/main.js` (931 lines) — **decomposed** into React client components (`ThemeProvider`, `CustomCursor`, `ParticlesCanvas`, `Terminal`, `TechCarousel`, `ContactForm`, `ScrollProgress` etc.) + `data/portfolio.ts`.
- `img/logo.png`, `img/tu-foto.jpg` — moved to `public/` or `app/` and served via `next/image` (priority, responsive, AVIF/WebP).
- **New**: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `app/` structure, `components/`, `lib/`, `public/`, Vercel project config, `sitemap.ts`/`robots.ts`.
- `openspec/specs/` — currently empty; will gain SEO/routing/ui/deployment specs post-migration.
- **Hosting**: GitHub Pages → Vercel (Git import, `vercel.app` subdomain; optional custom domain).

---

### Approaches

#### 1. Next.js App Router vs Pages Router

| Dimension | **A. App Router (Recommended)** | B. Pages Router |
|---|---|---|
| **Status** | Current in Next 15 (stable since 13.4), RSC by default | Legacy, maintenance mode; no new features |
| **Mental model** | `app/layout.tsx` + `app/page.tsx` + nested layouts, file-based metadata (`export const metadata: Metadata`) | `pages/_app.tsx`, `_document.tsx`, `Head` component imperative |
| **SEO** | Declarative `metadata`, `generateMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD via `script` in layout; automatic OG image support (`opengraph-image.tsx`) | Manual `<Head>` duplication, no typed metadata |
| **Islands** | Server Components by default; `"use client"` only for terminal/particles/cursor/theme/contact — minimal JS shipped | Everything client or getStaticProps (less granular) |
| **Performance** | RSC + streaming + automatic static optimization | Good but no RSC, no partial rendering |
| **Ecosystem** | Tailwind + `next/font` + `next/image` first-class; Vercel template default | Works but not future-proof |
| **Risk** | Newer API, requires `"use client"` discipline | Tech debt; migration again later |
| Effort | **Medium** (one-time structuring) | Low short-term, high long-term |

**Verdict**: **App Router** mandatory for Next 15. No reason to choose Pages in 2026 for a new migration.

#### 2. Rendering: SSG (Static) vs SSR vs ISR

| | **A. SSG / `output: export` or default Static** (Recommended) | B. SSR (`dynamic`) | C. ISR |
|---|---|---|---|
| How | `app/page.tsx` is static at build; all sections pre-rendered HTML. Client islands hydrate. | Render on every request on Vercel edge/node | Revalidate on interval |
| Fit for portfolio | Perfect — content changes only on deploy (new project/cert). No per-request data. | Overkill; adds latency, no benefit. Cost. | Only if adding CMS later (e.g., Notion/GitHub API live) |
| Vercel cost/perf | Free tier, global edge cache, instant | Function invocations billed, slower TTFB | Edge cache + revalidate |
| SEO | Full static HTML crawable (no JS required for content) | Good but unnecessary | Good |

**Recommendation**: **Static generation (default)**. Optionally `output: 'export'` only if you need a fully static artifact fallback for GitHub Pages; but on Vercel keep default (allows `next/image` optimization, metadata routes, and edge headers). Add `export const dynamic = 'force-static'` explicitly for intent. Convert WhatsApp form to client component; no server action needed unless you later add email API.

#### 3. Styling: Tailwind vs CSS Modules vs CSS-in-JS

| | **A. Tailwind CSS (Recommended)** | B. CSS Modules (preserve styles.css 1:1) | C. CSS-in-JS (styled-components/emotion) |
|---|---|---|---|
| Pros | Utility-first, design tokens, purging (2276→~20 KB), colocation, ecosystem, `tailwind-merge` + `clsx`, dark mode via `class` or `data-theme` | Lowest migration risk; copy-paste current CSS per component; preserves pixel parity | Dynamic theming in JS, prop-driven |
| Cons | Learning curve, needs config + migration of variables → theme | No purge without splitting; global variables still monolithic; duplication | Runtime overhead (~12 KB+), RSC incompatible, hydration cost, not idiomatic in App Router |
| Effort | Medium (map variables → `tailwind.config.ts` + `globals.css`) | Low | Medium-high + performance penalty |
| Perf | Best (purged, atomic, no runtime) | OK (still one large CSS) | Worst |

**Recommendation**: **Tailwind CSS** + minimal `app/globals.css` for CSS variables (light/dark tokens), keyframes, glassmorphism, and custom scrollbar. Migrate variables: `--primary-color` etc. → Tailwind `theme.extend.colors`. Preserve complex animations (float, pulse, shimmer) as Tailwind `keyframes` or in `globals.css`. This yields the cleanest long-term architecture and aligns with Next.js + Vercel conventions. Keep an escape hatch: `*.module.css` allowed for terminal / particles canvas if needed, but not primary.

Alternative low-risk path if pixel parity is paramount: phase 1 with CSS Modules (fast), phase 2 incremental Tailwind — but this creates double work. Prefer direct Tailwind.

#### 4. SEO Preservation Strategy

Current SEO surface must be **parity or better**:

| Current | Next.js Equivalent | Notes |
|---|---|---|
| `<meta description>` | `export const metadata.description` | Same ES copy |
| `og:title/description/type/profile/url/image/site_name/locale` | `metadata.openGraph` | Set `locale: 'es_PE'`, `type: 'profile'`, `siteName: 'Nyraroot'`, `url: canonical` |
| `twitter:card/title/description/image` | `metadata.twitter` | `card: 'summary'` |
| `application/ld+json` Person | `script type="application/ld+json"` in `app/layout.tsx` or dedicated `JsonLd` component | Keep frank@ identity, Arequipa PE, sameAs, knowsAbout |
| `og:image` = `img/tu-foto.jpg` | `app/opengraph-image.tsx` + metadata `openGraph.images` | Generate 1200×630 OG image; compress tu-foto |
| Favicon `img/logo.png` | `app/icon.tsx` / `app/favicon.ico` + `metadata.icons` | Optimize 542 KB → ~15 KB WebP/AVIF |
| Implicit canonical | `metadataBase` + `alternates.canonical` | Decide canonical domain (see Deployment) |

Add: `app/sitemap.ts` (sections as anchors not separate URLs, but projects could become `/proyectos/[slug]` later), `app/robots.ts` (`allow: '/'`), `next-sitemap` alternative. Validate with `next build` metadata.

**Image/Font wins**: `next/image` for hero photo (priority, `sizes`), `next/font/google` for Poppins (self-hosted, no CLS, no external preconnect needed), keep Font Awesome but consider `react-icons/fa6` or subset to reduce bundle.

#### 5. Vercel Deployment & Domain

**Vercel on `vercel.app` free (Recommended for immediate cutover)**:
- Connect GitHub repo → import `Anconeyra/Anconeyra.github.io` → framework preset Next.js 15 → build `next build` → output `.next` managed by Vercel.
- Free subdomain `anconeyra-github-io.vercel.app` (or rename to `nyraroot.vercel.app`). Zero cost, HTTPS, global edge, preview deploys per PR, analytics.
- Keep GitHub repo name `anconeyra.github.io` — it remains the source; only the *hosting* moves. GitHub Pages can stay disabled or as fallback.

**Custom domain ($10–15/yr)**:
- Purchase via Vercel Domains, Cloudflare, Namecheap, or Google Domains successor. Add `www` + apex `nyraroot.com` / `frankanconeyra.com` (choose brand). Configure `CNAME`/`A` per Vercel docs, enable auto-HTTPS.
- SEO: set `metadataBase` to canonical domain, add 301 from `anconeyra.github.io` → new domain (via GitHub Pages `_config.yml` redirect or DNS). Preserve `og:url` and JSON-LD `url` to canonical.
- Cost rationale: only if personal brand needs non-`vercel.app` URL. Otherwise defer; `vercel.app` is production-ready and indexable.

**Cutover plan**:
1. Keep `anconeyra.github.io` live on GitHub Pages while `vercel.app` is staging.
2. Deploy Next.js to Vercel preview → Lighthouse parity check (SEO ≥95, Perf ≥90, a11y ≥95).
3. When ready, point DNS or add redirect; update README, OG urls, JSON-LD, and social links to canonical.
4. Disable GitHub Pages or keep as archived branch for rollback (revert Pages `gh-pages` / `main` root).

**Rollback**: `git checkout gh-pages-static` or re-enable Pages in repo settings → republish old HTML in <2 min. Document in proposal per `openspec/config.yaml` rules.

---

### Recommendation

**App Router + TypeScript + Tailwind + SSG on Vercel (free `vercel.app` first, custom domain optional)** — single `app/page.tsx` composing section components, data in `data/portfolio.ts`.

Proposed architecture (for `design.md`):

```
app/
  layout.tsx        # <html lang="es" data-theme>, metadataBase, fonts (next/font), JSON-LD, ThemeScript (FOUC prevention)
  page.tsx          # SSG: composes Hero, About, Skills, Certifications, Projects, Contact
  globals.css       # Tailwind base + CSS variables + keyframes + utilities
  sitemap.ts        # static routes (future: /proyectos/[slug])
  robots.ts
  opengraph-image.tsx
  icon.tsx
components/
  layout/Navbar.tsx, Footer.tsx, ScrollProgress, ScrollToTop
  hero/Hero.tsx, ParticlesCanvas.tsx (client, canvas + rAF + cleanup)
  about/About.tsx, TechCarousel.tsx (client, interval + dots)
  skills/SkillsGrid.tsx
  certifications/CertificationsGrid.tsx, CredlyButton.tsx
  projects/ProjectsGrid.tsx
  contact/ContactForm.tsx (client, wa.me)
  ui/ThemeToggle.tsx (client, localStorage + matchMedia, hydration guard)
  ui/CustomCursor.tsx (client, pointer:coarse guard)
  terminal/Terminal.tsx + TerminalModal.tsx (client, commands map)
lib/
  data/portfolio.ts # typed DATA (skills/projects/certs) — replaces js/main.js DATA
  theme.ts          # theme helpers
public/
  img/logo.png (optimized), img/tu-foto.jpg (optimized)
```

**Key technical moves**:
- Theme: inline `script` via `next/script beforeInteractive` or raw `<script dangerouslySetInnerHTML>` in `layout.tsx` to set `data-theme` pre-hydration; persist via `useTheme` hook. Prevent hydration mismatch by rendering toggle only after mount.
- Client islands: `"use client"` for cursor, particles, terminal, carousel, counters (`IntersectionObserver`), scroll progress/parallax, contact form. Rest is Server Components.
- Particles: port `initParticles` to `ParticlesCanvas` with `useEffect`, `requestAnimationFrame` cleanup, `ResizeObserver` + DPR handling; keep grid-spatial connect.
- Cursor: `useEffect` + `pointer: coarse` guard, rAF cleanup on unmount.
- Tech carousel: state + interval in `TechCarousel`, pause-on-hover.
- Contact: validate + `encodeURIComponent`, `window.open` client-only; consider Zod.
- SEO: `export const metadata: Metadata = { title, description, openGraph, twitter, alternates: { canonical }, ... }` in `layout.tsx`; JSON-LD component.
- Images: `next/image` with `priority` for hero, `sizes="(max-width:768px) 300px, 400px"`.
- Fonts: `next/font/google` Poppins variable, removes Google Fonts CLS.
- Config: `next.config.ts` (strict TS, `images: {formats:['image/avif','image/webp']}`); `tailwind.config.ts` with darkMode `['class','[data-theme="dark"]']`.

Why not alternatives: Pages Router is dead-end; SSR/ISR adds cost without benefit for static portfolio; CSS Modules duplicates debt; CSS-in-JS harms RSC perf. Tailwind + SSG maximizes performance, maintainability, and Vercel free-tier fit.

---

### Risks

- **SEO regression** (highest): Missing or mismatched OG/Twitter/JSON-LD, `og:image` 404 after path change (`/img/` → `/public`), locale `es_PE` lost, canonical inconsistency, `noindex` accidentally shipped, sitemap missing. **Mitigation**: metadata parity checklist in specs; snapshot OG tags; Lighthouse SEO ≥ current; `vercel --prod` preview crawl; redirect map.
- **Hosting cutover & URL fragmentation**: `anconeyra.github.io` indexed; sudden move to `vercel.app` or custom domain splits authority. **Mitigation**: keep GH repo name; deploy to `vercel.app` preview first; add `rel=canonical` + 301 from old; update `og:url`/`json-ld` only after DNS cutover; document rollback (re-enable Pages).
- **No test baseline**: 0 tests, 0 linter, 4053 lines of implicit behavior. Regression invisible. **Mitigation**: establish Vitest + Testing Library + Playwright early (smoke: render sections, theme toggle, terminal commands, WhatsApp URL building); add Lighthouse CI + `next build` gate; snapshot visual for hero/particles.
- **Visual parity & motion**: 2276 lines CSS + glassmorphism + floating badges + particles → Tailwind migration risks pixel drift; custom cursor `cursor:none` hurts a11y if ported naively; `prefers-reduced-motion` must be respected. **Mitigation**: per-section visual diff checklist; isolate canvas/cursor to client; retain `globals.css` keyframes; keep reduced-motion guards.
- **Image performance**: `logo.png` 542 KB + CDN Font Awesome 6.4.0 are heavy; unoptimized `tu-foto.jpg` OG image harm LCP. **Mitigation**: `next/image` optimization, AVIF, compress logo to ~15 KB, subset icons or use `react-icons`, self-host Poppins via `next/font`.
- **Theme FOUC / hydration mismatch**: Inline script in old HTML prevents flash; Next.js RSC may double-render. **Mitigation**: port inline script to `layout.tsx` before hydration, guard theme read to `useEffect` + `suppressHydrationWarning`.
- **Hard-coded WhatsApp & Credly external deps**: Number `+51917394464` in JS, drive link for CV, Credly URL — fragile. **Mitigation**: extract to `data/portfolio.ts` / env, add URL validation, keep `target=_blank rel=noopener`.
- **Bundle creep**: Recreating particles + terminal + cursor client-side inflates JS (currently 0 build → ~80-120 KB gz). **Mitigation**: code-split terminal (dynamic import), guard particles behind `prefers-reduced-motion` and hero visibility, lazy-load below-fold sections.
- **Fonts/Icons external**: Google Fonts + CDN FA cause CLS and blocking. **Mitigation**: `next/font`, tree-shaken icons.
- **Git history loss risk**: Force-push Next.js scaffold could erase static site history needed for rollback. **Mitigation**: branch strategy `main` (Next.js) + `archive/static-2026-09-09` tag/branch preserving original; never force-push without tag.

---

### Ready for Proposal

**Yes** — exploration is complete and sufficient to draft `proposal.md`. No blocking clarifications, but proposal **MUST** resolve two user decisions:

1. **Domain**: Confirm `vercel.app` free is acceptable for launch vs purchasing custom domain now. Proposal should present free path as default with custom domain as optional follow-up, including cost and redirect plan.
2. **Content freeze vs enhancement**: Whether to add new routes now (e.g., `/proyectos/[slug]`, blog) or strict 1:1 parity. Recommendation: strict parity first, extensibility later.

Next steps per `openspec/config.yaml`: `sdd-propose` → include rollback plan (Vercel → GitHub Pages), SEO preservation checklist, domain/redirect strategy; then `sdd-spec` (one spec per domain: routing, ui, seo, deployment), `sdd-design` (App Router structure, component map, Vercel config, sequence diagrams for theme/terminal/particles), `sdd-tasks` (phased <400 lines/PR).

---

*Artifact persisted to `openspec/changes/nextjs-vercel-migration/exploration.md` (openspec primary). No `engram` write requested (mode=openspec); topic_key `sdd/nextjs-vercel-migration/explore` noted for hybrid sync if orchestrator re-runs in hybrid mode.*
