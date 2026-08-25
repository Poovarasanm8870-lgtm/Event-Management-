import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-arasan-v3.js',
        chunkFileNames: 'assets/[name]-arasan-v3.js',
        assetFileNames: 'assets/[name]-arasan-v3.[ext]'
      }
    }
  }
})
