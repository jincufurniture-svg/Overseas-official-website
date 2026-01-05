// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/supabase",
    "@element-plus/nuxt",
  ],
  srcDir: "app",
  serverDir: "server",
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Jincu Furniture - Minimalist & Natural",
      meta: [
        { name: "description", content: "Jincu Furniture: Minimalist, natural furniture for modern living." },
        { name: "theme-color", content: "#C19A6B" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "JINCU" },
        { property: "og:title", content: "Jincu Furniture - Minimalist & Natural" },
        { property: "og:description", content: "Jincu Furniture: Minimalist, natural furniture for modern living." },
        { property: "og:locale:alternate", content: "zh_CN" },
        { property: "og:locale:alternate", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Jincu Furniture - Minimalist & Natural" },
        { name: "twitter:description", content: "Jincu Furniture: Minimalist, natural furniture for modern living." }
      ],
      link: [
        { rel: "canonical", href: "/" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ]
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
