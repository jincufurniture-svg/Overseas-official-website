import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const client = await serverSupabaseClient(event)

  const { data: cases, error } = await client
    .from('cases')
    .select('*')
    .order('sort_order')

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return cases
})
