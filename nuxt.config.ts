import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  
  modules: [
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@tresjs/nuxt"
  ],
  
  css: ['~/assets/css/main.css'],
  
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [] // Force Nuxt to stop trying to include unresolvable MDC dependencies
    }
  },
  
  colorMode: {
    classSuffix: '', // Tailwind uses .dark instead of .dark-mode
    preference: 'system',
    fallback: 'light'
  },
  
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'ZerShizGiven',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'Random Brain Farts + Stolen Internet Quotes' },
        { name: 'theme-color', content: '#1A1A1A' },
        { property: 'og:title', content: 'ZerShizGiven' },
        { property: 'og:description', content: 'Random Brain Farts + Stolen Internet Quotes' },
        { property: 'og:image', content: '/backgrounds/Rebirth.jpg' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'ZerShizGiven' },
        { name: 'twitter:description', content: 'Random Brain Farts + Stolen Internet Quotes' },
        { name: 'twitter:image', content: '/backgrounds/Rebirth.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icons/favicon.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icons/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap'
        }
      ]
    }
  }
})
