import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // Replace with your actual deployed Vercel URL
        target: "hhttps://moses-ramoeletsi-portfolio-server.vercel.app/",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path
      }
    }
  }
})
