<<<<<<< HEAD
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
=======
# Saif Ali Raja — Portfolio

A personal developer portfolio built to showcase my projects, technical skills, and journey as a developer, with a focus on backend development and building practical applications.

🌐 **Live Website:** [saifaliraja.com](https://saifaliraja.com)

## Tech Stack

- React.js
- Vite
- Tailwind CSS

## Features

- Personal introduction
- Projects showcase
- Technical skills
- Contact links
- Responsive design

## Run Locally

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_DIRECTORY
npm install
npm run dev
```

## Author

**Saif Ali Raja**

[GitHub](https://github.com/saifraja07) · [Portfolio](https://saifaliraja.com)
>>>>>>> 6eaa3711bcdcf3c7b95d5a1ee15c09f0b7515fee
