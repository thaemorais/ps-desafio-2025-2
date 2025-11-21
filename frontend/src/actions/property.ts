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
 * @param data - FormData ou objeto com os dados atualizados
 * @returns Promise com response e error
 */
export async function updateProperty(id: string, data: FormData | Record<string, unknown>) {  
  // Se for FormData, verifica method spoofing
  let method: 'POST' | 'PUT' = 'PUT'
  
  if (data instanceof FormData) {
    const hasMethodSpoofing = data.has('_method')
    method = hasMethodSpoofing ? 'POST' : 'PUT'
  }
  
  // Axios detecta automaticamente se é FormData ou JSON e define o Content-Type apropriado
  const { response, error } = await api<propertyType>(method, `/properties/${id}`, { 
    data
  })
  
  if (!error) {
    // Revalida a página de administração de imóveis
    revalidatePath('/admin/imoveis')
    // Revalida a página do imóvel específico
    revalidatePath(`/${id}`)
    // Revalida a página inicial que lista os imóveis
    revalidatePath('/')
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
