#!/usr/bin/env node

import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

async function buildClient() {
  try {
    console.log('Building client for GitHub Pages...');
    
    await build({
      root: resolve(__dirname, 'client'),
      base: '/',
      build: {
        outDir: resolve(__dirname, 'dist/public'),
        emptyOutDir: true,
        rollupOptions: {
          input: resolve(__dirname, 'client/index.html')
        }
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, 'client/src'),
          '@assets': resolve(__dirname, 'attached_assets')
        }
      },
      publicDir: resolve(__dirname, 'public'),
      plugins: [react()]
    });
    
    console.log('✅ Client build completed successfully!');
    console.log('📁 Output directory: dist/public');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildClient();