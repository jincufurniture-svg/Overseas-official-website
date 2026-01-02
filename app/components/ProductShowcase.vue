<template>
  <section class="py-24 bg-white">
    <div class="container">
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-black">{{ $t('home.products.title') }}</h2>
        <p class="text-grey font-light max-w-2xl mx-auto">{{ $t('home.products.subtitle') }}</p>
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

      <div class="text-center mt-12">
        <NuxtLink 
          to="/products"
          class="inline-flex items-center px-8 py-3 border border-black text-sm font-medium tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-300"
        >
          {{ $t('products.view_more') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const { products } = useProducts()

const { data: categories } = await useFetch('/api/categories', {
  query: { language: locale }
})

const activeCategory = ref('all')

const filteredProducts = computed(() => {
  if (!products.value) return []
  
  // Products from API already have names/translations
  let currentProducts = products.value.map(p => ({
    ...p,
    // Ensure categoryName is present or derived
    categoryName: categories.value?.find(c => c.id === p.category_id)?.name || p.category
  }))

  if (activeCategory.value !== 'all') {
    currentProducts = currentProducts.filter(p => p.category_id === activeCategory.value)
  }
  
  // Limit to 6 for homepage
  return currentProducts.slice(0, 6)
})
</script>
