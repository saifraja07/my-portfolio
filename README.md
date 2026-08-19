# Portfolio — V1

A simple, professional, fast, and responsive developer portfolio.

## Stack

- React + Vite
- Tailwind CSS v4
- Framer Motion (subtle entrance animations only)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Structure

```
src/
  components/   Navbar, Hero, ProjectCard, WorkSection, AboutSection,
                SkillsSection, ExperienceSection, ContactSection, Footer
  data/         projects.js, skills.js, timeline.js, links.js
  index.css     design tokens (Tailwind v4 @theme) + base styles
```

## Things to customize before deploying

- `src/data/projects.js` — swap in real `liveUrl` / `sourceUrl` links and, if
  you have project screenshots, replace the placeholder preview block in
  `ProjectCard.jsx` with an `<img>`.
- `src/data/links.js` — real GitHub, LinkedIn, and email address.
- `src/data/timeline.js` — update as your journey progresses.
- `public/favicon.svg` — currently the Vite default, swap for your own mark.

## Notes

- Dark theme with a single green accent, per the design brief. All colors
  live in `src/index.css` under `@theme` (`--color-*`) so the palette can be
  adjusted in one place.
- Respects `prefers-reduced-motion`; the site is fully usable and still
  looks complete with all animation removed.
- No backend, auth, database, or CMS — static site, ready for Vercel,
  Netlify, or any static host.
