import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Charlies_2026_Spring_Training_Dashboard/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
