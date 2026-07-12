# TERMINAL // MM-01 — Portfolio

Brutalist / urbex-themed portfolio of Matteo Marchetti. React 19 + TypeScript + Vite, frontend only, deployable on Firebase Hosting.

## Quick start

```bash
npm install
npm run dev        # dev server
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Configuration

Everything is driven by the global config file **`src/config/site.config.json`**:

- `site` — title, tagline, hero boot-log lines
- `pages` — header menu entries (label + route)
- `socials` — social links, flaticon icon URLs and attributions
- `github.repositories` — list of `owner/repo` shown on **My Projects** (READMEs are fetched at runtime from GitHub; first `readmePreviewLines` lines are shown with a "... continue" link)
- `about`, `experiments`, `blog` — page content
- `resume.path` — where the Resume is fetched from at runtime

## Resume

**Work Experience** parses **`Resume.txt` at the repository root** at runtime (`src/utils/resumeParser.ts`). Replace the sample file with your own, keeping the standard layout:

```
Name
Headline
contact | contact | contact

EXPERIENCE
Title | Company | Jan 2024 - Present
- bullet
```

A Vite plugin serves it in dev and copies it into `dist/` at build time.

## Themes

Dark (emergency power) and light (daylight) themes, toggled from the header, persisted in `localStorage`.

## Deploy on Firebase

```bash
npm install -g firebase-tools
firebase login
# set your project id in .firebaserc, then:
npm run deploy
```

`firebase.json` serves `dist/` with an SPA rewrite to `index.html`.
