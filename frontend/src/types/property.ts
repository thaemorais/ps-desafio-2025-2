import { CategoryType } from './category'

export type propertyType = {
  id: string
  imagem: string | null
  titulo: string
  descricao: string | null
  preco: number
  caracteristicas: string[]
  endereco: string
  categoriaId: string
  categoria: CategoryType
  adquirido: boolean
}