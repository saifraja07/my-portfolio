# Developer Universe

A personal portfolio for Saif Ali Raja — MERN stack developer focused on backend, cloud, and system design — presented as a cosmic homepage backed by a conventional, content-first portfolio underneath it.

## Concept

The homepage ("the universe") is a navigation metaphor, not a gimmick: a central orb represents the developer, and six orbiting planets link out to About, Projects, Experience, Skills, Writing, and Contact. Every other page is a calm, editorial, content-first page that happens to share the same dark, gold-accented design system. A separate `/recruiter` route gives recruiters a dense, fast, print-friendly summary of the same underlying data.

## Tech stack

- React 19 + TypeScript (strict) + Vite
- React Router (data router, lazy-loaded routes)
- Tailwind CSS v4 (via `@tailwindcss/vite`, tokens defined in `src/styles/tokens.css`)
- Framer Motion (page transitions, hover/tap feedback — respects `prefers-reduced-motion` throughout)
- Lucide React (icons)

No backend, no CMS, no state-management library — content lives in typed local data files (see below), and the contact form is intentionally frontend-only (see `src/components/contact/submitContactForm.ts`).

## Project structure

```
src/
  app/            Router, root App component, context providers
  components/     UI, grouped by domain (navigation/, universe/, projects/, recruiter/, common/, effects/, contact/)
  pages/          One folder per route, composed from components/ + data/
  data/           ← Portfolio content lives here (see below)
  types/          TypeScript types for every data shape
  hooks/          Reusable hooks (reduced motion, scroll reveal, keyboard shortcuts, resume availability, etc.)
  lib/            Framework-agnostic helpers (animations, design-token utilities, command palette index)
  styles/         Design tokens (tokens.css), global styles, universe-specific CSS
```

## Where content is configured

Everything the site displays comes from one of these files — there is no duplicated content between components:

| Content | File |
|---|---|
| Name, role, bio, focus areas | `src/data/profile.ts` |
| Site config (email, social URLs, resume path, domain) | `src/data/profile.ts` → `siteConfig` |
| Navigation & universe planet layout | `src/data/navigation.ts` |
| Projects (case studies) | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Experience timeline | `src/data/experience.ts` |
| Writing / notes | `src/data/writing.ts` (currently empty — see below) |
| Resume file | Path configured via `siteConfig.resumePath`; drop the actual PDF at `public/resume/` |

### Adding a project

Add an entry to the `projects` array in `src/data/projects.ts` matching the `Project` type in `src/types/project.ts`. Every detail section (implementation, challenges, results, lessons, architecture, screenshots) is optional and only renders if populated — you don't need to fill in everything to ship a project.

### Adding a skill, experience entry, or social link

Same pattern: add a typed object to the relevant array in `data/`. Nothing else needs to change — listing pages, the command palette, and Recruiter View all read from the same arrays.

### Writing

`src/data/writing.ts` currently exports an empty array on purpose — there's no real writing content yet, so the page shows its (already-designed) empty state rather than placeholder blog posts. Add real entries to the array when there's something to publish.

## Known placeholders before going live

- **`siteConfig`'s GitHub, LinkedIn, and email are placeholder values, not real accounts** — replace them in `src/data/profile.ts` before launch.
- No resume PDF exists yet. The Resume page and Recruiter View both detect this (via a `HEAD` request) and show a graceful "not available" state instead of a broken link — just drop the real file at the configured `resumePath`.
- No project screenshots exist yet. The gallery/lightbox system is fully built; screenshots just need to be added to each project's `screenshots` array.
- No social preview (Open Graph) image exists. `siteConfig.ogImage` is wired up and will be picked up automatically once a real asset is added — no code changes needed.

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check (tsc -b) + production build
npm run lint      # oxlint
npm run preview   # preview the production build locally
```

## Deployment

The app is a static single-page app — any static host works, but client-side routing needs a rewrite rule so deep links like `/projects/browseros` or `/recruiter` don't 404 on refresh:

- **Vercel**: `vercel.json` (included) already handles this.
- **Netlify**: `public/_redirects` (included) already handles this.
- **Other hosts**: rewrite all paths to `/index.html`.

`public/robots.txt` and `public/sitemap.xml` assume the production domain is `https://saifaliraja.dev` (matching `siteConfig.siteUrl`) — update both if the real domain differs.
