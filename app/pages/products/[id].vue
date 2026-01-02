<template>
  <div class="pt-32 pb-24 bg-white min-h-screen">
    <div v-if="product" class="container">
      <!-- Breadcrumb -->
      <div class="flex items-center text-sm text-grey mb-12">
        <NuxtLink to="/" class="hover:text-wood transition-colors">{{ $t('nav.home') }}</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products" class="hover:text-wood transition-colors">{{ $t('nav.products') }}</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-black">{{ product.name }}</span>
      </div>

      <div class="flex flex-col lg:flex-row gap-16">
        <!-- Image Gallery (Left) -->
        <div class="w-full lg:w-1/2">
          <div class="bg-beige aspect-[4/5] relative overflow-hidden group">
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <!-- Product Info (Right) -->
        <div class="w-full lg:w-1/2 space-y-10">
          <div class="space-y-4 border-b border-grey-light/20 pb-8">
            <div class="text-sm text-wood font-medium tracking-wider uppercase">{{ categoryName }}</div>
            <h1 class="text-4xl md:text-5xl font-heading font-bold text-black">{{ product.name }}</h1>
            <p class="text-grey font-light leading-relaxed">{{ product.desc }}</p>
          </div>

          <!-- Specs -->
          <div class="space-y-6">
            <h3 class="text-lg font-heading font-semibold text-black">{{ $t('products.details.specs') }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div class="flex justify-between border-b border-grey-light/10 pb-2">
                <span class="text-grey">{{ $t('products.details.material') }}</span>
                <span class="text-black font-medium">{{ product.specs?.material || '-' }}</span>
              </div>
              <div class="flex justify-between border-b border-grey-light/10 pb-2">
                <span class="text-grey">{{ $t('products.details.dimensions') }}</span>
                <span class="text-black font-medium">{{ product.specs?.dimensions || '-' }}</span>
              </div>
              <div class="flex justify-between border-b border-grey-light/10 pb-2">
                <span class="text-grey">{{ $t('products.details.weight') }}</span>
                <span class="text-black font-medium">{{ product.specs?.weight || '-' }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-8 space-y-4">
            <NuxtLink 
              to="/#contact" 
              class="block w-full bg-black text-white text-center py-4 text-sm tracking-widest hover:bg-wood transition-colors duration-300"
            >
              {{ $t('products.details.inquire') }}
            </NuxtLink>
            <p class="text-xs text-grey text-center">
              {{ $t('products.details.delivery_note') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container text-center py-32">
      <h1 class="text-2xl font-heading text-black mb-4">{{ $t('products.details.not_found') }}</h1>
      <NuxtLink to="/products" class="text-wood hover:underline">
        {{ $t('products.details.back_to_list') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t, locale } = useI18n()
const { getProductByKey } = useProducts()

const product = await getProductByKey(route.params.id)

const { data: categories } = await useFetch('/api/categories', {
  query: { language: locale }
})

const categoryName = computed(() => {
  if (!product) return ''
  const cat = categories.value?.find(c => c.id === product.category_id)
  return cat ? cat.name : product.category
})

useHead({
  title: computed(() => product ? `${product.name} - JINCU` : 'Product Not Found - JINCU'),
  meta: [
    { name: 'description', content: computed(() => product?.desc || '') }
  ]
})
</script>
