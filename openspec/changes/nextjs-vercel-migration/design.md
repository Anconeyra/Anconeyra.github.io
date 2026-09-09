# Design: nextjs-vercel-migration

## Technical Approach

Static (846+2276+931, no build) → Next.js 15 App Router SSG `force-static` on Vercel. `app/page.tsx` composes 6 anchors; RSC default, islands for browser state. Tailwind + CSS vars (`data-theme`). Typed `lib/data/portfolio.ts`. SEO via `metadata`+JSON-LD+`sitemap`/`robots`/`opengraph-image`. No `vercel.json`.

## Architecture Decisions

| Decision | Option | Tradeoff | Choice |
|---|---|---|---|
| Router | App vs Pages | Pages legacy, no RSC/metadata | **App Router** `app/layout.tsx`+`page.tsx` |
| Rendering | SSG vs SSR/ISR | SSR cost/latency; ISR needs CMS | **SSG** `dynamic='force-static'` |
| Styling | Tailwind vs Modules/CSS-in-JS | Modules no purge; CSS-in-JS breaks RSC | **Tailwind** + `globals.css` vars/keyframes |
| Images/Fonts | `next/image`+`next/font` vs CDN | CDN CLS, 542 KB logo | **next/image** avif/webp + `next/font` Poppins |
| Data | Typed module vs inline | Inline untyped | **`lib/data/portfolio.ts`** |
| Deploy | `vercel.json` vs auto-detect | Unneeded | **No vercel.json**, `next build` |

## App Structure & File Changes

```
app/layout.tsx  # <html lang="es" suppressHydrationWarning>, Poppins, metadataBase, FOUC script, JSON-LD
app/page.tsx    # force-static: Hero+ParticlesCanvas / About+TechCarousel / SkillsGrid / Certs / Projects / ContactForm
app/globals.css # @tailwind + CSS vars (data-theme) + keyframes
app/sitemap.ts  robots.ts  opengraph-image.tsx  icon.tsx
components/layout/Navbar Footer ScrollProgress ScrollToTop
components/hero/Hero ParticlesCanvas  about/About TechCarousel  skills/SkillsGrid
components/certifications/CertificationsGrid  projects/ProjectsGrid
components/contact/ContactForm  ui/ThemeToggle CustomCursor  terminal/Terminal
lib/data/portfolio.ts  public/img/ (optimized)
```

| File | Action | Description |
|---|---|---|
| `app/**` | Create | Layout, page, SEO routes |
| `components/**` | Create | Decompose `js/main.js` (931) |
| `lib/data/portfolio.ts` | Create | Typed DATA, `next/image` |
| `tailwind.config.ts` `next.config.ts` `tsconfig.json` | Create | Config |
| `index.html` `css/` `js/` | Delete | Tag `archive/static-2026-09-09` |
| `img/*` | Move | `public/img/` |

## RSC vs Client Islands

Default Server. `"use client"` for browser APIs:

| Component | Why client |
|---|---|
| `ThemeProvider`/`ThemeToggle` | `localStorage`+`matchMedia`, mount guard |
| `ParticlesCanvas` | `canvas` rAF, `ResizeObserver`, DPR, repulsion r=150 |
| `CustomCursor` | `mousemove` rAF, `pointer:coarse`/`reduced-motion` guard |
| `Terminal` | state, commands map, history, ESC; `dynamic(()=>import)` |
| `TechCarousel` `StatsCounter` | `setInterval` 2s, `IntersectionObserver` 14/15/5 |
| `ContactForm` `ScrollProgress` `Navbar` | `wa.me` `window.open`, scroll rAF, active-link |
| `Hero` `About` `SkillsGrid` `Certs` `Projects` `Footer` | Server — static + `next/image` |

FOUC: inline script in `layout.tsx` sets `data-theme` pre-paint; `suppressHydrationWarning` on `<html>`.

## Config

