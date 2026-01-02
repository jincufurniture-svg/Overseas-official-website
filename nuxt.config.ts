// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/supabase",
    "@element-plus/nuxt",
  ],
  srcDir: "app",
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Jincu Furniture - Minimalist & Natural",
    },
  },
  i18n: {
    debug: false,
    locales: [
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
      { code: "zh", iso: "zh-CN", file: "zh.json", name: "中文" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    langDir: "translations",
  },
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
});
