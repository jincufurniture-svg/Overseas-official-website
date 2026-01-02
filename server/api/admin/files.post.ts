import { put } from '@vercel/blob'
import { serverSupabaseUser } from '#supabase/server'
import sharp from 'sharp'

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

  let fileData = file.data
  let filename = file.filename

  // Process image with sharp if it's an image
  if (file.type && file.type.startsWith('image/')) {
    try {
      const image = sharp(file.data)
      const metadata = await image.metadata()

      // Resize if width is greater than 800
      if (metadata.width && metadata.width > 800) {
        // Resize to width 800, maintaining aspect ratio
        // Convert to webp for compression
        fileData = await image
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 95 })
          .toBuffer()
        
        // Update filename extension to .webp
        filename = filename.replace(/\.[^/.]+$/, '') + '.webp'
      } else {
        // Even if not resizing, compress it
        fileData = await image
          .webp({ quality: 80 })
          .toBuffer()
        filename = filename.replace(/\.[^/.]+$/, '') + '.webp'
      }
    } catch (error) {
      console.error('Error processing image with sharp:', error)
      // If processing fails, use original file
    }
  }

  // Upload to Vercel Blob
  const { url } = await put(filename, fileData, {
    access: 'public',
    addRandomSuffix: true // Prevent filename collision
  })

  return { url }
})
