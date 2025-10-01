import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    'nuxt-phosphor-icons',
    '@vueuse/motion/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  imports: {
    dirs: ['app/types']
  },
  ssr: false,
  i18n: {
    locales: [
      {
        code: 'de',
        file: 'de.json',
        name: 'Deutsch'
      },
      {
        code: 'en',
        file: 'en.json',
        name: 'English'
      }
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
  },
  runtimeConfig: {
    public: {
      motion: {
        directives: {
          'roll-in': {
            initial: {
              x: 500,
              rotate: -360,
              opacity: 0
            },
            visibleOnce: {
              x: 0,
              rotate: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 50,
                damping: 15
              }
            }
          }
        }
      }
    }
  }
})