<template>
  <section id="products" class="py-24 bg-white">
    <div class="container">
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-black">{{ $t('products.title') }}</h2>
        <p class="text-grey font-light">{{ $t('products.subtitle') }}</p>
      </div>

      <!-- Categories -->
      <div class="flex justify-center mb-12 space-x-8">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="activeCategory = cat.id"
          class="pb-2 text-sm md:text-base transition-all duration-300 border-b-2"
          :class="[activeCategory === cat.id ? 'text-wood border-wood font-semibold' : 'text-grey border-transparent hover:text-wood-dark']"
        >
          {{ $t(`products.categories.${cat.id}`) }}
        </button>
      </div>

      <!-- Grid -->
      <ProductGrid :products="filteredProducts" />

      <div class="text-center mt-16">
        <NuxtLink :to="localePath('/products')" class="inline-block border border-black px-8 py-3 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300">
          {{ $t('products.view_more') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const localePath = useLocalePath()
const { products } = useProducts()

const categories = [
  { id: 'all' },
  { id: 'chairs' },
  { id: 'wardrobe' },
  { id: 'custom' }
]

const activeCategory = ref('all')

const filteredProducts = computed(() => {
  // Take only first 6 products for homepage
  const homepageProducts = products.slice(0, 6)
  
  const currentProducts = homepageProducts.map(p => ({
    ...p,
    name: t(`products.items.${p.key}.name`),
    categoryName: t(`products.categories.${p.category}`)
  }))

  if (activeCategory.value === 'all') return currentProducts
  return currentProducts.filter(p => p.category === activeCategory.value)
})
</script>
