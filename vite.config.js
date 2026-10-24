import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Set VITE_SITE_URL (e.g. https://saifaliraja.com) at build time to emit canonical + absolute OG URLs.
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/$/, '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'site-url-meta',
        transformIndexHtml() {
          if (!siteUrl) return []
          const image = `${siteUrl}/og-image.png`
          return [
            { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
            { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
            { tag: 'meta', attrs: { property: 'og:image', content: image }, injectTo: 'head' },
            { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' }, injectTo: 'head' },
            { tag: 'meta', attrs: { property: 'og:image:height', content: '630' }, injectTo: 'head' },
            {
              tag: 'meta',
              attrs: { property: 'og:image:alt', content: 'saif.dev: I build useful things for the web.' },
              injectTo: 'head',
            },
            { tag: 'meta', attrs: { name: 'twitter:image', content: image }, injectTo: 'head' },
          ]
        },
      },
    ],
  }
})
