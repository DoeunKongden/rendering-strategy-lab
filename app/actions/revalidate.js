'use server'

import { revalidateTag, revalidatePath } from 'next/cache'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'

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

export async function deleteProductAction(productId) {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`, {
      method: 'DELETE',
    })
    if (!res.ok) {
      throw new Error('Failed to delete product')
    }
    revalidateTag('products')
    return { success: true, id: productId }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteDogAction(dogId) {
  try {
    const res = await fetch(`${API_URL}/dog/${dogId}`, {
      method: 'DELETE',
    })
    if (!res.ok) {
      throw new Error('Failed to delete dog')
    }
    revalidateTag('dogs')
    return { success: true, id: dogId }
  } catch (error) {
    console.error('Error deleting dog:', error)
    return { success: false, error: error.message }
  }
}
