/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://germanyn.github.io/react-portfolio/
export default defineConfig({
  base: '/react-portfolio/',
  plugins: [react(), tailwindcss()],
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
