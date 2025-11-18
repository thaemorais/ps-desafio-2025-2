import { api } from './api'
import { propertyType } from '@/types/property'

/**
 * Lista todos os imóveis
 * @returns Promise com array de imóveis
 */
export async function listarImoveis(): Promise<propertyType[]> {
  const { response } = await api<propertyType[]>('GET', '/properties')
  return response ?? []
}

/**
 * Busca um imóvel específico por ID
 * @param id - ID do imóvel
 * @returns Promise com o imóvel encontrado ou null
 */
export async function buscarImovelPorId(
  id: string,
): Promise<propertyType | null> {
  const { response } = await api<propertyType>('GET', `/properties/${id}`)
  return response ?? null
}

