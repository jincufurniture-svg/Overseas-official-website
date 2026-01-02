import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  const { error } = await client
    .from('contacts')
    .insert({
      name: body.name,
      phone: body.phone,
      description: body.description,
      status: 'pending'
    })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return { success: true }
})
