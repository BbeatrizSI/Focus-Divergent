import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
const base = process.env.NODE_ENV === 'production' ? '/Focus-Divergent/' : '/'

export default defineConfig({
  base: base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      filename: 'dev-dist/sw.js',
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        swDest: 'dev-dist/sw.js',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      includeAssets: ['icon.svg', 'icons/pwa-192x192.png', 'icons/pwa-512x512.png'],
      manifest: {
        name: 'Focus Divergent',
        short_name: 'Focus Divergent',
        description: 'Temporizador Pomodoro con ruido blanco configurable para personas neurodivergentes',
        theme_color: '#2a6b5f',
        background_color: '#f0f9f4',
        display: 'standalone',
        orientation: 'portrait',
        scope: base,
        start_url: base,
        icons: [
          {
            src: `${base}icons/pwa-192x192.png`,
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: `${base}icons/pwa-512x512.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: `${base}icons/pwa-512x512.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})