```ts
// tailwind.config.ts
{ darkMode:['class','[data-theme="dark"]'], content:['./app/**/*','./components/**/*'],
  theme:{ extend:{ colors:{ primary:'var(--primary)' }, keyframes:{ float:{'0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-10px)'}}}}}}
 // next.config.ts
{ images:{ formats:['image/avif','image/webp'] } } // tsconfig: strict, bundler, @/* alias
```

## Data Flow

```
lib/data/portfolio.ts ──→ Server Components ──→ static HTML
        └─→ Client islands (props) ──→ hydration ──→ browser APIs
public/img + next/image ──→ avif/webp ──→ edge cache
layout.tsx metadata+JSON-LD+fonts → <head> SSR → hydration guarded
    Components: A ──→ B ──→ C
         └────── Store (portfolio.ts) ──────┘
```

### Sequences

**Theme (FOUC-free):**
```
Browser → inline-script: set data-theme pre-paint → SSR HTML
Browser → hydrate ThemeToggle (mount guard) → read localStorage/matchMedia
User click → toggle attr on <html> → write localStorage
```

**Terminal:**
```
User click/ESC → Terminal(dynamic) mount lazy → commands map from lib/data → render
User input "help" → lookup → innerHTML output (+ history, tab autocomplete)
```

**Particles:**
```
useEffect → canvas DPR scale → particles=w*h/9000 → rAF loop (grid-spatial, repulsion)
→ cleanup on unmount/resize(debounced). Guard: reduced-motion → static fallback
```

## SEO Mapping

| Old `index.html` | New App Router |
|---|---|
| `<meta description>` | `metadata.description` |
| `og:title/desc/type/profile/url/image/site_name/locale es_PE` | `metadata.openGraph{type:'profile',locale:'es_PE',siteName:'Nyraroot'}` |
| `twitter:card/title/desc/image` | `metadata.twitter{card:'summary'}` |
| `application/ld+json` Person | `<script ld+json>` in `layout.tsx` |
| `og:image tu-foto.jpg` `logo.png` 542 KB | `opengraph-image.tsx` 1200×630 + `icon.tsx` + `metadata.icons`; 542→~15 KB |
| implicit canonical | `metadataBase` + `alternates.canonical='/'` |
| — | `sitemap.ts` `robots.ts` allow `/` |

## Vercel Deployment

Auto-detect: `next build` → `.next` SSG edge-cached. GitHub import → preview/PR, prod `main`. No env (WhatsApp in `portfolio.ts`). Rollback tag `archive/static-2026-09-09`, Pages `<2 min`; `301` after cutover. Headers via `next.config.ts`.

## Non-Functional

**Perf LH≥95:** `next/image` priority hero, `next/font` no CLS, `dynamic` Terminal, gate particles, purge 2276→~20 KB. **A11y:** `reduced-motion` disables animations/cursor/particles; `cursor:none` only `pointer:fine`; `aria-label`/`aria-live`. **Security:** `HSTS`, `X-Frame-Options:DENY`, `X-Content-Type-Options:nosniff`.

## Interfaces

```ts
type Skill={icon:string; title:string; tags:string[]}; type Project={title:string; desc:string; tags:string[]; links:{label:string; href:string}[]}
export const metadata: Metadata={ metadataBase, title, description, openGraph, twitter, alternates, icons }
```

## Testing

| Layer | What | Approach |
|---|---|---|
| Unit | `portfolio.ts`, wa.me URL, carousel | Vitest |
| Integration | 6 anchors, `next build` | build gate + snapshot |
| E2E | theme FOUC, cursor, terminal 10 cmds, WhatsApp | Playwright + LH CI ≥95/90/95 |

## Migration

Tag archive → scaffold → incremental PRs <400 lines → Vercel preview LH diff → cutover `vercel.app` 301 → disable Pages last (rollback <2 min).

## Open Questions

- [ ] `vercel.app` vs custom domain later? Defer.
- [ ] FA CDN vs `react-icons` subset?
- [ ] CV Drive link env?
