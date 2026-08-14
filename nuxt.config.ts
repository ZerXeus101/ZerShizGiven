import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  
  modules: [
    "@nuxt/content",
    "@nuxtjs/color-mode"
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
    head: {
      title: 'ZerShizGiven | Renaissance Quotes & Thoughts',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap'
        }
      ]
    }
  }
})
