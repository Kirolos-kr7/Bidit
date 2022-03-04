import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    VitePWA({
      includeAssets: [
        '/images/pwa/favicon.ico',
        '/images/pwa/apple-touch-icon.png',
        '/images/pwa/pwa-192x192.png',
        '/images/pwa/pwa-512x512.png',
        '/images/blob-haikei.svg',
        '/images/kisspng-vaporwave-aesthetics-youtube-marble-sculpture-art-aesthetic-5ad7a8eba95279.8260165215240829236936.png',
        '/public/images/flags/eg.svg',
        '/public/images/flags/us.svg',
      ],
      manifest: {
        name: 'Bidit',
        short_name: 'Bidit',
        start_url: '/',
        theme_color: '#171717',
        background_color: '#171717',
        description: 'Bidit - Online Auction PLatform 🔥',
        display: 'standalone',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/images/pwa/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/pwa/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/images/pwa/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
