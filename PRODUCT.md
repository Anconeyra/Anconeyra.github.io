# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: technical hiring managers, recruiters, and hiring engineers evaluating Frank
Anconeyra for a full-stack or application-security role. They arrive from a CV link, a
LinkedIn profile, or a GitHub README, usually on a laptop during a screening pass, and they
have under two minutes.

Secondary: small-business and freelance clients in Peru who need a system built (inventory,
accounting, evaluation, CRM).

Job to be done: decide fast whether this person can be trusted with production code and
security-sensitive systems, then find a way to contact him.

## Product Purpose

A single-page professional portfolio for Frank Anconeyra, Full-Stack Developer and
Cybersecurity Analyst based in Arequipa, Peru. It exists to convert a two-minute scan into a
contact. Success is a hiring or project conversation started from this page.

## Positioning

The combination is the differentiator: the same person ships full-stack product across
Flutter, C#/.NET, Django, Node, and Laravel, AND holds Cisco cybersecurity credentials in
endpoint security and network defense. Most portfolios prove only the first half. A security
practitioner who also builds the product is rare and is the thing worth remembering.

## Operating Context

- Evaluated in a browser tab, often alongside other candidates' portfolios.
- Recruiters skim; engineers read the project list and the technology claims.
- Contact happens through WhatsApp (Peru is the primary market), email, GitHub, or LinkedIn.
- Mobile visits are substantial in the Peru freelance market.
- Spanish-language market plus international roles; current copy is Spanish with English
  technical terms.

## Capabilities and Constraints

- SvelteKit 5 (runes mode) + TypeScript + Vite 8, deployed on Vercel via
  `@sveltejs/adapter-vercel`. Stack is fixed; do not migrate.
- Sections that must survive: Hero/identity, About, Skills, Certifications, Projects,
  Contact, Footer.
- The site is presented as a Linux desktop: a system panel, one application window, and a
  dock. Each section is an application; the dock and number keys switch between them.
  Light/dark theming was removed; the world is a single dark desktop.
- The profile photo at `static/img/tu-foto.svg` is a placeholder. A real photo is an
  outstanding asset request.
- No published case studies, testimonials, or client names. Do not fabricate them.
- Employer history comes from Frank's own public career record: Rsa Creative Hub (oct. 2026
  — actualidad), Grupo Roberts (set. 2026 — oct. 2026), Peru Intercorp Corporation
  (feb. 2026 — ago. 2026), Consejeros y Corredores de Seguros (ago. 2025 — nov. 2025),
  Grupo Moss (dic. 2024 — ene. 2025 and jul. 2024 — ago. 2024).
- OPEN: the exact job title at Rsa Creative Hub is unconfirmed; "Desarrollador de Software"
  is a placeholder pending Frank's confirmation. Its description and tags are intentionally
  empty — do not invent them.
- Current certifications and all 15+ credentials listed in `src/lib/data.ts` are real
  (Cisco, AWS, Certiprof, SAP per the terminal copy).

## Brand Commitments

- Name: Frank Anconeyra. Role claim: Full-Stack Developer & Cybersecurity Analyst.
- Contact details are real and must be preserved: anconeyrafsuyo@gmail.com,
  github.com/Anconeyra, linkedin.com/in/frank-anconeyra, +51 917 394 464.
- Language: Spanish, with English technical terms used as-is.

## Evidence on Hand

- Six real repositories linked from `src/lib/data.ts`: Greenfil (Flutter + C#/.NET), MOSS
  (Python data/ML), Sistema de Evaluación (JS + Python), LiteConta-SUNAT (PHP/Blade), CRM
  Django, Gestión de Inventarios.
- Certification records with issuer and year (Cisco, AWS) in `src/lib/data.ts`.
- A placeholder avatar and a placeholder project-image slot. No real project screenshots, no
  headshot. Future work must not invent client logos, revenue, or testimonials.

## Product Principles

1. The scan wins: a hiring manager must know what Frank does within one viewport.
2. Security is the differentiator, not a footnote — show it, do not decorate with it.
3. Every claim on the page is backed by a real repository, certificate, or contact channel.
4. Usable on a phone, in a hurry, on a bad connection.
5. The interface must not get in the way of reading the work.
