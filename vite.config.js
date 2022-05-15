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
        '/public/images/flags/eg.svg',
        '/public/images/flags/us.svg',
        '/public/images/avatar.png',
        '/public/images/home/en/animals.png',
        '/public/images/home/en/antiques.png',
        '/public/images/home/en/art.png',
        '/public/images/home/en/cars.png',
        '/public/images/home/en/cats.png',
        '/public/images/home/en/clothes.png',
        '/public/images/home/en/easyToUse.png',
        '/public/images/home/en/furniture.png',
        '/public/images/home/en/others.png',
        '/public/images/home/en/participate.png',
        '/public/images/home/en/shipping.png',
        '/public/images/home/en/technology.png',
        '/public/images/home/ar/animals.png',
        '/public/images/home/ar/antiques.png',
        '/public/images/home/ar/art.png',
        '/public/images/home/ar/cars.png',
        '/public/images/home/ar/cats.png',
        '/public/images/home/ar/clothes.png',
        '/public/images/home/ar/easyToUse.png',
        '/public/images/home/ar/furniture.png',
        '/public/images/home/ar/others.png',
        '/public/images/home/ar/participate.png',
        '/public/images/home/ar/shipping.png',
        '/public/images/home/ar/technology.png',
      ],
      manifest: {
        name: 'Bidit',
        short_name: 'Bidit',
        start_url: '/',
        theme_color: '#6E3DD6',
        background_color: '#EEF0F1',
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
  define: {
    'process.env': {},
  },
})
