# Tasks: nextjs-vercel-migration

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~3000 adds |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | 6 PRs: scaffold→config→sections→islands→SEO→tests |
| Delivery strategy | ask-always |
| Chain strategy | pending |

Decision needed before apply: No — resolved stacked-to-main (solo dev, fast iteration) per session preflight
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High — PR1 recorded as size:exception (scaffold 7541 lines incl. package-lock)

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Scaffold + archive | PR1 | Base `main`; `create-next-app --ts --tailwind --eslint --app`; tag `archive/static-2026-09-09` |
| 2 | Config + data + shell | PR2 | Base PR1; `tailwind.config`/`next.config`/`globals.css`/`portfolio.ts` |
| 3 | Sections (6 anchors) | PR3 | Base PR2; `layout`/`page`+Navbar/Footer/Hero/Skills/Certs/Projects |
| 4 | Islands (7) | PR4 | Base PR3; Theme/Particles/Cursor/Terminal/Carousel/Scroll/Contact |
| 5 | SEO + assets | PR5 | Base PR4; `sitemap`/`robots`/`og-image`/`icon`+`public/img`+`next/image/font` |
| 6 | Tests + Vercel | PR6 | Base PR5; Vitest/Playwright, `tsc --noEmit`, `next build`, Lighthouse ≥95 |

> Work units + tests/docs, Conventional Commits. `pending`→ask chain strategy before apply.

## Phase 1: Scaffold & Config — PR1 (stacked-to-main) ✅

- [x] 1.1 Tag `archive/static-2026-09-09` `index.html`/`css/`/`js/`/`img/` — tag + branch `archive/static-2026-09-09` on commit a0e5aa6
- [x] 1.2 Scaffold `create-next-app` TS App Router Tailwind ESLint `@/*` — Next 16.3.4 (latest) via /tmp/portfolio scaffold, src? NO, alias @/*, copy to root
- [x] 1.3 `tailwind.config.ts` `darkMode:['class','[data-theme="dark"]']` `extend.colors/keyframes` — colors var(--primary-color) etc + keyframes float/pulse/shimmer etc
- [x] 1.4 `next.config.ts` `images:{formats:['avif','webp']}` security headers — avif/webp + HSTS/X-Frame-Options/DENY/X-Content-Type nosniff etc
- [x] 1.5 `app/globals.css` `@tailwind` CSS vars `data-theme` keyframes `reduced-motion` — @import tailwindcss, :root + [data-theme=dark], keyframes, reduced-motion + pointer:coarse guards
- [x] 1.6 Keep existing `css/` `js/` `img/` for preview diff (do not delete until section migration) — verified preserved; Vitest/Playwright deferred to PR6 (Phase 5)

## Phase 2: Data & Shell

- [ ] 2.1 `lib/data/portfolio.ts` `Skill/Project/Cert` from `js/main.js` DATA
- [ ] 2.2 `app/layout.tsx` `<html lang="es" suppressHydrationWarning>` Poppins `next/font` `metadataBase` FOUC+JSON-LD
- [ ] 2.3 `app/page.tsx` `dynamic='force-static'` 6 anchors `#inicio`→`#contacto`
- [ ] 2.4 `components/layout/Navbar.tsx` (IntersectionObserver, 80px offset, hamburger) + `Footer.tsx`
- [ ] 2.5 `tsc --noEmit` must fail on missing field in `portfolio.ts`

## Phase 3: Sections & Islands

- [ ] 3.1 `hero/Hero.tsx` + `ParticlesCanvas.tsx` (DPR `w*h/9000` rAF repulsion 150 ResizeObserver)
- [ ] 3.2 `about/About.tsx` + `TechCarousel.tsx` (12 slides 2s dots pause-hover) + `StatsCounter` 14/15/5
- [ ] 3.3 `skills/SkillsGrid.tsx` `certifications/CertificationsGrid.tsx` `projects/ProjectsGrid.tsx` (`next/image`)
- [ ] 3.4 `ui/ThemeToggle.tsx`+`ThemeProvider.tsx` (`localStorage`/`matchMedia` mount guard)
- [ ] 3.5 `ui/CustomCursor.tsx` (rAF `pos+=(mouse-pos)/9` `pointer:coarse` guard) + `ScrollProgress`+`ScrollToTop`
- [ ] 3.6 `terminal/Terminal.tsx` (`dynamic` z-10000 10 cmds history Tab ESC) + `contact/ContactForm.tsx` (`wa.me`+`encodeURIComponent`)
- [ ] 3.7 Wire `app/page.tsx`; delete `index.html`/`css/`/`js/` after preview diff

## Phase 4: SEO & Assets

- [ ] 4.1 `metadata` `openGraph{profile,es_PE,1200×630}` `twitter{summary}` `canonical` `icons`
- [ ] 4.2 `app/sitemap.ts` `robots.ts` `opengraph-image.tsx` `icon.tsx`
- [ ] 4.3 `img/*`→`public/img/` `logo.png` 542KB→~15KB `next/image` `priority`+`sizes`
- [ ] 4.4 `next/font/google` Poppins self-host; `react-icons/fa6`
- [ ] 4.5 Verify `/sitemap.xml` `/robots.txt` `/opengraph-image` 200

## Phase 5: Testing & Deploy

- [ ] 5.1 Vitest: card counts, `wa.me` encoding, carousel advance/pause
- [ ] 5.2 `next build` + 6 anchors snapshot + `tsc --noEmit`
- [ ] 5.3 Playwright: FOUC/persist particles DPR cursor terminal 10 cmds WhatsApp scroll
- [ ] 5.4 Lighthouse CI SEO≥95 Perf≥90 A11y≥95; `cursor:none` only `pointer:fine`
- [ ] 5.5 Vercel import Next.js `next build` Node20 no `vercel.json` `vercel.app` `metadataBase`
- [ ] 5.6 Cutover: `og:url`/JSON-LD 301 plan rollback `<2min` Pages from tag
