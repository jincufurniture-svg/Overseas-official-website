import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const { id } = getQuery(event)
  const client = await serverSupabaseClient(event)

  if (!id) {
    throw createError({ statusCode: 400, message: 'Product ID is required' })
  }

  const { data: product, error } = await client
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !product) {
    console.error(`[Product Fetch] Error or not found for ID: ${id}`, error)
    throw createError({ statusCode: 404, message: 'Product not found' })
  }

  return {
    id: product.id,
    category_id: product.category_id,
    image_url: product.image_url,
    en: { name: product.name_en, description: product.description_en, specs: product.specs_en || { material: '', dimensions: '', weight: '' } },
    zh: { name: product.name_zh, description: product.description_zh, specs: product.specs_zh || { material: '', dimensions: '', weight: '' } }
  }
})
