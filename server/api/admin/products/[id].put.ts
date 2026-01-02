import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const id = event.context.params?.id
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  const { error } = await client
    .from('products')
    .update({
      key: body.key,
      category_id: body.category_id,
      image_url: body.image_url,
      name_en: body.en.name,
      description_en: body.en.description,
      specs_en: body.en.specs,
      name_zh: body.zh.name,
      description_zh: body.zh.description,
      specs_zh: body.zh.specs
    })
    .eq('id', id)

  if (error) throw createError({ statusCode: 500, message: error.message })

  return { success: true }
})
