import { CategoryType } from '@/types/category'
import { categoriesMock } from '@/mocks/categories'

export async function listarCategorias(): Promise<CategoryType[]> {
  // TODO: Substituir por chamada à API quando o backend estiver disponível.
  return categoriesMock
}

