import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  // Get current max sort_order
  const { data: maxOrderData } = await client
    .from('cases')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)

  const nextOrder = (maxOrderData && maxOrderData[0]?.sort_order !== undefined) ? maxOrderData[0].sort_order + 1 : 0

  const { data: newCase, error } = await client
    .from('cases')
    .insert({
      image_url: body.image_url,
      sort_order: nextOrder
    })
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return newCase
})
