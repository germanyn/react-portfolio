# Germano Gascho — portfolio

My personal site: **https://germanyn.github.io/react-portfolio/**

A single-page portfolio in English and Portuguese, built with React and Vite: projects, about me, a career map and skills, where each skill links to the jobs I used it in.

## Running it

Requires Node 22.12+ and Yarn 1.

```sh
yarn          # install
yarn dev      # http://localhost:5173/react-portfolio/
```

`yarn dev --host` also serves it on your local network, which is handy for checking on a phone.

| Command | |
| --- | --- |
| `yarn build` | Typecheck and build to `dist/` |
| `yarn preview` | Serve the built `dist/` |
| `yarn test` | Vitest in watch mode (`yarn test --run` for a single run) |
| `yarn coverage` | Tests with coverage; fails below the thresholds in `vite.config.ts` |
| _push to `master`_ | GitHub Actions tests, builds and deploys to Pages |

## Editing content

Text and data are kept apart, so most changes don't touch components:

- **Copy, in both languages:** `src/locales/en.ts` and `src/locales/pt.ts`. The Portuguese file is typed against the English one, so a missing key fails the build.
- **Jobs:** `src/data/experience.ts`. Dates, stack, act, and a `level` that decides the map node.
- **Skills:** `src/data/skills.ts`. Icon, level and the jobs each skill links to.
- **Projects:** `src/data/projects.ts`, with screenshots in `public/img/<project>/`.
- **Links and career start date:** `src/data/profile.ts`.

After editing data or translations, run `yarn test --run src/data`. It checks things TypeScript can't, like a project image without a caption or a Portuguese list shorter than the English one.

Language is picked from `?lang=en` / `?lang=pt`, then the visitor's last choice, then the browser.

## Stack

React 19, TypeScript, Vite, i18next, Tailwind CSS v4 (theme tokens in `src/index.css`), Vitest + Testing Library. Hosted on GitHub Pages; `public/404.html` and the script in `index.html` handle the [single-page-app redirect](https://github.com/rafgraph/spa-github-pages).

## Credits

- Mana and set symbols, plus the MPlantin rules font, from [Mana](https://github.com/andrewgioia/mana) and [Keyrune](https://github.com/andrewgioia/keyrune) by Andrew Gioia
- Icons from [react-icons](https://react-icons.github.io/react-icons/) (Simple Icons, Game Icons, Font Awesome, Tabler)
- Fonts from Google Fonts: Cinzel, Spectral, Inter and Press Start 2P
