import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // ESTA es la forma correcta en Vite:
    fs: {
      allow: ['.'],
    }
  },
  // Agrega esto para que funcione la recarga en rutas como /dashboard
  build: {
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
})