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
  console.log('🟣 [UPDATE CATEGORY ACTION] Iniciando action updateCategory...')
  console.log('🟣 [UPDATE CATEGORY ACTION] ID:', id)
  
  // Log do FormData recebido
  const formEntries: Record<string, string> = {}
  for (const [key, value] of form.entries()) {
    formEntries[key] = value instanceof File 
      ? `[File: ${value.name}, ${value.size} bytes]`
      : String(value)
  }
  console.log('🟣 [UPDATE CATEGORY ACTION] FormData recebido:', formEntries)
  
  // Verifica se tem _method no FormData (method spoofing)
  const hasMethodSpoofing = form.has('_method')
  const method = hasMethodSpoofing ? 'POST' : 'PUT'
  
  console.log('🟣 [UPDATE CATEGORY ACTION] Fazendo requisição:', {
    method,
    url: `/categories/${id}`,
    hasMethodSpoofing,
    reason: hasMethodSpoofing ? 'Usando POST com method spoofing para FormData' : 'Usando PUT direto',
  })
  
  const { response, error } = await api<categoryType>(method, `/categories/${id}`, { data: form })
  
  console.log('🟣 [UPDATE CATEGORY ACTION] Resposta da API:', {
    hasResponse: !!response,
    hasError: !!error,
    error: error ? {
      message: error.message,
      status: error.status,
      errors: error.errors,
    } : null,
  })
  
  if (!error) {
    console.log('🟣 [UPDATE CATEGORY ACTION] Revalidando path /admin/categorias')
    revalidatePath('/admin/categorias')
  } else {
    console.error('🟣 [UPDATE CATEGORY ACTION] Erro na requisição:', error)
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
