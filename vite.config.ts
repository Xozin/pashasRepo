import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import oxlintPlugin from 'vite-plugin-oxlint'

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  plugins: [react(), oxlintPlugin()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
