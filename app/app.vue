<template>
  <NuxtLoadingIndicator color="#C19A6B" height="3" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const appStore = useAppStore()
const { locale } = useI18n()
const ogLocale = computed(() => (locale.value === 'zh' ? 'zh_CN' : 'en_US'))
const siteTitle = computed(() => (locale.value === 'zh' ? '锦簇家具 - 极简与自然' : 'Jincu Furniture - Minimalist & Natural'))
const siteDescription = computed(() => (locale.value === 'zh'
  ? '锦簇家具：以极简与自然为设计理念，为现代生活提供高品质家具。'
  : 'Jincu Furniture: Minimalist, natural furniture for modern living.'
))

onMounted(() => {
  appStore.initLocale()
})
useHead(() => ({
  htmlAttrs: {
    lang: locale.value === 'zh' ? 'zh-CN' : 'en-US'
  },
  title: siteTitle.value,
  meta: [
    { property: 'og:locale', content: ogLocale.value, key: 'og:locale' },
    { name: 'description', content: siteDescription.value, key: 'description' },
    { property: 'og:title', content: siteTitle.value, key: 'og:title' },
    { property: 'og:description', content: siteDescription.value, key: 'og:description' },
    { name: 'twitter:title', content: siteTitle.value, key: 'twitter:title' },
    { name: 'twitter:description', content: siteDescription.value, key: 'twitter:description' }
  ]
}))
</script>
