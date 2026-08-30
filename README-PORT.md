# Re-design port — how to apply

This folder mirrors the repository root of `cecinuga/portfolio`. Every file here
replaces (or adds to) the file at the same path in the repo. Nothing else changes:
same stack (React 19 + TypeScript + Vite + react-router + marked/DOMPurify),
no new npm dependencies, everything still driven by `src/config/site.config.json`.

## Apply and push

```bash
cd portfolio                      # your repo clone
git checkout -b re-design
cp -R /path/to/port/* .           # copy this folder's contents over the repo root
git rm src/pages/About.tsx        # About is now the Home page
git add -A
git commit -m "Redesign: Organic UI (warm cream/terracotta/sage, Caprasimo + Figtree)"
git push -u origin re-design
```

Then `npm install && npm run dev` to check locally (install only needed if node_modules is missing — there are no new deps).

## What changed

- `index.html` — Caprasimo + Figtree fonts, new title/description
- `src/styles/global.css` — Organic design tokens, light (default) + warm dark themes
- `src/styles/components.css` — all component styles rebuilt for the new design
- `src/config/site.config.json` — Home hero copy, "Right now" facts, the
  "My Definition of Quality" section, `resume.download`; Home/About merged
  (no ABOUT page entry); socials no longer need icon URLs (inline Lucide icons)
- `src/config/index.ts` — types updated to match
- `src/App.tsx` — `/` renders the new Home (former About); About route removed
- `src/components/` — Header (+ Resume download button), pill NavMenu, round
  social icon buttons, icon ThemeToggle, new `Icons.tsx` (inline Lucide SVGs),
  PageHeader, Panel, StatusTag (pills), Timeline, StateLine, ReadmePreview, Footer
- `src/pages/` — Home (hero + skills + Right now + Quality), Experiments
  (clickable cards → detail page, unchanged slug routing), Experiment (styled
  README page with back button), Projects (README preview cards), WorkExperience
  (timeline, Education section removed), Blog (empty state until posts exist)
- `src/utils/experiments.ts` — adds `formatLinkLabel` helper (rest unchanged)
- `src/theme/ThemeContext.tsx` — default theme is now light
- `public/MatteoMarchettiResume.pdf` — served at `/MatteoMarchettiResume.pdf`
  for the header's Resume button (Vite copies `public/` into `dist/`)

## Unchanged (not in this folder)

`src/main.tsx`, all hooks, `src/utils/github.ts`, `src/utils/markdown.ts`,
`src/utils/resumeParser.ts`, `src/components/MarkdownView.tsx`, `vite.config.ts`,
`package.json`, tsconfigs, `firebase.json`. Work Experience still parses
`Resume.txt` at the repo root at runtime — keep maintaining it as before.
