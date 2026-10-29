# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is Yarn 1 (`yarn.lock`). Vite 8 + React 19 + TypeScript 7, no UI library.

- `yarn dev` (or `yarn start`) — dev server at http://localhost:5173/react-portfolio/
- `yarn build` — `tsc` typecheck, then production build to `dist/`
- `yarn preview` — serve the built `dist/`
- `yarn deploy` — builds (via `predeploy`) and publishes `dist/` to the `gh-pages` branch. Live at https://germanyn.github.io/react-portfolio/ (`base` in `vite.config.ts` must match the repo subpath).

There are no tests.

## Architecture

Single-page personal portfolio, no router and no backend. `src/App.tsx` declares the `sections` array (id, nav label, kicker, title, content component); the nav highlights the active one with an `IntersectionObserver` (`useActiveSection`) and links are plain `#id` anchors (smooth scroll and `scroll-padding-top` live in CSS).

- **i18n (English / Portuguese)**: i18next + react-i18next, set up in `src/i18n.ts`. All copy lives in `src/locales/en.ts` and `src/locales/pt.ts`; `pt` is typed as `Translation` (= `typeof en`), so a missing or extra key fails `tsc`. Language is detected from `?lang=en|pt`, then localStorage, then the browser; `LanguageSwitch` in the nav changes it. Lists (highlights, achievements, image captions) are arrays read with `t(key, { returnObjects: true }) as string[]`.
- **Content as data**: `src/data/*.ts` hold only language-neutral data (ids, company names, dates, stacks, image URLs, links) and an `id` that keys into the locale files: `profile.ts` (links, `careerStart` used for "years of XP"), `experience.ts` → `career.jobs.<id>`, `projects.ts` → `projects.items.<id>` (captions match `images` order), `skills.ts` (tech names stay literal; `nameKey`/`noteKey` → `skills.names`/`skills.notes`). Content comes from the CV (`Germano Gascho - Currículo v4.pdf`, Portuguese).
- **Game theming** — each section borrows from a game:
  - Hero / Projects: Mega Man X ("Press start", stage select cards, `EnergyBar` life bar that fills with scroll progress, `Press Start 2P` pixel font via `.pixel`).
  - About: `MtgCard`, a CSS recreation of the modern (M15) Magic card frame, sized in `cqw` container units so it scales with its width. Mana/set symbols and the MPlantin rules font come from `mana-font` and `keyrune`; the name/type font is Spectral (Beleren isn't openly licensed). Power/toughness = years of XP.
  - Career: `SpireMap`, a Slay the Spire–style map; node icons come from `react-icons/gi` keyed by `NodeKind`.
  - Skills: `CommandCard`, a Warcraft III command card with a tooltip panel.
  - Shared look: `.panel` (stone + gold trim), `.tags`, colors/fonts as CSS variables in `src/index.css` (all styles live there). Fonts load from Google Fonts in `index.html`.
- **Static assets**: images are in `public/img/<project>/`; in TS reference them with `import.meta.env.BASE_URL` (see `img()` in `projects.ts`); in CSS use `/img/...` (Vite prefixes `base`).
- **GitHub Pages SPA**: `public/404.html` + the redirect script in `index.html` implement the spa-github-pages trick; keep them in sync (404.html must stay ≥512 bytes).
- **Legacy CRA leftovers** still on disk and listed in `tsconfig.json` `exclude` (old MUI components, `src/index.tsx`, `src/hooks`, `public/index.html`, `public/manifest.json`, logos). They are not imported; delete them and drop the `exclude` entries.
