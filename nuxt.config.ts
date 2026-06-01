import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',
  ignore: ['**/.claude/**'],
  modules: [
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    'nuxt-phosphor-icons',
    '@vueuse/motion/nuxt'
  ],
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
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
      },
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
})