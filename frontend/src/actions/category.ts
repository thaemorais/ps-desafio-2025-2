'use server'

import { api } from '@/services/api'
import { categoryType } from '@/types/category'
import { revalidatePath } from 'next/cache'

/**
 * Cria uma nova categoria
 * @param form - FormData com os dados da categoria
 * @returns Promise com response e error
 */
export async function createCategory(form: FormData) {
  const { response, error } = await api<categoryType>('POST', '/categories', { data: form })
  
  if (!error) {
    revalidatePath('/admin/categorias')
  }
  
  return { response, error }
}

/**
 * Atualiza uma categoria existente
 * @param id - ID da categoria
 * @param form - FormData com os dados atualizados
 * @returns Promise com response e error
 */
export async function updateCategory(id: string, form: FormData) {  
  // Log do FormData recebido
  const formEntries: Record<string, string> = {}
  for (const [key, value] of form.entries()) {
    formEntries[key] = value instanceof File 
      ? `[File: ${value.name}, ${value.size} bytes]`
      : String(value)
  }
  
  // Verifica se tem _method no FormData (method spoofing)
  const hasMethodSpoofing = form.has('_method')
  const method = hasMethodSpoofing ? 'POST' : 'PUT'
  
  const { response, error } = await api<categoryType>(method, `/categories/${id}`, { data: form })
  
  
  if (!error) {
    revalidatePath('/admin/categorias')
  }
  
  return { response, error }
}

/**
 * Deleta uma categoria
 * @param id - ID da categoria
 * @returns Promise com response e error
 */
export async function destroyCategory(id: string) {
  const { response, error } = await api<categoryType>('DELETE', `/categories/${id}`)
  
  if (!error) {
    revalidatePath('/admin/categorias')
  }
  
  return { response, error }
}
