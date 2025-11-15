'use server'

import { api } from '@/services/api'
import { categoryType } from '@/types/category'
import { revalidatePath } from 'next/cache'

export async function createCategory(form: FormData) {
  const { response, error } = await api<categoryType>('POST', '/categories', { data: form })
  return { response, error }
}

export async function getCategories() {
  const { response, error } = await api<categoryType[]>('GET', '/categories')
  return { response, error }
}

export async function getCategory(id: string) {
  const { response, error } = await api<categoryType>('GET', `/categories/${id}`)
  return { response, error }
}

export async function updateCategory(id: string, form: FormData) {
  const { response, error } = await api<categoryType>('PUT', `/categories/${id}`, { data: form })
  return { response, error }
}

export async function destroyCategory(id: string) {
  const { response, error } = await api<categoryType>('DELETE', `/categories/${id}`)
  return { response, error }
}
