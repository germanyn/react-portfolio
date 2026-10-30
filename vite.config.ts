/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Connect, type Plugin } from 'vite'

// Served from https://germanyn.github.io/react-portfolio/
const base = '/react-portfolio/'

// Vite 404s on the base without its trailing slash; redirect like GitHub Pages does.
function baseRedirect(): Plugin {
  const redirect: Connect.NextHandleFunction = (req, res, next) => {
    const [path, query] = (req.url ?? '').split(/\?(.*)/s)
    if (path !== base.slice(0, -1)) return next()
    res.writeHead(301, { Location: base + (query ? `?${query}` : '') })
    res.end()
  }
  return {
    name: 'base-redirect',
    configureServer: (server) => void server.middlewares.use(redirect),
    configurePreviewServer: (server) => void server.middlewares.use(redirect),
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), baseRedirect()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/test/**',
        'src/main.tsx',
      ],
      reporter: ['text', 'html'],
      // `yarn coverage` fails below these (current: ~98% statements, ~93% branches).
      thresholds: { statements: 95, branches: 90, functions: 95, lines: 95 },
    },
  },
})
