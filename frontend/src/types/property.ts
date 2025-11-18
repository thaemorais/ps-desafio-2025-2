import { categoryType } from './category'

export type propertyType = {
  id: string
  image: string | null
  title: string
  description: string | null
  price: number
  features: string[]
  address: string
  category_id: string
  acquired: boolean
}