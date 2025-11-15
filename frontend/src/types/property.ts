import { categoryType } from './category'

export type propertyType = {
  id: string
  imagem: string | null
  titulo: string
  descricao: string | null
  preco: number
  caracteristicas: string[]
  endereco: string
  categoriaId: string
  categoria: categoryType
  adquirido: boolean
}