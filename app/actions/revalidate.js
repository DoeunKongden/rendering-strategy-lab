'use server'

import { revalidateTag, revalidatePath } from 'next/cache'

export async function refreshDogsAction() {
  try {
    revalidateTag('dogs')
    return { success: true, method: 'tag' }
  } catch (error) {
    console.error('Error revalidating dogs:', error)
    return { success: false, error: error.message }
  }
}

export async function refreshProductsAction() {
  try {
    revalidateTag('products')
    return { success: true, method: 'tag' }
  } catch (error) {
    console.error('Error revalidating products:', error)
    return { success: false, error: error.message }
  }
}

export async function refreshDogsPathAction() {
  try {
    revalidatePath('/isr-ondemand')
    return { success: true, method: 'path' }
  } catch (error) {
    console.error('Error revalidating path:', error)
    return { success: false, error: error.message }
  }
}

export async function refreshProductsPathAction() {
  try {
    revalidatePath('/isr-time')
    return { success: true, method: 'path' }
  } catch (error) {
    console.error('Error revalidating path:', error)
    return { success: false, error: error.message }
  }
}
