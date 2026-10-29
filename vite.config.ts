import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://germanyn.github.io/react-portfolio/
export default defineConfig({
  base: '/react-portfolio/',
  plugins: [react()],
})
