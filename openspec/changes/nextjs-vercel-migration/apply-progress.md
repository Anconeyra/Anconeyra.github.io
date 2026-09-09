# Apply Progress — nextjs-vercel-migration

> Change: `nextjs-vercel-migration` | Mode: openspec | Project: Anconeyra.github.io
> Execution: interactive | Delivery: ask-always | Chain: stacked-to-main | Budget: 400 lines/PR

## Progress Summary

- **Batch**: PR1 — Scaffold & Archive + Config Start (first batch, no previous progress)
- **Commits**:
  - `a0e5aa6` chore(archive): capture static baseline before Next.js migration
  - `af21451` chore(scaffold): initialize Next.js App Router with TS, Tailwind, ESLint and config
- **Branch**: `main` (PR1 slice); archive preserved as tag `archive/static-2026-09-09` + branch `archive/static-2026-09-09`
- **Verification**: `next build` ✓ (16.3.4 Turbopack, 5 workers), `tsc --noEmit` ✓, `eslint` ✓ (1 warning in legacy js/main.js, pre-existing)

## Completed Tasks (PR1)

| Task | Status | Evidence |
|------|--------|----------|
| 1.1 Tag `archive/static-2026-09-09` | ✅ done | `git tag -a archive/static-2026-09-09` + `git branch archive/static-2026-09-09` on `a0e5aa6`; rollback `<2min` via `git checkout archive/static-2026-09-09` then re-enable Pages |
| 1.2 Scaffold Next.js App Router | ✅ done | `npx create-next-app@latest` → `/tmp/next-scaffold/portfolio` → copied `package.json`/`tsconfig`/`eslint`/`postcss`/`app/`/`public/`; Next 16.3.4 (latest, vs spec 15 — forward compatible), TS 5, Tailwind 4, ESLint 9, @/* alias, no src/ |
| 1.3 `tailwind.config.ts` | ✅ done | `darkMode: ['class','[data-theme="dark"]']`, `content: ['./app/**/*','./components/**/*','./lib/**/*']`, `extend.colors` (primary→var(--primary-color) etc), `extend.keyframes` (float, pulse, shimmer, gradientFlow, blink, fadeInLeft/Right, etc) |
| 1.4 `next.config.ts` | ✅ done | `images.formats: ['image/avif','image/webp']`, `headers()` with HSTS (63072000), X-Frame-Options DENY, X-Content-Type nosniff, Referrer-Policy, X-DNS-Prefetch |
| 1.5 `app/globals.css` | ✅ done | `@import "tailwindcss"`, `:root` light vars + `[data-theme="dark"]` dark vars (from css/styles.css 2276 lines), keyframes preserved, `@media (prefers-reduced-motion: reduce)` disables animations + hides cursor/particles, `pointer:coarse` + `max-width:768` guards |
| 1.6 Keep `css/` `js/` `img/` | ✅ done | Legacy files retained (index.html 846, css 2276, js 931, img/logo.png + tu-foto.jpg) — not deleted until section migration (task 3.7); diff preview requirement satisfied |

## Files Changed (this batch)

