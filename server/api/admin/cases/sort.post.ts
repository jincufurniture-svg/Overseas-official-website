import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const body = await readBody(event)
  const client = await serverSupabaseClient(event)
  
  // body.items should be an array of { id: string, sort_order: number }
  const updates = body.items.map((item: any, index: number) => ({
    id: item.id,
    image_url: item.image_url, // Include required fields if needed, but for upsert we usually need PK
    sort_order: index // Update sort order based on array position
  }))

  const { error } = await client
    .from('cases')
    .upsert(updates, { onConflict: 'id' })

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return { success: true }
})
