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
    // For single product, we might want a separate fetch or find from the list
    // A separate fetch ensures fresh data and handles direct navigation better
    // key is actually the ID now
    const { data: product } = await useFetch(`/api/products/detail`, {
      query: { id: key, language: locale.value }
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
