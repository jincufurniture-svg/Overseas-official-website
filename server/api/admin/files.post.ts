import { put } from '@vercel/blob'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Check authentication
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // Parse form data
  const files = await readMultipartFormData(event)
  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const file = files[0]
  if (!file.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Filename missing' })
  }

  // Upload to Vercel Blob
  const { url } = await put(file.filename, file.data, {
    access: 'public',
    addRandomSuffix: true // Prevent filename collision
  })

  return { url }
})
