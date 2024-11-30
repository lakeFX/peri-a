import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'zustand',
            'clsx',
            'date-fns',
            'lucide-react'
          ],
          'azure': [
            '@azure/identity',
            '@azure/storage-blob',
            '@azure/msal-browser',
            '@azure/msal-react'
          ],
          'microsoft': [
            '@microsoft/microsoft-graph-client'
          ],
          'openai': ['openai']
        }
      }
    }
  }
});