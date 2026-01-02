import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { language, category } = getQuery(event)
  const lang = language === 'zh' ? 'zh' : 'en'

  let query = client
    .from('products')
    .select(`
      id,
      image_url,
      categories!inner(id, name_en, name_zh),
      name_${lang},
      description_${lang},
      specs_${lang}
    `)
    .order('sort_order')

  if (category && category !== 'all') {
    // If filtering by category, we might need to filter by ID or Name since code is gone.
    // Assuming frontend now passes category ID or we filter by name?
    // Let's assume for now 'category' param might be an ID or we skip filter if it's legacy code.
    // If it's a UUID, use it.
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (uuidRegex.test(category)) {
       query = query.eq('categories.id', category)
    }
  }

  const { data: products, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return products.map(p => ({
    id: p.id,
    image: p.image_url,
    category: lang === 'zh' ? p.categories.name_zh : p.categories.name_en,
    category_id: p.categories.id,
    name: p[`name_${lang}`],
    desc: p[`description_${lang}`],
    specs: p[`specs_${lang}`]
  }))
})
