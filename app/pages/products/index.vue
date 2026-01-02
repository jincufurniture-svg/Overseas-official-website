<template>
  <div class="pt-40 pb-24 bg-white min-h-screen">
    <div class="container">
      <div class="text-center mb-16 space-y-4">
        <h1 class="text-3xl md:text-5xl font-heading font-bold text-black">{{ $t('products.page_title') }}</h1>
        <p class="text-grey font-light max-w-2xl mx-auto">{{ $t('products.page_subtitle') }}</p>
      </div>

      <!-- Categories Filter -->
      <div class="flex justify-center mb-12 space-x-8">
        <button 
          @click="activeCategory = 'all'"
          class="pb-2 text-sm md:text-base transition-all duration-300 border-b-2"
          :class="[activeCategory === 'all' ? 'text-wood border-wood font-semibold' : 'text-grey border-transparent hover:text-wood-dark']"
        >
          {{ $t('products.categories.all') }}
        </button>
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="activeCategory = cat.id"
          class="pb-2 text-sm md:text-base transition-all duration-300 border-b-2"
          :class="[activeCategory === cat.id ? 'text-wood border-wood font-semibold' : 'text-grey border-transparent hover:text-wood-dark']"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Product Grid -->
      <ProductGrid :products="filteredProducts" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const { products } = useProducts()

useHead({
  title: computed(() => `${t('products.page_title')} - JINCU`),
  meta: [
    { name: 'description', content: computed(() => t('products.page_subtitle')) },
    { property: 'og:title', content: computed(() => `${t('products.page_title')} - JINCU`) },
    { property: 'og:description', content: computed(() => t('products.page_subtitle')) }
  ],
  link: [
    { rel: 'canonical', href: computed(() => {
      const url = useRequestURL()
      return `${url.origin}${url.pathname}`
    }) }
  ]
})

const { data: categories } = await useFetch('/api/categories', {
  query: { language: locale },
  watch: [locale]
})

const activeCategory = ref('all')

const filteredProducts = computed(() => {
  if (!products.value) return []
  
  let currentProducts = products.value.map(p => ({
    ...p,
    categoryName: categories.value?.find(c => c.id === p.category_id)?.name || p.category
  }))

  if (activeCategory.value !== 'all') {
    currentProducts = currentProducts.filter(p => p.category_id === activeCategory.value)
  }
  return currentProducts
})
</script>
