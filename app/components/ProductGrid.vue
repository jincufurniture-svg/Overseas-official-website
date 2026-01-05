<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <NuxtLink 
      v-for="product in products" 
      :key="product.id"
      :to="'/products/' + product.id"
      class="group cursor-pointer block"
    >
      <div class="bg-beige overflow-hidden relative aspect-[4/5] mb-4">
        <img 
          :src="product.image" 
          :alt="product.name" 
          loading="lazy"
          class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
        <!-- Overlay Shadow -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
      </div>
      <div class="text-center space-y-1">
        <h3 class="text-lg font-heading font-medium text-black group-hover:text-wood transition-colors">{{ product.name }}</h3>
        <p class="text-sm text-grey font-light">{{ product.categoryName }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>
