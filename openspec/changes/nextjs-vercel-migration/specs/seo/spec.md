# SEO Specification

## Purpose
Preserve and improve current SEO surface (ES, `es_PE`, Person schema, Arequipa PE) using Next.js Metadata API, typed routes, and optimized assets. Lighthouse SEO MUST be ≥95.

## Requirements

### Requirement: Metadata Base and Canonical

The system MUST set `metadataBase` to the canonical origin and `alternates.canonical` to the page URL. No page SHALL emit `noindex` in production.

#### Scenario: 1 — Canonical resolves
- GIVEN `metadataBase=https://anconeyra.vercel.app`
- WHEN crawling `/`
- THEN `<link rel="canonical">` equals `https://anconeyra.vercel.app/` and `metadataBase` is set

#### Scenario: 2 — No accidental noindex
- GIVEN a production build
- WHEN inspecting `<meta name="robots">`
- THEN no `noindex` is present

### Requirement: Open Graph

`metadata.openGraph` MUST include `title`, `description` (ES), `type: 'profile'`, `url` = canonical, `siteName`, `locale: 'es_PE'`, and `images` with absolute URL 1200×630. Values MUST match legacy OG parity.

#### Scenario: 3 — OG tags present
- GIVEN a request to `/`
- WHEN parsing `<meta property="og:*">`
- THEN `og:locale=es_PE`, `og:type=profile`, `og:url=canonical`, and `og:image` is 1200×630 absolute URL

### Requirement: Twitter and Icons

`metadata.twitter` MUST be `card: 'summary'` with `title`, `description`, `images`. `metadata.icons` MUST reference optimized favicon derived from `logo.png` (~15 KB).

#### Scenario: 4 — Twitter card
- GIVEN the page head
- WHEN reading `twitter:*` tags
- THEN `twitter:card=summary` and title/description/images are present

### Requirement: JSON-LD Person

A `script type="application/ld+json"` MUST emit a `Person` with `name: "Frank Anconeyra"`, `alternateName: "Nyraroot"`, `jobTitle`, `url` = canonical, `image` = hero photo absolute URL, `email`, `address: { addressLocality: "Arequipa", addressCountry: "PE" }`, `sameAs: [GitHub, LinkedIn]`, `knowsAbout` (4 domains). It MUST validate as JSON-LD.

#### Scenario: 5 — Structured data
- GIVEN the rendered HTML
- WHEN extracting `application/ld+json`
- THEN it parses as `Person` with `alternateName=Nyraroot` and address Arequipa PE

### Requirement: Sitemap, Robots, OG Image

`app/sitemap.ts` MUST export static routes (at least `/`); `app/robots.ts` MUST allow `/` and reference sitemap; `app/opengraph-image.tsx` MUST generate a 1200×630 image. All routes MUST be reachable and return 200.

#### Scenario: 6 — Metadata routes
- GIVEN a GET to `/sitemap.xml`, `/robots.txt`, `/opengraph-image`
- WHEN fetched
- THEN each returns 200 with correct content-type and sitemap lists `/`

### Requirement: Optimized Assets and Locale

The system MUST use `next/image` (AVIF/WebP, `priority` for hero, `sizes` responsive) and `next/font` for Poppins (self-hosted, no CLS). `<html lang>` MUST be `es`. Performance MUST meet Lighthouse SEO ≥95.

#### Scenario: 7 — Image and font optimization
- GIVEN the hero photo
- WHEN inspecting the element
- THEN it is rendered via `next/image` with `priority` and Poppins is loaded via `next/font` (no external Google Fonts CLS)

#### Scenario: 8 — Lighthouse threshold
- GIVEN a production build on Vercel preview
- WHEN running Lighthouse
- THEN SEO score is ≥95 (Perf ≥90, A11y ≥95 tracked separately)
