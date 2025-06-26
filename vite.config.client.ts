import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Client-only build configuration for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/', // Change this to '/your-repo-name/' if deploying to a project page
  build: {
    outDir: 'dist/public',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'client/index.html')
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@assets': path.resolve(__dirname, 'attached_assets')
    }
  },
  root: 'client',
  publicDir: '../public'
})