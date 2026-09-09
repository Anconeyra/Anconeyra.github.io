# Specs — Anconeyra.github.io

Source of truth for project-wide specifications. Each domain lives in its own subdirectory:

```
openspec/specs/{domain}/spec.md
```

Domains are created on demand by `sdd-spec`. Example domains for the upcoming Next.js migration:

- `portfolio` — overall site structure, sections, and content
- `ui` — theming (light/dark), responsive layout, animations
- `seo` — Open Graph, Twitter Card, JSON-LD, meta tags
- `deployment` — GitHub Pages (current) and Vercel (target) hosting

No domain specs exist yet. Run `/sdd-propose` and `/sdd-spec` for `nextjs-vercel-migration` to populate.
