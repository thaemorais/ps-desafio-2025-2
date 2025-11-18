import { categoryType } from '@/types/category'
import { api, ResponseErrorType } from './api'

/**
 * Lista todas as categorias
 * @returns Promise com array de categorias
 */
export async function listarCategorias(): Promise<categoryType[]> {
  const { response } = await api<categoryType[]>('GET', '/categories')
  return response ?? []
}

/**
 * Busca uma categoria específica por ID
 * @param id - ID da categoria
 * @returns Promise com a categoria encontrada ou null
 */
export async function buscarCategoriaPorId(
  id: string,
): Promise<categoryType | null> {
  const { response } = await api<categoryType>('GET', `/categories/${id}`)
  return response ?? null
}

/**
 * Busca uma categoria específica por ID (com tratamento de erro)
 * Usado em componentes client que precisam tratar erros
 * @param id - ID da categoria
 * @returns Promise com response e error
 */
export async function getCategory(
  id: string,
): Promise<
  | { response: categoryType; error: undefined }
  | { response: undefined; error: ResponseErrorType }
> {
  return await api<categoryType>('GET', `/categories/${id}`)
}

/**
 * Lista todas as categorias (com tratamento de erro)
 * Usado em componentes client que precisam tratar erros
 * @returns Promise com response e error
 */
export async function getCategories(): Promise<
  | { response: categoryType[]; error: undefined }
  | { response: undefined; error: ResponseErrorType }
> {
  return await api<categoryType[]>('GET', '/categories')
}
