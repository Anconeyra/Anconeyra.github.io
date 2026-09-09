# Portfolio Specification

## Purpose
Single-page portfolio with 6 anchored sections, persistent navigation/footer, and typed content source. Preserves current IA and content parity while enabling SSG composition via `app/page.tsx`.

## Requirements

### Requirement: Section Composition

The system MUST render 6 sections in order — Hero (`#inicio`), About (`#sobre-mi`), Skills (`#habilidades`), Certifications (`#certificaciones`), Projects (`#proyectos`), Contact (`#contacto`) — each with stable anchor IDs matching legacy hashes.

#### Scenario: 1 — All sections render in order
- GIVEN the user loads `/`
- WHEN the page renders
- THEN sections appear in the order above with correct anchors and headings

#### Scenario: 2 — Unknown anchor fallback
- GIVEN a URL with `#unknown`
- WHEN navigation occurs
- THEN the page scrolls to top and does not throw

### Requirement: Anchor Navigation

The Navbar MUST provide links to all 6 anchors, highlight the active section via scroll position (IntersectionObserver or offset), support smooth scroll with header offset (~80px), and expose a mobile hamburger that toggles visibility.

#### Scenario: 3 — Active link tracking
- GIVEN the user scrolls to `#proyectos`
- WHEN the section enters the viewport threshold
- THEN its nav link receives the active state and others lose it

#### Scenario: 4 — Mobile navigation
- GIVEN viewport ≤768px
- WHEN the user taps the hamburger then a nav link
- THEN the menu opens/closes and smooth-scrolls to the target

### Requirement: Typed Content Source

The system MUST source skills, projects, and certifications from `data/portfolio.ts` with TypeScript types; components SHALL NOT hard-code display strings outside this module. Images referenced by data MUST resolve via `public/`.

#### Scenario: 5 — Data-driven rendering
- GIVEN `data/portfolio.ts` defines 6 skills and 6 projects
- WHEN `SkillsGrid` and `ProjectsGrid` render
- THEN card count and tags match the typed data exactly

#### Scenario: 6 — Type safety
- GIVEN a missing required field in portfolio data
- WHEN `tsc --noEmit` runs
- THEN the build fails with a type error

### Requirement: Footer and Tech Stack Parity

The system MUST render a footer with copyright year, social links (GitHub/LinkedIn), and preserve About's Tech Stack grouping (Frontend/Backend/Mobile/Cloud) plus 3 animated counters (14/15/5) triggered on intersection. Social links MUST use `target="_blank" rel="noopener"`.

#### Scenario: 7 — Footer links
- GIVEN the user clicks a footer social icon
- WHEN the link opens
- THEN it opens in a new tab with `rel=noopener`

#### Scenario: 8 — Tech stack and counters
- GIVEN the About section enters the viewport
- WHEN the observer fires
- THEN 4 tech groups and 3 counters animate from 0 to targets and respect `prefers-reduced-motion`
