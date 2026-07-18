# CLAUDE.md

System prompt / operating guide for this project. Read this before making changes.

## Purpose

This is **TERMINAL // MM-01**, the personal portfolio of Matteo Marchetti — a
software engineer focused on machine learning, deep learning and neural networks.
It presents an operator profile, work experience, projects, experiments and a
blog through a single-page application styled as a brutalist / urbex "abandoned
data vault" terminal.

Two design principles drive the whole codebase:

1. **Frontend only.** There is no backend and no authentication. All dynamic
   content is fetched at runtime directly from public sources (GitHub raw READMEs,
   a static Resume file).
2. **Config-driven.** Nearly all displayed content — site copy, menu, socials,
   about text, experiments, blog entries, which GitHub repos to feature — lives in
   a single JSON config so the site can be re-skinned without touching components.

## Tech stack

- **Language:** TypeScript (~5.8), strict.
- **UI:** React 19 (`react`, `react-dom`).
- **Routing:** `react-router-dom` v7 (`BrowserRouter`, client-side routes).
- **Build tool:** Vite 6 with `@vitejs/plugin-react`. Build = `tsc -b && vite build`.
- **Styling:** Plain CSS in `src/styles/` (`global.css`, `components.css`); theming
  via a `data-theme` attribute on `<html>` (dark/light).
- **Hosting/deploy:** Firebase Hosting. `npm run deploy` runs the build then
  `firebase deploy`. SPA rewrites all routes to `/index.html` (see `firebase.json`).
- **No state library, no CSS framework, no test runner** are currently configured.

### Commands

```bash
npm run dev        # Vite dev server
npm run build      # type-check (tsc -b) + production build into dist/
npm run preview    # serve the production build locally
npm run deploy     # build + firebase deploy
```

## Software architecture

### Config layer (`src/config/`)

- `site.config.json` — the single source of truth for all site content.
- `index.ts` — typed accessor. Imports the JSON, declares the `SiteConfig`
  interface (and sub-interfaces: `SocialLink`, `PageLink`, `ExperimentEntry`,
  `BlogEntry`, …) and exports a typed `config` object. **Add new content types by
  extending these interfaces and the JSON together.**

### Routing / shell (`src/App.tsx`, `src/main.tsx`)

`App` wraps everything in `ThemeProvider` → `BrowserRouter`, renders a persistent
`Header` / `Footer`, and maps routes to page components:
`/` `/about` `/experiments` `/projects` `/experience` `/blog`.

### Pages (`src/pages/`)

One component per route (`Home`, `About`, `Experiments`, `Projects`,
`WorkExperience`, `Blog`). Pages compose presentational components and read from
`config` and/or the data hooks.

### Components (`src/components/`)

Presentational, reusable building blocks: `Header`, `Footer`, `NavMenu`,
`PageHeader`, `Panel`, `Timeline`, `ReadmePreview`, `SocialBar`, `SocialIcon`,
`StateLine`, `StatusTag`, `ThemeToggle`. Keep them dumb — data fetching lives in
hooks, content lives in config.

### Data hooks (`src/hooks/`)

- `useAsync.ts` — generic primitive: runs an async loader once per `key` and
  tracks `{ data, loading, error }`. All runtime fetching goes through it.
- `useRepoReadmes.ts` — loads README previews for the repos listed in
  `config.github.repositories`.
- `useResume.ts` — loads and parses the Resume from `config.resume.path`.

### Utilities (`src/utils/`)

- `github.ts` — fetches repo READMEs at runtime from
  `raw.githubusercontent.com` (tries `HEAD`/`main`/`master`, several README
  filenames), strips markdown to terminal-style plain text, extracts the first
  image. Chosen over the GitHub API to avoid rate limits and auth.
- `resumeParser.ts` — fetches and parses the plain-text Resume.

### Theme (`src/theme/ThemeContext.tsx`)

Context provider holding `theme` (`'dark' | 'light'`) + `toggleTheme`. Persists to
`localStorage` (`portfolio-theme`, default dark) and reflects the current theme via
`document.documentElement.dataset.theme`, which CSS keys off.

### Resume delivery (`vite.config.ts`)

The Resume lives at the **repository root** as `Resume.txt` (a project
requirement). A custom Vite plugin (`serveRootResume`) serves it at `/Resume.txt`
in dev and copies it into `dist/` at build time so the deployed site can fetch it
at runtime. `Resume.txt` and the config content are placeholders meant to be
replaced with real data.

## Conventions & guidance

- **Change content in `site.config.json`, not in components.** If content isn't
  yet configurable, prefer adding a config field over hardcoding.
- Keep components presentational; put fetching in a hook built on `useAsync`.
- Everything runs client-side — never assume a backend, secrets, or auth.
- Match the existing terminal/brutalist voice (uppercase labels, boot-log lines)
  when adding UI copy.
- After changes, verify with `npm run build` (it type-checks) before deploying.
