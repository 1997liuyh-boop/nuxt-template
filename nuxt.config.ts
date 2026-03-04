export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  css: ['~/app/assets/css/main.css'],
  runtimeConfig: {
    openclowApiKey: process.env.OPENCLOW_API_KEY,
    public: {
      openclowApiBase: process.env.OPENCLOW_API_BASE || 'https://api.openclow.example'
    }
  },
  i18n: {
    defaultLocale: 'zh-CN',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'i18n/locales',
    locales: [
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
      { code: 'en', name: 'English', file: 'en.yaml' }
    ]
  }
})
