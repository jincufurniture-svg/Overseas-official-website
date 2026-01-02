import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { id, language } = getQuery(event)
  const lang = language === 'zh' ? 'zh' : 'en'

  if (!id) {
    throw createError({ statusCode: 400, message: 'Product ID is required' })
  }

  const { data: product, error } = await client
    .from('products')
    .select(`
      id,
      image_url,
      categories!inner(id, name_en, name_zh),
      name_${lang},
      description_${lang},
      specs_${lang}
    `)
    .eq('id', id)
    .single()

  if (error || !product) {
    throw createError({ statusCode: 404, message: 'Product not found' })
  }

  return {
    id: product.id,
    image: product.image_url,
    category: lang === 'zh' ? product.categories.name_zh : product.categories.name_en,
    category_id: product.categories.id,
    name: product[`name_${lang}`],
    desc: product[`description_${lang}`],
    specs: product[`specs_${lang}`]
  }
})
