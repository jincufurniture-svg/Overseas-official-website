import { useI18n } from 'vue-i18n'

export const useProducts = () => {
  const { locale } = useI18n()
  
  // Use Nuxt's useFetch for data fetching
  // We use useAsyncData to ensure SSR support and hydration
  const { data: products } = useAsyncData('products', async () => {
    return await $fetch('/api/products', {
      query: { language: locale.value }
    })
  }, {
    watch: [locale], // Refetch when locale changes
    default: () => [] // Provide default empty array
  })

  const getProductByKey = async (key) => {
    const { data: product } = await useAsyncData(`product-${key}`, async () => {
      return await $fetch('/api/products/detail', {
        query: { id: key, language: locale.value }
      })
    }, {
      watch: [locale]
    })
    return product
  }

  const getRelatedProducts = (currentKey, limit = 3) => {
    if (!products.value) return []
    return products.value.filter(p => p.key !== currentKey).slice(0, limit)
  }

  return {
    products, // This is now a Ref
    getProductByKey,
    getRelatedProducts
  }
}