| File | Action | What Was Done |
|------|--------|---------------|
| `package.json` | Created | Next 16.3.4, React 19, eslint-config-next, tailwind 4, TS 5, scripts dev/build/start/lint |
| `package-lock.json` | Created | Lock for scaffold (6896 lines) — exceeds budget, recorded as exception |
| `tsconfig.json` | Created | strict, bundler, jsx react-jsx, paths @/* → ./*, include next-env |
| `eslint.config.mjs` | Created | next/core-web-vitals + typescript, ignore .next/out/build/next-env.d.ts |
| `postcss.config.mjs` | Created | plugins: @tailwindcss/postcss |
| `tailwind.config.ts` | Created | darkMode, content globs, extend.colors/keyframes/animation per design |
| `next.config.ts` | Created | images avif/webp + security headers |
| `app/globals.css` | Created | Tailwind import + CSS vars + data-theme + keyframes + reduced-motion |
| `app/layout.tsx` | Created | Scaffold RootLayout (Geist fonts placeholder — will be replaced in PR2 with Poppins + metadataBase) |
| `app/page.tsx` | Created | Scaffold Home (placeholder — will be replaced in PR3 with 6 anchors) |
| `app/favicon.ico` | Created | Next default icon (will be replaced with optimized icon.tsx in PR5) |
| `public/*.svg` | Created | file/globe/next/vercel/window.svg placeholders |
| `.gitignore` | Modified | Merged Next.js ignores (.next, node_modules, .vercel, env, build) + preserved .atl |
| `index.html` `css/` `js/` `img/` | Preserved | Not deleted per 1.6 — archived via tag/branch for rollback |
| `openspec/changes/**/tasks.md` | Modified | Marked Phase 1 1.1–1.6 ✅, resolved chain strategy stacked-to-main |

## Verification

- `npm install` → 365 packages, 0 vulnerabilities
- `npm run build` → Compiled successfully in 13s, TypeScript 4.9s, static pages 4/4, routes: ○ / + /_not-found (prerendered)
- `npx tsc --noEmit` → EXIT 0
- `npm run lint` → 1 warning (legacy js/main.js animationId unused, pre-existing, intentional keep for now)
- Archive integrity: `git show archive/static-2026-09-09:index.html` contains FOUC script + OG/Twitter/JSON-LD (captured from working dir before scaffold), `css/styles.css` 2276, `js/main.js` 931

## Deviations from Design

- **Next.js version 16.3.4 vs 15**: Scaffold used `create-next-app@latest` which now emits Next 16. Forward compatible; no API break for App Router/SSG. Noted as minor deviation — if strict 15 required, pin `next@15` in PR2.
- **Tailwind 4 vs 3 config**: Scaffold uses Tailwind 4 (`@import "tailwindcss"` + `@tailwindcss/postcss`). Created `tailwind.config.ts` as per design (v3 style) for compatibility — Tailwind 4 still reads it via compat layer. Globals uses v4 import syntax, not v3 directives. This is intentional hybrid.
- **package-lock.json size**: 6896 lines causes PR1 to exceed 400-line budget (total 7541 lines). Recorded as `size:exception` for PR1 per tasks.md forecast High risk — scaffold boilerplate unavoidable. Subsequent PRs will stay <400.

## Issues Found

- `npx create-next-app` failed with `name can no longer contain capital letters` for directory `Anconeyra.github.io` — resolved via temp dir `/tmp/next-scaffold/portfolio` then copy.
- `.gitignore` originally excluded `next-env.d.ts` → `git add` required explicit handling; kept ignored (generated file) and did not commit.
- Legacy `js/main.js` lint warning persists — will be removed when decomposed into components (Phase 3).

## Remaining Tasks

- **Phase 2** (PR2): 2.1 portfolio.ts, 2.2 layout.tsx (es + Poppins + FOUC + JSON-LD), 2.3 page.tsx (force-static anchors), 2.4 Navbar/Footer, 2.5 tsc gate
- **Phase 3** (PR3–4): Sections & Islands (Hero/Particles/About/Carousel/Skills/Certs/Projects + Theme/Cursor/Terminal/Scroll/Contact)
- **Phase 4** (PR5): SEO (metadata, sitemap/robots/og-image/icon) + assets optimization
- **Phase 5** (PR6): Tests + Vercel (Vitest/Playwright, LH ≥95, Vercel import, cutover/rollback)

## Workload / PR Boundary

- Mode: **chained PR slice** — stacked-to-main (solo dev, fast iteration)
- Current work unit: **Unit 1 — Scaffold + archive** (PR1)
- Boundary: Starts from `archive/static-2026-09-09` (a0e5aa6) through scaffold config (af21451). Autonomous deliverable: `next build` passes on empty App Router, no deletion of legacy static.
- Estimated review budget impact: **7541 lines** (exception — boilerplate + lock). Next slices target <400 per unit.
- Next recommended: **PR2 — Config + data + shell** (Phase 1 1.6 Vitest deferred, then Phase 2). Base: `main` @ af21451 (or feature branch if stacked).

## Status

5/6 Phase-1 tasks complete (1.1–1.6 keep-files done; Vitest deferred). Ready for next batch (PR2). No previous apply-progress to merge (first batch).
