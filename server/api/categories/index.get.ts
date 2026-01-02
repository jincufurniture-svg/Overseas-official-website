import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { language } = getQuery(event)
  const lang = language === 'zh' ? 'zh' : 'en'

  // Fetch categories with translations
  const { data: categories, error: catError } = await client
    .from('categories')
    .select(`
      id,
      name_${lang}
    `)
    .order('sort_order')

  if (catError) {
    console.error('Error fetching categories:', catError)
    return []
  }

  return categories.map(cat => ({
    id: cat.id,
    name: cat[`name_${lang}`]
  }))
})
