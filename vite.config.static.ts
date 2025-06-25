import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// Static build configuration for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for GitHub Pages
  build: {
    outDir: 'docs', // GitHub Pages looks for docs folder
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-slot', '@radix-ui/react-dialog', '@radix-ui/react-toast']
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@assets": path.resolve(__dirname, "./attached_assets"),
    },
  },
  root: './client',
  server: {
    port: 5173,
    host: true
  }
})