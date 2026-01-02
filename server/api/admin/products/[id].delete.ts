import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const id = event.context.params?.id
  const client = await serverSupabaseClient(event)

  const { error } = await client.from('products').delete().eq('id', id)

  if (error) throw createError({ statusCode: 500, message: error.message })

  return { success: true }
})
