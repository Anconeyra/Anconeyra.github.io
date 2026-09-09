# Deployment Specification

## Purpose
Migrate hosting from GitHub Pages to Vercel with Git integration, free subdomain, zero-downtime cutover, and documented rollback. Keep repo `Anconeyra/Anconeyra.github.io` as source.

## Requirements

### Requirement: Vercel GitHub Integration and Build

The system MUST be imported via Vercel GitHub import with framework preset Next.js, build command `next build`, output `.next`, Node 20. Push to `main` SHALL trigger production deploy; PRs SHALL trigger previews. Build MUST enforce `tsc --noEmit` and `next build` success as gate.

#### Scenario: 1 — Push to main builds
- GIVEN a push to `main`
- WHEN Vercel receives the webhook
- THEN a production deployment starts with `next build` and succeeds

#### Scenario: 2 — Build gate
- GIVEN a type error in `data/portfolio.ts`
- WHEN building
- THEN the deployment fails and is not promoted

### Requirement: Free Subdomain, HTTPS, Analytics

Production MUST be served on a `vercel.app` free subdomain (e.g., `anconeyra-github-io.vercel.app`), with auto-HTTPS, global edge cache, and Vercel Analytics enabled. The subdomain URL MUST be the `metadataBase` until a custom domain is adopted.

#### Scenario: 3 — HTTPS and edge
- GIVEN the production URL
- WHEN fetched via HTTPS
- THEN it returns 200 with valid cert and `cache-control` edge headers; Analytics script is present

### Requirement: Preview Deployments

Every PR MUST receive an isolated preview URL with the same build pipeline. Preview deployments MUST NOT affect production.

#### Scenario: 4 — PR preview
- GIVEN a new pull request
- WHEN CI completes
- THEN a preview URL is posted and serves the PR's build

### Requirement: Custom Domain (Optional, Deferred)

Custom domain purchase and DNS configuration (apex + `www`, CNAME/A per Vercel docs, auto-HTTPS) MAY be deferred; cost $10–15/yr. If adopted, the system MUST update `metadataBase`, `og:url`, JSON-LD `url`, and add 301 from `anconeyra.github.io` and `vercel.app` to the canonical. No domain work SHALL block initial launch.

#### Scenario: 5 — Deferred domain
- GIVEN no custom domain is configured
- WHEN launching
- THEN `vercel.app` remains canonical and the site is indexable without 301

#### Scenario: 6 — Domain cutover (when enabled)
- GIVEN a custom domain `example.com` is added
- WHEN DNS and Vercel domain config complete
- THEN `metadataBase` is `https://example.com`, old hosts 301 to canonical, and OG/JSON-LD URLs match

### Requirement: Rollback to GitHub Pages

The repo MUST retain tag `archive/static-2026-09-09` preserving the static site. Rollback SHALL be: re-enable GitHub Pages (Settings → `main` root) and revert DNS/301, achievable in <2 min. Vercel preview MUST remain available after rollback.

#### Scenario: 7 — Rollback path
- GIVEN a failed production cutover
- WHEN the operator re-enables Pages from the archive tag
- THEN `https://anconeyra.github.io` serves the static site again within 2 min

#### Scenario: 8 — Archive integrity
- GIVEN tag `archive/static-2026-09-09`
- WHEN checked out
- THEN `index.html`, `css/styles.css`, `js/main.js`, `img/` match the pre-migration baseline
