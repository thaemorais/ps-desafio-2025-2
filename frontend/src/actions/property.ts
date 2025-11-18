'use server'

import { api } from '@/services/api'
import { propertyType } from '@/types/property'
import { revalidatePath } from 'next/cache'

/**
 * Cria uma nova propriedade
 * @param form - FormData com os dados da propriedade
 * @returns Promise com response e error
 */
export async function createProperty(form: FormData) {
  const { response, error } = await api<propertyType>('POST', '/properties', { data: form })
  
  if (!error) {
    revalidatePath('/admin/imoveis')
  }
  
  return { response, error }
}

/**
 * Atualiza uma propriedade existente
 * @param id - ID da propriedade
 * @param form - FormData com os dados atualizados
 * @returns Promise com response e error
 */
export async function updateProperty(id: string, form: FormData) {  
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
  
  const { response, error } = await api<propertyType>(method, `/properties/${id}`, { data: form })
  
  
  if (!error) {
    revalidatePath('/admin/imoveis')
  }
  
  return { response, error }
}

/**
 * Deleta uma propriedade
 * @param id - ID da propriedade
 * @returns Promise com response e error
 */
export async function destroyProperty(id: string) {
  const { response, error } = await api<propertyType>('DELETE', `/properties/${id}`)
  
  if (!error) {
    revalidatePath('/admin/imoveis')
  }
  
  return { response, error }
}
